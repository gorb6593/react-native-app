import { useLocalSearchParams } from 'expo-router';
import React, { useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// 더미 메시지 데이터
const dummyMessages = [
  { id: '1', text: '안녕하세요! 문의드려요.', fromMe: false, time: '오전 10:12' },
  { id: '2', text: '네, 어떤 점이 궁금하신가요?', fromMe: true, time: '오전 10:13' },
];

export default function ChatRoomScreen() {
  const { roomId } = useLocalSearchParams();
  const [messages, setMessages] = useState(dummyMessages);
  const [input, setInput] = useState('');
  const flatListRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [
      ...prev,
      { id: String(Date.now()), text: input, fromMe: true, time: '지금' },
    ]);
    setInput('');
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#fff' }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.msgRow, item.fromMe ? styles.myMsgRow : styles.otherMsgRow]}>
            <View style={[styles.msgBubble, item.fromMe ? styles.myBubble : styles.otherBubble]}>
              <Text style={{ color: item.fromMe ? '#fff' : '#222' }}>{item.text}</Text>
            </View>
            <Text style={styles.msgTime}>{item.time}</Text>
          </View>
        )}
        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="메시지 입력..."
        />
        <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>보내기</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  msgRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  myMsgRow: {
    justifyContent: 'flex-end',
  },
  otherMsgRow: {
    justifyContent: 'flex-start',
  },
  msgBubble: {
    maxWidth: '70%',
    padding: 12,
    borderRadius: 16,
  },
  myBubble: {
    backgroundColor: '#00C851',
    marginLeft: 30,
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: '#eee',
    marginRight: 30,
    borderBottomLeftRadius: 4,
  },
  msgTime: {
    fontSize: 11,
    color: '#aaa',
    marginLeft: 6,
    marginRight: 6,
    marginBottom: 2,
  },
  inputRow: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: '#fafafa',
    marginRight: 8,
  },
  sendBtn: {
    backgroundColor: '#00C851',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
}); 