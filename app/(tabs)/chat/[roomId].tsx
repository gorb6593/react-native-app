import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

export default function ChatRoomScreen() {
  const { roomId } = useLocalSearchParams();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>채팅방 상세</Text>
      <Text style={styles.desc}>채팅방 ID: {roomId}</Text>
      <Text style={styles.desc}>여기에 채팅 메시지 UI가 들어갑니다.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  desc: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
}); 