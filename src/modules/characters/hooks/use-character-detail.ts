import { useQuery } from '@tanstack/react-query';
import { fetchCharacterById } from '../services/character.service';
import { characterKeys } from './query-keys';

export function useCharacterDetail(id: number | null) {
  return useQuery({
    queryKey: characterKeys.detail(id ?? 0),
    queryFn: () => fetchCharacterById(id!),
    enabled: id !== null,
  });
}