
export const colors = {
  clr1: '#245444',
  ink: '#221A16',
  inkSoft: '#4A3F38',
  paper: '#F5EFE4',
  surface: '#FFFFFF',
  surfaceMuted: '#FBF6EC',
  line: '#E4DCCB',
  wine: '#6E1E2E',
  wineDark: '#4A1420',
  olive: '#5F6B45',
  gold: '#B4894F',
  muted: '#8C8178',
  white: '#FFFFFF',
} as const;

export type ColorToken = keyof typeof colors;