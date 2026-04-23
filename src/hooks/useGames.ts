import { useCallback, useEffect, useState } from 'react';
import type { Game, Category } from '../types';
import { api } from '../lib/api';

export function useGames(category: Category = 'all') {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.listGames(category);
      setGames(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    load();
  }, [load]);

  return { games, loading, error, reload: load };
}