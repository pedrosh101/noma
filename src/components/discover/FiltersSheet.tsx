import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

import { priceOptions, sortOptions } from '../../data/filters';
import { colors, spacing, typography } from '../../theme';
import { MaxPrice, SortOption } from '../../types/discover';
import { BottomSheet } from '../ui/BottomSheet';
import { Button } from '../ui/Button';
import { FilterChip } from '../ui/FilterChip';

export interface FiltersValue {
  sort: SortOption;
  maxPrice: MaxPrice;
}

interface FiltersSheetProps {
  visible: boolean;
  value: FiltersValue;
  onApply: (value: FiltersValue) => void;
  onClose: () => void;
}

const DEFAULT_FILTERS: FiltersValue = { sort: 'relevance', maxPrice: null };

export function FiltersSheet({ visible, value, onApply, onClose }: FiltersSheetProps) {
  // Rascunho local: só vira filtro de verdade ao tocar em "Aplicar".
  const [draft, setDraft] = useState<FiltersValue>(value);
  const [wasVisible, setWasVisible] = useState(visible);

  // Ao abrir, o rascunho volta a refletir os filtros atuais.
  if (visible !== wasVisible) {
    setWasVisible(visible);
    if (visible) setDraft(value);
  }

  function handleApply() {
    onApply(draft);
    onClose();
  }

  return (
    <BottomSheet visible={visible} title="Filtros" onClose={onClose}>
      <Text style={[typography.label, styles.sectionTitle]}>Ordenar por</Text>
      <View accessibilityRole="radiogroup">
        {sortOptions.map((option) => {
          const selected = draft.sort === option.value;
          return (
            <Pressable
              key={option.value}
              onPress={() => setDraft((d) => ({ ...d, sort: option.value }))}
              accessibilityRole="radio"
              accessibilityState={{ checked: selected }}
              style={styles.radioRow}
            >
              <View style={[styles.radio, selected && styles.radioSelected]}>
                {selected ? <View style={styles.radioDot} /> : null}
              </View>
              <Text style={typography.bodyMedium}>{option.label}</Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={[typography.label, styles.sectionTitle, styles.sectionSpaced]}>Preço por pessoa</Text>
      <View style={styles.chips}>
        {priceOptions.map((option) => (
          <FilterChip
            key={option.label}
            label={option.label}
            selected={draft.maxPrice === option.value}
            onPress={() => setDraft((d) => ({ ...d, maxPrice: option.value }))}
          />
        ))}
      </View>

      <View style={styles.footer}>
        <View style={styles.footerButton}>
          <Button label="Limpar" variant="outline" fullWidth onPress={() => setDraft(DEFAULT_FILTERS)} />
        </View>
        <View style={styles.footerButton}>
          <Button label="Aplicar" fullWidth onPress={handleApply} />
        </View>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  sectionTitle: { textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: spacing.xs },
  sectionSpaced: { marginTop: spacing.lg },
  radioRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.xs },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colors.outline,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  radioSelected: { backgroundColor: colors.surface },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.ink },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  footer: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.xl },
  footerButton: { flex: 1 },
});
