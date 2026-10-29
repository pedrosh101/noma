import type { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';

export type IconName = ComponentProps<typeof Ionicons>['name'];
export type CategoryIconName = ComponentProps<typeof MaterialCommunityIcons>['name'];
