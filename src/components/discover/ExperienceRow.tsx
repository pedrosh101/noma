import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { getCategoryLabel } from "../../data/categories";
import { colors, radius, spacing, typography, shadows } from "../../theme";
import { Experience } from "../../types/experience";
import { formatCurrency, formatDuration } from "../../utils/format";
import { CoverImage } from "../ui/CoverImage";
import { FavoriteButton } from "../ui/FavoriteButton";
import { Skeleton } from "../ui/States";

interface ExperienceRowProps {
  experience: Experience;
  isFavorite: boolean;
  onPress: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export function ExperienceRow({
  experience,
  isFavorite,
  onPress,
  onToggleFavorite,
}: ExperienceRowProps) {
  return (
    <Pressable
      onPress={() => onPress(experience.id)}
      accessibilityLabel={experience.title}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <View style={styles.imageWrapper}>
        <CoverImage uri={experience.coverImageUrl} style={styles.image} />
        <FavoriteButton
          isFavorite={isFavorite}
          size={28}
          onPress={() => onToggleFavorite(experience.id)}
          style={styles.favorite}
        />
      </View>

      <View style={styles.info}>
        <Text style={[typography.caption, styles.category]} numberOfLines={1}>
          {getCategoryLabel(experience.category)}
        </Text>
        <Text style={typography.bodyMedium} numberOfLines={2}>
          {experience.title}
        </Text>
        <Text style={typography.caption} numberOfLines={1}>
          {experience.location} · {experience.city}
        </Text>

        <View style={styles.metaRow}>
          <View style={styles.rating}>
            <Ionicons name="star" size={13} color={colors.gold} />
            <Text style={typography.caption}>
              {" "}
              {experience.rating.toFixed(1)} ({experience.reviewCount}) ·{" "}
              {formatDuration(experience.durationMinutes)}
            </Text>
          </View>
        </View>
        <Text style={typography.bodyMedium}>
          {formatCurrency(experience.priceFrom)}
          <Text style={typography.caption}> / pessoa</Text>
        </Text>
      </View>
    </Pressable>
  );
}

export function ExperienceRowSkeleton() {
  return (
    <View style={styles.row}>
      <Skeleton width={104} height={132} borderRadius={radius.md} />
      <View style={styles.info}>
        <Skeleton width={70} height={12} />
        <Skeleton height={16} style={styles.skeletonGap} />
        <Skeleton width="60%" height={16} style={styles.skeletonGap} />
        <Skeleton width="45%" height={12} style={styles.skeletonGap} />
        <Skeleton width={80} height={16} style={styles.skeletonGap} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    ...shadows.soft,
  },
  pressed: { opacity: 0.9 },
  imageWrapper: {
    width: 132,
    height: 132,
    padding: spacing.xs,
    borderRadius: radius.lg,
    overflow: "hidden",
    backgroundColor: colors.white,
  },
  image: { width: "100%", height: "100%",borderRadius: radius.lg, },
  favorite: { position: "absolute", top: spacing.sm, right: spacing.sm },
  info: {
    flex: 1,
    marginLeft: spacing.sm,
    paddingVertical: spacing.xs,
    paddingRight: spacing.xs,
  },
  category: {
    textTransform: "uppercase",
    letterSpacing: 0.5,
    color: colors.inkSoft,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.xxs,
    marginBottom: spacing.xxs,
  },
  rating: { flexDirection: "row", alignItems: "center" },
  skeletonGap: { marginTop: spacing.xs },
});
