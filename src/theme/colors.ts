export const colors = {
  ink: '#3B3D28',
  inkSoft: '#5B5D45',
  paper: '#FEF5E0',
  surface: '#FFFFFF',
  surfaceMuted: '#FBF1DC',
  outline: '#3B3D28',
  line: '#E7DCC0',
  gold: '#C2883C',
  muted: '#8C8778',
  white: '#FFFFFF',
} as const;

export type ColorToken = keyof typeof colors;