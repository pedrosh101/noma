import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Image, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { colors } from '../../theme';

interface CoverImageProps {
  uri: string;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

export function CoverImage({ uri, style, accessibilityLabel }: CoverImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !uri) {
    return (
      <View style={[styles.fallback, style]}>
        <Ionicons name="restaurant-outline" size={24} color={colors.muted} />
      </View>
    );
  }

  return (
    <Image
      source={{ uri }}
      style={style as never}
      onError={() => setFailed(true)}
      accessibilityLabel={accessibilityLabel}
    />
  );
}

const styles = StyleSheet.create({
  fallback: {
    backgroundColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
