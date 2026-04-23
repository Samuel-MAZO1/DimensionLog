import axios from 'axios';
import { BASE_URL, REQUEST_TIMEOUT_MS } from '../../core/config/api.config';

// Instancia compartida de Axios.
// Todos los servicios usan ESTA instancia, no crean la propia.
// Ventaja: si necesitas agregar un token o header global, lo haces aquí una sola vez.
export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: REQUEST_TIMEOUT_MS,
});

// Interceptor de respuesta: convierte errores HTTP en instancias de Error
// con mensajes legibles en lugar de objetos AxiosError complejos.
apiClient.interceptors.response.use(
  // Si la respuesta es exitosa (2xx), la pasa sin cambios
  (response) => response,

  // Si hay un error, lo transforma en un Error estándar de JavaScript
  (error: unknown) => {
    // Verificamos si es un error de Axios con respuesta del servidor
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;
      // Mensajes legibles según el código de estado HTTP
      const messages: Record<number, string> = {
        404: 'Recurso no encontrado',
        500: 'Error interno del servidor',
      };
      const message = messages[status] ?? `Error HTTP ${status}`;
      return Promise.reject(new Error(message));
    }

    // Si no hay respuesta (problema de red, timeout, etc.)
    if (axios.isAxiosError(error) && error.request) {
      return Promise.reject(new Error('Sin conexión — verifica tu internet'));
    }

    // Cualquier otro error desconocido
    return Promise.reject(new Error('Ocurrió un error inesperado'));
  }
);