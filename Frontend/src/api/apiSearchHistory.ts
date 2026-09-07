import { customFetch } from "./customFetch";
import type { HistoryItem } from "./types";

export const apiSearchHistory = {
  
  getAllHistory: async (): Promise<HistoryItem[]> => {
    const response = await customFetch('/api/search/history', {
      method: 'GET',
    });
    return response.json();
  },

  getRecentHistory: async (): Promise<HistoryItem[]> => {
    const response = await customFetch('/api/search/history/recent', {
      method: 'GET',
    });
    return response.json();
  },

  deleteHistoryById: async (id: number): Promise<void> => {
    await customFetch(`/api/search/history/${id}`, {
      method: 'DELETE',
    });
  },

  deleteAllHistory: async (): Promise<void> => {
    await customFetch('/api/search/history/all', {
      method: 'DELETE',
    });
  }
};