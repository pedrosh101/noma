import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PendingReviewCard, ReviewCardSkeleton } from '../../components/reviews/PendingReviewCard';
import { ReviewCard } from '../../components/reviews/ReviewCard';
import { ReviewSheet } from '../../components/reviews/ReviewSheet';
import { ReviewsSummary, ReviewsSummarySkeleton } from '../../components/reviews/ReviewsSummary';
import { Button } from '../../components/ui/Button';
import { SegmentedControl } from '../../components/ui/SegmentedControl';
import { EmptyState, ErrorState } from '../../components/ui/States';
import { useAsync } from '../../hooks/use-async';
import { getMyReviews } from '../../services/reviews';
import { colors, spacing, typography } from '../../theme';
import { PendingReview } from '../../types/review';

type Tab = 'pending' | 'published';

export default function ReviewsScreen() {
  const insets = useSafeAreaInsets();
  const { status, data, refetch } = useAsync(getMyReviews, 'my-reviews');

  const [selectedTab, setSelectedTab] = useState<Tab | null>(null);
  const [reviewing, setReviewing] = useState<PendingReview | null>(null);

  // Sem escolha do usuário: abre em "Para avaliar" se houver algo pendente.
  const tab: Tab = selectedTab ?? (data && data.pending.length === 0 ? 'published' : 'pending');

  function handleSubmitted() {
    setReviewing(null);
    setSelectedTab('published');
    refetch();
  }

  function renderList() {
    if (status === 'error' && !data) {
      return <ErrorState what="suas avaliações" onRetry={refetch} />;
    }

    if (!data) {
      return (
        <View style={styles.list}>
          <ReviewCardSkeleton />
          <ReviewCardSkeleton />
        </View>
      );
    }

    const dimmed = status === 'loading' ? styles.refetching : null;

    if (tab === 'pending') {
      if (data.pending.length === 0) {
        return (
          <EmptyState
            icon="checkmark-circle-outline"
            title="Tudo avaliado por aqui"
            body="Quando você viver uma nova experiência, ela aparece aqui para você contar como foi."
            action={
              <Button
                label="Descobrir experiências"
                variant="outline"
                onPress={() => router.navigate('/descubra' as never)}
              />
            }
          />
        );
      }
      return (
        <View style={[styles.list, dimmed]}>
          {data.pending.map((item) => (
            <PendingReviewCard key={item.attendedId} item={item} onReview={setReviewing} />
          ))}
        </View>
      );
    }

    if (data.published.length === 0) {
      return (
        <EmptyState
          icon="star-outline"
          title="Você ainda não avaliou nada"
          body="Suas avaliações ajudam outras pessoas a escolher a próxima experiência."
        />
      );
    }
    return (
      <View style={[styles.list, dimmed]}>
        {data.published.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={typography.display}>Reviews</Text>
        <Text style={[typography.body, styles.subtitle]}>
          Conte como foi e ajude outras pessoas a escolher bem.
        </Text>

        <View style={styles.summary}>
          {data ? <ReviewsSummary summary={data.summary} /> : <ReviewsSummarySkeleton />}
        </View>

        <View style={styles.tabs}>
          <SegmentedControl<Tab>
            value={tab}
            onChange={setSelectedTab}
            options={[
              { value: 'pending', label: 'Para avaliar', count: data?.pending.length },
              { value: 'published', label: 'Publicadas', count: data?.published.length },
            ]}
          />
        </View>

        {renderList()}
      </ScrollView>

      <ReviewSheet pending={reviewing} onClose={() => setReviewing(null)} onSubmitted={handleSubmitted} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.paper },
  scrollContent: {
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  subtitle: { marginTop: spacing.xxs },
  summary: { marginTop: spacing.lg },
  tabs: { marginTop: spacing.lg, marginBottom: spacing.md },
  list: { gap: spacing.sm },
  refetching: { opacity: 0.55 },
});
