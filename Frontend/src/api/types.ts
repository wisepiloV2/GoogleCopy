export interface User {
  username: string;
  email: string;
  phone: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  phone: string;
  email: string;
  password: string;
}

export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
}

export interface HistoryItem {
  id: number;
  searchTerm: string;
  searchDate: string;
}