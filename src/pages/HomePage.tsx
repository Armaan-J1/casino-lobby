import { useState } from 'react';
import { useGames } from '../hooks/useGames';
import { GameCard } from '../Components/GameCard';
import { CategoryFilter } from '../Components/CategoryFilter';
import type { Game, Category } from '../types';

export function HomePage() {
  const [category, setCategory] = useState<Category>('all');
  const [launchedGame, setLaunchedGame] = useState<Game | null>(null);
  const { games, loading, error } = useGames(category);

  // If a game is launched, show the launch screen
  if (launchedGame) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-12 text-center max-w-md">
          <div className="text-6xl mb-4">🎰</div>
          <h2 className="text-2xl font-bold mb-2">{launchedGame.name}</h2>
          <p className="text-gray-500 mb-6">Game launching... (placeholder)</p>
          <button
            onClick={() => setLaunchedGame(null)}
            className="text-blue-600 hover:underline"
          >
            ← Back to lobby
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CategoryFilter value={category} onChange={setCategory} />

      {loading && (
        <p className="text-center text-gray-500 py-12">Loading games...</p>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-md p-4">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <p className="text-sm text-gray-500">
            Showing {games.length} {games.length === 1 ? 'game' : 'games'}
            {category !== 'all' && ` in ${category}`}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {games.map(game => (
              <GameCard
                key={game.id}
                game={game}
                onLaunch={setLaunchedGame}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}