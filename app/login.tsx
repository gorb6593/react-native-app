import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * 로그인 화면 컴포넌트
 * 카카오 로그인 버튼을 제공하고, 로그인 성공 시 JWT 토큰을 저장한 후 메인화면으로 이동
 */
export default function LoginScreen() {
  /**
   * 카카오 로그인 처리 함수
   * 현재는 하드코딩으로 로그인 성공을 가정하고, 실제 카카오 SDK 연동 시 이 부분을 수정
   */
  const handleKakaoLogin = async () => {
    try {
      // TODO: 실제 카카오 로그인 연동 예정
      // 지금은 하드코딩으로 로그인 성공 가정
      
      // 임의의 JWT 토큰 생성 (실제로는 서버에서 받아옴)
      const fakeJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
      
      // JWT를 AsyncStorage에 저장 (앱 재시작 시에도 로그인 상태 유지)
      await AsyncStorage.setItem('userToken', fakeJWT);
      
      // 메인화면으로 이동 (replace를 사용하여 뒤로가기 시 로그인 페이지로 돌아가지 않도록 함)
      router.replace('/');
      
    } catch (error) {
      console.error('로그인 에러:', error);
      alert('로그인 중 오류가 발생했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인</Text>
      <TouchableOpacity style={styles.kakaoButton} onPress={handleKakaoLogin}>
        <Image
          source={{ uri: 'https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png' }}
          style={styles.kakaoLogo}
        />
        <Text style={styles.kakaoText}>카카오로 로그인</Text>
      </TouchableOpacity>
    </View>
  );
}

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  kakaoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE500', // 카카오 브랜드 색상
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  kakaoLogo: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  kakaoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3C1E1E', // 카카오 브랜드 텍스트 색상
  },
}); 