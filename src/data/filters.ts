import { MaxPrice, SortOption } from '../types/discover';

export const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'relevance', label: 'Curadoria Noma' },
  { value: 'rating', label: 'Melhor avaliadas' },
  { value: 'price-asc', label: 'Menor preço' },
  { value: 'price-desc', label: 'Maior preço' },
];

export const priceOptions: { value: MaxPrice; label: string }[] = [
  { value: null, label: 'Qualquer valor' },
  { value: 100, label: 'Até R$ 100' },
  { value: 200, label: 'Até R$ 200' },
  { value: 300, label: 'Até R$ 300' },
];
