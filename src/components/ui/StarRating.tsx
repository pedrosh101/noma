import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';

import { colors, spacing } from '../../theme';
import { Rating } from '../../types/review';

interface StarRatingProps {
  value: number;
  size?: number;
  onChange?: (rating: Rating) => void;
}

const STARS: Rating[] = [1, 2, 3, 4, 5];

export function StarRating({ value, size = 16, onChange }: StarRatingProps) {
  const rounded = Math.round(value);

  return (
    <View
      style={styles.row}
      accessible={!onChange}
      accessibilityLabel={onChange ? undefined : `Nota ${value.toFixed(1)} de 5`}
    >
      {STARS.map((star) => {
        const icon = (
          <Ionicons
            name={star <= rounded ? 'star' : 'star-outline'}
            size={size}
            color={star <= rounded ? colors.gold : colors.muted}
          />
        );

        if (!onChange) {
          return (
            <View key={star} style={styles.star}>
              {icon}
            </View>
          );
        }

        return (
          <Pressable
            key={star}
            onPress={() => onChange(star)}
            hitSlop={4}
            accessibilityRole="button"
            accessibilityLabel={`Dar nota ${star} de 5`}
            accessibilityState={{ selected: star === rounded }}
            style={styles.star}
          >
            {icon}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  star: { marginRight: spacing.xxs },
});
