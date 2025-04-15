import express from 'express';
import bodyParser from 'body-parser';
import { parse } from 'url';

// Express App
const app = express();
app.use(bodyParser.json());

export default function handler(req, res) {
    app(req, res);
  }

let products = [
    { id: 1, name: 'Produk A', price: 100 },
    { id: 2, name: 'Produk B', price: 150 }
];

app.get('/products', (req, res) => {
    res.json(products);
});

app.get('/products/:id', (req, res) => {
    const { id } = req.params;
    const product = products.find(p => p.id === parseInt(id));
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: "Produk tidak ditemukan" });
    }
});

app.post('/products', (req, res) => {
    const { name, price } = req.body;
    if (!name || !price) {
        return res.status(400).json({ message: "Nama dan harga produk diperlukan" });
    }
    const newProduct = {
        id: products.length + 1,
        name,
        price
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

app.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;
    const product = products.find(p => p.id === parseInt(id));
    if (!product) {
        return res.status(404).json({ message: "Produk tidak ditemukan" });
    }
    product.name = name || product.name;
    product.price = price || product.price;
    res.json(product);
});

app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ message: "Produk tidak ditemukan" });
    }
    products.splice(index, 1);
    res.status(204).send();
});

// Export as Vercel handler
export default function handler(req, res) {
    const parsedUrl = parse(req.url, true);
    app(req, res, parsedUrl);
}
