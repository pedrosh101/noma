import { Category, ExperienceCategory } from '../types/experience';

export const categories: Category[] = [
  { id: 'vinho', label: 'Vinho', icon: 'glass-wine' },
  { id: 'cafe', label: 'Café', icon: 'coffee-outline' },
  { id: 'jantar-chef', label: 'Jantares com chef', icon: 'chef-hat' },
  { id: 'gastronomia-regional', label: 'Gastronomia regional', icon: 'silverware-fork-knife' },
  { id: 'workshop', label: 'Workshops', icon: 'pot-steam-outline' },
];

export function getCategoryLabel(id: ExperienceCategory): string {
  return categories.find((c) => c.id === id)?.label ?? id;
}
