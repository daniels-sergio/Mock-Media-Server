const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Initial Data
let movies = [
  { id: 1, title: "Inception", director: "Christopher Nolan", year: 2010 },
  { id: 2, title: "Interstellar", director: "Christopher Nolan", year: 2014 }
];

let series = [
  { id: 1, title: "Stranger Things", seasons: 4 },
  { id: 2, title: "The Witcher", seasons: 2 }
];

let songs = [
  { id: 1, title: "Blinding Lights", artist: "The Weeknd" },
  { id: 2, title: "Shape of You", artist: "Ed Sheeran" }
];

// Utility function to find and modify arrays
const findById = (arr, id) => arr.find(item => item.id === parseInt(id));

// Routes
app.get('/movies', (req, res) => res.json(movies));
app.get('/series', (req, res) => res.json(series));
app.get('/songs', (req, res) => res.json(songs));

// POST (Add)
app.post('/movies', (req, res) => {
  movies.push(req.body);
  res.json(movies);
});
app.post('/series', (req, res) => {
  series.push(req.body);
  res.json(series);
});
app.post('/songs', (req, res) => {
  songs.push(req.body);
  res.json(songs);
});

// PUT (Update)
app.put('/movies/:id', (req, res) => {
  const item = findById(movies, req.params.id);
  if (item) Object.assign(item, req.body);
  res.json(movies);
});
app.put('/series/:id', (req, res) => {
  const item = findById(series, req.params.id);
  if (item) Object.assign(item, req.body);
  res.json(series);
});
app.put('/songs/:id', (req, res) => {
  const item = findById(songs, req.params.id);
  if (item) Object.assign(item, req.body);
  res.json(songs);
});

// DELETE
app.delete('/movies/:id', (req, res) => {
  movies = movies.filter(m => m.id !== parseInt(req.params.id));
  res.json(movies);
});
app.delete('/series/:id', (req, res) => {
  series = series.filter(s => s.id !== parseInt(req.params.id));
  res.json(series);
});
app.delete('/songs/:id', (req, res) => {
  songs = songs.filter(s => s.id !== parseInt(req.params.id));
  res.json(songs);
});

// Catch-all for 404s
app.use((req, res) => {
  res.status(404).json({ error: "404 - Not Found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
