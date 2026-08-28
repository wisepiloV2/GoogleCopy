export type RegisterRequest = {
  username: string;
  phone: string;
  email: string;
  password: string;
};

export async function registerUser(data: RegisterRequest) {
  const API_URL = import.meta.env.VITE_API_URL;
  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
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
        errorMessage = errorData?.message ?? 'Los datos enviados no son válidos.';
        break;
      case 401:
        errorMessage = 'No tienes autorización para realizar esta acción.';
        break;
      case 409:
        errorMessage = errorData?.message ?? 'El correo o nombre de usuario ya se encuentra registrado.';
        break;
      case 500:
      case 502:
      case 503:
        errorMessage = 'Error en el servidor. Estamos trabajando para solucionarlo.';
        break;
      default:
        if (errorData?.message) { errorMessage = errorData.message;}
        break;
    }

  } catch (error) {
    if (error instanceof Error && error.message !== 'Failed to fetch') {
      throw error;
    }
    
    throw new Error('No se pudo conectar con el servidor. Revisa tu conexión a internet.');
  }
}