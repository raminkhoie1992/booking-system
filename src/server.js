"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booking_js_1 = require("./booking.js");
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.post('/appointments', (req, res) => {
    const { name, date, time } = req.body;
    const result = (0, booking_js_1.book)(name, date, time);
    if (!result.ok) {
        res.status(409).json(result);
        return;
    }
    res.status(201).json(result);
});
app.delete('/appointments/:id', (req, res) => {
    const id = Number(req.params.id);
    const result = (0, booking_js_1.cancelAppointment)(id);
    if (!result.ok) {
        res.status(404).json(result);
        return;
    }
    res.json(result);
});
app.get('/appointments', (_req, res) => {
    res.json((0, booking_js_1.listAppointments)());
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map