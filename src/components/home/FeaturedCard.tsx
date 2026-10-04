import { LinearGradient } from "expo-linear-gradient";
import {
    ImageBackground,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { colors, radius, spacing, typography } from "../../theme/index";
import { Experience } from "../../types/experience";

interface FeaturedCardProps {
  experience: Experience;
  onPress: (id: string) => void;
}

export function FeaturedCard({ experience, onPress }: FeaturedCardProps) {
  return (
    <Pressable
      onPress={() => onPress(experience.id)}
      style={({ pressed }) => [styles.wrapper, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={`Experiência em destaque: ${experience.title}`}
    >
      <ImageBackground
        source={{ uri: experience.coverImageUrl }}
        style={styles.image}
        imageStyle={styles.imageRadius}
      >
        <LinearGradient
          colors={["rgba(34,26,22,0)", "rgba(34,26,22,0.85)"]}
          style={styles.gradient}
        >
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Curadoria da semana</Text>
          </View>

          <Text style={styles.title}>{experience.title}</Text>

          <View style={styles.footerRow}>
            <View style={styles.rating}>
              <Text style={styles.star}>★</Text>
              <Text style={styles.footerText}>
                {" "}
                {experience.rating.toFixed(1)} · {experience.location}
              </Text>
            </View>
            <Text style={styles.price}>
              a partir de R$ {experience.priceFrom}
            </Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: radius.lg,
    shadowColor: colors.ink,
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  pressed: {
    opacity: 0.95,
  },
  image: {
    width: "100%",
    height: 260,
    justifyContent: "flex-end",
  },
  imageRadius: {
    borderRadius: radius.lg,
  },
  gradient: {
    padding: spacing.lg,
    borderBottomLeftRadius: radius.lg,
    borderBottomRightRadius: radius.lg,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(245, 239, 228, 0.92)",
    paddingVertical: 4,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.pill,
    marginBottom: spacing.sm,
  },
  badgeText: {
    ...typography.label,
    color: colors.wine,
  },
  title: {
    ...typography.h1,
    color: colors.white,
    marginBottom: spacing.sm,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  star: {
    fontSize: 14,
    color: colors.gold,
  },
  footerText: {
    ...typography.caption,
    color: colors.white,
  },
  price: {
    ...typography.bodyMedium,
    color: colors.white,
  },
});
