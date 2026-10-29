import { upcomingBookings } from "../data/bookings";
import { experiences } from "../data/experiences";
import { attendedExperiences } from "../data/reviews";
import { BookingWithExperience } from "../types/booking";
import { Profile } from "../types/profile";
import { wait } from "./delay";
import { getReviewsCount } from "./reviews";

const experienceById = new Map(experiences.map((e) => [e.id, e]));

/**
 * Reservas e números do perfil do usuário logado.
 * Trocar o corpo por fetch('/me/profile') quando o backend existir.
 */
export async function getProfile(): Promise<Profile> {
  await wait();

  const bookings: BookingWithExperience[] = upcomingBookings
    .flatMap((booking) => {
      const experience = experienceById.get(booking.experienceId);
      return experience
        ? [
            {
              ...booking,
              experience,
              total: experience.priceFrom * booking.guests,
            },
          ]
        : [];
    })
    .sort((a, b) => a.date.localeCompare(b.date));

  return {
    stats: {
      upcoming: bookings.length,
      attended: attendedExperiences.length,
      reviews: getReviewsCount(),
    },
    upcomingBookings: bookings,
  };
}
