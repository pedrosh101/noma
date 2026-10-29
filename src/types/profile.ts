import { BookingWithExperience } from './booking';

export interface ProfileStats {
  upcoming: number;
  attended: number;
  reviews: number;
}

export interface Profile {
  stats: ProfileStats;
  upcomingBookings: BookingWithExperience[];
}
