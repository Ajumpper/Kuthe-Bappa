"use client";

import { useEffect, useRef } from "react";
import { Map as MlMap, Marker, NavigationControl } from "maplibre-gl";
import type { Pandal } from "@/data/pandals";
import { MUMBAI_BOUNDS, MUMBAI_CENTER } from "@/lib/geo";

type Props = {
  pandals: Pandal[];
  selectedId: string | null;
  nearestId: string | null;
  onSelect: (id: string) => void;
};

function makeMarkerEl(p: Pandal, nearestId: string | null, selectedId: string | null) {
  const el = document.createElement("button");
  el.type = "button";
  el.className = [
    "kb-marker",
    p.isKing ? "king" : "",
    nearestId === p.id ? "nearest" : "",
    selectedId === p.id ? "active" : "",
  ]
    .filter(Boolean)
    .join(" ");
  el.setAttribute("aria-label", p.name);
  el.innerHTML = p.isKing
    ? `<span class="pulse"></span><span class="crown">♛</span><span class="dot"></span>`
    : `<span class="pulse"></span><span class="dot"></span>`;
  return el;
}

function ensure3dBuildings(map: MlMap) {
  const style = map.getStyle();
  if (!style) return;
  const layers = style.layers ?? [];
  const existing = layers.find(
    (l) => l.type === "fill-extrusion" && "source-layer" in l && l["source-layer"] === "building",
  );
  const label = layers.find((l) => l.type === "symbol");
  const extrusionPaint = {
    "fill-extrusion-color": [
      "interpolate",
      ["linear"],
      ["coalesce", ["get", "render_height"], 8],
      0,
      "#3a1a22",
      24,
      "#5a2428",
      60,
      "#7a3a2a",
      120,
      "#c4a36a",
    ],
    "fill-extrusion-height": ["coalesce", ["get", "render_height"], ["get", "height"], 8],
    "fill-extrusion-base": ["coalesce", ["get", "render_min_height"], 0],
    "fill-extrusion-opacity": 0.82,
  };

  if (existing) {
    try {
      map.setPaintProperty(existing.id, "fill-extrusion-color", extrusionPaint["fill-extrusion-color"] as never);
      map.setPaintProperty(existing.id, "fill-extrusion-opacity", 0.82);
    } catch {
      /* keep default liberty extrusion */
    }
    return;
  }

  const sources = Object.keys(style.sources ?? {});
  const source = sources.includes("openmaptiles")
    ? "openmaptiles"
    : sources.includes("openfreemap")
      ? "openfreemap"
      : sources[0];
  if (!source) return;

  try {
    map.addLayer(
      {
        id: "3d-buildings",
        source,
        "source-layer": "building",
        type: "fill-extrusion",
        minzoom: 13,
        filter: ["!=", ["get", "hide_3d"], true],
        paint: extrusionPaint as never,
      },
      label?.id,
    );
  } catch {
    /* already present */
  }
}

export default function MapCanvas({ pandals, selectedId, nearestId, onSelect }: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MlMap | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  useEffect(() => {
    if (!wrapRef.current || mapRef.current) return;

    const map = new MlMap({
      container: wrapRef.current,
      style: "https://tiles.openfreemap.org/styles/liberty",
      center: MUMBAI_CENTER,
      zoom: 13.5,
      pitch: 60,
      bearing: -20,
      maxBounds: MUMBAI_BOUNDS,
      attributionControl: { compact: true },
      canvasContextAttributes: { antialias: true },
    });

    map.addControl(new NavigationControl({ visualizePitch: true }), "bottom-right");
    mapRef.current = map;

    map.on("load", () => {
      ensure3dBuildings(map);
      map.resize();
    });

    const onResize = () => map.resize();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const rebuild = () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = pandals.map((p) => {
        const el = makeMarkerEl(p, nearestId, selectedId);
        el.addEventListener("click", (e) => {
          e.stopPropagation();
          onSelectRef.current(p.id);
        });
        return new Marker({ element: el, anchor: "center" }).setLngLat([p.lng, p.lat]).addTo(map);
      });
    };

    if (map.isStyleLoaded()) rebuild();
    else map.once("load", rebuild);

    return () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
    };
  }, [pandals, nearestId, selectedId]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedId) return;
    const p = pandals.find((x) => x.id === selectedId);
    if (!p) return;
    map.flyTo({
      center: [p.lng, p.lat],
      zoom: 16,
      pitch: 60,
      bearing: -20,
      duration: 1700,
      essential: true,
    });
  }, [selectedId, pandals]);

  return <div ref={wrapRef} className="absolute inset-0 h-full w-full" />;
}
