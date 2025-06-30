import { router } from 'expo-router';
import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';

const dummyRooms = [
  { id: '1', title: '잃어버린 지갑 문의', lastMessage: '혹시 사진 더 있나요?' },
  { id: '2', title: '강아지 발견', lastMessage: '감사합니다! 곧 연락드릴게요.' },
];

export default function ChatListScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>채팅방 목록</Text>
      <FlatList
        data={dummyRooms}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.room} onPress={() => router.push(`/chat/${item.id}`)}>
            <Text style={styles.roomTitle}>{item.title}</Text>
            <Text style={styles.lastMessage}>{item.lastMessage}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  room: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  roomTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
  },
}); 