module.exports = (req, res) => {
    res.status(200).json({ products: [{ id: 1, name: "Produk A" }, { id: 2, name: "Produk B" }] });
};
