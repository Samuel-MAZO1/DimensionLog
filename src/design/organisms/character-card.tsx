import { Badge } from '../atoms/badge';
import type { Character } from '../../modules/characters/types';

interface CharacterCardProps {
  character: Character;
  onSelect: (id: number) => void;
}

export function CharacterCard({ character, onSelect }: CharacterCardProps) {
  return (
    <article
      onClick={() => onSelect(character.id)}
      className="
        group relative bg-slate-800/60 rounded-xl overflow-hidden
        border border-slate-700/50 cursor-pointer
        hover:border-green-500/50 hover:bg-slate-800
        hover:shadow-xl hover:shadow-green-900/20
        hover:-translate-y-1
        transition-all duration-300
      "
    >
      {/* Imagen del personaje */}
      <div className="relative overflow-hidden aspect-square">
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Gradiente*/}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />

        {/* Badge de status*/}
        <div className="absolute top-2 left-2">
          <Badge variant="status" value={character.status} />
        </div>
      </div>

      {/* Información del personaje */}
      <div className="p-3 space-y-2">
        <h3 className="font-semibold text-slate-100 text-sm leading-tight line-clamp-1 group-hover:text-green-400 transition-colors">
          {character.name}
        </h3>

        <div className="flex flex-wrap gap-1">
          <Badge variant="species" value={character.species} />
        </div>

        <p className="text-xs text-slate-500 line-clamp-1">
          📍 {character.origin.name}
        </p>
      </div>
    </article>
  );
}