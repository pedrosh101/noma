import { StyleSheet, Text, View } from "react-native";

import { colors, radius, shadows, spacing, typography } from "../../theme";
import { PendingReview } from "../../types/review";
import { formatDate, pluralize } from "../../utils/format";
import { Button } from "../ui/Button";
import { CoverImage } from "../ui/CoverImage";
import { Skeleton } from "../ui/States";

interface PendingReviewCardProps {
  item: PendingReview;
  onReview: (item: PendingReview) => void;
}

export function PendingReviewCard({ item, onReview }: PendingReviewCardProps) {
  const { experience } = item;

  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <CoverImage uri={experience.coverImageUrl} style={styles.image} />
        <View style={styles.info}>
          <Text style={typography.bodyMedium} numberOfLines={2}>
            {experience.title}
          </Text>
          <Text style={typography.caption} numberOfLines={1}>
            {experience.location}
          </Text>
          <Text style={[typography.caption, styles.when]}>
            Vivida em {formatDate(item.attendedAt)} ·{" "}
            {pluralize(item.guests, "pessoa", "pessoas")}
          </Text>
        </View>
      </View>
      <Button
        label="Avaliar experiência"
        icon="star-outline"
        fullWidth
        onPress={() => onReview(item)}
      />
    </View>
  );
}

export function ReviewCardSkeleton() {
  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <Skeleton width={72} height={72} borderRadius={radius.md} />
        <View style={styles.info}>
          <Skeleton height={16} />
          <Skeleton width="50%" height={12} style={styles.gap} />
          <Skeleton width="70%" height={12} style={styles.gap} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    ...shadows.soft,
  },
  top: { flexDirection: "row", marginBottom: spacing.md },
  image: { width: 72, height: 72, borderRadius: radius.md, overflow: "hidden" },
  info: { flex: 1, marginLeft: spacing.sm, justifyContent: "center" },
  when: { marginTop: spacing.xxs },
  gap: { marginTop: spacing.xs },
});
