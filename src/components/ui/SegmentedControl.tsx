import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, shadows, spacing, typography } from '../../theme';

interface Option<T extends string> {
  value: T;
  label: string;
  count?: number;
}

interface SegmentedControlProps<T extends string> {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
}

export function SegmentedControl<T extends string>({ options, value, onChange }: SegmentedControlProps<T>) {
  return (
    <View accessibilityRole="tablist" style={styles.container}>
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            style={[styles.segment, selected && styles.segmentSelected]}
          >
            <Text style={[typography.label, selected && styles.labelSelected]}>
              {option.label}
              {option.count !== undefined ? ` (${option.count})` : ''}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 3,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    ...shadows.soft
  },
  segment: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
  },
  segmentSelected: { backgroundColor: colors.ink },
  labelSelected: { color: colors.paper },
});
