export interface Appointment {
    id: number;
    name: string;
    date: string;
    time: string;
}
export type BookResult = {
    ok: false;
    message: string;
} | {
    ok: true;
    appointment: Appointment;
};
export type CancelResult = {
    ok: false;
    message: string;
} | {
    ok: true;
    cancelled: Appointment;
};
export declare function createAppointment(name: string, date: string, time: string): Appointment;
export declare function isSlotTaken(date: string, time: string): boolean;
export declare function book(name: string, date: string, time: string): BookResult;
export declare function cancelAppointment(id: number): CancelResult;
export declare function listAppointments(): Appointment[];
//# sourceMappingURL=booking.d.ts.map