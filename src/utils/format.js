// Shared display formatters.
export function formatStars(n) {
  const num = Number(n);
  if (!Number.isFinite(num) || num < 0) return "0";
  if (num < 1000) return String(Math.round(num));
  const k = num / 1000;
  if (k < 10) return `${Math.floor(k * 10) / 10}k`;
  if (k < 1_000_000) return `${Math.round(k)}k`;
  return `${Math.floor(k / 100) / 10}m`;
}
