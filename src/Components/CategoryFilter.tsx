import type { Category } from '../types';

type Props = {
  value: Category;
  onChange: (category: Category) => void;
};

const categories: { value: Category; label: string; icon: string }[] = [
  { value: 'all', label: 'All Games', icon: '🎲' },
  { value: 'slots', label: 'Slots', icon: '🎰' },
  { value: 'table', label: 'Table', icon: '🃏' },
  { value: 'live', label: 'Live', icon: '🎥' },
];

export function CategoryFilter({ value, onChange }: Props) {
  return (
    <div className="flex gap-2 flex-wrap">
      {categories.map(cat => {
        const active = value === cat.value;
        return (
          <button
            key={cat.value}
            onClick={() => onChange(cat.value)}
            className={`px-5 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 ${
              active
                ? 'bg-gradient-to-b from-amber-400 to-amber-600 text-neutral-900 shadow-lg shadow-amber-500/30'
                : 'bg-neutral-900 text-neutral-300 border border-neutral-800 hover:border-amber-500/50 hover:text-amber-200'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
}