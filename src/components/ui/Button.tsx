import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, fontFamily, radius, spacing } from '../../theme';
import { IconName } from '../../types/ui';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'outline';
  icon?: IconName;
  disabled?: boolean;
  fullWidth?: boolean;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  icon,
  disabled = false,
  fullWidth = false,
}: ButtonProps) {
  const isPrimary = variant === 'primary';
  const contentColor = isPrimary ? colors.paper : colors.ink;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        styles.base,
        isPrimary ? styles.primary : styles.outline,
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        pressed && styles.pressed,
      ]}
    >
      {icon ? <Ionicons name={icon} size={16} color={contentColor} style={styles.icon} /> : null}
      <Text style={[styles.label, { color: contentColor }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    borderWidth: 1,
  },
  primary: { backgroundColor: colors.ink, borderColor: colors.ink },
  outline: { backgroundColor: 'transparent', borderColor: colors.outline },
  fullWidth: { alignSelf: 'stretch' },
  disabled: { opacity: 0.4 },
  pressed: { opacity: 0.85 },
  icon: { marginRight: spacing.xs },
  label: { fontFamily: fontFamily.bodySemiBold, fontSize: 14, lineHeight: 18 },
});
