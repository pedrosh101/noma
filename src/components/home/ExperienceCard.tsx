import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing, typography } from '../../theme';
import { Experience } from '../../types/experience';

interface ExperienceCardProps {
  experience: Experience;
  onPress: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export function ExperienceCard({
  experience,
  onPress,
  onToggleFavorite,
}: ExperienceCardProps) {
  return (
    <Pressable
      onPress={() => onPress(experience.id)}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      accessibilityRole="button"
      accessibilityLabel={experience.title}
    >
      <View style={styles.imageWrapper}>
        <Image source={{ uri: experience.coverImageUrl }} style={styles.image} />
        <Pressable
          onPress={() => onToggleFavorite(experience.id)}
          hitSlop={8}
          style={styles.favoriteButton}
          accessibilityRole="button"
          accessibilityLabel={
            experience.isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'
          }
        >
          <Ionicons
            name={experience.isFavorite ? 'heart' : 'heart-outline'}
            size={18}
            color={experience.isFavorite ? colors.wine : colors.white}
          />
        </Pressable>
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
            R$ {experience.priceFrom}
            <Text style={typography.caption}> / pessoa</Text>
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const CARD_WIDTH = 220;

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    marginRight: spacing.md,
  },
  cardPressed: {
    opacity: 0.9,
  },
  imageWrapper: {
    width: '100%',
    height: 150,
    borderRadius: radius.md,
    overflow: 'hidden',
    backgroundColor: colors.line,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
    width: 30,
    height: 30,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(34, 26, 22, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    marginTop: spacing.xs,
  },
  location: {
    marginTop: 2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});