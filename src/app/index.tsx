import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CategoryChip } from "../../src/components/home/CategoryChip";
import { ExperienceCard } from "../../src/components/home/ExperienceCard";
import { FeaturedCard } from "../../src/components/home/FeaturedCard";
import { categories } from "../../src/data/categories";
import {
  featuredExperience,
  experiences as mockExperiences,
} from "../../src/data/experiences";
import { colors, radius, spacing, typography } from "../../src/theme/";
import { Experience, ExperienceCategory } from "../types/experience";
import { Ionicons } from "@expo/vector-icons";

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
    router.push("/search" as never);
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <View>
            <Text style={typography.caption}>Bom dia</Text>
            <View style={styles.locationRow}>
              <Ionicons name="location-outline" size={16} color={colors.clr1} />
              <Text style={[typography.h2, styles.locationText]}>
                Diamantina, MG
              </Text>
            </View>
          </View>

          <Pressable
            onPress={() => router.push("/profile" as never)}
            style={styles.avatarButton}
            accessibilityRole="button"
            accessibilityLabel="Abrir perfil"
          >
            <Ionicons name="person-outline" size={20} color={colors.clr1} />
          </Pressable>
        </View>

        <Text style={[typography.display, styles.headline]}>
          Descubra experiências à mesa
        </Text>

        <Pressable onPress={handleOpenSearch} style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color={colors.muted} />
          <Text style={styles.searchPlaceholder}>
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

        <View style={styles.section}>
          <FeaturedCard
            experience={featuredExperience}
            onPress={handleOpenExperience}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={typography.h2}>Em destaque esta semana</Text>
            <Pressable onPress={handleOpenSearch}>
              <Text style={[typography.caption, styles.sectionLink]}>
                Ver todas
              </Text>
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
            <Text style={typography.h2}>Perto de você</Text>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  locationText: {
    marginLeft: 4,
  },
  avatarButton: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: "center",
    justifyContent: "center",
  },
  headline: {
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
  },
  searchPlaceholder: {
    ...typography.body,
    color: colors.muted,
    marginLeft: spacing.xs,
  },
  categoryList: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  section: {
    marginTop: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  lastSection: {
    marginTop: spacing.xl,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  sectionLink: {
    color: colors.wine,
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
