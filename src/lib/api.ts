import type { Game, Category } from '../types';

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Request failed (${res.status}): ${body}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export const api = {
  listGames: (category?: Category) => {
    const url = category && category !== 'all'
      ? `/api/games?category=${category}`
      : '/api/games';
    return fetch(url).then(r => handle<Game[]>(r));
  },

  createGame: (data: Omit<Game, 'id'>) =>
    fetch('/api/games', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(r => handle<Game>(r)),

  deleteGame: (id: number) =>
    fetch(`/api/games/${id}`, { method: 'DELETE' }).then(r => handle<void>(r))
};