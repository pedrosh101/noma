import { TextStyle } from 'react-native';
import { colors } from './colors';

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
    fontSize: 11,
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