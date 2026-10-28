import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, fontFamily } from '../../theme';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.paper,
        tabBarInactiveTintColor: 'rgba(254, 245, 224, 0.55)',
        tabBarStyle: {
          backgroundColor: colors.ink,
          borderTopWidth: 0,
          height: 64 + insets.bottom,
          paddingTop: 10,
          paddingBottom: insets.bottom + 8,
        },
        tabBarLabelStyle: {
          fontFamily: fontFamily.bodyMedium,
          fontSize: 10,
          letterSpacing: 0.4,
          textTransform: 'uppercase',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="descubra"
        options={{
          title: 'Descubra',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.discoverBadge, focused && styles.discoverBadgeActive]}>
              <Ionicons name={focused ? 'compass' : 'compass-outline'} size={20} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="reviews"
        options={{
          title: 'Reviews',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'ribbon' : 'ribbon-outline'} size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  // A aba central recebe um contorno circular fixo, como destaque visual
  // permanente — não apenas no estado ativo — para reforçar que "Descubra"
  // é a ação primária de exploração do app.
  discoverBadge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1.5,
    borderColor: 'rgba(254, 245, 224, 0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  discoverBadgeActive: {
    borderColor: colors.paper,
  },
});