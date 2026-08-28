"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { areaLabels, pandals, type Area, type Pandal } from "@/data/pandals";
import {
  directionsUrl,
  FESTIVAL_START,
  VISARJAN_END,
  withDistances,
} from "@/lib/geo";

const MapCanvas = dynamic(() => import("@/components/MapCanvas"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 grid place-items-center bg-night text-gold">
      <p className="font-[family-name:var(--font-display)] text-2xl tracking-[0.3em]">
        KUTHE BAPPA
      </p>
    </div>
  ),
});

type Sub = { name: string; neighbourhood: string; note: string; at: string };

const SUB_KEY = "kuthe-bappa-mandals";

function useCountdown() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  if (now < FESTIVAL_START) {
    const ms = FESTIVAL_START.getTime() - now.getTime();
    const days = Math.floor(ms / 86400000);
    const hours = Math.floor((ms % 86400000) / 3600000);
    const mins = Math.floor((ms % 3600000) / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    return { mode: "before" as const, days, hours, mins, secs };
  }
  if (now <= VISARJAN_END) {
    const days = Math.max(
      0,
      Math.ceil((VISARJAN_END.getTime() - now.getTime()) / 86400000),
    );
    return { mode: "here" as const, days };
  }
  return { mode: "after" as const };
}

function Countdown() {
  const c = useCountdown();
  if (c.mode === "before") {
    return (
      <div className="text-gold">
        <p className="text-[10px] uppercase tracking-[0.28em] text-gold/70">
          Ganeshotsav 2026 · 14–25 Sep
        </p>
        <p className="mt-0.5 font-[family-name:var(--font-display)] text-lg leading-tight md:text-xl">
          {c.days}d {String(c.hours).padStart(2, "0")}h {String(c.mins).padStart(2, "0")}m{" "}
          {String(c.secs).padStart(2, "0")}s
        </p>
      </div>
    );
  }
  if (c.mode === "here") {
    return (
      <div className="text-gold">
        <p className="font-[family-name:var(--font-display)] text-lg md:text-xl">
          Bappa is here
        </p>
        <p className="text-[11px] tracking-wide text-cream/80">
          {c.days} day{c.days === 1 ? "" : "s"} to visarjan · Anant Chaturdashi 25 Sep
        </p>
      </div>
    );
  }
  return (
    <p className="font-[family-name:var(--font-mr)] text-base text-gold md:text-lg">
      Until next year. Ganpati Bappa Morya.
    </p>
  );
}

export default function HomeClient() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const selectedId = params.get("pandal");

  const [query, setQuery] = useState("");
  const [area, setArea] = useState<Area | "all">("all");
  const [origin, setOrigin] = useState<{ lat: number; lng: number } | null>(null);
  const [geoTried, setGeoTried] = useState(false);
  const [shareMsg, setShareMsg] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [thanks, setThanks] = useState(false);
  const [form, setForm] = useState({ name: "", neighbourhood: "", note: "" });

  const selected = pandals.find((p) => p.id === selectedId) ?? null;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = pandals.filter((p) => (area === "all" ? true : p.area === area));
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.nickname.toLowerCase().includes(q) ||
          p.neighbourhood.toLowerCase().includes(q),
      );
    }
    return withDistances(list, origin);
  }, [query, area, origin]);

  const nearestId = origin && filtered[0] ? filtered[0].id : null;

  const setSelected = useCallback(
    (id: string | null) => {
      const next = new URLSearchParams(params.toString());
      if (id) next.set("pandal", id);
      else next.delete("pandal");
      const s = next.toString();
      router.replace(s ? `${pathname}?${s}` : pathname, { scroll: false });
    },
    [params, pathname, router],
  );

  useEffect(() => {
    const id = params.get("pandal");
    if (id && !pandals.some((p) => p.id === id)) {
      setSelected(null);
    }
  }, [params, setSelected]);

  const nearMe = () => {
    if (!navigator.geolocation) return;
    setGeoTried(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => setOrigin({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setOrigin(null),
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 },
    );
  };

  const share = async (p?: Pandal | null) => {
    const url =
      typeof window === "undefined"
        ? ""
        : p
          ? `${window.location.origin}${pathname}?pandal=${p.id}`
          : window.location.href;
    const title = p ? `${p.name} · Kuthe Bappa` : "Kuthe Bappa";
    const text = p
      ? `${p.name} — ${p.nickname}. Ganpati Bappa Morya.`
      : "Where is Bappa? A 3D map of Mumbai Ganpati pandals, Ganeshotsav 2026.";
    try {
      if (navigator.share) {
        await navigator.share({ title, text, url });
        return;
      }
    } catch {
      /* user cancelled */
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setShareMsg("Link copied");
      setTimeout(() => setShareMsg(null), 1800);
    } catch {
      setShareMsg("Could not copy");
      setTimeout(() => setShareMsg(null), 1800);
    }
  };

  const submitAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.neighbourhood.trim()) return;
    const prev: Sub[] = JSON.parse(localStorage.getItem(SUB_KEY) || "[]");
    prev.push({ ...form, at: new Date().toISOString() });
    localStorage.setItem(SUB_KEY, JSON.stringify(prev));
    setThanks(true);
    setForm({ name: "", neighbourhood: "", note: "" });
  };

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-night">
      <MapCanvas
        pandals={filtered}
        selectedId={selectedId}
        nearestId={nearestId}
        onSelect={(id) => setSelected(id)}
      />
      <div className="kb-vignette" />
      <div className="kb-grain" />

      <header className="pointer-events-none absolute inset-x-0 top-0 z-20 p-3 md:p-5">
        <div className="pointer-events-auto mx-auto max-w-3xl rounded-3xl border border-gold/25 bg-[#12040c]/72 p-3 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-md md:p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-[family-name:var(--font-mr)] text-sm text-saffron">
                कुठे बाप्पा
              </p>
              <h1 className="font-[family-name:var(--font-display)] text-3xl leading-none tracking-wide text-gold md:text-5xl">
                Kuthe Bappa
              </h1>
              <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-cream/55">
                Mumbai · Ganeshotsav 2026
              </p>
            </div>
            <Countdown />
          </div>

          <div className="mt-3 flex flex-col gap-2 md:flex-row">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name or neighbourhood"
              className="w-full rounded-2xl border border-gold/20 bg-night/80 px-4 py-2.5 text-sm text-cream outline-none placeholder:text-cream/35 focus:border-gold/60"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={nearMe}
                className="kb-chip rounded-2xl px-3 py-2 text-xs tracking-wide whitespace-nowrap"
              >
                {origin ? "Sorted near you" : geoTried ? "Location off" : "Near me"}
              </button>
              <button
                type="button"
                onClick={() => share(selected)}
                className="kb-chip rounded-2xl px-3 py-2 text-xs tracking-wide"
              >
                Share
              </button>
            </div>
          </div>

          <div className="mt-2 flex flex-wrap gap-1.5">
            {(["all", "south", "central", "western", "harbour"] as const).map((a) => (
              <button
                key={a}
                type="button"
                data-on={area === a}
                onClick={() => setArea(a)}
                className="kb-chip rounded-full px-3 py-1 text-[11px] tracking-wide"
              >
                {areaLabels[a]}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setShowAdd(true);
                setThanks(false);
              }}
              className="kb-chip rounded-full px-3 py-1 text-[11px] tracking-wide"
            >
              Add a mandal
            </button>
          </div>

          {query && (
            <ul className="kb-scroll mt-2 max-h-36 overflow-auto text-sm">
              {filtered.length === 0 && (
                <li className="px-1 py-2 text-cream/50">No mandals match.</li>
              )}
              {filtered.slice(0, 8).map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => setSelected(p.id)}
                    className="flex w-full items-center justify-between rounded-xl px-2 py-1.5 text-left hover:bg-gold/10"
                  >
                    <span>
                      <span className="text-gold">{p.name}</span>
                      <span className="text-cream/50"> · {p.neighbourhood}</span>
                    </span>
                    {"km" in p && p.km != null && (
                      <span className="text-[11px] text-saffron">{p.km.toFixed(1)} km</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      <p className="pointer-events-none absolute bottom-3 left-0 right-0 z-20 text-center font-[family-name:var(--font-mr)] text-sm text-gold/90 drop-shadow md:text-lg">
        गणपति बाप्पा मोरया · Ganpati Bappa Morya
      </p>

      {shareMsg && (
        <div className="absolute bottom-16 left-1/2 z-30 -translate-x-1/2 rounded-full bg-gold px-4 py-1.5 text-xs text-night">
          {shareMsg}
        </div>
      )}

      {selected && (
        <aside className="kb-sheet pointer-events-auto absolute inset-x-0 bottom-0 z-30 max-h-[62vh] overflow-auto rounded-t-3xl p-5 md:inset-auto md:top-24 md:right-5 md:bottom-8 md:w-[380px] md:rounded-3xl">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              {selected.isKing && (
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold">The King</p>
              )}
              <h2 className="font-[family-name:var(--font-display)] text-2xl text-gold">
                {selected.name}
              </h2>
              <p className="text-sm text-saffron">{selected.nickname}</p>
            </div>
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="kb-chip rounded-full px-3 py-1 text-xs"
            >
              Close
            </button>
          </div>
          <p className="text-sm leading-relaxed text-cream/85">{selected.story}</p>
          <dl className="mt-3 space-y-1.5 text-sm">
            <div className="flex gap-2">
              <dt className="w-24 shrink-0 text-cream/45">Neighbourhood</dt>
              <dd>{selected.neighbourhood}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-24 shrink-0 text-cream/45">Station</dt>
              <dd>{selected.nearestStation}</dd>
            </div>
            {selected.yearFounded && (
              <div className="flex gap-2">
                <dt className="w-24 shrink-0 text-cream/45">Since</dt>
                <dd>{selected.yearFounded}</dd>
              </div>
            )}
            <div className="flex gap-2">
              <dt className="w-24 shrink-0 text-cream/45">Crowd</dt>
              <dd className="text-cream/80">{selected.crowdNote}</dd>
            </div>
          </dl>
          <div className="mt-4 flex gap-2">
            <a
              href={directionsUrl(selected.lat, selected.lng)}
              target="_blank"
              rel="noreferrer"
              className="flex-1 rounded-2xl bg-gradient-to-b from-gold to-gold-deep py-2.5 text-center text-sm font-medium text-night"
            >
              Directions
            </a>
            <button
              type="button"
              onClick={() => share(selected)}
              className="kb-chip rounded-2xl px-4 py-2.5 text-sm"
            >
              Share
            </button>
          </div>
        </aside>
      )}

      {showAdd && (
        <div className="absolute inset-0 z-40 grid place-items-end bg-black/50 p-3 md:place-items-center">
          <form
            onSubmit={submitAdd}
            className="kb-sheet w-full max-w-md rounded-3xl p-5"
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-[family-name:var(--font-display)] text-xl text-gold">
                Add a mandal
              </h3>
              <button type="button" onClick={() => setShowAdd(false)} className="text-cream/60">
                Close
              </button>
            </div>
            {thanks ? (
              <p className="py-6 text-center font-[family-name:var(--font-mr)] text-lg text-gold">
                Ganpati Bappa Morya.
                <span className="mt-2 block font-[family-name:var(--font-ui)] text-sm text-cream/70">
                  Thank you. Saved on this device — we will look it up with care.
                </span>
              </p>
            ) : (
              <div className="space-y-3">
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Mandal name"
                  className="w-full rounded-2xl border border-gold/20 bg-night px-4 py-2.5 text-sm outline-none"
                />
                <input
                  required
                  value={form.neighbourhood}
                  onChange={(e) => setForm({ ...form, neighbourhood: e.target.value })}
                  placeholder="Neighbourhood"
                  className="w-full rounded-2xl border border-gold/20 bg-night px-4 py-2.5 text-sm outline-none"
                />
                <textarea
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                  placeholder="A short note for fellow devotees"
                  rows={3}
                  className="w-full rounded-2xl border border-gold/20 bg-night px-4 py-2.5 text-sm outline-none"
                />
                <button
                  type="submit"
                  className="w-full rounded-2xl bg-gradient-to-b from-gold to-gold-deep py-2.5 text-sm font-medium text-night"
                >
                  Offer this name
                </button>
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
}
