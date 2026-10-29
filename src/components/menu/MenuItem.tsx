import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fontFamily, spacing, typography } from '../../theme';
import { IconName } from '../../types/ui';

interface MenuItemProps {
  icon: IconName;
  label: string;
  badge?: number;
  onPress: () => void;
}

export function MenuItem({ icon, label, badge, onPress }: MenuItemProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <Ionicons name={icon} size={22} color={colors.ink} />
      <Text style={[typography.h2, styles.label]}>{label}</Text>
      {badge !== undefined && badge > 0 ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.sm },
  pressed: { opacity: 0.6 },
  label: { flex: 1, marginLeft: spacing.sm },
  badge: {
    minWidth: 24,
    height: 24,
    paddingHorizontal: 7,
    borderRadius: 12,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { fontFamily: fontFamily.bodyMedium, fontSize: 12, lineHeight: 16, color: colors.paper },
});
