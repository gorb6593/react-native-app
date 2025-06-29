import React from 'react';
import {
    Image,
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
interface ChatHistoryItem {
  id: string;
  title: string;
  date: string;
  preview: string;
  messageCount: number;
  status: 'completed' | 'ongoing';
  counselorName: string;
}

/**
 * 상담 내역 화면 컴포넌트
 * 지난 상담 세션들을 카드 형태로 표시
 */
export default function ChatHistoryScreen() {
  // 임시 상담 내역 데이터 (실제로는 서버에서 가져올 예정)
  const chatHistory: ChatHistoryItem[] = [
    {
      id: '1',
      title: '상담 세션 #1',
      date: '2024-01-15',
      preview: '안녕하세요! 상담을 시작하겠습니다. 무엇을 도와드릴까요?',
      messageCount: 12,
      status: 'completed',
      counselorName: '김상담',
    },
    {
      id: '2',
      title: '상담 세션 #2',
      date: '2024-01-14',
      preview: '네, 말씀해 주세요. 더 자세히 설명해 주시면 도움을 드리겠습니다.',
      messageCount: 8,
      status: 'completed',
      counselorName: '이상담',
    },
    {
      id: '3',
      title: '상담 세션 #3',
      date: '2024-01-13',
      preview: '이해했습니다. 그런 경우에는 다음과 같은 방법을 시도해보세요...',
      messageCount: 15,
      status: 'ongoing',
      counselorName: '박상담',
    },
    {
      id: '4',
      title: '상담 세션 #4',
      date: '2024-01-12',
      preview: '감사합니다. 추가로 궁금한 점이 있으시면 언제든 말씀해 주세요.',
      messageCount: 6,
      status: 'completed',
      counselorName: '최상담',
    },
  ];

  /**
   * 상담 내역 카드 클릭 처리
   */
  const handleChatHistoryClick = (chatId: string) => {
    // TODO: 해당 상담 내역으로 이동
    alert(`상담 내역 ${chatId}로 이동 (기능 준비 중)`);
  };

  /**
   * 상담 내역 카드 렌더링
   */
  const renderChatHistoryCard = (chat: ChatHistoryItem) => (
    <TouchableOpacity
      key={chat.id}
      style={styles.chatCard}
      onPress={() => handleChatHistoryClick(chat.id)}
    >
      {/* 상담사 프로필 이미지 */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: `https://i.pravatar.cc/150?u=${chat.counselorName}` }}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.counselorName}>{chat.counselorName} 상담사</Text>
          <Text style={styles.chatDate}>{chat.date}</Text>
        </View>
        <View style={[styles.statusBadge, chat.status === 'ongoing' && styles.ongoingBadge]}>
          <Text style={styles.statusText}>
            {chat.status === 'ongoing' ? '진행중' : '완료'}
          </Text>
        </View>
      </View>

      {/* 상담 내용 미리보기 */}
      <View style={styles.contentSection}>
        <Text style={styles.chatTitle}>{chat.title}</Text>
        <Text style={styles.chatPreview} numberOfLines={2}>
          {chat.preview}
        </Text>
      </View>

      {/* 메시지 개수 */}
      <View style={styles.footerSection}>
        <Text style={styles.messageCount}>{chat.messageCount}개의 메시지</Text>
        <Text style={styles.viewButton}>보기 ›</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>상담 내역</Text>
      </View>

      {/* 상담 내역 목록 */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {chatHistory.map(renderChatHistoryCard)}
        
        {/* 빈 공간 */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
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
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  chatCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  profileInfo: {
    flex: 1,
  },
  counselorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  chatDate: {
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    backgroundColor: '#34C759',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ongoingBadge: {
    backgroundColor: '#FF9500',
  },
  statusText: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
  contentSection: {
    marginBottom: 12,
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  chatPreview: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  footerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  messageCount: {
    fontSize: 14,
    color: '#999',
  },
  viewButton: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  bottomSpacing: {
    height: 20,
  },
});
