/**
 * Modelo de domínio de uma experiência gastronômica.
 *
 * Mantido independente da origem dos dados (mock hoje, API futuramente) para
 * que telas e componentes nunca dependam do formato de uma fonte específica —
 * apenas a camada de dados (src/data hoje, src/services no futuro) muda.
 */
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
  isFavorite?: boolean;
}

export interface Category {
  id: ExperienceCategory;
  label: string;
  icon: string; // nome do ícone (Ionicons)
}