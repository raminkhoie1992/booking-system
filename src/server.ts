import express from 'express';
import { book, cancelAppointment, listAppointments } from './booking.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.post('/appointments', (req, res) => {
  const { name, date, time } = req.body;
  const result = book(name, date, time);
  if (!result.ok) {
    res.status(409).json(result);
    return;
  }
  res.status(201).json(result);
});

app.delete('/appointments/:id', (req, res) => {
  const id = Number(req.params.id);
  const result = cancelAppointment(id);
  if (!result.ok) {
    res.status(404).json(result);
    return;
  }
  res.json(result);
});

app.get('/appointments', (_req, res) => {
  res.json(listAppointments());
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});