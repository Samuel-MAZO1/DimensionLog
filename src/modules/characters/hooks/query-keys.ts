import type { CharacterFilters } from '../types';

export const characterKeys = {
  // Base de todas las queries de personajes
  all: ['characters'] as const,

  // Base de las listas
  lists: () => [...characterKeys.all, 'list'] as const,

  // Lista con filtros específicos
  list: (filters: CharacterFilters) => [...characterKeys.lists(), filters] as const,

  // Base de los detalles
  details: () => [...characterKeys.all, 'detail'] as const,

  // Detalle de un personaje específico
  detail: (id: number) => [...characterKeys.details(), id] as const,
} as const;