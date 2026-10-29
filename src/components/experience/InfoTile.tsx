import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, shadows, spacing, typography } from '../../theme';
import { IconName } from '../../types/ui';

interface InfoTileProps {
  icon: IconName;
  label: string;
  value: string;
}

export function InfoTile({ icon, label, value }: InfoTileProps) {
  return (
    <View style={styles.tile} accessible accessibilityLabel={`${label}: ${value}`}>
      <Ionicons name={icon} size={20} color={colors.ink} />
      <Text style={[typography.bodyMedium, styles.value]} numberOfLines={2}>
        {value}
      </Text>
      <Text style={typography.caption}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    padding: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    ...shadows.soft,
  },
  value: { marginTop: spacing.xs, fontSize: 14, lineHeight: 18 },
});
