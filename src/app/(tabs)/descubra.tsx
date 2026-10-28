import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, spacing, typography } from '../../theme';

/**
 * Placeholder — a tela de descoberta/busca (filtros avançados, mapa, busca
 * por texto) é o próximo passo do fluxo descrito no briefing do Noma.
 */
export default function DescubraScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.xl }]}>
      <Text style={typography.h1}>Descubra</Text>
      <Text style={[typography.body, styles.body]}>
        Busca e filtros de experiências entram aqui.
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