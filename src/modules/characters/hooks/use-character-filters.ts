import { useState } from 'react';
import { useDebounce } from '../../../core/hooks/use-debounce';
import { DEFAULT_PAGE, PAGE_SIZE } from '../../../core/config/api.config';
import type { CharacterFilters, CharacterStatus } from '../types';

const API_PAGE_SIZE = 20;
const SLICES_PER_API_PAGE = Math.floor(API_PAGE_SIZE / PAGE_SIZE);

export interface PaginationState {
  apiPage: number;
  localSlice: number;
  visualPage: number;    
}

// useCharacterFilters — gestiona el estado de los filtros de la lista.
export function useCharacterFilters() {
  const [filters, setFilters] = useState<CharacterFilters>({
    name: '',
    status: 'all',
    species: '',
    page: DEFAULT_PAGE,
  });

  // Estado de paginación visual (5 en 5)
  const [pagination, setPagination] = useState<PaginationState>({
    apiPage: 1,
    localSlice: 0,
    visualPage: 1,
  });

  // Debounce de 500ms para el campo nombre
  const debouncedName = useDebounce(filters.name, 500);

  // Filtros reales que se pasan a useCharacterList (usan la apiPage)
  const debouncedFilters: CharacterFilters = {
    ...filters,
    name: debouncedName,
    page: pagination.apiPage,
  };

  function setName(name: string) {
    setFilters((prev) => ({ ...prev, name }));
    setPagination({ apiPage: 1, localSlice: 0, visualPage: 1 });
  }

  function setStatus(status: CharacterStatus | 'all') {
    setFilters((prev) => ({ ...prev, status }));
    setPagination({ apiPage: 1, localSlice: 0, visualPage: 1 });
  }

  function setSpecies(species: string) {
    setFilters((prev) => ({ ...prev, species }));
    setPagination({ apiPage: 1, localSlice: 0, visualPage: 1 });
  }

  function goToNextSlice() {
    setPagination((prev) => {
      const nextSlice = prev.localSlice + 1;
      if (nextSlice < SLICES_PER_API_PAGE) {
        // Siguiente trozo dentro de los mismos 20
        return { ...prev, localSlice: nextSlice, visualPage: prev.visualPage + 1 };
      } else {
        // Se acabaron los trozos de esta página API → pedimos la siguiente
        return {
          apiPage: prev.apiPage + 1,
          localSlice: 0,
          visualPage: prev.visualPage + 1,
        };
      }
    });
  }

  function goToPrevSlice() {
    setPagination((prev) => {
      if (prev.visualPage <= 1) return prev; // Ya estamos al inicio
      const prevSlice = prev.localSlice - 1;
      if (prevSlice >= 0) {
        // Trozo anterior dentro de los mismos 20
        return { ...prev, localSlice: prevSlice, visualPage: prev.visualPage - 1 };
      } else {
        // Volvemos a la página anterior de la API, último trozo
        return {
          apiPage: prev.apiPage - 1,
          localSlice: SLICES_PER_API_PAGE - 1,
          visualPage: prev.visualPage - 1,
        };
      }
    });
  }

  function resetFilters() {
    setFilters({ name: '', status: 'all', species: '', page: DEFAULT_PAGE });
    setPagination({ apiPage: 1, localSlice: 0, visualPage: 1 });
  }

  return {
    filters,
    debouncedFilters,
    pagination,
    setName,
    setStatus,
    setSpecies,
    goToNextSlice,
    goToPrevSlice,
    resetFilters,
  };
}