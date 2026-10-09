import Database from "better-sqlite3";

const db:Database.Database = new Database ('booking.db');

db.exec(`
    CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    UNIQUE(date,time)
    )
    `);

export default db;