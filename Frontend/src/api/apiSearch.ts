import { customFetch } from './customFetch';
import type { SearchResult } from './types';

export async function apiSearch(query: string): Promise<SearchResult[]> {
  const response = await customFetch(`/api/search?q=${encodeURIComponent(query)}`);
  return response.json() as Promise<SearchResult[]>;
}