export function getCentralValue(value?: string | number): number {
  if (typeof value === 'string') {
    const match = value.match(/^(\d+)/);
    if (match) {
      return Number(match[1]);
    }
    return 0;
  }
  return value || 0;
}
