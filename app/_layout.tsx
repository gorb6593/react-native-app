import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { createContext, useContext, useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

/**
 * 인증 컨텍스트 인터페이스
 */
interface AuthContextType {
  isAuthenticated: boolean | null;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

// 인증 컨텍스트 생성
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * 인증 컨텍스트 사용 훅
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * 루트 레이아웃 컴포넌트
 * 앱의 전체적인 레이아웃, 인증 상태 관리, 라우팅 가드를 담당
 */
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  
  // 인증 상태 관리 (null: 체크 중, true: 로그인됨, false: 로그인 안됨)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const segments = useSegments(); // 현재 라우트 세그먼트 정보
  const router = useRouter();

  /**
   * JWT 토큰 체크 함수
   * AsyncStorage에서 userToken을 확인하여 인증 상태를 설정
   */
  const checkAuth = async () => {
    try {
      console.log('🔍 JWT 토큰 체크 시작...');
      const token = await AsyncStorage.getItem('userToken');
      console.log('📱 저장된 토큰:', token ? '있음' : '없음');
      setIsAuthenticated(!!token); // 토큰이 있으면 true, 없으면 false
      console.log('✅ 인증 상태 설정 완료:', !!token);
    } catch (error) {
      console.error('❌ Auth check error:', error);
      setIsAuthenticated(false);
    }
  };

  /**
   * 로그아웃 함수
   * JWT 토큰을 삭제하고 인증 상태를 업데이트
   */
  const logout = async () => {
    try {
      console.log('🗑️ JWT 토큰 삭제 중...');
      await AsyncStorage.removeItem('userToken');
      console.log('✅ JWT 토큰 삭제 완료');
      setIsAuthenticated(false);
      console.log('🔄 인증 상태를 false로 변경');
      router.replace('/login'); // 로그아웃 후 즉시 로그인 페이지로 이동
    } catch (error) {
      console.error('❌ 로그아웃 에러:', error);
    }
  };

  // 앱 시작 시 JWT 체크 (한 번만 실행)
  useEffect(() => {
    checkAuth();
  }, []);

  /**
   * 라우팅 가드 로직
   * 인증 상태에 따라 적절한 페이지로 리다이렉트
   */
  useEffect(() => {
    if (isAuthenticated === null) return; // 아직 체크 중이면 아무것도 하지 않음

    const inAuthGroup = segments[0] === '(tabs)'; // 보호된 페이지 그룹에 있는지 확인
    const isLoginPage = segments[0] === 'login'; // 로그인 페이지에 있는지 확인
    
    console.log('🔍 라우팅 가드 디버깅:', {
      isAuthenticated,
      segments: segments[0],
      inAuthGroup,
      isLoginPage
    });
    
    if (!isAuthenticated && inAuthGroup) {
      // 로그인 안됨 + 보호된 페이지 접근 시 → 로그인 페이지로 리다이렉트
      console.log('🚫 로그인 안됨 → 로그인 페이지로 이동');
      router.replace('/login');
    } else if (isAuthenticated && isLoginPage) {
      // 로그인 됨 + 로그인 페이지에 있으면 → 메인페이지로 리다이렉트
      console.log('✅ 로그인 됨 → 메인페이지로 이동');
      router.replace('/');
    }
  }, [isAuthenticated, segments]);

  // 폰트 로딩 중이거나 인증 체크 중일 때는 빈 화면 표시
  if (!loaded || isAuthenticated === null) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, checkAuth, logout }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          {/* 보호된 페이지들 (로그인 필요) */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          {/* 로그인 페이지 */}
          <Stack.Screen name="login" options={{ headerShown: false }} />
          {/* 404 페이지 */}
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthContext.Provider>
  );
}
