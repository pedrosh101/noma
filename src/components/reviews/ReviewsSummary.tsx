import { StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing, typography } from "../../theme";
import { ReviewsSummary as ReviewsSummaryData } from "../../types/review";
import { Skeleton } from "../ui/States";

interface StatProps {
  value: string;
  label: string;
}

function Stat({ value, label }: StatProps) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

export function ReviewsSummary({ summary }: { summary: ReviewsSummaryData }) {
  return (
    <View style={styles.card}>
      <View style={styles.stats}>
        <Stat value={String(summary.totalReviews)} label="Avaliações" />
        <View style={styles.divider} />
        <Stat
          value={
            summary.averageRating === null
              ? "—"
              : summary.averageRating.toFixed(1)
          }
          label="Nota média"
        />
        <View style={styles.divider} />
        <Stat
          value={String(summary.attendedCount)}
          label="Experiências vividas"
        />
      </View>
      <Text style={styles.insight}>{summary.insight}</Text>
    </View>
  );
}

export function ReviewsSummarySkeleton() {
  return <Skeleton height={132} borderRadius={radius.lg} />;
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.ink,
  },
  stats: { flexDirection: "row", alignItems: "center" },
  stat: { flex: 1 },
  statValue: {
    ...typography.display,
    color: colors.paper,
    fontSize: 28,
    lineHeight: 34,
  },
  statLabel: {
    ...typography.caption,
    color: "rgba(254, 245, 224, 0.7)",
    marginTop: 2,
  },
  divider: {
    width: 1,
    alignSelf: "stretch",
    marginHorizontal: spacing.sm,
    backgroundColor: "rgba(254, 245, 224, 0.2)",
  },
  insight: {
    ...typography.body,
    color: colors.paper,
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: "rgba(254, 245, 224, 0.2)",
  },
});
