import type { Game } from '../types';

type Props = {
  game: Game;
  onLaunch: (game: Game) => void;
  popular?: boolean;
};

const categoryStyles = {
  slots: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
  table: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
  live: 'bg-red-500/10 text-red-300 border-red-500/30',
};

export function GameCard({ game, onLaunch, popular }: Props) {
  return (
    <div className="group bg-neutral-900 rounded-xl border border-neutral-800 overflow-hidden hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1 transition-all duration-300">
      <div className="relative overflow-hidden">
        <img
          src={game.thumbnailUrl}
          alt={game.name}
          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Gradient overlay at bottom of image */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
        {/* Category badge */}
        <span className={`absolute top-3 left-3 text-xs px-2.5 py-1 rounded-full font-medium border backdrop-blur capitalize ${categoryStyles[game.category]}`}>
          {game.category}
        </span>
        {/* Popular badge */}
        {popular && (
          <span className="absolute top-3 right-3 text-xs px-2.5 py-1 rounded-full font-semibold bg-amber-400 text-neutral-900 shadow-lg">
            ⭐ Popular
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-neutral-100 mb-3 truncate">
          {game.name}
        </h3>
        <button
          onClick={() => onLaunch(game)}
          className="w-full py-2.5 rounded-lg font-semibold bg-gradient-to-b from-amber-400 to-amber-600 text-neutral-900 hover:from-amber-300 hover:to-amber-500 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all flex items-center justify-center gap-2"
        >
          <span>▶</span>
          <span>Play Now</span>
        </button>
      </div>
    </div>
  );
}