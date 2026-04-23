// Barrel export del módulo characters.
// Las páginas y otros módulos importan desde '@/modules/characters'
// en lugar de rutas relativas profundas como '../../modules/characters/hooks/use-character-list'.
// Esto simplifica los imports y oculta la estructura interna del módulo.

export type { Character, CharacterFilters, CharacterStatus, CharacterGender } from './types';
export { useCharacterList } from './hooks/use-character-list';
export { useCharacterDetail } from './hooks/use-character-detail';
export { useCharacterFilters } from '../characters/hooks/use-character-filters';
export type { PaginationState } from '../characters/hooks/use-character-filters';
export { characterKeys } from './hooks/query-keys';
export { fetchCharacterList, fetchCharacterById, mapStatusToColorDl, formatEpisodeCountDl } from './services/character.service';