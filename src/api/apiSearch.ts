import { apiFetch } from './apiClient';
import type { SearchResult } from './types';

export async function apiSearch(query: string): Promise<SearchResult[]> {
  const response = await apiFetch(`/api/search?q=${encodeURIComponent(query)}`);
  if (!response.ok) {
    throw new Error('No se pudo realizar la búsqueda.');
  }

  return response.json();
}