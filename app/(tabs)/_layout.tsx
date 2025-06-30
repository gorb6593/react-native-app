import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

/**
 * 탭 네비게이션 레이아웃
 * 하단에 Home, Explore, More 탭을 제공
 */
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      {/* 홈 탭 - 글 목록 */}
      <Tabs.Screen
        name="home"
        options={{
          title: '홈',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      {/* 글쓰기 탭 */}
      <Tabs.Screen
        name="write"
        options={{
          title: '글쓰기',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
      {/* 채팅 탭 */}
      <Tabs.Screen
        name="chat"
        options={{
          title: '채팅',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="message.fill" color={color} />,
        }}
      />
      {/* 설정 탭 */}
      <Tabs.Screen
        name="settings"
        options={{
          title: '설정',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="ellipsis.circle.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{ href: null }}
      />
    </Tabs>
  );
}
