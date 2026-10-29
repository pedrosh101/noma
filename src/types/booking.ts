import { Experience } from './experience';

export type BookingStatus = 'confirmed' | 'pending';

/** Reserva futura do usuário. */
export interface Booking {
  id: string;
  experienceId: string;
  date: string; // ISO date
  time: string; // "19:30"
  guests: number;
  status: BookingStatus;
}

export interface BookingWithExperience extends Booking {
  experience: Experience;
  total: number;
}
