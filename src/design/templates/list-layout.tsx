import type { ReactNode } from 'react';
import { STUDENT } from '../../student/student';

interface ListLayoutProps {
  title: string;
  controls?: ReactNode;
  children: ReactNode;
  pagination?: ReactNode;
}

export function ListLayout({ title, controls, children, pagination }: ListLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Header global*/}
      <header className="border-b border-slate-800 px-4 py-3 flex items-center justify-between bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <span className="text-green-400 text-xl">Mazo</span>
          <span className="font-bold text-slate-100 tracking-tight">DimensionLog</span>
        </div>
        <span className="text-xs text-slate-500">{STUDENT.fullName}</span>
      </header>

      <div className="flex flex-col gap-6 p-4 md:p-6 max-w-7xl mx-auto w-full flex-1">
        <h1 className="text-2xl font-bold text-slate-100">{title}</h1>

        {controls && <div className="space-y-3">{controls}</div>}

        <main className="flex-1">{children}</main>

        {pagination && <div className="flex justify-center py-4">{pagination}</div>}
      </div>
    </div>
  );
}