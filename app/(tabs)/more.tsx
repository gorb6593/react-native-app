import React from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAuth } from '../_layout';

/**
 * 더보기 화면 컴포넌트
 * 설정, 로그아웃 등의 기능을 제공
 */
export default function MoreScreen() {
  const { logout } = useAuth();

  /**
   * 로그아웃 처리 함수
   * JWT 토큰을 삭제하고 로그인 페이지로 이동
   */
  const handleLogout = async () => {
    console.log('🔄 로그아웃 시작');
    Alert.alert(
      '로그아웃',
      '정말 로그아웃 하시겠습니까?',
      [
        {
          text: '취소',
          style: 'cancel',
          onPress: () => console.log('❌ 로그아웃 취소'),
        },
        {
          text: '로그아웃',
          style: 'destructive',
          onPress: async () => {
            try {
              console.log('🚪 로그아웃 실행 중...');
              // 인증 컨텍스트의 로그아웃 함수 사용
              await logout();
              console.log('✅ 로그아웃 완료');
              // 라우팅 가드가 자동으로 로그인 페이지로 리다이렉트
            } catch (error) {
              console.error('❌ 로그아웃 에러:', error);
              alert('로그아웃 중 오류가 발생했습니다.');
            }
          },
        },
      ]
    );
  };

  /**
   * 메뉴 아이템 렌더링 함수
   */
  const renderMenuItem = (title: string, onPress: () => void, isDestructive = false) => (
    <TouchableOpacity
      style={[styles.menuItem, isDestructive && styles.destructiveMenuItem]}
      onPress={onPress}
    >
      <Text style={[styles.menuText, isDestructive && styles.destructiveText]}>
        {title}
      </Text>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>더보기</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* 계정 섹션 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>계정</Text>
          {renderMenuItem('프로필 설정', () => alert('프로필 설정 기능은 준비 중입니다.'))}
          {renderMenuItem('알림 설정', () => alert('알림 설정 기능은 준비 중입니다.'))}
        </View>

        {/* 앱 정보 섹션 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>앱 정보</Text>
          {renderMenuItem('버전 정보', () => alert('버전 1.0.0'))}
          {renderMenuItem('이용약관', () => alert('이용약관 기능은 준비 중입니다.'))}
          {renderMenuItem('개인정보처리방침', () => alert('개인정보처리방침 기능은 준비 중입니다.'))}
        </View>

        {/* 지원 섹션 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>지원</Text>
          {renderMenuItem('고객센터', () => alert('고객센터 기능은 준비 중입니다.'))}
          {renderMenuItem('문의하기', () => alert('문의하기 기능은 준비 중입니다.'))}
        </View>

        {/* 로그아웃 버튼 */}
        <View style={styles.section}>
          {renderMenuItem('로그아웃', handleLogout, true)}
        </View>
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
  },
  section: {
    marginTop: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f8f8f8',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  destructiveMenuItem: {
    borderBottomWidth: 0,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  destructiveText: {
    color: '#FF3B30',
  },
  arrow: {
    fontSize: 18,
    color: '#999',
  },
}); 