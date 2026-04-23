export const BASE_URL = 'http://localhost:3000/api';

export const ENDPOINTS = {

  CHARACTER_LIST: '/character',

  CHARACTER_DETAIL: '/character',
} as const;

export const DEFAULT_PAGE = 1;

// Cantidad de resultados por página.
// Rick and Morty API devuelve 20 fijos (no acepta parámetro limit).
// Cuando conectes tu propia API, activa el parámetro 'limit' en
// fetchCharacterList() dentro de character.service.ts
// Por ahora simulamos paginación de 5 en 5 en el cliente.
export const PAGE_SIZE = 5;

export const REQUEST_TIMEOUT_MS = 10_000;