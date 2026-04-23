export type Game = {
  id: number;
  name: string;
  category: 'slots' | 'table' | 'live';
  thumbnailUrl: string;
};

export type Category = 'all' | 'slots' | 'table' | 'live';