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

const appointments: Appointment[] = [];

export function createAppointment(name: string, date: string, time: string): Appointment {
  if (!name || !date || !time) {
    throw new Error("name, date and time are required");
  }
  return { id: appointments.length + 1, name: name, date: date, time: time };
}

export function isSlotTaken(date: string, time: string): boolean {
  return appointments.some(function(appointment) {
    return appointment.date === date && appointment.time === time;
  });
}

export function book(name: string, date: string, time: string): BookResult {
  if (isSlotTaken(date, time)) {
    return { ok: false, message: "This slot is already booked." };
  }
  const appointment = createAppointment(name, date, time);
  appointments.push(appointment);
  return { ok: true, appointment: appointment };
}

export function cancelAppointment(id: number): CancelResult {
  const index = appointments.findIndex(function(appointment) {
    return appointment.id === id;
  });
  if (index === -1) {
    return { ok: false, message: "Appointment not found." };
  }
  const removed = appointments.splice(index, 1);
  return { ok: true, cancelled: removed[0] as Appointment };
}

export function listAppointments(): Appointment[] {
  return appointments.slice();
}