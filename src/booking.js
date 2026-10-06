const appointments =[];
function createAppointment(name,date,time){
    if(!name || !date || !time){
         throw new Error("name,date,time are required");
    }

   
    return { id: appointments.length + 1, name: name, date: date, time: time };
    
}
function isSlotTaken(date,time){
    return appointments.some(function(appointment){
        return appointment.date === date &&appointment.time === time;
    });
}function book (name,date,time){
    if(isSlotTaken(date,time)){
        return {ok:false,message:"this slot is booked"}
    }
    const appointment= createAppointment(name,date,time);
    appointments.push(appointment);
    return {ok:true , appointment : appointment}
}
console.log(book("Ali", "2026-10-10", "10:00"));
console.log(book("Sara", "2026-10-10", "10:00"));
console.log(book("Sara", "2026-10-10", "11:00"));