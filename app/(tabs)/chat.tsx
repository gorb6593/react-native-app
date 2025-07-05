import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// 더미 채팅방 데이터
const chatRooms = [
  { id: 'room1', other: '홍길동', lastMessage: '안녕하세요! 문의드려요.', lastTime: '오전 10:12' },
  { id: 'room2', other: '김철수', lastMessage: '네, 가능합니다.', lastTime: '어제' },
];

export default function ChatListScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>진행중인 채팅</Text>
      <FlatList
        data={chatRooms}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.room} onPress={() => router.push(`/chat/${item.id}`)}>
            <View style={{ flex: 1 }}>
              <Text style={styles.roomOther}>{item.other}</Text>
              <Text style={styles.lastMessage}>{item.lastMessage}</Text>
            </View>
            <Text style={styles.lastTime}>{item.lastTime}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    margin: 16,
    color: '#222',
  },
  room: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  roomOther: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
  },
  lastMessage: {
    fontSize: 15,
    color: '#666',
    marginTop: 2,
  },
  lastTime: {
    fontSize: 13,
    color: '#aaa',
    marginLeft: 8,
  },
}); 