import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useTheme } from "@/context/ThemeContext";

export default function TabLayout() {
  const {theme} = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[theme].tint,
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel:false,
        tabBarStyle: {
          borderWidth:0,
          backgroundColor: Colors[theme].background,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="todos"
        options={{
          title: "Todos",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "list" : "list"} color={color} size={32} />
          ),
        }}
      />
    </Tabs>
  );
}
