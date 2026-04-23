import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { QueryProvider } from '../core/providers/query-provider';
import { router } from './router';

function PageLoader() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-400 text-sm">Cargando dimensión...</p>
      </div>
    </div>
  );
}

export function App() {
  return (
    <QueryProvider>
      <Suspense fallback={<PageLoader />}>
        <RouterProvider router={router} />
      </Suspense>
    </QueryProvider>
  );
}