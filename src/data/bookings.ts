import { Booking } from '../types/booking';

/**
 * Reservas futuras (mock). As datas respeitam os dias em que cada experiência
 * acontece (ver `schedule` em experienceDetails). O fluxo de reserva, quando
 * existir, passa a acrescentar itens aqui.
 */
export const upcomingBookings: Booking[] = [
  { id: 'bk-01', experienceId: 'exp-12', date: '2026-11-06', time: '19:00', guests: 2, status: 'confirmed' },
  { id: 'bk-02', experienceId: 'exp-02', date: '2026-11-14', time: '20:00', guests: 2, status: 'confirmed' },
];
