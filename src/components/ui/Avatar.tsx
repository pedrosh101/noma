import { StyleSheet, Text, View } from 'react-native';

import { colors, fontFamily } from '../../theme';
import { getInitials } from '../../utils/format';

interface AvatarProps {
  name: string;
  size?: number;
}

export function Avatar({ name, size = 48 }: AvatarProps) {
  return (
    <View
      accessible
      accessibilityLabel={`Foto de ${name}`}
      style={[styles.circle, { width: size, height: size, borderRadius: size / 2 }]}
    >
      <Text style={[styles.initials, { fontSize: size * 0.38 }]}>{getInitials(name)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: { backgroundColor: colors.ink, alignItems: 'center', justifyContent: 'center' },
  initials: { fontFamily: fontFamily.display, color: colors.paper },
});
