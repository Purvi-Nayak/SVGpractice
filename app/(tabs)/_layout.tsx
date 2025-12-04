import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "rgba(255, 255, 255, 0.6)",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: "rgba(113, 128, 193, 0.95)",
          borderTopColor: "rgba(255, 255, 255, 0.1)",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 90,
          paddingBottom: 25,
          paddingTop: 10,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -5,
          },
          shadowOpacity: 0.3,
          shadowRadius: 10,
          elevation: 15,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: 5,
        },
        tabBarIconStyle: {
          marginBottom: -5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={focused ? 32 : 28}
              name="house.fill"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          title: "Analytics",
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={focused ? 32 : 28}
              name="chart.bar.fill"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: "Wallet",
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={focused ? 32 : 28}
              name="creditcard.fill"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={focused ? 32 : 28}
              name="person.fill"
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
