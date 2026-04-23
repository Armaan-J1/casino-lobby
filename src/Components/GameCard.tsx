import type { Game } from '../types';
import  { Button } from './Button';

type Props = {
  game: Game;
  onLaunch: (game: Game) => void;
};

const categoryColors = {
  slots: 'bg-purple-100 text-purple-700',
  table: 'bg-blue-100 text-blue-700',
  live: 'bg-red-100 text-red-700',
};

export function GameCard({ game, onLaunch }: Props) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition">
      <img
        src={game.thumbnailUrl}
        alt={game.name}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900">{game.name}</h3>
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${categoryColors[game.category]}`}>
            {game.category}
          </span>
        </div>
        <Button onClick={() => onLaunch(game)} className="w-full mt-2">
          Launch
        </Button>
      </div>
    </div>
  );
}