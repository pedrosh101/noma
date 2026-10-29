import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, radius, shadows, spacing, typography } from '../../theme';
import { goBack } from '../../utils/navigation';

interface ScreenHeaderProps {
  title: string;
  onBack?: () => void;
}


export function ScreenHeader({ title, onBack = goBack }: ScreenHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.row, { paddingTop: insets.top + spacing.xs }]}>
      <Pressable
        onPress={onBack}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel="Voltar"
        style={({ pressed }) => [styles.back, pressed && styles.pressed]}
      >
        <Ionicons name="chevron-back" size={22} color={colors.ink} />
      </Pressable>
      <Text accessibilityRole="header" style={typography.h2}>
        {title}
      </Text>
      <View style={styles.spacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  back: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.soft,
  },
  pressed: { opacity: 0.85 },
  spacer: { width: 40 },
});
