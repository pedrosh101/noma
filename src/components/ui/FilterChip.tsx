import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, radius, shadows, spacing, typography } from '../../theme';

interface FilterChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export function FilterChip({ label, selected, onPress }: FilterChipProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      style={({ pressed }) => [styles.chip, selected && styles.selected, pressed && styles.pressed]}
    >
      <Text style={[typography.label, selected && styles.labelSelected]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,


    backgroundColor: colors.surface,
    ...shadows.soft,
  },
  selected: { backgroundColor: colors.ink },
  pressed: { opacity: 0.85 },
  labelSelected: { color: colors.paper },
});
