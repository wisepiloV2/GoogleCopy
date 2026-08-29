export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

const EXPECTED_STATUS = new Set([
  400,
  401,
  403,
  404,
  409,
  422,
]);

export function getApiErrorMessage(status: number, errorData: unknown): string {
  if (!EXPECTED_STATUS.has(status)) {
    return 'Ocurrió un error inesperado. Por favor, intenta nuevamente.';
  }

  if (
    typeof errorData === 'object' && 
    errorData !== null && 
    'message' in errorData && 
    typeof errorData.message === 'string'
  ) {
    return errorData.message;
  }

  return 'No se pudo completar la solicitud.';
}