import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json()); // Untuk parsing JSON dari request body

// Data sementara (misalnya data produk)
let products = [
    { id: 1, name: 'Produk A', price: 100 },
    { id: 2, name: 'Produk B', price: 150 }
];

// Route untuk mendapatkan semua produk (Read)
app.get('/api/products', (req, res) => {
    res.json(products);
});

// Route untuk mendapatkan produk berdasarkan ID (Read)
app.get('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const product = products.find(p => p.id === parseInt(id));
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: "Produk tidak ditemukan" });
    }
});

// Route untuk membuat produk baru (Create)
app.post('/api/products', (req, res) => {
    const { name, price } = req.body;
    if (!name || !price) {
        return res.status(400).json({ message: "Nama dan harga produk diperlukan" });
    }
    
    const newProduct = {
        id: products.length + 1, // ID otomatis bertambah
        name,
        price
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Route untuk memperbarui produk (Update)
app.put('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;

    const product = products.find(p => p.id === parseInt(id));
    if (!product) {
        return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    // Update produk
    product.name = name || product.name;
    product.price = price || product.price;

    res.json(product);
});

// Route untuk menghapus produk (Delete)
app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const index = products.findIndex(p => p.id === parseInt(id));
    
    if (index === -1) {
        return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    // Hapus produk dari array
    products.splice(index, 1);
    res.status(204).send();
});

// Menjalankan server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
});
