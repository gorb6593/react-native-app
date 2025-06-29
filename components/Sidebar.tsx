import { router } from 'expo-router';
import React from 'react';
import {
    Modal,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

/**
 * 상담 내역 아이템 인터페이스
 */
interface ChatHistory {
  id: string;
  title: string;
  date: string;
  preview: string;
}

/**
 * 사이드바 컴포넌트
 * ChatGPT 스타일의 상담 내역과 새 상담 시작 기능을 제공
 */
interface SidebarProps {
  visible: boolean;
  onClose: () => void;
}

export default function Sidebar({ visible, onClose }: SidebarProps) {
  // 임시 상담 내역 데이터 (실제로는 서버에서 가져올 예정)
  const chatHistory: ChatHistory[] = [
    {
      id: '1',
      title: '상담 세션 #1',
      date: '2024-01-15',
      preview: '안녕하세요! 상담을 시작하겠습니다...',
    },
    {
      id: '2',
      title: '상담 세션 #2',
      date: '2024-01-14',
      preview: '네, 말씀해 주세요. 더 자세히 설명해 주시면...',
    },
    {
      id: '3',
      title: '상담 세션 #3',
      date: '2024-01-13',
      preview: '이해했습니다. 그런 경우에는...',
    },
  ];

  /**
   * 새 상담 시작
   */
  const handleNewChat = () => {
    onClose();
    // 현재 채팅방을 초기화하고 새 상담 시작
    router.replace('/');
  };

  /**
   * 상담 내역 클릭
   */
  const handleChatHistoryClick = (chatId: string) => {
    onClose();
    // TODO: 해당 상담 내역으로 이동
    alert(`상담 내역 ${chatId}로 이동 (기능 준비 중)`);
  };

  /**
   * 상담 내역 아이템 렌더링
   */
  const renderChatHistoryItem = (chat: ChatHistory) => (
    <TouchableOpacity
      key={chat.id}
      style={styles.chatHistoryItem}
      onPress={() => handleChatHistoryClick(chat.id)}
    >
      <Text style={styles.chatTitle} numberOfLines={1}>
        {chat.title}
      </Text>
      <Text style={styles.chatPreview} numberOfLines={2}>
        {chat.preview}
      </Text>
      <Text style={styles.chatDate}>{chat.date}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.sidebar}>
          <SafeAreaView style={styles.safeArea}>
            {/* 헤더 */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>상담 내역</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* 새 상담 버튼 */}
            <TouchableOpacity style={styles.newChatButton} onPress={handleNewChat}>
              <Text style={styles.newChatButtonText}>+ 새 상담 시작</Text>
            </TouchableOpacity>

            {/* 상담 내역 목록 */}
            <ScrollView style={styles.chatHistoryList}>
              {chatHistory.map(renderChatHistoryItem)}
            </ScrollView>

            {/* 하단 정보 */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>상담 앱 v1.0.0</Text>
            </View>
          </SafeAreaView>
        </View>
      </View>
    </Modal>
  );
}

// 스타일 정의
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sidebar: {
    width: '80%',
    height: '100%',
    backgroundColor: '#f8f9fa',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#666',
  },
  newChatButton: {
    margin: 15,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    alignItems: 'center',
  },
  newChatButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  chatHistoryList: {
    flex: 1,
    paddingHorizontal: 15,
  },
  chatHistoryItem: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  chatTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  chatPreview: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    lineHeight: 18,
  },
  chatDate: {
    fontSize: 12,
    color: '#999',
  },
  footer: {
    padding: 15,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: 'white',
  },
  footerText: {
    fontSize: 12,
    color: '#999',
  },
}); 