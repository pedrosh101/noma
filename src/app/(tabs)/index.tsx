import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ExperienceRow, ExperienceRowSkeleton } from '../../components/discover/ExperienceRow';
import { CategoryChip } from '../../components/home/CategoryChip';
import { ExperienceCard, ExperienceCardSkeleton } from '../../components/home/ExperienceCard';
import { FeaturedCard } from '../../components/home/FeaturedCard';
import { ErrorState, Skeleton } from '../../components/ui/States';
import { useFavorites } from '../../context/FavoritesContext';
import { categories } from '../../data/categories';
import { currentUser } from '../../data/user';
import { useAsync } from '../../hooks/use-async';
import { getHomeFeed } from '../../services/experiences';
import { colors, fontFamily, radius, shadows, spacing, typography } from '../../theme';
import { ExperienceCategory } from '../../types/experience';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [selectedCategory, setSelectedCategory] = useState<ExperienceCategory | null>(null);

  const { status, data, refetch } = useAsync(
    () => getHomeFeed({ category: selectedCategory, city: currentUser.city }),
    `home:${selectedCategory ?? 'all'}`
  );

  function handleSelectCategory(id: ExperienceCategory) {
    setSelectedCategory((current) => (current === id ? null : id));
  }

  function handleOpenExperience(id: string) {
    router.push(`/experience/${id}` as never);
  }

  function handleOpenDiscover() {
    router.navigate('/descubra' as never);
  }

  const refetching = status === 'loading' && data !== undefined;

  function renderContent() {
    if (status === 'error' && !data) {
      return (
        <View style={styles.section}>
          <ErrorState what="as experiências" onRetry={refetch} />
        </View>
      );
    }

    return (
      <>
        <View style={styles.section}>
          {data ? (
            <FeaturedCard experience={data.featured} onPress={handleOpenExperience} />
          ) : (
            <Skeleton height={260} borderRadius={radius.lg} />
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[typography.label, styles.sectionTitle]}>Em destaque essa semana</Text>
            <Pressable onPress={handleOpenDiscover} hitSlop={8} accessibilityRole="button">
              <Text style={[typography.label, styles.sectionLink]}>Ver tudo</Text>
            </Pressable>
          </View>

          {!data ? (
            <ScrollView
              horizontal
              scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.cardList}
            >
              {[0, 1, 2].map((i) => (
                <ExperienceCardSkeleton key={i} />
              ))}
            </ScrollView>
          ) : data.highlights.length === 0 ? (
            <Text style={[typography.body, styles.emptyState]}>
              Nenhuma experiência nessa categoria por aqui ainda.
            </Text>
          ) : (
            <FlatList
              data={data.highlights}
              horizontal
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.cardList}
              style={refetching && styles.refetching}
              renderItem={({ item }) => (
                <ExperienceCard
                  experience={item}
                  isFavorite={isFavorite(item.id)}
                  onPress={handleOpenExperience}
                  onToggleFavorite={toggleFavorite}
                />
              )}
            />
          )}
        </View>

        <View style={[styles.section, styles.pertoVoce]}>
          <View style={styles.sectionHeader}>
            <Text style={[typography.label, styles.sectionTitle]}>Perto de você</Text>
            <Pressable onPress={handleOpenDiscover} hitSlop={8} accessibilityRole="button">
              <Text style={[typography.label, styles.sectionLink]}>Ver tudo</Text>
            </Pressable>
          </View>

          <View style={[styles.list, refetching && styles.refetching]}>
            {data
              ? data.nearby.map((item) => (
                  <ExperienceRow
                    key={item.id}
                    experience={item}
                    isFavorite={isFavorite(item.id)}
                    onPress={handleOpenExperience}
                    onToggleFavorite={toggleFavorite}
                  />
                ))
              : [0, 1].map((i) => <ExperienceRowSkeleton key={i} />)}
          </View>
        </View>
      </>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.topBar}>
          <Pressable
            onPress={() => router.push('/menu' as never)}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Abrir menu"
          >
            <Ionicons name="menu-outline" size={26} color={colors.ink} />
          </Pressable>

          <Image
            source={require('../../../assets/images/noma-logo.png')}
            style={styles.logo}
            resizeMode="contain"
            accessibilityLabel="Noma"
          />

          <Pressable
            onPress={() => router.push('/profile' as never)}
            style={styles.avatarButton}
            accessibilityRole="button"
            accessibilityLabel="Abrir perfil"
          >
            <Ionicons name="person" size={18} color={colors.paper} />
          </Pressable>
        </View>

        <View style={styles.header}>
          <Text style={typography.h2}>Bom dia, {currentUser.firstName}.</Text>

          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={15} color={colors.inkSoft} />
            <Text style={[typography.caption, styles.locationText]}>{currentUser.city.replace(', ', ' - ')}</Text>
          </View>
        </View>

        <Pressable
          onPress={handleOpenDiscover}
          accessibilityRole="search"
          accessibilityLabel="Buscar experiências"
          style={({ pressed }) => [styles.searchBar, pressed && styles.pressed]}
        >
          <Ionicons name="search-outline" size={18} color={colors.muted} />
          <Text style={styles.searchPlaceholder} numberOfLines={1}>
            Buscar degustações, jantares, workshops...
          </Text>
        </Pressable>

        <FlatList
          data={categories}
          horizontal
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
          renderItem={({ item }) => (
            <CategoryChip
              category={item}
              selected={selectedCategory === item.id}
              onPress={handleSelectCategory}
            />
          )}
        />

        {renderContent()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.paper },
  scrollContent: { paddingBottom: spacing.xxxl },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  logo: { height: 28, width: 100 },
  avatarButton: {
    width: 38,
    height: 38,
    borderRadius: radius.pill,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  locationRow: { flexDirection: 'row', alignItems: 'center' },
  locationText: { marginLeft: 4 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.field,
    ...shadows.soft,
  },
  searchPlaceholder: {
    flex: 1,
    marginLeft: spacing.xs,
    fontFamily: fontFamily.body,
    fontSize: 13,
    color: colors.muted,
  },
  pressed: { opacity: 0.85 },
  categoryList: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xxs,
  },
  section: { marginTop: spacing.xl, paddingHorizontal: spacing.lg },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  sectionTitle: { textTransform: 'uppercase', letterSpacing: 0.5 },
  sectionLink: {
    color: colors.ink,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    textDecorationLine: 'underline',
  },
  cardList: { paddingRight: spacing.lg },
  emptyState: { paddingVertical: spacing.lg },
  list: { gap: spacing.sm },
  refetching: { opacity: 0.55 },
  pertoVoce: {marginTop: 40}
});
