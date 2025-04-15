
// Middleware untuk menangani rute yang tidak ditemukan
app.use((req, res) => {
  res.status(404).json({ error: "Halaman tidak ditemukan" });
});
