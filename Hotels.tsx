// GET all hotels
app.get('/api/hotels', async (req, res) => {
  try {
    const hotels = await Hotel.find({ available: true }).sort({ distance: 1 });
    res.json({ success: true, data: hotels });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

// Seed real Tirupati hotels (run once)
app.post('/api/admin/seed-hotels', async (req, res) => {
  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== process.env.ADMIN_KEY) return res.status(401).end();
  await Hotel.insertMany([
    { name: 'TTD Guest House Srinivasam', distance: '0.2', price: '800', rating: '4.5', type: 'Budget', available: true, phone: '0877-2264000', address: 'Alipiri, Tirupati' },
    { name: 'Hotel Annamaiah', distance: '0.3', price: '950', rating: '4.1', type: 'Budget', available: true, phone: '0877-2265000', address: 'Govinda Raja Street' },
    { name: 'Hotel Bliss', distance: '0.5', price: '1200', rating: '4.2', type: 'Budget', available: true, phone: '0877-2287777', address: 'Tilak Road, Tirupati' },
    { name: 'Hotel Minerva', distance: '0.8', price: '1800', rating: '4.0', type: 'Mid-range', available: false, phone: '0877-2225566', address: 'TP Area, Tirupati' },
    { name: 'Sindoori Hotel', distance: '1.0', price: '2200', rating: '4.3', type: 'Mid-range', available: true, phone: '0877-2289900', address: 'Leela Mahal Road' },
    { name: 'Marasa Sarovar Premiere', distance: '1.2', price: '4500', rating: '4.8', type: 'Premium', available: true, phone: '0877-6677788', address: 'Leela Mahal Circle, Tirupati' },
  ]);
  res.json({ success: true, message: 'Hotels seeded!' });
});