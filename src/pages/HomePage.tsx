import { useState, useEffect } from 'react';
import { useGames } from '../hooks/useGames';
import { GameCard } from '../Components/GameCard';
import { CategoryFilter } from '../Components/CategoryFilter';
import type { Game, Category } from '../types';

// IDs of games we want to mark as "popular" — just for visual flair
const POPULAR_IDS = [1, 7];

export function HomePage() {
  const [category, setCategory] = useState<Category>('all');
  const [launchedGame, setLaunchedGame] = useState<Game | null>(null);
  const [launching, setLaunching] = useState(false);
  const { games, loading, error } = useGames(category);

  // Simulate a brief launch animation
  useEffect(() => {
    if (launchedGame) {
      setLaunching(true);
      const timer = setTimeout(() => setLaunching(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [launchedGame]);

  // Launch screen
  if (launchedGame) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="bg-neutral-900 rounded-2xl border border-amber-500/30 shadow-2xl shadow-amber-500/10 p-12 text-center max-w-md">
          {launching ? (
            <>
              <div className="w-20 h-20 mx-auto mb-6 rounded-full border-4 border-amber-500/20 border-t-amber-400 animate-spin" />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent mb-2">
                Launching {launchedGame.name}
              </h2>
              <p className="text-neutral-400">Placing your bets...</p>
            </>
          ) : (
            <>
              <div className="text-7xl mb-4">🎰</div>
              <h2 className="text-2xl font-bold text-neutral-100 mb-2">
                {launchedGame.name}
              </h2>
              <p className="text-neutral-500 mb-8">Game ready to play</p>
              <button
                onClick={() => setLaunchedGame(null)}
                className="text-amber-400 hover:text-amber-300 font-medium transition"
              >
                ← Back to lobby
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <CategoryFilter value={category} onChange={setCategory} />

      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="w-10 h-10 rounded-full border-4 border-neutral-800 border-t-amber-400 animate-spin" />
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-300 rounded-lg p-4">
          <p className="font-medium mb-1">Something went wrong</p>
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="flex items-center justify-between">
            <p className="text-neutral-400 text-sm">
              <span className="text-amber-400 font-semibold">{games.length}</span>
              {' '}
              {games.length === 1 ? 'game' : 'games'}
              {category !== 'all' && (
                <> in <span className="text-neutral-200 capitalize">{category}</span></>
              )}
            </p>
          </div>

          {games.length === 0 ? (
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl py-16 text-center">
              <div className="text-5xl mb-3">🎲</div>
              <p className="text-neutral-400 font-medium">No games in this category yet</p>
              <p className="text-neutral-600 text-sm mt-1">Try selecting another category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {games.map(game => (
                <GameCard
                  key={game.id}
                  game={game}
                  onLaunch={setLaunchedGame}
                  popular={POPULAR_IDS.includes(game.id)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}