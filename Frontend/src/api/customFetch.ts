let unauthorizedHandler: (() => void) | null = null;

export function setUnauthorizedHandler(handler: (() => void) | null): void {
  unauthorizedHandler = handler;
}

function handleUnauthorizedAccess(status: number, url: string): void {
  const ignoredUrls = ['/login', '/verify-password'];
  const shouldIgnore = ignoredUrls.some(ignored => url.includes(ignored));

  if (status === 401 && !shouldIgnore) {
    unauthorizedHandler?.();
  }
}

async function extractErrorMessage(response: Response): Promise<string> {
  const defaultMessage = 'Ocurrió un error en el servidor.';
  
  try {
    const errorData = await response.json();

    if (errorData?.error && typeof errorData.error === 'string') {
      return errorData.error;
    }
    
    if (typeof errorData === 'object' && errorData !== null) {
      const errorValues = Object.values(errorData).flat();
      
      if (errorValues.length > 0 && typeof errorValues[0] === 'string') {
        return errorValues[0]; 
      }
    }

    return defaultMessage;
  } catch {
    return defaultMessage;
  }
}

export async function customFetch(url: string, options: RequestInit = {}): Promise<Response> {
  let response: Response;
  const API_URL = import.meta.env.VITE_API_URL;

  try {
    response = await fetch(API_URL + url, {
      ...options,
      credentials: 'include',
    });
  } catch (error) {
    //Si ocurre un error de red, cors o dns.
    throw new Error('No se pudo conectar con el servidor. Revisa tu conexión a internet.');
  }

  handleUnauthorizedAccess(response.status, url);

  if (response.ok) {
    return response;
  }

  const errorMessage = await extractErrorMessage(response);
  throw new Error(errorMessage);
}