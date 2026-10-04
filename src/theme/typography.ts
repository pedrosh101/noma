import { TextStyle } from 'react-native';
import { colors } from './colors';

/**
 * Duas famílias: Fraunces (serifada, para títulos e momentos editoriais)
 * e Inter (para interface e leitura de conteúdo denso).
 *
 * As fontes precisam ser carregadas antes do primeiro render, por exemplo
 * no app/_layout.tsx raiz:
 *
 *   import { useFonts } from 'expo-font';
 *   import { Fraunces_500Medium, Fraunces_600SemiBold } from '@expo-google-fonts/fraunces';
 *   import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';
 */
export const fontFamily = {
  display: 'Fraunces_600SemiBold',
  displayMedium: 'Fraunces_500Medium',
  body: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  bodySemiBold: 'Inter_600SemiBold',
};

type TypeToken = Pick<
  TextStyle,
  'fontFamily' | 'fontSize' | 'lineHeight' | 'letterSpacing' | 'color'
>;

export const typography: Record<string, TypeToken> = {
  display: {
    fontFamily: fontFamily.display,
    fontSize: 32,
    lineHeight: 38,
    letterSpacing: -0.3,
    color: colors.ink,
  },
  h1: {
    fontFamily: fontFamily.displayMedium,
    fontSize: 23,
    lineHeight: 28,
    letterSpacing: -0.2,
    color: colors.ink,
  },
  h2: {
    fontFamily: fontFamily.displayMedium,
    fontSize: 18,
    lineHeight: 23,
    color: colors.ink,
  },
  body: {
    fontFamily: fontFamily.body,
    fontSize: 15,
    lineHeight: 21,
    color: colors.inkSoft,
  },
  bodyMedium: {
    fontFamily: fontFamily.bodyMedium,
    fontSize: 15,
    lineHeight: 21,
    color: colors.ink,
  },
  caption: {
    fontFamily: fontFamily.body,
    fontSize: 13,
    lineHeight: 17,
    color: colors.muted,
  },
  label: {
    fontFamily: fontFamily.bodyMedium,
    fontSize: 13,
    lineHeight: 16,
    color: colors.ink,
  },
};