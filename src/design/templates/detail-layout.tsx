import type { ReactNode } from 'react';
import { STUDENT } from '../../student/student';

interface DetailLayoutProps {
  backButton: ReactNode;
  children: ReactNode;
}

export function DetailLayout({ backButton, children }: DetailLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <header className="border-b border-slate-800 px-4 py-3 flex items-center justify-between bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <span className="text-green-400 text-xl">🛸</span>
          <span className="font-bold text-slate-100 tracking-tight">DimensionLog</span>
        </div>
        <span className="text-xs text-slate-500">{STUDENT.fullName}</span>
      </header>

      <div className="p-4 md:p-6 max-w-4xl mx-auto w-full space-y-6">
        <div>{backButton}</div>
        <main>{children}</main>
      </div>
    </div>
  );
}