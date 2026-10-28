import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, spacing, typography } from '../../theme';

/**
 * Placeholder — avaliações feitas pelo usuário sobre experiências já vividas.
 */
export default function ReviewsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.xl }]}>
      <Text style={typography.h1}>Reviews</Text>
      <Text style={[typography.body, styles.body]}>
        Suas avaliações de experiências vão aparecer aqui.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.paper,
    paddingHorizontal: spacing.lg,
  },
  body: {
    marginTop: spacing.xs,
  },
});