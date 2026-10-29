import { Experience } from './experience';

export type Rating = 1 | 2 | 3 | 4 | 5;

export interface AttendedExperience {
  id: string;
  experienceId: string;
  attendedAt: string; // ISO date
  guests: number;
}

export interface Review {
  id: string;
  experienceId: string;
  rating: Rating;
  comment: string;
  createdAt: string; // ISO date
}

export interface PendingReview {
  attendedId: string;
  attendedAt: string;
  guests: number;
  experience: Experience;
}

export interface PublishedReview extends Review {
  experience: Experience;
}

export interface ReviewsSummary {
  totalReviews: number;
  averageRating: number | null;
  attendedCount: number;
  insight: string;
}

export interface MyReviews {
  pending: PendingReview[];
  published: PublishedReview[];
  summary: ReviewsSummary;
}

export interface NewReviewInput {
  experienceId: string;
  rating: Rating;
  comment: string;
}
