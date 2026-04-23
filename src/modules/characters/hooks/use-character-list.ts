import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchCharacterList } from '../services/character.service';
import { characterKeys } from './query-keys';
import type { CharacterFilters } from '../types';

export function useCharacterList(filters: CharacterFilters) {
  return useQuery({
    queryKey: characterKeys.list(filters),

    queryFn: () => fetchCharacterList(filters),

    placeholderData: keepPreviousData,
  });
}