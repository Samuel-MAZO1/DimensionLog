interface FilterChipProps {
  label: string;
  selected: boolean;
  onToggle: () => void;
}

export function FilterChip({ label, selected, onToggle }: FilterChipProps) {
  return (
    <button
      onClick={onToggle}
      className={`
        px-3 py-1.5 rounded-full text-sm font-medium
        border transition-all duration-200 cursor-pointer
        ${selected
          ? 'bg-green-600 border-green-500 text-white shadow-lg shadow-green-900/30'
          : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-300'
        }
      `}
      aria-pressed={selected}
    >
      {label}
    </button>
  );
}