const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'trueque.db');
const db = new Database(dbPath, { verbose: console.log });

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    id_image_path TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

console.log('Database initialized successfully.');

module.exports = db;
