import Database from 'better-sqlite3';

// Creates (or opens) a file called casino.db in your project root
export const db = new Database('casino.db');

// Pragma tweaks for better performance (optional but nice)
db.pragma('journal_mode = WAL');

// Create the games table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS games (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('slots', 'table', 'live')),
    thumbnailUrl TEXT NOT NULL
  )
`);

// Seed data only if the table is empty
const count = db.prepare('SELECT COUNT(*) as c FROM games').get() as { c: number };
if (count.c === 0) {
  const insert = db.prepare(
    'INSERT INTO games (name, category, thumbnailUrl) VALUES (?, ?, ?)'
  );
  const seed = [
    ['Mega Fortune', 'slots', 'https://picsum.photos/seed/1/300/200'],
    ['Starburst', 'slots', 'https://picsum.photos/seed/2/300/200'],
    ["Gonzo's Quest", 'slots', 'https://picsum.photos/seed/3/300/200'],
    ['Blackjack Classic', 'table', 'https://picsum.photos/seed/4/300/200'],
    ['European Roulette', 'table', 'https://picsum.photos/seed/5/300/200'],
    ['Poker Pro', 'table', 'https://picsum.photos/seed/6/300/200'],
    ['Live Blackjack', 'live', 'https://picsum.photos/seed/7/300/200'],
    ['Live Roulette', 'live', 'https://picsum.photos/seed/8/300/200'],
  ];
  // Transaction = all inserts happen together, faster and safer
  const insertMany = db.transaction((rows: string[][]) => {
    for (const row of rows) insert.run(...row);
  });
  insertMany(seed);
  console.log('🎲 Seeded 8 games');
}