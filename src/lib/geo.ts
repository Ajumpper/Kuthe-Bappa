import type { Pandal } from "@/data/pandals";

export const MUMBAI_CENTER: [number, number] = [72.836, 18.995];

export const MUMBAI_BOUNDS: [[number, number], [number, number]] = [
  [72.74, 18.86],
  [73.06, 19.28],
];

export function haversineKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

export function withDistances(
  list: Pandal[],
  origin: { lat: number; lng: number } | null,
): (Pandal & { km?: number })[] {
  if (!origin) return list;
  return list
    .map((p) => ({
      ...p,
      km: haversineKm(origin.lat, origin.lng, p.lat, p.lng),
    }))
    .sort((a, b) => (a.km ?? 0) - (b.km ?? 0));
}

export function directionsUrl(lat: number, lng: number) {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}

export const FESTIVAL_START = new Date("2026-09-14T00:00:00+05:30");
export const VISARJAN_END = new Date("2026-09-25T23:59:59+05:30");
