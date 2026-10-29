import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { ColorValue, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, fontFamily } from "../../theme";
import { IconName } from "../../types/ui";

interface TabIconProps {
  name: IconName;
  color: ColorValue;
  size?: number;
  ring?: boolean;
}

function TabIcon({ name, color, size, ring = false }: TabIconProps) {
  return (
    <View
      style={[styles.iconBox, ring && { borderWidth: 1.5, borderColor: color }]}
    >
      <Ionicons name={name} size={size ?? (ring ? 18 : 22)} color={color} />
    </View>
  );
}

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.paper,
        tabBarInactiveTintColor: "rgba(254, 245, 224, 0.6)",
        tabBarStyle: {
          backgroundColor: colors.ink,
          borderTopWidth: 0,
          height: 74 + insets.bottom,
          paddingTop: 8,
          paddingBottom: insets.bottom + 8,
        },
        tabBarLabelStyle: {
          fontFamily: fontFamily.bodyMedium,
          fontSize: 10,
          lineHeight: 12,
          letterSpacing: 0.4,
          textTransform: "uppercase",
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name={focused ? "home" : "home-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="descubra"
        options={{
          title: "Descubra",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name={focused ? "compass" : "compass-outline"}
              color={color}
              size={28}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="reviews"
        options={{
          title: "Reviews",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name={focused ? "ribbon" : "ribbon-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconBox: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});
