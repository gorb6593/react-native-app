import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const handleKakaoLogin = () => {
    // TODO: 카카오 로그인 연동 예정
    alert('카카오 로그인! (아직 연동 전)');
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
    backgroundColor: '#FEE500',
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
    color: '#3C1E1E',
  },
}); 