const appointments = [];

function createAppointment(name, date, time) {
  if (!name || !date || !time) {
    throw new Error("name, date and time are required");
  }
  return { id: appointments.length + 1, name: name, date: date, time: time };
}

function isSlotTaken(date, time) {
  return appointments.some(function(appointment) {
    return appointment.date === date && appointment.time === time;
  });
}

function book(name, date, time) {
  if (isSlotTaken(date, time)) {
    return { ok: false, message: "This slot is already booked." };
  }
  const appointment = createAppointment(name, date, time);
  appointments.push(appointment);
  return { ok: true, appointment: appointment };
}

function cancelAppointment(id) {
  const index = appointments.findIndex(function(appointment) {
    return appointment.id === id;
  });
  if (index === -1) {
    return { ok: false, message: "Appointment not found." };
  }
  const removed = appointments.splice(index, 1);
  return { ok: true, cancelled: removed[0] };
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

