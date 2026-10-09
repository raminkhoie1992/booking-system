"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.book = book;
exports.cancelAppointment = cancelAppointment;
exports.listAppointments = listAppointments;
const db_js_1 = __importDefault(require("./db.js"));
function book(name, date, time) {
    const existing = db_js_1.default.prepare('SELECT id FROM appointments WHERE date = ? AND time = ?').get(date, time);
    if (existing) {
        return { ok: false, message: 'This slot is already booked.' };
    }
    const result = db_js_1.default.prepare('INSERT INTO appointments (name, date, time) VALUES (?, ?, ?)').run(name, date, time);
    const appointment = {
        id: Number(result.lastInsertRowid),
        name,
        date,
        time
    };
    return { ok: true, appointment };
}
function cancelAppointment(id) {
    const appointment = db_js_1.default.prepare('SELECT id, name, date, time FROM appointments WHERE id = ?').get(id);
    if (!appointment) {
        return { ok: false, message: 'Appointment not found.' };
    }
    db_js_1.default.prepare('DELETE FROM appointments WHERE id = ?').run(id);
    return { ok: true, cancelled: appointment };
}
function listAppointments() {
    return db_js_1.default.prepare('SELECT id, name, date, time FROM appointments').all();
}
//# sourceMappingURL=booking.js.map