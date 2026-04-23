import type { CharacterStatus } from '../../modules/characters/types';

const STATUS_COLORS: Record<CharacterStatus, string> = {
  Alive:   'bg-green-900/50 text-green-400 border border-green-700/50',
  Dead:    'bg-red-900/50 text-red-400 border border-red-700/50',
  unknown: 'bg-gray-800/50 text-gray-400 border border-gray-600/50',
};

const STATUS_DOTS: Record<CharacterStatus, string> = {
  Alive:   'bg-green-400',
  Dead:    'bg-red-400',
  unknown: 'bg-gray-400',
};

type BadgeProps =
  | { variant: 'status';  value: CharacterStatus }
  | { variant: 'species'; value: string }
  | { variant: 'gender';  value: string };

export function Badge({ variant, value }: BadgeProps) {
  if (variant === 'status') {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[value]}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOTS[value]}`} />
        {value}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700/50">
      {value}
    </span>
  );
}