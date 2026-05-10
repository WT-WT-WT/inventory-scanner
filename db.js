import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseAsync('inventory.db');

export const initDB = async () => {
  const database = await db;
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      barcode TEXT UNIQUE
    );
  `);
};

export const addProduct = async (name, barcode) => {
  try {
    const database = await db;
    const result = await database.runAsync(
      'INSERT INTO products (name, barcode) VALUES (?, ?);',
      [name, barcode]
    );
    return result;
  } catch (error) {
    throw error;
  }
};

export const getProductByBarcode = async (barcode) => {
  try {
    const database = await db;
    const result = await database.getFirstAsync(
      'SELECT * FROM products WHERE barcode = ?;',
      [barcode]
    );
    return result;
  } catch (error) {
    throw error;
  }
};

export const getAllProducts = async () => {
  try {
    const database = await db;
    const result = await database.getAllAsync('SELECT * FROM products;');
    return result;
  } catch (error) {
    throw error;
  }
};