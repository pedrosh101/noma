import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { colors, radius } from '../../theme';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onPress: () => void;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

export function FavoriteButton({ isFavorite, onPress, size = 30, style }: FavoriteButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      accessibilityState={{ selected: isFavorite }}
      style={[
        styles.button,
        { width: size, height: size },
        isFavorite ? styles.active : styles.inactive,
        style,
      ]}
    >
      <Ionicons
        name={isFavorite ? 'heart' : 'heart-outline'}
        size={Math.round(size * 0.55)}
        color={isFavorite ? colors.ink : colors.white}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center' },
  inactive: { backgroundColor: 'rgba(59, 61, 40, 0.5)' },
  active: { backgroundColor: colors.paper },
});
