import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, fontFamily, radius, shadows, spacing } from '../../theme';
import { Category } from '../../types/experience';

interface CategoryChipProps {
  category: Category;
  selected: boolean;
  onPress: (id: Category['id']) => void;
}

export function CategoryChip({ category, selected, onPress }: CategoryChipProps) {
  const contentColor = selected ? colors.paper : colors.ink;

  return (
    <Pressable
      onPress={() => onPress(category.id)}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      style={({ pressed }) => [styles.chip, selected && styles.chipSelected, pressed && styles.pressed]}
    >
      <MaterialCommunityIcons name={category.icon} size={16} color={contentColor} />
      <Text style={[styles.label, { color: contentColor }]}>{category.label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 34,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    marginRight: spacing.xs,
    ...shadows.soft,
  },
  chipSelected: { backgroundColor: colors.ink },
  pressed: { opacity: 0.85 },
  label: {
    marginLeft: 6,
    fontFamily: fontFamily.bodyMedium,
    fontSize: 12,
    lineHeight: 16,
  },
});
