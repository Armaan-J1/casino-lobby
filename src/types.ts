export type Game = {
  id: number;
  name: string;
  category: 'slots' | 'table' | 'live';
  thumbnailUrl: string;
};