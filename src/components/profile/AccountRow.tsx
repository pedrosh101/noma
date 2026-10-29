import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '../../theme';
import { IconName } from '../../types/ui';

interface AccountRowProps {
  icon: IconName;
  label: string;
  value?: string;
  onPress: () => void;
  last?: boolean;
}

export function AccountRow({ icon, label, value, onPress, last = false }: AccountRowProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.row, !last && styles.divider, pressed && styles.pressed]}
    >
      <Ionicons name={icon} size={20} color={colors.ink} />
      <Text style={[typography.bodyMedium, styles.label]}>{label}</Text>
      {value ? <Text style={typography.caption}>{value}</Text> : null}
      <View style={styles.chevron}>
        <Ionicons name="chevron-forward" size={18} color={colors.muted} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.md },
  divider: { borderBottomWidth: 1, borderBottomColor: colors.line },
  pressed: { opacity: 0.7 },
  label: { flex: 1, marginLeft: spacing.sm },
  chevron: { marginLeft: spacing.xs },
});
