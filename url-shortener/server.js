const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory store: code -> { url, createdAt, clicks }
const links = new Map();
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

const ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
function generateCode(length = 6) {
  let code;
  do {
    code = Array.from({ length }, () => ALPHABET[Math.floor(Math.random() * ALPHABET.length)]).join('');
  } while (links.has(code));
  return code;
}

function isValidUrl(input) {
  try {
    const u = new URL(input);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

app.post('/api/shorten', (req, res) => {
  const { url } = req.body;
  if (!url || !isValidUrl(url)) {
    return res.status(400).json({ error: 'Please provide a valid http(s) URL.' });
  }
  const code = generateCode();
  links.set(code, { url, createdAt: new Date().toISOString(), clicks: 0 });
  res.status(201).json({ shortUrl: `${BASE_URL}/${code}`, code, url });
});

app.get('/api/links', (req, res) => {
  const data = [...links.entries()].map(([code, v]) => ({
    code,
    url: v.url,
    shortUrl: `${BASE_URL}/${code}`,
    createdAt: v.createdAt,
    clicks: v.clicks,
  }));
  res.json(data);
});

app.get('/:code', (req, res) => {
  const entry = links.get(req.params.code);
  if (!entry) {
    return res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
  }
  entry.clicks += 1;
  res.redirect(301, entry.url);
});

app.listen(PORT, () => {
  console.log(`URL shortener running on port ${PORT}`);
});