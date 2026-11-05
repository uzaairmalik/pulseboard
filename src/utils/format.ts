/// Currency / number formatting. One place, so $ signs and thousands
/// separators are identical on every page (and in CSV exports).
export function formatUSD(n: number): string {
  return '$' + Math.round(n).toLocaleString('en-US');
}

export function formatNumber(n: number): string {
  return n.toLocaleString('en-US');
}

export function formatDate(iso: string): string {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
