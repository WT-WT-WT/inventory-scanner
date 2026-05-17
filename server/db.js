import Database from 'better-sqlite3';

const db = new Database('inventory.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    barcode TEXT UNIQUE
  );
`);

export const addProduct = (name, barcode) => {
  const stmt = db.prepare('INSERT INTO products (name, barcode) VALUES (?, ?)');
  const result = stmt.run(name, barcode);
  return { id: result.lastInsertRowid, name, barcode };
};

export const getProductByBarcode = (barcode) => {
  const stmt = db.prepare('SELECT * FROM products WHERE barcode = ?');
  return stmt.get(barcode);
};

export const getAllProducts = () => {
  const stmt = db.prepare('SELECT * FROM products');
  return stmt.all();
};
