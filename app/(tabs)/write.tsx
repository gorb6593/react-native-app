import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const MAX_IMAGES = 5;
const MODES = ['잃어버림', '발견'] as const;

type ModeType = typeof MODES[number];

export default function WriteScreen() {
  const [images, setImages] = useState<string[]>([]);
  const [thumbnailIdx, setThumbnailIdx] = useState(0);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [content, setContent] = useState('');
  const [mode, setMode] = useState<ModeType>('잃어버림');

  // 이미지 추가 (사진첩/카메라)
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('권한 필요', '사진첩 접근 권한이 필요합니다.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
      selectionLimit: MAX_IMAGES - images.length,
    });
    if (!result.canceled) {
      const uris = result.assets ? result.assets.map(a => a.uri) : [result.uri];
      setImages(prev => [...prev, ...uris].slice(0, MAX_IMAGES));
    }
  };
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('권한 필요', '카메라 접근 권한이 필요합니다.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ quality: 0.8 });
    if (!result.canceled && result.assets && result.assets[0]) {
      setImages(prev => [...prev, result.assets[0].uri].slice(0, MAX_IMAGES));
    }
  };
  const removeImage = (idx: number) => {
    const newImgs = images.filter((_, i) => i !== idx);
    setImages(newImgs);
    if (thumbnailIdx === idx) setThumbnailIdx(0);
    else if (thumbnailIdx > idx) setThumbnailIdx(thumbnailIdx - 1);
  };

  // 작성 완료
  const handleSubmit = () => {
    if (!title || !location || !content) {
      Alert.alert('필수 입력', '제목, 위치, 설명을 모두 입력해 주세요.');
      return;
    }
    // TODO: API 연동
    Alert.alert('작성 완료', 'API 연동 시 서버로 전송됩니다.');
    // console.log({ images, thumbnail: images[thumbnailIdx], title, location, content, mode });
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} contentContainerStyle={{ paddingBottom: 32 }}>
      {/* 이미지 첨부 영역 */}
      <View style={{ padding: 20, paddingBottom: 0 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {images.map((img, idx) => (
            <View key={img} style={{ marginRight: 12, position: 'relative' }}>
              <TouchableOpacity onPress={() => setThumbnailIdx(idx)}>
                <Image
                  source={{ uri: img }}
                  style={{ width: 90, height: 90, borderRadius: 12, borderWidth: thumbnailIdx === idx ? 3 : 1, borderColor: thumbnailIdx === idx ? '#00C851' : '#eee' }}
                />
                {thumbnailIdx === idx && (
                  <View style={styles.thumbnailBadge}><Text style={{ color: '#fff', fontSize: 11 }}>대표</Text></View>
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => removeImage(idx)} style={styles.removeBtn}>
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 13 }}>X</Text>
              </TouchableOpacity>
            </View>
          ))}
          {images.length < MAX_IMAGES && (
            <TouchableOpacity onPress={pickImage} style={styles.addBtn}>
              <Text style={{ fontSize: 32, color: '#aaa' }}>＋</Text>
              <Text style={{ fontSize: 12, color: '#888', marginTop: 2 }}>사진첩</Text>
            </TouchableOpacity>
          )}
          {images.length < MAX_IMAGES && (
            <TouchableOpacity onPress={takePhoto} style={styles.addBtn}>
              <Text style={{ fontSize: 28, color: '#aaa' }}>📷</Text>
              <Text style={{ fontSize: 12, color: '#888', marginTop: 2 }}>카메라</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
      {/* 입력 폼 */}
      <View style={{ padding: 20, paddingTop: 8 }}>
        <Text style={styles.label}>제목</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="제목을 입력하세요" />
        <Text style={styles.label}>발견한 위치</Text>
        <TextInput style={styles.input} value={location} onChangeText={setLocation} placeholder="위치를 입력하세요" />
        <Text style={styles.label}>자세한 설명</Text>
        <TextInput style={[styles.input, { height: 80 }]} value={content} onChangeText={setContent} placeholder="상세 설명을 입력하세요" multiline />
        <Text style={styles.label}>방식</Text>
        <View style={{ flexDirection: 'row', marginBottom: 16 }}>
          {MODES.map(m => (
            <TouchableOpacity
              key={m}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 16,
                backgroundColor: mode === m ? '#00C851' : '#eee',
                marginRight: 10,
              }}
              onPress={() => setMode(m)}
            >
              <Text style={{ color: mode === m ? 'white' : '#333', fontWeight: 'bold' }}>{m}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {/* 작성 완료 버튼 */}
      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>작성 완료</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    marginTop: 12,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  addBtn: {
    width: 90,
    height: 90,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fafafa',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  removeBtn: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    paddingHorizontal: 4,
    paddingVertical: 1,
    zIndex: 2,
  },
  thumbnailBadge: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    backgroundColor: '#00C851',
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 12,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  submitBtn: {
    marginHorizontal: 20,
    marginTop: 24,
    backgroundColor: '#00C851',
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 16,
    elevation: 2,
  },
}); 