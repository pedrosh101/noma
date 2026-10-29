import { ExperienceCategory } from './experience';

export type SortOption = 'relevance' | 'rating' | 'price-asc' | 'price-desc';

export type MaxPrice = number | null;

export interface ExperienceQuery {
  search: string;
  category: ExperienceCategory | null;
  maxPrice: MaxPrice;
  sort: SortOption;
}

export const defaultExperienceQuery: ExperienceQuery = {
  search: '',
  category: null,
  maxPrice: null,
  sort: 'relevance',
};
