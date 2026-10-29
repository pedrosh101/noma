import { getCategoryLabel } from "../data/categories";
import { experiences } from "../data/experiences";
import { attendedExperiences, seedReviews } from "../data/reviews";
import {
  MyReviews,
  NewReviewInput,
  PendingReview,
  PublishedReview,
  Review,
  ReviewsSummary,
} from "../types/review";
import { wait } from "./delay";

// "Banco" em memória: faz uma avaliação enviada aparecer nas próximas leituras.
// Com uma API real, isso passa a ser responsabilidade do servidor.
let reviewsStore: Review[] = [...seedReviews];

const experienceById = new Map(experiences.map((e) => [e.id, e]));

function buildInsight(
  published: PublishedReview[],
  pendingCount: number,
): string {
  if (published.length === 0) {
    return "Avalie suas experiências para ajudar outras pessoas a escolher bem.";
  }

  const byCategory = new Map<string, number[]>();
  for (const review of published) {
    const list = byCategory.get(review.experience.category) ?? [];
    list.push(review.rating);
    byCategory.set(review.experience.category, list);
  }

  let bestCategory = "";
  let bestAverage = -1;
  for (const [category, ratings] of byCategory) {
    const average = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
    if (average > bestAverage) {
      bestAverage = average;
      bestCategory = category;
    }
  }

  const label = getCategoryLabel(
    bestCategory as PublishedReview["experience"]["category"],
  );
  const base = `Suas notas mais altas são em ${label}.`;
  return pendingCount > 0
    ? `${base} Faltam ${pendingCount} para você avaliar.`
    : base;
}

/**
 * Avaliações do usuário logado.
 * Trocar o corpo por fetch('/me/reviews') quando o backend existir.
 */
export async function getMyReviews(): Promise<MyReviews> {
  await wait();

  const reviewedIds = new Set(reviewsStore.map((r) => r.experienceId));

  const pending: PendingReview[] = attendedExperiences
    .filter((a) => !reviewedIds.has(a.experienceId))
    .flatMap((a) => {
      const experience = experienceById.get(a.experienceId);
      return experience
        ? [
            {
              attendedId: a.id,
              attendedAt: a.attendedAt,
              guests: a.guests,
              experience,
            },
          ]
        : [];
    })
    .sort((a, b) => b.attendedAt.localeCompare(a.attendedAt));

  const published: PublishedReview[] = reviewsStore
    .flatMap((review) => {
      const experience = experienceById.get(review.experienceId);
      return experience ? [{ ...review, experience }] : [];
    })
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const averageRating =
    published.length > 0
      ? published.reduce((sum, r) => sum + r.rating, 0) / published.length
      : null;

  const summary: ReviewsSummary = {
    totalReviews: published.length,
    averageRating,
    attendedCount: attendedExperiences.length,
    insight: buildInsight(published, pending.length),
  };

  return { pending, published, summary };
}

/** Trocar por fetch('/reviews', { method: 'POST', body }) quando o backend existir. */
export async function submitReview(input: NewReviewInput): Promise<Review> {
  await wait(600);

  const review: Review = {
    id: `rev-${Date.now()}`,
    experienceId: input.experienceId,
    rating: input.rating,
    comment: input.comment.trim(),
    createdAt: new Date().toISOString().slice(0, 10),
  };
  reviewsStore = [review, ...reviewsStore];
  return review;
}

/** Quantas avaliações o usuário já publicou (leitura síncrona do "banco" em memória). */
export function getReviewsCount(): number {
  return reviewsStore.length;
}
