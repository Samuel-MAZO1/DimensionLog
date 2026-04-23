import { lazy } from 'react';

// Lazy loading — las páginas se cargan solo cuando el usuario las visita.
// Ventaja: el bundle inicial es más pequeño y la app carga más rápido.
// React.lazy() carga el módulo de forma asíncrona cuando se necesita.
export const LazyCharacterListPage = lazy(
  () => import('../modules/characters/pages/character-list-page').then((m) => ({
    default: m.CharacterListPage,
  }))
);

export const LazyCharacterDetailPage = lazy(
  () => import('../modules/characters/pages/character-detail-page').then((m) => ({
    default: m.CharacterDetailPage,
  }))
);