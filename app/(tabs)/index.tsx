import Sidebar from '@/components/Sidebar';
import React, { useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

/**
 * 채팅 메시지 인터페이스
 * 각 메시지의 구조를 정의
 */
interface Message {
  id: string;           // 메시지 고유 ID
  text: string;         // 메시지 내용
  isUser: boolean;      // 사용자 메시지 여부 (true: 사용자, false: 상담사)
  timestamp: Date;      // 메시지 전송 시간
}

/**
 * 상담 채팅 화면 컴포넌트
 * 사용자와 상담사 간의 실시간 채팅을 제공
 */
export default function ChatScreen() {
  // 채팅 메시지 목록 상태 관리
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '안녕하세요! 상담을 시작하겠습니다. 무엇을 도와드릴까요?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  
  // 메시지 입력창 텍스트 상태 관리
  const [inputText, setInputText] = useState('');
  
  // 사이드바 표시 상태 관리
  const [sidebarVisible, setSidebarVisible] = useState(false);

  /**
   * 메시지 전송 처리 함수
   * 사용자 메시지를 추가하고, 상담사의 응답을 시뮬레이션
   */
  const sendMessage = () => {
    if (inputText.trim() === '') return; // 빈 메시지는 전송하지 않음

    // 사용자 메시지 생성
    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    // 메시지 목록에 추가
    setMessages(prev => [...prev, newMessage]);
    setInputText(''); // 입력창 초기화

    // TODO: 실제 상담사 응답 로직 (지금은 임시 응답)
    // 1초 후 상담사 응답 시뮬레이션
    setTimeout(() => {
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: '네, 말씀해 주세요. 더 자세히 설명해 주시면 도움을 드리겠습니다.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, responseMessage]);
    }, 1000);
  };

  /**
   * 메시지 렌더링 함수
   * 사용자와 상담사 메시지를 다른 스타일로 표시
   */
  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[styles.messageContainer, item.isUser ? styles.userMessage : styles.counselorMessage]}>
      <Text style={[styles.messageText, item.isUser ? styles.userMessageText : styles.counselorMessageText]}>
        {item.text}
      </Text>
      <Text style={styles.timestamp}>
        {item.timestamp.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* 채팅방 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.hamburgerButton}
          onPress={() => setSidebarVisible(true)}
        >
          <Text style={styles.hamburgerIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>상담 채팅</Text>
        <View style={styles.headerRight} />
      </View>
      
      {/* 채팅 영역 (키보드 대응) */}
      <KeyboardAvoidingView 
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* 메시지 목록 */}
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          style={styles.messagesList}
          inverted={false}
        />
        
        {/* 메시지 입력 영역 */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="메시지를 입력하세요..."
            multiline
            maxLength={500}
          />
          <TouchableOpacity 
            style={[styles.sendButton, inputText.trim() === '' && styles.sendButtonDisabled]}
            onPress={sendMessage}
            disabled={inputText.trim() === ''}
          >
            <Text style={styles.sendButtonText}>전송</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* 사이드바 */}
      <Sidebar 
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
      />
    </SafeAreaView>
  );
}

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hamburgerButton: {
    padding: 5,
  },
  hamburgerIcon: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
    textAlign: 'center',
  },
  headerRight: {
    width: 30, // 햄버거 버튼과 균형 맞추기
  },
  chatContainer: {
    flex: 1,
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: 15,
  },
  messageContainer: {
    marginVertical: 5,
    maxWidth: '80%',
    padding: 12,
    borderRadius: 18,
  },
  userMessage: {
    alignSelf: 'flex-end', // 사용자 메시지는 오른쪽 정렬
    backgroundColor: '#007AFF',
  },
  counselorMessage: {
    alignSelf: 'flex-start', // 상담사 메시지는 왼쪽 정렬
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  userMessageText: {
    color: 'white',
  },
  counselorMessageText: {
    color: 'black',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    maxHeight: 100,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc', // 비활성화 상태 색상
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
