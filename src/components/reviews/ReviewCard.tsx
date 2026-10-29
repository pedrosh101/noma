import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, shadows, spacing, typography } from '../../theme';
import { PublishedReview } from '../../types/review';
import { formatDate } from '../../utils/format';
import { CoverImage } from '../ui/CoverImage';
import { StarRating } from '../ui/StarRating';

export function ReviewCard({ review }: { review: PublishedReview }) {
  const { experience } = review;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <CoverImage uri={experience.coverImageUrl} style={styles.image} />
        <View style={styles.info}>
          <Text style={typography.bodyMedium} numberOfLines={2}>
            {experience.title}
          </Text>
          <Text style={typography.caption} numberOfLines={1}>
            {experience.location} · {experience.city}
          </Text>
        </View>
      </View>

      <View style={styles.ratingRow}>
        <StarRating value={review.rating} size={16} />
        <Text style={typography.caption}>{formatDate(review.createdAt)}</Text>
      </View>

      {review.comment ? <Text style={[typography.body, styles.comment]}>{review.comment}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    ...shadows.soft
  },
  header: { flexDirection: 'row', alignItems: 'center' },
  image: { width: 48, height: 48, borderRadius: radius.sm, overflow: 'hidden' },
  info: { flex: 1, marginLeft: spacing.sm },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  comment: { marginTop: spacing.xs },
});
