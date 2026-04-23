import { Skeleton } from '../atoms/skeleton';

export function CharacterCardSkeleton() {
  return (
    <div className="bg-slate-800/60 rounded-xl overflow-hidden border border-slate-700/50">
      {/* Placeholder de la imagen*/}
      <Skeleton className="aspect-square w-full" />

      <div className="p-3 space-y-2">
        {/* Placeholder del nombre */}
        <Skeleton className="h-4 w-3/4" />

        {/* Placeholder del badge de especie */}
        <Skeleton className="h-5 w-16 rounded-full" />

        {/* Placeholder del origen */}
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
  );
}