import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fontFamily, radius, shadows, spacing, typography } from '../../theme';
import { BookingWithExperience } from '../../types/booking';
import { formatCurrency, formatTime, formatWeekdayDate, pluralize } from '../../utils/format';
import { CoverImage } from '../ui/CoverImage';
import { Skeleton } from '../ui/States';

interface BookingCardProps {
  booking: BookingWithExperience;
  onPress: (experienceId: string) => void;
}

export function BookingCard({ booking, onPress }: BookingCardProps) {
  const { experience } = booking;

  return (
    <Pressable
      onPress={() => onPress(experience.id)}
      accessibilityLabel={`Reserva: ${experience.title}`}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <CoverImage uri={experience.coverImageUrl} style={styles.image} />
      <View style={styles.info}>
        <View style={styles.status}>
          <Ionicons
            name={booking.status === 'confirmed' ? 'checkmark-circle' : 'time'}
            size={12}
            color={colors.paper}
          />
          <Text style={styles.statusText}>
            {booking.status === 'confirmed' ? 'Confirmada' : 'Aguardando'}
          </Text>
        </View>
        <Text style={[typography.bodyMedium, styles.title]} numberOfLines={2}>
          {experience.title}
        </Text>
        <Text style={typography.caption}>
          {formatWeekdayDate(booking.date)} · {formatTime(booking.time)}
        </Text>
        <Text style={typography.caption}>
          {pluralize(booking.guests, 'pessoa', 'pessoas')} · {formatCurrency(booking.total)}
        </Text>
      </View>
    </Pressable>
  );
}

export function BookingCardSkeleton() {
  return (
    <View style={styles.card}>
      <Skeleton width={84} height={104} borderRadius={radius.md} />
      <View style={styles.info}>
        <Skeleton width={80} height={16} borderRadius={radius.pill} />
        <Skeleton height={16} style={styles.gap} />
        <Skeleton width="55%" height={12} style={styles.gap} />
        <Skeleton width="40%" height={12} style={styles.gap} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: spacing.xs,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    ...shadows.soft
  },
  pressed: { opacity: 0.9 },
  image: { width: 84, height: 104, borderRadius: radius.md, overflow: 'hidden' },
  info: { flex: 1, marginLeft: spacing.sm, paddingVertical: spacing.xxs, justifyContent: 'center' },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 2,
    paddingHorizontal: spacing.xs,
    borderRadius: radius.pill,
    backgroundColor: colors.ink,
  },
  statusText: { marginLeft: 4, fontFamily: fontFamily.bodyMedium, fontSize: 11, lineHeight: 14, color: colors.paper },
  title: { marginTop: spacing.xs, marginBottom: 2 },
  gap: { marginTop: spacing.xs },
});
