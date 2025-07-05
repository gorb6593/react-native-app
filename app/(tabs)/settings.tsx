import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../_layout';

export default function SettingsScreen() {
  const { checkAuth } = useAuth();

  // 로그아웃 처리
  const handleLogout = async () => {
    console.log('로그아웃 버튼 클릭됨');
    Alert.alert(
      '로그아웃',
      '정말 로그아웃 하시겠습니까?',
      [
        { text: '취소', style: 'cancel', onPress: () => console.log('로그아웃 취소') },
        {
          text: '로그아웃',
          style: 'destructive',
          onPress: async () => {
            console.log('로그아웃 onPress 실행');
            await AsyncStorage.removeItem('userToken');
            console.log('JWT 삭제 완료');
            await checkAuth();
            console.log('checkAuth() 호출 완료');
            router.replace('/login');
            console.log('router.replace(/login) 호출');
          },
        },
      ]
    );
  };

  // 메뉴 아이템 렌더링
  const renderMenuItem = (title: string, onPress: () => void, isDestructive = false) => (
    <TouchableOpacity
      style={[styles.menuItem, isDestructive && styles.destructiveMenuItem]}
      onPress={onPress}
    >
      <Text style={[styles.menuText, isDestructive && styles.destructiveText]}>{title}</Text>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>설정</Text>
      </View>
      <ScrollView style={styles.content}>
        {/* 프로필 섹션 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>내 정보</Text>
          {renderMenuItem('프로필 보기', () => alert('프로필 보기 기능은 준비 중입니다.'))}
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
        {/* 로그아웃 */}
        <View style={styles.section}>
          {renderMenuItem('로그아웃', handleLogout, true)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
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