export type LoginRequest = {
  email: string;
  password: string;
};

export async function loginUser(data: LoginRequest){
  const API_URL = import.meta.env.VITE_API_URL;
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    });

    if (response.ok) {
      try {
        return await response.json();
      } catch {
        return { success: true };
      }
    }
    const errorData = await response.json().catch(() => null);
    let errorMessage = 'Ocurrió un error inesperado. Por favor, intenta nuevamente.';

    switch (response.status) {
      case 400:
        errorMessage = errorData?.message ?? 'Los datos ingresados no son válidos.';
        break;
      case 401:
        errorMessage = errorData?.message ?? 'Correo electrónico o contraseña incorrectos.';
        break;
      case 403:
        errorMessage = errorData?.message ?? 'Tu cuenta no tiene permisos para acceder.';
        break;
      case 500:
      case 502:
      case 503:
        errorMessage = 'Error en el servidor. Estamos trabajando para solucionarlo.';
        break;
      default:
        if (errorData?.message) errorMessage = errorData.message;
        break;
    }

    throw new Error(errorMessage);

  } catch (error) {
    if (error instanceof Error && error.message !== 'Failed to fetch') {
      throw error;
    }
    
    throw new Error('No se pudo conectar con el servidor. Revisa tu conexión a internet.');
  }
}