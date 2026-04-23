import { useParams, useNavigate } from 'react-router-dom';
import { useCharacterDetail } from '../../../modules/characters';
import { formatEpisodeCountDl, mapStatusToColorDl } from '../../../modules/characters';
import { Badge, Button, ErrorMessage, Skeleton, DetailLayout } from '../../../design';
import { useLastVisited } from '../../../modules/history/use-last-visited';
import { useEffect } from 'react';

export function CharacterDetailPage() {
  const { id: idParam } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const parsedId = Number(idParam);
  const validId = Number.isNaN(parsedId) ? null : parsedId;

  const { data: character, isLoading, isError, error } = useCharacterDetail(validId);

  const { saveLastVisited } = useLastVisited();
  useEffect(() => {
  if (character) saveLastVisited(character.id);
}, [character]);

  return (
    <DetailLayout
      backButton={
        <Button variant="ghost" onClick={() => navigate(-1)}>
          ← Volver a la lista
        </Button>
      }
    >
      {/* ID inválido */}
      {validId === null && (
        <ErrorMessage message={`"${idParam}" no es un ID de personaje válido`} />
      )}

      {/* Cargando */}
      {isLoading && (
        <div className="space-y-6">
          <div className="flex gap-6">
            <Skeleton className="w-48 h-48 rounded-xl flex-shrink-0" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-8 w-2/3" />
              <Skeleton className="h-5 w-24 rounded-full" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          </div>
        </div>
      )}

      {/* Error */}
      {isError && (
        <ErrorMessage
          message={error instanceof Error ? error.message : 'No se pudo cargar el personaje'}
        />
      )}

      {/* Datos del personaje */}
      {character && (
        <div className="space-y-6">
          {/* Cabecera*/}
          <div className="flex flex-col sm:flex-row gap-6">
            <img
              src={character.image}
              alt={character.name}
              className="w-48 h-48 rounded-xl object-cover border border-slate-700 self-start"
            />
            <div className="space-y-3">
              <h1 className="text-3xl font-bold text-slate-100">{character.name}</h1>

              <div className="flex flex-wrap gap-2">
                <Badge variant="status" value={character.status} />
                <Badge variant="species" value={character.species} />
                <Badge variant="gender" value={character.gender} />
              </div>

              {character.type && (
                <p className="text-slate-400 text-sm">
                  Tipo: <span className="text-slate-300">{character.type}</span>
                </p>
              )}

              {/* Episodio*/}
              <p className={`text-sm font-medium ${mapStatusToColorDl(character.status)}`}>
                {formatEpisodeCountDl(character.episode)}
              </p>
            </div>
          </div>

          {/* Detalles adicionales */}
          <div className="grid sm:grid-cols-2 gap-4">
            <DetailCard
              icon="🌍"
              title="Origen"
              value={character.origin.name}
            />
            <DetailCard
              icon="📍"
              title="Ubicación actual"
              value={character.location.name}
            />
          </div>
        </div>
      )}
    </DetailLayout>
  );
}

// Componente auxiliar local — solo usado en esta página
interface DetailCardProps {
  icon: string;
  title: string;
  value: string;
}

function DetailCard({ icon, title, value }: DetailCardProps) {
  return (
    <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 space-y-1">
      <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">
        {icon} {title}
      </p>
      <p className="text-slate-200 font-medium">{value}</p>
    </div>
  );
}