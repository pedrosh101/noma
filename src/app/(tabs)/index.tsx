import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CategoryChip } from '../../components/home/CategoryChip';
import { ExperienceCard } from '../../components/home/ExperienceCard';
import { FeaturedCard } from '../../components/home/FeaturedCard';
import { categories } from '../../data/categories';
import { featuredExperience, experiences as mockExperiences } from '../../data/experiences';
import { colors, radius, spacing, typography } from '../../theme';
import { Experience, ExperienceCategory } from '../../types/experience';

// TODO: usuário logado — hoje fixo, deve vir de um contexto/sessão quando
// a autenticação existir.
const CURRENT_USER_NAME = 'Ana';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState<ExperienceCategory | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>(mockExperiences);

  const filteredExperiences = useMemo(() => {
    if (!selectedCategory) return experiences;
    return experiences.filter((item) => item.category === selectedCategory);
  }, [experiences, selectedCategory]);

  function handleSelectCategory(id: ExperienceCategory) {
    setSelectedCategory((current) => (current === id ? null : id));
  }

  function handleToggleFavorite(id: string) {
    setExperiences((current) =>
      current.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  }

  function handleOpenExperience(id: string) {
    router.push(`/experience/${id}` as never);
  }

  function handleOpenSearch() {
    router.push('/search' as never);
  }

  function handleOpenMenu() {
    router.push('/menu' as never);
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.topBar}>
          <Pressable
            onPress={handleOpenMenu}
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
          <Text style={typography.h2}>Bom dia, {CURRENT_USER_NAME}.</Text>

          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={15} color={colors.inkSoft} />
            <Text style={[typography.caption, styles.locationText]}>Diamantina - MG</Text>
          </View>
        </View>

        <Pressable onPress={handleOpenSearch} style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color={colors.muted} />
          <Text style={styles.searchPlaceholder}>Buscar degustações, jantares, workshops...</Text>
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

        <View style={styles.section}>
          <FeaturedCard experience={featuredExperience} onPress={handleOpenExperience} />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[typography.label, styles.sectionTitle]}>Em destaque essa semana</Text>
            <Pressable onPress={handleOpenSearch} hitSlop={8}>
              <Text style={[typography.label, styles.sectionLink]}>Ver tudo</Text>
            </Pressable>
          </View>

          <FlatList
            data={filteredExperiences}
            horizontal
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardList}
            ListEmptyComponent={
              <Text style={[typography.body, styles.emptyState]}>
                Nenhuma experiência encontrada nessa categoria por aqui ainda.
              </Text>
            }
            renderItem={({ item }) => (
              <ExperienceCard
                experience={item}
                onPress={handleOpenExperience}
                onToggleFavorite={handleToggleFavorite}
              />
            )}
          />
        </View>

        <View style={[styles.section, styles.lastSection]}>
          <View style={styles.sectionHeader}>
            <Text style={[typography.label, styles.sectionTitle]}>Perto de você</Text>
          </View>

          {experiences.slice(3).map((item) => (
            <View key={item.id} style={styles.listRow}>
              <ExperienceCard
                experience={item}
                onPress={handleOpenExperience}
                onToggleFavorite={handleToggleFavorite}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.paper,
  },
  scrollContent: {
    paddingBottom: spacing.xxxl,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  logo: {
    height: 28,
    width: 100,
  },
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
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 4,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.outline,
  },
  searchPlaceholder: {
    ...typography.body,
    color: colors.muted,
    marginLeft: spacing.xs,
  },
  categoryList: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  section: {
    marginTop: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  lastSection: {
    marginTop: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionLink: {
    color: colors.ink,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    textDecorationLine: 'underline',
  },
  cardList: {
    paddingRight: spacing.lg,
  },
  emptyState: {
    paddingVertical: spacing.lg,
  },
  listRow: {
    marginBottom: spacing.md,
  },
});