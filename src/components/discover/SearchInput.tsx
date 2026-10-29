import { Ionicons } from '@expo/vector-icons';
import { Platform, Pressable, StyleSheet, TextInput, View } from 'react-native';

import { colors, fontFamily, radius, shadows, spacing } from '../../theme';

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function SearchInput({
  value,
  onChangeText,
  placeholder = 'Buscar degustações, jantares, workshops...',
}: SearchInputProps) {
  return (
    <View style={styles.box}>
      <Ionicons name="search-outline" size={18} color={colors.muted} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        returnKeyType="search"
        autoCorrect={false}
        autoCapitalize="none"
        accessibilityLabel="Buscar experiências"
        style={[styles.input, Platform.OS === 'web' && styles.inputWeb]}
      />
      {value.length > 0 ? (
        <Pressable
          onPress={() => onChangeText('')}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Limpar busca"
        >
          <Ionicons name="close-circle" size={18} color={colors.muted} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.field,
    ...shadows.soft,
  },
  input: {
    flex: 1,
    height: '100%',
    marginLeft: spacing.xs,
    fontFamily: fontFamily.body,
    fontSize: 13,
    color: colors.ink,
  },
  inputWeb: { outlineWidth: 0 },
});
