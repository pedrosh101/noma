import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { AccountRow } from "../components/profile/AccountRow";
import {
  BookingCard,
  BookingCardSkeleton,
} from "../components/profile/BookingCard";
import { Avatar } from "../components/ui/Avatar";
import { Button } from "../components/ui/Button";
import { EmptyState, ErrorState, Skeleton } from "../components/ui/States";
import { ScreenHeader } from "../components/ui/ScreenHeader";
import { useFavorites } from "../context/FavoritesContext";
import { currentUser } from "../data/user";
import { useAsync } from "../hooks/use-async";
import { getProfile } from "../services/profile";
import { colors, radius, shadows, spacing, typography } from "../theme";
import { ProfileStats } from "../types/profile";
import { formatMonthYear } from "../utils/format";

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={[typography.caption, styles.statLabel]}>{label}</Text>
    </View>
  );
}

function StatsStrip({ stats }: { stats: ProfileStats }) {
  return (
    <View style={styles.statsCard}>
      <Stat value={stats.upcoming} label="Próximas reservas" />
      <View style={styles.divider} />
      <Stat value={stats.attended} label="Experiências vividas" />
      <View style={styles.divider} />
      <Stat value={stats.reviews} label="Avaliações" />
    </View>
  );
}

export default function ProfileScreen() {
  const { favoriteCount } = useFavorites();
  const { status, data, refetch } = useAsync(getProfile, "profile");

  function renderBookings() {
    if (status === "error" && !data) {
      return <ErrorState what="suas reservas" onRetry={refetch} />;
    }
    if (!data) {
      return (
        <View style={styles.list}>
          <BookingCardSkeleton />
          <BookingCardSkeleton />
        </View>
      );
    }
    if (data.upcomingBookings.length === 0) {
      return (
        <EmptyState
          icon="calendar-outline"
          title="Nenhuma reserva por enquanto"
          body="Quando você reservar uma experiência, ela aparece aqui com data e horário."
          action={
            <Button
              label="Descobrir experiências"
              variant="outline"
              onPress={() => router.dismissTo("/descubra" as never)}
            />
          }
        />
      );
    }
    return (
      <View style={styles.list}>
        {data.upcomingBookings.map((booking) => (
          <BookingCard
            key={booking.id}
            booking={booking}
            onPress={(id) => router.push(`/experience/${id}` as never)}
          />
        ))}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScreenHeader title="Perfil" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.identity}>
          <Avatar name={currentUser.name} size={80} />
          <Text style={[typography.display, styles.name]}>
            {currentUser.name}
          </Text>
          <Text style={typography.caption}>{currentUser.email}</Text>
          <View style={styles.metaRow}>
            <Ionicons
              name="location-outline"
              size={14}
              color={colors.inkSoft}
            />
            <Text style={[typography.caption, styles.metaText]}>
              {currentUser.city.replace(", ", " - ")} · no Noma desde{" "}
              {formatMonthYear(currentUser.memberSince)}
            </Text>
          </View>
        </View>

        {data ? (
          <StatsStrip stats={data.stats} />
        ) : (
          <Skeleton height={84} borderRadius={radius.lg} />
        )}

        <Text style={[typography.label, styles.sectionTitle]}>
          Próximas reservas
        </Text>
        {renderBookings()}

        <Text style={[typography.label, styles.sectionTitle]}>Sua conta</Text>
        <View style={styles.accountCard}>
          <AccountRow
            icon="heart-outline"
            label="Favoritos"
            value={String(favoriteCount)}
            onPress={() => router.push("/favoritos" as never)}
          />
          <AccountRow
            icon="ribbon-outline"
            label="Minhas avaliações"
            value={data ? String(data.stats.reviews) : undefined}
            onPress={() => router.dismissTo("/reviews" as never)}
            last
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.paper },
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxxl,
  },
  identity: { alignItems: "center", marginBottom: spacing.xl },
  name: { marginTop: spacing.sm, fontSize: 26, lineHeight: 32 },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.xxs,
  },
  metaText: { marginLeft: 4 },
  statsCard: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    ...shadows.soft,
  },
  stat: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.xxs,
  },
  statValue: {
    ...typography.h1,
    textAlign: "center",
    marginBottom: 2,
  },
  statLabel: {
    textAlign: "center",
  },
  divider: { width: 1, alignSelf: "stretch", backgroundColor: colors.line },
  sectionTitle: {
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
  },
  list: { gap: spacing.sm },
  accountCard: {
    paddingHorizontal: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    ...shadows.soft,
  },
});
