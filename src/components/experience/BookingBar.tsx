import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, spacing, typography } from '../../theme';
import { formatCurrency } from '../../utils/format';
import { Button } from '../ui/Button';

interface BookingBarProps {
  priceFrom: number;
  onReserve: () => void;
}

export function BookingBar({ priceFrom, onReserve }: BookingBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bar, { paddingBottom: insets.bottom + spacing.sm }]}>
      <View>
        <Text style={typography.caption}>a partir de</Text>
        <Text style={typography.h2}>
          {formatCurrency(priceFrom)}
          <Text style={typography.caption}> / pessoa</Text>
        </Text>
      </View>
      <Button label="Reservar" icon="calendar-outline" onPress={onReserve} />
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.sm,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.paper,
    borderTopWidth: 1,
    borderTopColor: colors.line,
  },
});
