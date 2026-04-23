import type { ReactNode } from 'react';

type Props = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export function Layout({ title, subtitle, children }: Props) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-amber-500/20 bg-gradient-to-b from-neutral-900 to-neutral-950 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-neutral-900 font-bold text-xl shadow-lg shadow-amber-500/20">
              ♠
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
              {title}
            </h1>
          </div>
          {subtitle && (
            <p className="text-neutral-400 ml-13">{subtitle}</p>
          )}
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-10">
        {children}
      </main>
      <footer className="max-w-6xl mx-auto px-6 py-8 text-center text-neutral-600 text-sm">
        <p>🎰 Play responsibly · 18+ only</p>
      </footer>
    </div>
  );
}