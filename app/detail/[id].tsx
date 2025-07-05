import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { testItems } from '../(tabs)/home'; // home.tsx에서 테스트 데이터 import (실제 API 연동 전 임시)

const { width } = Dimensions.get('window');

// 당근마켓 스타일의 미니멀 뒤로가기 버튼 컴포넌트
function BackButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        position: 'absolute',
        top: 18,
        left: 12,
        zIndex: 10,
        padding: 8,
      }}
      hitSlop={10}
    >
      <Text style={{ fontSize: 32, color: '#fff', fontWeight: '300', lineHeight: 36 }}>{'‹'}</Text>
    </Pressable>
  );
}

export default function DetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  // 테스트 데이터에서 해당 id의 아이템 찾기
  const item = Array.isArray(testItems)
    ? testItems.find((i) => i.id === id)
    : null;
  // 이미지 3~6개 랜덤 생성 (테스트용)
  let images: string[] = [];
  if (item) {
    const baseImgs = Array.isArray(item.image) ? item.image : [item.image];
    const n = Math.floor(Math.random() * 4) + 3; // 3~6개
    for (let i = 0; i < n; i++) {
      images.push(baseImgs[i % baseImgs.length]);
    }
  }
  const [imgIdx, setImgIdx] = useState(0);
  const [chatInput, setChatInput] = useState('');

  if (!item) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>존재하지 않는 게시글입니다.</Text>
      </View>
    );
  }

  // 이미지 스와이프 핸들러
  const onScroll = (e: any) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / width);
    setImgIdx(idx);
  };

  // 채팅 보내기 핸들러
  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    // 실제로는 채팅방 생성/이동 로직 필요. 여기서는 글 id+user로 roomId 가정
    router.push(`/chat/${id}`);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        {/* 상단 이미지 스와이프 - 여백 없이 최상단부터 */}
        <View style={{ width: '100%', height: width * 0.7, backgroundColor: '#eee', marginTop: 0 }}>
          {/* 당근마켓 스타일 뒤로가기 버튼 */}
          <BackButton onPress={() => router.back()} />
          <FlatList
            data={images}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
            keyExtractor={(_, idx) => String(idx)}
            renderItem={({ item: img }) => (
              <Image source={{ uri: typeof img === 'string' ? img : '' }} style={{ width, height: width * 0.7 }} resizeMode="cover" />
            )}
          />
          {/* 인디케이터 */}
          {images.length > 1 && (
            <View style={styles.indicatorWrap}>
              <Text style={styles.indicatorText}>{imgIdx + 1}/{images.length}</Text>
            </View>
          )}
        </View>
        {/* 작성자(임시: id) */}
        {/* <View style={{ padding: 16, borderBottomColor: '#eee', borderBottomWidth: 1 }}>
          <Text style={{ fontSize: 15, color: '#888' }}>작성자: {item.id}</Text>
        </View> */}
        {/* 상세 내용 */}
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>{item.title}</Text>
          <Text style={{ fontSize: 15, color: '#444', marginBottom: 8 }}>{item.desc}</Text>
          <Text style={{ fontSize: 14, color: '#888' }}>장소: {item.place}</Text>
        </View>
        {/* 하단 채팅 입력창 */}
        <View style={{ flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#eee', padding: 10, backgroundColor: '#fff' }}>
          <TextInput
            style={{ flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8, fontSize: 16, backgroundColor: '#fafafa', marginRight: 8 }}
            value={chatInput}
            onChangeText={setChatInput}
            placeholder="채팅으로 문의하기..."
          />
          <TouchableOpacity onPress={handleSendChat} style={{ backgroundColor: '#00C851', borderRadius: 20, paddingHorizontal: 18, paddingVertical: 8 }}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>보내기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  indicatorWrap: {
    position: 'absolute',
    right: 16,
    bottom: 12,
    backgroundColor: '#000a',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  indicatorText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export const config = {
  headerShown: false,
}; 