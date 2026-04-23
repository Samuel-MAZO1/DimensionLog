import { apiClient } from '../../../core/api/api-client';
import { characterSchema, characterListSchema } from '../schemas/character.schema';
import { ENDPOINTS, PAGE_SIZE } from '../../../core/config/api.config';
import type { RickAndMortyPaginatedResponse } from '../../../core/types/common';
import type { Character, CharacterFilters } from '../types';

export function mapStatusToColorDl(status: Character['status']): string {
  const colorMap: Record<Character['status'], string> = {
    Alive: 'text-green-400',
    Dead: 'text-red-400',
    unknown: 'text-gray-400',
  };
  return colorMap[status];
}

export function formatEpisodeCountDl(episodes: string[]): string {
  const count = episodes.length;
  if (count === 0) return 'Sin episodios registrados';
  if (count === 1) return 'Aparece en 1 episodio';
  return `Aparece en ${count} episodios`;
}

export async function fetchCharacterList(
  filters: CharacterFilters
): Promise<RickAndMortyPaginatedResponse<Character>> {

  const params: Record<string, string | number> = {
    page: filters.page,
        limit: PAGE_SIZE,
  };

  if (filters.name)           params.name    = filters.name;
  if (filters.status !== 'all') params.status = filters.status;
  if (filters.species)         params.species = filters.species;

  const response = await apiClient.get<unknown>(ENDPOINTS.CHARACTER_LIST, { params });

  return characterListSchema.parse(response.data) as RickAndMortyPaginatedResponse<Character>;
}

export async function fetchCharacterById(id: number): Promise<Character> {

  const response = await apiClient.get<unknown>(`${ENDPOINTS.CHARACTER_DETAIL}/${id}`);
  return characterSchema.parse(response.data) as Character;
}