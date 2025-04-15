import express from 'express';
const app = express();

// Rute untuk halaman utama ('/')
app.get('/', (req, res) => {
    res.json({ message: "Selamat datang di API Node.js saya!" });
});

// Rute untuk API lainnya
app.get('/api/hello', (req, res) => {
    res.json({ message: "Halo, dunia!" });
});

app.get('/api/product', (req, res) => {
    res.json({ products: [{ id: 1, name: "Produk A" }, { id: 2, name: "Produk B" }] });
});

// Menentukan port untuk server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
});
