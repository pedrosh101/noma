import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BookingBar } from '../../components/experience/BookingBar';
import { GuestReviewItem } from '../../components/experience/GuestReviewItem';
import { InfoTile } from '../../components/experience/InfoTile';
import { Button } from '../../components/ui/Button';
import { CoverImage } from '../../components/ui/CoverImage';
import { FavoriteButton } from '../../components/ui/FavoriteButton';
import { StarRating } from '../../components/ui/StarRating';
import { EmptyState, ErrorState, Skeleton } from '../../components/ui/States';
import { useFavorites } from '../../context/FavoritesContext';
import { getCategoryLabel } from '../../data/categories';
import { experiences } from '../../data/experiences';
import { useAsync } from '../../hooks/use-async';
import { getExperienceById } from '../../services/experiences';
import { colors, radius, spacing, typography } from '../../theme';
import { formatDuration, pluralize } from '../../utils/format';
import { goBack } from '../../utils/navigation';

const HERO_HEIGHT = 320;

/**
 * Gera uma página estática para cada experiência no `expo export`.
 * Sem isso, abrir /experience/exp-01 direto (link compartilhado, F5) daria 404 no Netlify.
 */
export async function generateStaticParams(): Promise<{ id: string }[]> {
  return experiences.map((experience) => ({ id: experience.id }));
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={[typography.label, styles.sectionTitle]}>{title}</Text>
      {children}
    </View>
  );
}

export default function ExperienceDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { status, data, refetch } = useAsync(() => getExperienceById(id), `experience:${id}`);

  const notFound = status === 'success' && data === null;
  const loadFailed = status === 'error' && !data;

  function handleReserve() {
    // TODO: próximo passo do fluxo — escolha de data/horário e número de pessoas.
  }

  function renderBody() {
    if (loadFailed) {
      return <ErrorState what="esta experiência" onRetry={refetch} />;
    }

    if (notFound) {
      return (
        <EmptyState
          icon="compass-outline"
          title="Experiência não encontrada"
          body="Ela pode ter sido removida ou o link está incorreto."
          action={<Button label="Voltar ao início" onPress={() => router.replace('/')} />}
        />
      );
    }

    if (!data) {
      return (
        <View>
          <Skeleton width={90} height={12} />
          <Skeleton height={28} style={styles.gap} />
          <Skeleton width="65%" height={28} style={styles.gap} />
          <Skeleton width="50%" height={14} style={styles.gap} />
          <View style={styles.tiles}>
            <Skeleton height={92} borderRadius={radius.md} style={styles.flex} />
            <Skeleton height={92} borderRadius={radius.md} style={styles.flex} />
            <Skeleton height={92} borderRadius={radius.md} style={styles.flex} />
          </View>
          <Skeleton height={14} style={styles.gap} />
          <Skeleton height={14} style={styles.gap} />
          <Skeleton width="80%" height={14} style={styles.gap} />
        </View>
      );
    }

    return (
      <View>
        <Text style={[typography.caption, styles.category]}>{getCategoryLabel(data.category)}</Text>
        <Text style={[typography.display, styles.title]}>{data.title}</Text>

        <View style={styles.ratingRow}>
          <StarRating value={data.rating} size={14} />
          <Text style={[typography.caption, styles.ratingText]}>
            {data.rating.toFixed(1)} · {pluralize(data.reviewCount, 'avaliação', 'avaliações')}
          </Text>
        </View>
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={15} color={colors.inkSoft} />
          <Text style={[typography.caption, styles.locationText]}>
            {data.location} · {data.city}
          </Text>
        </View>

        <View style={styles.tiles}>
          <InfoTile icon="time-outline" label="Duração" value={formatDuration(data.durationMinutes)} />
          <InfoTile icon="people-outline" label="Grupo" value={`até ${data.maxGuests} pessoas`} />
          <InfoTile icon="calendar-outline" label="Quando" value={data.schedule} />
        </View>

        <View style={styles.hostCard}>
          <CoverImage uri={data.host.avatarUrl} style={styles.hostAvatar} />
          <View style={styles.hostInfo}>
            <Text style={typography.caption}>Seu anfitrião</Text>
            <Text style={typography.bodyMedium}>{data.host.name}</Text>
          </View>
        </View>

        <Section title="Sobre a experiência">
          <Text style={typography.body}>{data.description}</Text>
        </Section>

        <Section title="O que está incluso">
          {data.included.map((item) => (
            <View key={item} style={styles.includedRow}>
              <Ionicons name="checkmark-circle-outline" size={20} color={colors.ink} />
              <Text style={[typography.body, styles.includedText]}>{item}</Text>
            </View>
          ))}
        </Section>

        <Section title="Ponto de encontro">
          <View style={styles.includedRow}>
            <Ionicons name="navigate-outline" size={20} color={colors.ink} />
            <Text style={[typography.body, styles.includedText]}>{data.meetingPoint}</Text>
          </View>
        </Section>

        <Section title="Avaliações recentes">
          <View style={styles.reviewList}>
            {data.guestReviews.map((review) => (
              <GuestReviewItem key={review.id} review={review} />
            ))}
          </View>
        </Section>

        <Section title="Bom saber">
          <View style={styles.includedRow}>
            <Ionicons name="shield-checkmark-outline" size={20} color={colors.ink} />
            <Text style={[typography.body, styles.includedText]}>
              Cancelamento gratuito até 48 horas antes da experiência.
            </Text>
          </View>
        </Section>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110 + insets.bottom }}
      >
        <View style={styles.hero}>
          {data ? (
            <CoverImage uri={data.coverImageUrl} style={styles.heroImage} />
          ) : (
            <Skeleton height={HERO_HEIGHT} borderRadius={0} />
          )}
        </View>
        <View style={styles.content}>{renderBody()}</View>
      </ScrollView>

      <View style={[styles.topButtons, { top: insets.top + spacing.xs }]}>
        <Pressable
          onPress={goBack}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Voltar"
          style={styles.roundButton}
        >
          <Ionicons name="chevron-back" size={22} color={colors.white} />
        </Pressable>

        {data ? (
          <FavoriteButton
            size={40}
            isFavorite={isFavorite(data.id)}
            onPress={() => toggleFavorite(data.id)}
          />
        ) : null}
      </View>

      {data ? <BookingBar priceFrom={data.priceFrom} onReserve={handleReserve} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.paper },
  hero: { height: HERO_HEIGHT, backgroundColor: colors.line },
  heroImage: { width: '100%', height: HERO_HEIGHT },
  topButtons: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(59, 61, 40, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    marginTop: -spacing.xl,
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.lg,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    backgroundColor: colors.paper,
  },
  category: { textTransform: 'uppercase', letterSpacing: 0.5, color: colors.inkSoft },
  title: { marginTop: spacing.xxs, fontSize: 28, lineHeight: 34 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.sm },
  ratingText: { marginLeft: spacing.xs },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.xxs },
  locationText: { marginLeft: spacing.xxs },
  tiles: { flexDirection: 'row', gap: spacing.xs, marginTop: spacing.lg },
  hostCard: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.lg },
  hostAvatar: { width: 48, height: 48, borderRadius: 24, overflow: 'hidden' },
  hostInfo: { marginLeft: spacing.sm },
  section: { marginTop: spacing.xl },
  sectionTitle: { textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: spacing.sm },
  includedRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: spacing.xs },
  includedText: { flex: 1, marginLeft: spacing.xs },
  reviewList: { gap: spacing.sm },
  gap: { marginTop: spacing.sm },
  flex: { flex: 1 },
});
