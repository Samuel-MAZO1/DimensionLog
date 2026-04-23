import { useState, useEffect } from 'react';

const STORAGE_KEY = 'dimensionlog_last_visited_id';

// useLastVisited — gestiona el último personaje visto (HU-06).
//
// Solo persiste el ID (número), no el objeto completo.
// El nombre y la imagen se obtienen con useCharacterDetail(lastVisitedId)
// reutilizando el hook existente — sin duplicar fetch.
//
// La escritura a localStorage ocurre en un useEffect observando el cambio,
// no directamente en el handler de navegación.
export function useLastVisited() {
  // Inicializamos leyendo de localStorage
  const [lastVisitedId, setLastVisitedId] = useState<number | null>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === null) return null;
    const parsed = Number(stored);
    return Number.isNaN(parsed) ? null : parsed;
  });

  // Cuando lastVisitedId cambia, lo persistimos en localStorage.
  // useEffect con [lastVisitedId] como dependencia: solo se ejecuta cuando cambia.
  useEffect(() => {
    if (lastVisitedId !== null) {
      localStorage.setItem(STORAGE_KEY, String(lastVisitedId));
    }
  }, [lastVisitedId]);

  function saveLastVisited(id: number) {
    setLastVisitedId(id);
  }

  return { lastVisitedId, saveLastVisited };
}