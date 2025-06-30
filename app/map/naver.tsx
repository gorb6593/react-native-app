import React from 'react';
import { SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';

export default function NaverMapScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={{ uri: 'https://map.naver.com/v5/' }}
        style={{ flex: 1 }}
      />
    </SafeAreaView>
  );
} 