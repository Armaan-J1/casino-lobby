import express from 'express';
import cors from 'cors';
import { db } from './db';

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

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

// GET all games (with optional category filter)
app.get('/api/games', (req, res) => {
  const { category } = req.query;
  let games: Game[];
  if (category && category !== 'all') {
    games = db.prepare('SELECT * FROM games WHERE category = ?').all(category) as Game[];
  } else {
    games = db.prepare('SELECT * FROM games').all() as Game[];
  }
  res.json(games);
});

// POST a new game
app.post('/api/games', (req, res) => {
  const { name, category, thumbnailUrl } = req.body;
  if (!name || !category || !thumbnailUrl) {
    return res.status(400).json({ error: 'name, category, and thumbnailUrl are required' });
  }
  if (!['slots', 'table', 'live'].includes(category)) {
    return res.status(400).json({ error: 'Invalid category' });
  }
  const result = db.prepare(
    'INSERT INTO games (name, category, thumbnailUrl) VALUES (?, ?, ?)'
  ).run(name, category, thumbnailUrl);

  const game = db.prepare('SELECT * FROM games WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(game);
});

// DELETE a game
app.delete('/api/games/:id', (req, res) => {
  db.prepare('DELETE FROM games WHERE id = ?').run(req.params.id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`✅ API running on http://localhost:${PORT}`);
});