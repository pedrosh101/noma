import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CategoryChip } from '../../components/home/CategoryChip';
import { ExperienceRow, ExperienceRowSkeleton } from '../../components/discover/ExperienceRow';
import { FiltersSheet, FiltersValue } from '../../components/discover/FiltersSheet';
import { SearchInput } from '../../components/discover/SearchInput';
import { Button } from '../../components/ui/Button';
import { EmptyState, ErrorState } from '../../components/ui/States';
import { useFavorites } from '../../context/FavoritesContext';
import { categories } from '../../data/categories';
import { useAsync } from '../../hooks/use-async';
import { useDebounce } from '../../hooks/use-debounce';
import { searchExperiences } from '../../services/experiences';
import { colors, radius, spacing, typography, shadows } from '../../theme';
import { defaultExperienceQuery, ExperienceQuery } from '../../types/discover';
import { ExperienceCategory } from '../../types/experience';
import { pluralize } from '../../utils/format';

export default function DescubraScreen() {
  const insets = useSafeAreaInsets();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [query, setQuery] = useState<ExperienceQuery>(defaultExperienceQuery);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const debouncedSearch = useDebounce(query.search, 300);
  const effectiveQuery: ExperienceQuery = { ...query, search: debouncedSearch };

  const { status, data, refetch } = useAsync(
    () => searchExperiences(effectiveQuery),
    JSON.stringify(effectiveQuery)
  );

  const activeFilterCount =
    (query.maxPrice !== null ? 1 : 0) + (query.sort !== 'relevance' ? 1 : 0);
  const hasAnyFilter = query.search.trim() !== '' || query.category !== null || activeFilterCount > 0;

  function handleSelectCategory(id: ExperienceCategory) {
    setQuery((q) => ({ ...q, category: q.category === id ? null : id }));
  }

  function handleApplyFilters(value: FiltersValue) {
    setQuery((q) => ({ ...q, ...value }));
  }

  function handleOpenExperience(id: string) {
    router.push(`/experience/${id}` as never);
  }

  function renderResults() {
    if (status === 'error') {
      return <ErrorState what="as experiências" onRetry={refetch} />;
    }

    if (!data) {
      return (
        <View style={styles.list}>
          {[0, 1, 2, 3].map((i) => (
            <ExperienceRowSkeleton key={i} />
          ))}
        </View>
      );
    }

    if (data.length === 0) {
      return hasAnyFilter ? (
        <EmptyState
          icon="search-outline"
          title="Nada por aqui com esses filtros"
          body="Tente outro termo de busca ou remova algum filtro para ver mais experiências."
          action={<Button label="Limpar filtros" variant="outline" onPress={() => setQuery(defaultExperienceQuery)} />}
        />
      ) : (
        <EmptyState title="Ainda não há experiências" body="Volte em breve: novas experiências chegam toda semana." />
      );
    }

    return (
      <View style={[styles.list, status === 'loading' && styles.refetching]}>
        {data.map((experience) => (
          <ExperienceRow
            key={experience.id}
            experience={experience}
            isFavorite={isFavorite(experience.id)}
            onPress={handleOpenExperience}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.padded}>
          <Text style={typography.display}>Descubra</Text>
          <Text style={[typography.body, styles.subtitle]}>
            Degustações, jantares e oficinas escolhidos a dedo.
          </Text>

          <View style={styles.search}>
            <SearchInput value={query.search} onChangeText={(search) => setQuery((q) => ({ ...q, search }))} />
          </View>
        </View>

        <FlatList
          data={categories}
          horizontal
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.categoryList}
          renderItem={({ item }) => (
            <CategoryChip
              category={item}
              selected={query.category === item.id}
              onPress={handleSelectCategory}
            />
          )}
        />

        <View style={[styles.padded, styles.controls]}>
          <Text accessibilityLiveRegion="polite" style={typography.caption}>
            {data ? pluralize(data.length, 'experiência', 'experiências') : 'Buscando...'}
          </Text>

          <Pressable
            onPress={() => setFiltersOpen(true)}
            accessibilityRole="button"
            accessibilityLabel={
              activeFilterCount > 0 ? `Filtros, ${activeFilterCount} ativos` : 'Filtros'
            }
            style={({ pressed }) => [styles.filterButton, pressed && styles.pressed]}
          >
            <Ionicons name="options-outline" size={16} color={colors.ink} />
            <Text style={[typography.label, styles.filterLabel]}>Filtros</Text>
            {activeFilterCount > 0 ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{activeFilterCount}</Text>
              </View>
            ) : null}
          </Pressable>
        </View>

        <View style={styles.padded}>{renderResults()}</View>
      </ScrollView>

      <FiltersSheet
        visible={filtersOpen}
        value={{ sort: query.sort, maxPrice: query.maxPrice }}
        onApply={handleApplyFilters}
        onClose={() => setFiltersOpen(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.paper },
  scrollContent: { paddingTop: spacing.lg, paddingBottom: spacing.xxxl },
  padded: { paddingHorizontal: spacing.lg },
  subtitle: { marginTop: spacing.xxs },
  search: { marginTop: spacing.md },
  categoryList: { paddingHorizontal: spacing.lg, paddingTop: spacing.md },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    ...shadows.soft,
  },
  filterLabel: { marginLeft: spacing.xxs },
  pressed: { opacity: 0.85 },
  badge: {
    marginLeft: spacing.xs,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 5,
    borderRadius: 9,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { color: colors.paper, fontSize: 11, lineHeight: 14 },
  list: { gap: spacing.sm },
  refetching: { opacity: 0.55 },
});
