import express from 'express';
import cors from 'cors';
import { addProduct, getProductByBarcode, getAllProducts } from './db.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/products', (req, res) => {
  res.json(getAllProducts());
});

app.get('/products/:barcode', (req, res) => {
  const product = getProductByBarcode(req.params.barcode);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

app.post('/products', (req, res) => {
  const { name, barcode } = req.body;
  if (!name || !barcode) {
    return res.status(400).json({ error: 'name and barcode are required' });
  }
  try {
    const product = addProduct(name, barcode);
    res.status(201).json(product);
  } catch (err) {
    if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return res.status(409).json({ error: 'Barcode already exists' });
    }
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Inventory API listening on port ${PORT}`);
});
