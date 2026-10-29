import { getCategoryLabel } from '../data/categories';
import { experienceDetails } from '../data/experienceDetails';
import { experiences, featuredExperience } from '../data/experiences';
import { ExperienceQuery } from '../types/discover';
import { Experience, ExperienceCategory, ExperienceDetail } from '../types/experience';
import { wait } from './delay';

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function matchesSearch(experience: Experience, term: string): boolean {
  if (!term) return true;
  const haystack = normalize(
    [
      experience.title,
      experience.location,
      experience.city,
      experience.host.name,
      getCategoryLabel(experience.category),
    ].join(' ')
  );
  return term.split(/\s+/).every((word) => haystack.includes(word));
}

/**
 * Busca, filtra e ordena o catálogo.
 * Quando o backend existir, trocar o corpo por algo como
 * fetch(`/experiences?${new URLSearchParams(...)}`) — a tela não muda.
 */
export async function searchExperiences(query: ExperienceQuery): Promise<Experience[]> {
  await wait();

  const term = normalize(query.search.trim());

  const filtered = experiences
    .filter((e) => query.category === null || e.category === query.category)
    .filter((e) => query.maxPrice === null || e.priceFrom <= query.maxPrice)
    .filter((e) => matchesSearch(e, term));

  switch (query.sort) {
    case 'rating':
      return [...filtered].sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
    case 'price-asc':
      return [...filtered].sort((a, b) => a.priceFrom - b.priceFrom);
    case 'price-desc':
      return [...filtered].sort((a, b) => b.priceFrom - a.priceFrom);
    default:
      return filtered;
  }
}

export interface HomeFeed {
  featured: Experience;
  highlights: Experience[];
  nearby: Experience[];
}

const HIGHLIGHTS_LIMIT = 6;
const NEARBY_LIMIT = 5;

/**
 * Trocar por fetch('/home?category=...&city=...') quando o backend existir.
 */
export async function getHomeFeed(options: {
  category: ExperienceCategory | null;
  city: string;
}): Promise<HomeFeed> {
  await wait();

  const featured = featuredExperience;
  const rest = experiences.filter((e) => e.id !== featured.id);

  const highlights = options.category
    ? rest.filter((e) => e.category === options.category)
    : [...rest]
        .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
        .slice(0, HIGHLIGHTS_LIMIT);

  const highlightIds = new Set(highlights.map((e) => e.id));
  const nearby = rest
    .filter((e) => e.city === options.city && !highlightIds.has(e.id))
    .slice(0, NEARBY_LIMIT);

  return { featured, highlights, nearby };
}

/**
 * Trocar por fetch(`/experiences/${id}`) quando o backend existir.
 */
export async function getExperienceById(id: string): Promise<ExperienceDetail | null> {
  await wait(350);

  const base = experiences.find((e) => e.id === id);
  const extras = experienceDetails[id];
  if (!base || !extras) return null;

  return { ...base, ...extras };
}
