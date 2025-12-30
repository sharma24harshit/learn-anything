import express from 'express'
import fs from 'fs'
import path from 'path'
import cors from 'cors'

const app = express()
const PORT = 5174
const __dirname = path.resolve()
const DATA_DIR = path.join(__dirname, 'server', 'data')
const DATA_FILE = path.join(DATA_DIR, 'db.json')

app.use(cors())
app.use(express.json())

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
  if (!fs.existsSync(DATA_FILE)) {
    const initial = {
      html: [],
      css: [],
      js: [],
      react: [],
      backend: [],
      other: [],
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(initial, null, 2), 'utf-8')
  }
}

function readData() {
  ensureDataFile()
  const raw = fs.readFileSync(DATA_FILE, 'utf-8')
  return JSON.parse(raw)
}

function writeData(data) {
  ensureDataFile()
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8')
}

app.get('/api/data', (req, res) => {
  const data = readData()
  res.json(data)
})

app.put('/api/data', (req, res) => {
  const incoming = req.body || {}
  const merged = {
    html: Array.isArray(incoming.html) ? incoming.html : [],
    css: Array.isArray(incoming.css) ? incoming.css : [],
    js: Array.isArray(incoming.js) ? incoming.js : [],
    react: Array.isArray(incoming.react) ? incoming.react : [],
    backend: Array.isArray(incoming.backend) ? incoming.backend : [],
    other: Array.isArray(incoming.other) ? incoming.other : [],
  }
  writeData(merged)
  res.json(merged)
})

app.get('/api/topic/:topic', (req, res) => {
  const data = readData()
  const topic = req.params.topic
  res.json(data[topic] || [])
})

app.post('/api/questions', (req, res) => {
  const { topic = 'other', question, answer, difficulty = 'easy', source = '', notes = '', tags = [] } = req.body || {}

  if (!question || !answer) {
    return res.status(400).json({ error: 'question and answer are required' })
  }

  const data = readData()
  const key = data[topic] ? topic : 'other'

  if (!Array.isArray(data[key])) data[key] = []

  const newItem = {
    id: Date.now().toString(),
    question,
    answer,
    difficulty,
    source,
    notes,
    tags: Array.isArray(tags) ? tags : [],
  }

  data[key].push(newItem)
  writeData(data)
  res.status(201).json(newItem)
})

app.patch('/api/questions/:id', (req, res) => {
  const { id } = req.params
  const { topic = 'other', ...updates } = req.body || {}
  const data = readData()
  const key = data[topic] ? topic : 'other'
  const list = data[key] || []
  const index = list.findIndex((item) => item.id === id)

  if (index === -1) {
    return res.status(404).json({ error: 'Not found' })
  }

  list[index] = { ...list[index], ...updates }
  writeData(data)
  res.json(list[index])
})

app.delete('/api/questions/:id', (req, res) => {
  const { id } = req.params
  const topic = req.query.topic || 'other'
  const data = readData()
  const key = data[topic] ? topic : 'other'
  const list = data[key] || []
  const nextList = list.filter((item) => item.id !== id)

  if (nextList.length === list.length) {
    return res.status(404).json({ error: 'Not found' })
  }

  data[key] = nextList
  writeData(data)
  res.status(204).send()
})

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`)
})

