import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

type Game = {
  id: number;
  name: string;
  category: 'slots' | 'table' | 'live';
  thumbnailUrl: string;
};

let games: Game[] = [
  { id: 1, name: 'Mega Fortune', category: 'slots', thumbnailUrl: 'https://picsum.photos/seed/1/300/200' },
  { id: 2, name: 'Starburst', category: 'slots', thumbnailUrl: 'https://picsum.photos/seed/2/300/200' },
  { id: 3, name: 'Gonzo\'s Quest', category: 'slots', thumbnailUrl: 'https://picsum.photos/seed/3/300/200' },
  { id: 4, name: 'Blackjack Classic', category: 'table', thumbnailUrl: 'https://picsum.photos/seed/4/300/200' },
  { id: 5, name: 'European Roulette', category: 'table', thumbnailUrl: 'https://picsum.photos/seed/5/300/200' },
  { id: 6, name: 'Poker Pro', category: 'table', thumbnailUrl: 'https://picsum.photos/seed/6/300/200' },
  { id: 7, name: 'Live Blackjack', category: 'live', thumbnailUrl: 'https://picsum.photos/seed/7/300/200' },
  { id: 8, name: 'Live Roulette', category: 'live', thumbnailUrl: 'https://picsum.photos/seed/8/300/200' },
];
let nextId = 9;

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/api/games', (req, res) => {
  const { category } = req.query;
  if (category && category !== 'all') {
    return res.json(games.filter(g => g.category === category));
  }
  res.json(games);
});

app.post('/api/games', (req, res) => {
  const { name, category, thumbnailUrl } = req.body;
  if (!name || !category || !thumbnailUrl) {
    return res.status(400).json({ error: 'name, category, and thumbnailUrl are required' });
  }
  if (!['slots', 'table', 'live'].includes(category)) {
    return res.status(400).json({ error: 'Invalid category' });
  }
  const game: Game = { id: nextId++, name, category, thumbnailUrl };
  games.push(game);
  res.status(201).json(game);
});

app.delete('/api/games/:id', (req, res) => {
  games = games.filter(g => g.id !== Number(req.params.id));
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`✅ API running on http://localhost:${PORT}`);
});