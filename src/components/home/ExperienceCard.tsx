import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '../../theme';
import { Experience } from '../../types/experience';
import { formatCurrency } from '../../utils/format';
import { CoverImage } from '../ui/CoverImage';
import { FavoriteButton } from '../ui/FavoriteButton';
import { Skeleton } from '../ui/States';

interface ExperienceCardProps {
  experience: Experience;
  isFavorite: boolean;
  onPress: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export function ExperienceCard({ experience, isFavorite, onPress, onToggleFavorite }: ExperienceCardProps) {
  return (
    <Pressable
      onPress={() => onPress(experience.id)}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      accessibilityLabel={experience.title}
    >
      <View style={styles.imageWrapper}>
        <CoverImage uri={experience.coverImageUrl} style={styles.image} />
        <FavoriteButton
          isFavorite={isFavorite}
          onPress={() => onToggleFavorite(experience.id)}
          style={styles.favorite}
        />
      </View>

      <View style={styles.info}>
        <Text style={typography.bodyMedium} numberOfLines={2}>
          {experience.title}
        </Text>
        <Text style={[typography.caption, styles.location]} numberOfLines={1}>
          {experience.location} · {experience.city}
        </Text>

        <View style={styles.metaRow}>
          <View style={styles.rating}>
            <Ionicons name="star" size={13} color={colors.gold} />
            <Text style={typography.caption}>
              {' '}
              {experience.rating.toFixed(1)} ({experience.reviewCount})
            </Text>
          </View>
          <Text style={typography.bodyMedium}>
            {formatCurrency(experience.priceFrom)}
            <Text style={typography.caption}> / pessoa</Text>
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

export function ExperienceCardSkeleton() {
  return (
    <View style={styles.card}>
      <Skeleton height={150} borderRadius={radius.md} />
      <View style={styles.info}>
        <Skeleton height={16} />
        <Skeleton width="70%" height={16} style={styles.gap} />
        <Skeleton width="55%" height={12} style={styles.gap} />
      </View>
    </View>
  );
}

const CARD_WIDTH = 220;

const styles = StyleSheet.create({
  card: { width: CARD_WIDTH, marginRight: spacing.md },
  cardPressed: { opacity: 0.9 },
  imageWrapper: {
    width: '100%',
    height: 150,
    borderRadius: radius.md,
    overflow: 'hidden',
    backgroundColor: colors.line,
  },
  image: { width: '100%', height: '100%' },
  favorite: { position: 'absolute', top: spacing.xs, right: spacing.xs },
  info: { marginTop: spacing.xs },
  location: { marginTop: 2 },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  rating: { flexDirection: 'row', alignItems: 'center' },
  gap: { marginTop: spacing.xs },
});
