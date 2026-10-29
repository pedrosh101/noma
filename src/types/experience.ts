import type { CategoryIconName } from './ui';

export type ExperienceCategory =
  | 'vinho'
  | 'cafe'
  | 'jantar-chef'
  | 'gastronomia-regional'
  | 'workshop';

export interface Experience {
  id: string;
  title: string;
  category: ExperienceCategory;
  location: string;
  city: string;
  priceFrom: number;
  currency: 'BRL';
  durationMinutes: number;
  rating: number;
  reviewCount: number;
  coverImageUrl: string;
  host: {
    name: string;
    avatarUrl: string;
  };
}

export interface Category {
  id: ExperienceCategory;
  label: string;
  icon: CategoryIconName; // MaterialCommunityIcons — mesmos glifos do Figma
}
export interface ExperienceGuestReview {
  id: string;
  author: string;
  avatarUrl: string;
  rating: number;
  comment: string;
  date: string; // ISO date
}

/** Campos que só existem na página da experiência (a lista não precisa deles). */
export interface ExperienceExtras {
  description: string;
  included: string[];
  maxGuests: number;
  schedule: string;
  meetingPoint: string;
  guestReviews: ExperienceGuestReview[];
}

export interface ExperienceDetail extends Experience, ExperienceExtras {}
