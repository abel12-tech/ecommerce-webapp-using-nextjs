export const API_CONFIG = {
  baseUrl: "https://fakestoreapi.com",
  revalidate: 60, // seconds — how often to refresh cached data
} as const;

// helper so every fetch function uses the same base URL
export function apiUrl(path: string): string {
  return `${API_CONFIG.baseUrl}${path}`;
}