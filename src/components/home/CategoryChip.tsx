import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing, typography } from '../../theme';
import { Category } from '../../types/experience';

interface CategoryChipProps {
  category: Category;
  selected: boolean;
  onPress: (id: Category['id']) => void;
}

export function CategoryChip({ category, selected, onPress }: CategoryChipProps) {
  return (
    <Pressable
      onPress={() => onPress(category.id)}
      style={({ pressed }) => [
        styles.chip,
        selected && styles.chipSelected,
        pressed && styles.chipPressed,
      ]}
      accessibilityRole="button"
      accessibilityState={{ selected }}
    >
      <Ionicons
        name={category.icon as any}
        size={16}
        color={selected ? colors.white : colors.inkSoft}
        style={styles.icon}
      />
      <Text style={[typography.label, selected && styles.labelSelected]}>
        {category.label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    marginRight: spacing.xs,
  },
  chipSelected: {
    backgroundColor: colors.wine,
    borderColor: colors.wine,
  },
  chipPressed: {
    opacity: 0.85,
  },
  icon: {
    marginRight: spacing.xxs,
  },
  labelSelected: {
    color: colors.white,
  },
});