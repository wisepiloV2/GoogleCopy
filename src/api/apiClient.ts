import { ApiError, getApiErrorMessage } from './apiError';

let unauthorizedHandler: (() => void) | null = null;

export function setUnauthorizedHandler(handler: (() => void) | null): void {
  unauthorizedHandler = handler;
}

export async function apiFetch(url: string, options: RequestInit = {}): Promise<Response> {
  let response: Response;
  const API_URL = import.meta.env.VITE_API_URL;

  try {
    response = await fetch(API_URL + url, {
      ...options,
      credentials: 'include',
    });
  } catch {
    throw new Error('No se pudo conectar con el servidor. Revisa tu conexión a internet.',);
  }

  if (response.status === 401) {
    unauthorizedHandler?.();
  }

  if (response.ok) {
    return response;
  }

  let errorData: unknown = null;

  try { 
    errorData = await response.json();
  } 
  catch {

  }

  throw new ApiError(
    response.status,
    getApiErrorMessage(response.status, errorData),
  );
}