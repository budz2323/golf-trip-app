// Golf Trip API — tiny shared JSON store for "The Cup" artifact.
// GET  /api/state  -> { state: <last saved trip state, or null> }
// POST /api/state  -> body is the trip state object, overwrites the saved copy

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());                 // harmless now that it's same-origin, kept for flexibility
app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public'))); // serves public/index.html at "/"

const DATA_FILE = './data.json';

function readState() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch (e) {
    return null; // nothing saved yet
  }
}

function writeState(state) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(state));
}

app.get('/api/state', (req, res) => {
  res.json({ state: readState() });
});

app.post('/api/state', (req, res) => {
  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({ ok: false, error: 'Body must be a JSON object' });
  }
  writeState(req.body);
  res.json({ ok: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Golf Trip API listening on port ' + PORT));
