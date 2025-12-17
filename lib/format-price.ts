/**
 * Formats a price number to display with thousand separators and AED currency
 * @param price - The price to format
 * @returns Formatted price string (e.g., "AED 11,800")
 */
export function formatPrice(price: number): string {
  return `AED ${Math.round(price).toLocaleString('en-US')}`;
}
