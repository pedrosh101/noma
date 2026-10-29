import { ViewStyle } from 'react-native';

/**
 * Sombras do Noma. Usam `boxShadow` (suportado em iOS, Android e web) em vez
 * das props shadow* antigas, que geram avisos de depreciação no web.
 */
export const shadows = {
  /** Chips, campo de busca e cards pequenos: elevação quase imperceptível. */
  soft: { boxShadow: '0 2px 8px rgba(59, 61, 40, 0.10)' } satisfies ViewStyle,
} as const;
