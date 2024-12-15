const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./products.db', (err) => {
  if (err) {
    console.error('Failed to connect to database:', err);
  } 
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      picture TEXT,
      price REAL NOT NULL
    )
  `);
});

module.exports = db;
