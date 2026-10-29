import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';

import { initialFavoriteIds } from '../data/favorites';

interface FavoritesContextValue {
  favoriteCount: number;
  isFavorite: (experienceId: string) => boolean;
  toggleFavorite: (experienceId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

/**
 * Favoritos compartilhados entre Home, Descubra e (futuramente) a tela de
 * Favoritos — assim o coração fica consistente em todas as telas.
 * Hoje vive em memória; para persistir, basta trocar o useState por
 * AsyncStorage (ou por chamadas à API) aqui dentro.
 */
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(() => new Set(initialFavoriteIds));

  const toggleFavorite = useCallback((experienceId: string) => {
    setFavoriteIds((current) => {
      const next = new Set(current);
      if (next.has(experienceId)) next.delete(experienceId);
      else next.add(experienceId);
      return next;
    });
  }, []);

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favoriteCount: favoriteIds.size,
      isFavorite: (experienceId) => favoriteIds.has(experienceId),
      toggleFavorite,
    }),
    [favoriteIds, toggleFavorite]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites(): FavoritesContextValue {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites precisa estar dentro de <FavoritesProvider>');
  return context;
}
