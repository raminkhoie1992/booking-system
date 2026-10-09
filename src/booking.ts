import db from './db.js';

export interface Appointment {
  id: number;
  name: string;
  date: string;
  time: string;
}

export type BookResult = 
  | { ok: false; message: string }
  | { ok: true; appointment: Appointment };

export type CancelResult = 
  | { ok: false; message: string }
  | { ok: true; cancelled: Appointment };

export function book(name: string, date: string, time: string): BookResult {
  const existing = db.prepare(
    'SELECT id FROM appointments WHERE date = ? AND time = ?'
  ).get(date, time);

  if (existing) {
    return { ok: false, message: 'This slot is already booked.' };
  }

  const result = db.prepare(
    'INSERT INTO appointments (name, date, time) VALUES (?, ?, ?)'
  ).run(name, date, time);

  const appointment: Appointment = {
    id: Number(result.lastInsertRowid),
    name,
    date,
    time
  };

  return { ok: true, appointment };
}

export function cancelAppointment(id: number): CancelResult {
  const appointment = db.prepare(
    'SELECT id, name, date, time FROM appointments WHERE id = ?'
  ).get(id) as Appointment | undefined;

  if (!appointment) {
    return { ok: false, message: 'Appointment not found.' };
  }

  db.prepare('DELETE FROM appointments WHERE id = ?').run(id);

  return { ok: true, cancelled: appointment };
}

export function listAppointments(): Appointment[] {
  return db.prepare(
    'SELECT id, name, date, time FROM appointments'
  ).all() as Appointment[];
}