import { useNavigate } from 'react-router-dom';
import { useCharacterList, useCharacterFilters } from '../../../modules/characters';
import {CharacterCard, CharacterCardSkeleton, ErrorMessage, SearchBar, FilterChip,Button, ListLayout,} from '../../../design';
import type { CharacterStatus } from '../../../modules/characters/types';
import { formatEpisodeCountDl } from '../../../modules/characters';
import { useLastVisited } from '../../../modules/history/use-last-visited';
import { useCharacterDetail } from '../../../modules/characters';
import { PAGE_SIZE } from '../../../core/config/api.config';

// Opciones de filtro de status para los chips
const STATUS_OPTIONS: Array<{ label: string; value: CharacterStatus | 'all' }> = [
  { label: 'Todos', value: 'all' },
  { label: 'Vivo', value: 'Alive' },
  { label: 'Muerto', value: 'Dead' },
  { label: 'Desconocido', value: 'unknown' },
];

// CharacterListPage — página coordinadora
// Conecta hooks con componentes
export function CharacterListPage() {
  const navigate = useNavigate();
  const {
    filters,
    debouncedFilters,
    pagination,
    setName,
    setStatus,
    goToNextSlice,
    goToPrevSlice,
  } = useCharacterFilters();

  const { data, isLoading, isError, error, refetch } = useCharacterList(debouncedFilters);
  const { lastVisitedId } = useLastVisited();
  const { data: lastVisitedCharacter } = useCharacterDetail(lastVisitedId);

  const visibleCharacters = data?.results.slice(
    pagination.localSlice * PAGE_SIZE,
    pagination.localSlice * PAGE_SIZE + PAGE_SIZE
  ) ?? [];

  const hasNext = visibleCharacters.length === PAGE_SIZE &&
    (pagination.localSlice < Math.floor(20 / PAGE_SIZE) - 1 || data?.info.next !== null);
  const hasPrev = pagination.visualPage > 1;

  function handleSelectCharacter(id: number) {
    navigate(`/characters/${id}`);
  }

  return (
    <ListLayout
      title="Explorador del Multiverso"
      controls={
        <div className="space-y-3">
          {/* Banner del ultimo personaje visitado*/}
          {lastVisitedCharacter && (
            <div
              onClick={() => navigate(`/characters/${lastVisitedCharacter.id}`)}
              className="flex items-center gap-3 px-4 py-2.5 bg-slate-800/80 border border-green-700/40 rounded-xl cursor-pointer hover:border-green-500/60 transition-colors"
            >
              <img
                src={lastVisitedCharacter.image}
                alt={lastVisitedCharacter.name}
                className="w-8 h-8 rounded-full object-cover border border-slate-600"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-green-400 font-medium">Continuar viendo</p>
                <p className="text-sm text-slate-200 truncate">{lastVisitedCharacter.name}</p>
              </div>
              <span className="text-xs text-slate-500">
                {formatEpisodeCountDl(lastVisitedCharacter.episode)}
              </span>
            </div>
          )}

          {/* Búsqueda por nombre */}
          <SearchBar
            value={filters.name}
            onChange={setName}
            placeholder="Buscar por nombre..."
          />

          {/* Chips de filtro por status */}
          <div className="flex flex-wrap gap-2">
            {STATUS_OPTIONS.map((option) => (
              <FilterChip
                key={option.value}
                label={option.label}
                selected={filters.status === option.value}
                onToggle={() => setStatus(option.value)}
              />
            ))}
          </div>
        </div>
      }
      pagination={
        data && (
          <div className="flex items-center gap-4">
            <Button
              variant="secondary"
              size="sm"
              onClick={goToPrevSlice}
              disabled={!hasPrev}
            >
              ← Anterior
            </Button>

            <span className="text-sm text-slate-400">
              Página {pagination.visualPage}
            </span>

            <Button
              variant="secondary"
              size="sm"
              onClick={goToNextSlice}
              disabled={!hasNext}
            >
              Siguiente →
            </Button>
          </div>
        )
      }
    >
      {/* Estado de carga*/}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <CharacterCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Estado: error */}
      {isError && (
        <ErrorMessage
          message={error instanceof Error ? error.message : 'No se pudieron cargar los personajes'}
          onRetry={() => void refetch()}
        />
      )}

      {/* Estado: sin resultados */}
      {!isLoading && !isError && visibleCharacters.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
          <span className="text-5xl">🌀</span>
          <p className="text-slate-200 font-medium">No se encontraron personajes</p>
          <p className="text-slate-500 text-sm">Intenta con otros filtros o un nombre diferente</p>
        </div>
      )}

      {/* Estado: datos listos*/}
      {!isLoading && !isError && visibleCharacters.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {visibleCharacters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              onSelect={handleSelectCharacter}
            />
          ))}
        </div>
      )}
    </ListLayout>
  );
}