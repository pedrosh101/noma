import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { ExperienceRow, ExperienceRowSkeleton } from '../components/discover/ExperienceRow';
import { Button } from '../components/ui/Button';
import { ScreenHeader } from '../components/ui/ScreenHeader';
import { EmptyState, ErrorState } from '../components/ui/States';
import { useFavorites } from '../context/FavoritesContext';
import { useAsync } from '../hooks/use-async';
import { searchExperiences } from '../services/experiences';
import { colors, spacing, typography } from '../theme';
import { defaultExperienceQuery } from '../types/discover';
import { pluralize } from '../utils/format';

export default function FavoritosScreen() {
  const { isFavorite, toggleFavorite } = useFavorites();

  // Os favoritos vivem no FavoritesContext (instantâneo, como na API de verdade
  // seria um estado otimista); o catálogo vem do service e é filtrado aqui.
  // Assim, desfavoritar remove o item na hora, sem esperar o "servidor".
  const { status, data, refetch } = useAsync(
    () => searchExperiences(defaultExperienceQuery),
    'favorites:catalog'
  );

  const favorites = data?.filter((experience) => isFavorite(experience.id));

  function renderList() {
    if (status === 'error' && !data) {
      return <ErrorState what="seus favoritos" onRetry={refetch} />;
    }
    if (!favorites) {
      return (
        <View style={styles.list}>
          <ExperienceRowSkeleton />
          <ExperienceRowSkeleton />
        </View>
      );
    }
    if (favorites.length === 0) {
      return (
        <EmptyState
          icon="heart-outline"
          title="Você ainda não favoritou nada"
          body="Toque no coração de uma experiência para guardá-la aqui e voltar quando quiser."
          action={
            <Button
              label="Descobrir experiências"
              variant="outline"
              onPress={() => router.dismissTo('/descubra' as never)}
            />
          }
        />
      );
    }
    return (
      <View style={styles.list}>
        {favorites.map((experience) => (
          <ExperienceRow
            key={experience.id}
            experience={experience}
            isFavorite
            onPress={(id) => router.push(`/experience/${id}` as never)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScreenHeader title="Favoritos" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {favorites ? (
          <Text accessibilityLiveRegion="polite" style={[typography.caption, styles.count]}>
            {pluralize(favorites.length, 'experiência guardada', 'experiências guardadas')}
          </Text>
        ) : null}
        {renderList()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.paper },
  content: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: spacing.xxxl },
  count: { marginBottom: spacing.sm },
  list: { gap: spacing.sm },
});
