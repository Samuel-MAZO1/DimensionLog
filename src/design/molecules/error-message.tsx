import { Button } from '../atoms/button';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 px-4 text-center">
      <span className="text-5xl">🛸</span>
      <div className="space-y-1">
        <p className="text-slate-200 font-medium">Algo salió mal</p>
        <p className="text-slate-400 text-sm max-w-sm">{message}</p>
      </div>
      {/* El botón solo aparece si onRetry está definido */}
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          Intentar de nuevo
        </Button>
      )}
    </div>
  );
}