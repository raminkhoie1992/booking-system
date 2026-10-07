interface Appointment {
  id: number;
  name: string;
  date: string;
  time: string;
}
type BookResult = 
  | { ok: false; message: string }
  | { ok: true; appointment: Appointment };

  type CanselResult =
  | { ok: false; message: string }
  | { ok:true; cancelled: Appointment};
const appointments : Appointment[] = [];

function createAppointment(name: string, date: string, time: string): Appointment {
  if (!name || !date || !time) {
    throw new Error("name, date and time are required");
  }
  return { id: appointments.length + 1, name: name, date: date, time: time };
}

function isSlotTaken(date:string, time:string) : boolean {
  return appointments.some(function(appointment) {
    return appointment.date === date && appointment.time === time;
  });
}

function book(name:string, date:string, time:string) : BookResult {
  if (isSlotTaken(date, time)) {
    return { ok: false, message: "This slot is already booked." };
  }
  const appointment = createAppointment(name, date, time);
  appointments.push(appointment);
  return { ok: true, appointment: appointment };
}

function cancelAppointment(id:number) : CanselResult {
  const index = appointments.findIndex(function(appointment) {
    return appointment.id === id;
  });
  if (index === -1) {
    return { ok: false, message: "Appointment not found." };
  }
  const removed = appointments.splice(index, 1);
return { ok: true, cancelled: removed[0] as Appointment };
}
function ListAppointment(){
    return appointments.slice();
}
console.log(book("Ali", "2026-10-10", "10:00"));
console.log(book("Sara", "2026-10-10", "10:00"));
console.log(book("Sara", "2026-10-10", "11:00"));
console.log(cancelAppointment(1));
console.log(cancelAppointment(99));
console.log(cancelAppointment(1));
console.log(ListAppointment());

