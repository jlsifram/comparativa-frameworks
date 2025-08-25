
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

let tasks = [];
let id = 1;

// GET all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST create new task
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const newTask = { id: id++, title };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// DELETE task
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== taskId);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
