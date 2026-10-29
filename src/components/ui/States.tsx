import { Ionicons } from '@expo/vector-icons';
import { ReactNode, useEffect, useState } from 'react';
import {
  AccessibilityInfo,
  Animated,
  DimensionValue,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

import { colors, radius, spacing, typography } from '../../theme';
import { IconName } from '../../types/ui';
import { Button } from './Button';

interface SkeletonProps {
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
}

export function Skeleton({ width = '100%', height = 16, borderRadius = radius.sm, style }: SkeletonProps) {
  const [opacity] = useState(() => new Animated.Value(0.55));

  useEffect(() => {
    let cancelled = false;
    let loop: Animated.CompositeAnimation | undefined;

    AccessibilityInfo.isReduceMotionEnabled().then((reduceMotion) => {
      if (cancelled || reduceMotion) return;
      const useNativeDriver = Platform.OS !== 'web';
      loop = Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, { toValue: 1, duration: 750, useNativeDriver }),
          Animated.timing(opacity, { toValue: 0.55, duration: 750, useNativeDriver }),
        ])
      );
      loop.start();
    });

    return () => {
      cancelled = true;
      loop?.stop();
    };
  }, [opacity]);

  return (
    <Animated.View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[{ width, height, borderRadius, opacity, backgroundColor: colors.line }, style]}
    />
  );
}

interface EmptyStateProps {
  icon?: IconName;
  title: string;
  body: string;
  action?: ReactNode;
}

export function EmptyState({ icon = 'restaurant-outline', title, body, action }: EmptyStateProps) {
  return (
    <View style={styles.empty}>
      <Ionicons name={icon} size={28} color={colors.inkSoft} />
      <Text style={[typography.h2, styles.title]}>{title}</Text>
      <Text style={[typography.body, styles.body]}>{body}</Text>
      {action ? <View style={styles.action}>{action}</View> : null}
    </View>
  );
}

interface ErrorStateProps {
  what: string;
  onRetry: () => void;
}

export function ErrorState({ what, onRetry }: ErrorStateProps) {
  return (
    <View accessibilityRole="alert" style={styles.error}>
      <Text style={typography.h2}>Não conseguimos carregar {what}</Text>
      <Text style={[typography.body, styles.body]}>
        Verifique sua conexão e tente de novo. Nada foi perdido.
      </Text>
      <View style={styles.action}>
        <Button label="Tentar novamente" icon="refresh" onPress={onRetry} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  empty: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.line,
  },
  error: {
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.outline,
    backgroundColor: colors.surface,
  },
  title: { marginTop: spacing.sm, textAlign: 'center' },
  body: { marginTop: spacing.xxs, textAlign: 'center' },
  action: { marginTop: spacing.md },
});
