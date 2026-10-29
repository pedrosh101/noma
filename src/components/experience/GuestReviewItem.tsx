import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography, shadows } from '../../theme';
import { ExperienceGuestReview } from '../../types/experience';
import { formatDate } from '../../utils/format';
import { CoverImage } from '../ui/CoverImage';
import { StarRating } from '../ui/StarRating';

export function GuestReviewItem({ review }: { review: ExperienceGuestReview }) {
  return (
    <View style={styles.item}>
      <View style={styles.header}>
        <CoverImage uri={review.avatarUrl} style={styles.avatar} />
        <View style={styles.author}>
          <Text style={typography.bodyMedium}>{review.author}</Text>
          <Text style={typography.caption}>{formatDate(review.date)}</Text>
        </View>
        <StarRating value={review.rating} size={13} />
      </View>
      <Text style={[typography.body, styles.comment]}>{review.comment}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
...shadows.soft,
  },
  header: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 36, height: 36, borderRadius: 18, overflow: 'hidden' },
  author: { flex: 1, marginLeft: spacing.sm },
  comment: { marginTop: spacing.sm },
});
