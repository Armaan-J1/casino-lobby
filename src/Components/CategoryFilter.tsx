import type { Category } from '../types';

type Props = {
  value: Category;
  onChange: (category: Category) => void;
};

const categories: Category[] = ['all', 'slots', 'table', 'live'];

export function CategoryFilter({ value, onChange }: Props) {
  return (
    <div className="flex gap-2 flex-wrap">
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-4 py-2 rounded-md font-medium capitalize transition ${
            value === cat
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}