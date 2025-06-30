import * as Location from 'expo-location';
import React, { useState } from 'react';
import { Alert, FlatList, Image, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// 테스트용 잃어버린/발견한 물건 데이터 (위도/경도, 대표이미지 추가)
const testItems = [
  {
    id: '1',
    type: '잃어버림',
    title: '검정색 지갑을 잃어버렸어요',
    desc: '강남역 근처에서 검정색 지갑을 잃어버렸습니다. 안에 신분증과 카드가 들어있어요.',
    date: '2024-06-01 14:30:00',
    place: '강남역',
    lat: 37.4979,
    lng: 127.0276,
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '2',
    type: '발견',
    title: '강아지를 발견했습니다',
    desc: '공원에서 작은 흰색 강아지를 발견했어요. 주인을 찾습니다.',
    date: '2024-06-02 09:10:00',
    place: '한강공원',
    lat: 37.5271,
    lng: 126.9326,
    image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '3',
    type: '잃어버림',
    title: '에어팟 분실',
    desc: '카페에서 에어팟을 두고 온 것 같습니다. 흰색 케이스입니다.',
    date: '2024-06-03 18:45:00',
    place: '스타벅스 시청점',
    lat: 37.5663,
    lng: 126.9779,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '4',
    type: '발견',
    title: '지갑을 주웠어요',
    desc: '버스 정류장에서 갈색 지갑을 주웠습니다. 연락 주세요.',
    date: '2024-06-04 12:20:00',
    place: '서울역 버스정류장',
    lat: 37.5547,
    lng: 126.9706,
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
  },
  // 실제 테스트를 위해 강남역 근처(내 위치)와 매우 가까운 데이터 추가
  {
    id: '5',
    type: '잃어버림',
    title: '파란색 우산을 잃어버렸어요',
    desc: '강남역 11번 출구 근처에서 파란색 우산을 분실했습니다.',
    date: '2024-06-05 08:00:00',
    place: '강남역 11번 출구',
    lat: 37.4981,
    lng: 127.0276,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '6',
    type: '발견',
    title: '지하철에서 이어폰을 주웠어요',
    desc: '2호선 강남역 방면 열차에서 이어폰을 발견했습니다.',
    date: '2024-06-05 09:30:00',
    place: '강남역 2호선',
    lat: 37.4979,
    lng: 127.0280,
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '7',
    type: '잃어버림',
    title: '노트북 가방을 잃어버렸어요',
    desc: '구로디지털단지역 근처에서 검정색 노트북 가방을 분실했습니다.',
    date: '2024-06-06 10:15:00',
    place: '구로디지털단지역',
    lat: 37.4850,
    lng: 126.9015,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '8',
    type: '발견',
    title: '지갑을 주웠어요',
    desc: '신대방삼거리역 2번 출구 앞에서 갈색 지갑을 발견했습니다.',
    date: '2024-06-06 12:40:00',
    place: '신대방삼거리역',
    lat: 37.4992,
    lng: 126.9286,
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
  },
];

const typeOptions = ['전체', '잃어버림', '발견'];
const sortOptions = ['최신순', '오래된순'];

type ItemType = {
  id: string;
  type: string;
  title: string;
  desc: string;
  date: string;
  place: string;
  lat: number;
  lng: number;
  image?: string;
};

type UserLocation = {
  latitude: number;
  longitude: number;
};

// Haversine 공식을 이용해 두 좌표(위도/경도) 사이의 거리를 km 단위로 계산하는 함수
function getDistanceFromLatLonInKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  // Haversine formula
  const R = 6371; // 지구 반지름 (km)
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// 체크 이미지(간단한 base64 SVG, 실제 앱에서는 assets로 대체 권장)
const CHECK_ICON = 'data:image/svg+xml;utf8,<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="10" fill="%2300C851"/><path d="M5 10.5L9 14L15 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('전체');
  const [selectedSort, setSelectedSort] = useState('최신순');
  const [location, setLocation] = useState('');
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [locationFilterActive, setLocationFilterActive] = useState(false);

  // 글 목록 필터링
  // 1. 유형, 키워드, 위치 텍스트로 1차 필터링
  // 2. locationFilterActive와 userLocation이 있으면, 현위치 기준 2km 이내만 남김
  let filtered = testItems.filter(item =>
    (selectedType === '전체' || item.type === selectedType) &&
    (search === '' || item.title.includes(search) || item.desc.includes(search)) &&
    (location === '' || item.place.includes(location))
  );
  if (locationFilterActive && userLocation) {
    // 현위치 필터가 활성화된 경우: 각 아이템의 위치와 현위치의 거리를 계산
    filtered = filtered.filter(item => {
      if (!item.lat || !item.lng) return false; // 위치 정보 없는 글은 제외
      const dist = getDistanceFromLatLonInKm(
        userLocation.latitude,
        userLocation.longitude,
        item.lat,
        item.lng
      );
      return dist <= 5; // 5km 이내만 표시
    });
  }
  // 정렬 옵션 적용
  if (selectedSort === '최신순') {
    filtered = filtered.sort((a, b) => b.date.localeCompare(a.date));
  } else {
    filtered = filtered.sort((a, b) => a.date.localeCompare(b.date));
  }

  // 주변에서 찾기(5km) 토글 핸들러
  const handleNearbyToggle = async () => {
    if (locationFilterActive) {
      setLocationFilterActive(false);
      setUserLocation(null);
      return;
    }
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('위치 권한이 필요합니다.');
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      };
      setUserLocation(coords);
      setLocationFilterActive(true);
      // 내 위치 Alert 및 콘솔 로그
      const msg = `내 위치\n위도: ${coords.latitude}\n경도: ${coords.longitude}`;
      Alert.alert('내 위치', msg);
      console.log('[내 위치]', coords);
      Alert.alert('내 주변 5km 이내의 글만 표시합니다.');
    } catch (e) {
      Alert.alert('현위치 정보를 가져올 수 없습니다.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 타이틀 */}
      <Text style={styles.title}>분실/습득 물건을 찾아보세요</Text>
      {/* 검색/필터 영역 */}
      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="키워드 검색 (예: 지갑, 강아지)"
          value={search}
          onChangeText={setSearch}
        />
        <TextInput
          style={styles.locationInput}
          placeholder="위치 검색"
          value={location}
          onChangeText={setLocation}
        />
      </View>
      <View style={styles.filterRow}>
        {/* 유형 선택 */}
        {typeOptions.map(type => (
          <TouchableOpacity
            key={type}
            style={[styles.typeButton, selectedType === type && styles.typeButtonActive]}
            onPress={() => setSelectedType(type)}
          >
            <Text style={[styles.typeButtonText, selectedType === type && styles.typeButtonTextActive]}>{type}</Text>
          </TouchableOpacity>
        ))}
        {/* 정렬 선택 */}
        <View style={styles.sortBox}>
          {sortOptions.map(sort => (
            <TouchableOpacity
              key={sort}
              style={[styles.sortButton, selectedSort === sort && styles.sortButtonActive]}
              onPress={() => setSelectedSort(sort)}
            >
              <Text style={[styles.sortButtonText, selectedSort === sort && styles.sortButtonTextActive]}>{sort}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {/* 주변에서 찾기(5km) 토글 버튼 - 가운데 정렬 */}
      <View style={{ alignItems: 'center', marginVertical: 8 }}>
        <TouchableOpacity style={[styles.mapButton, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', minWidth: 200 }]} onPress={handleNearbyToggle}>
          <Text style={styles.mapButtonText}>주변에서 찾기 (5km)</Text>
          {locationFilterActive && (
            <Image source={{ uri: CHECK_ICON }} style={{ width: 20, height: 20, marginLeft: 8 }} />
          )}
        </TouchableOpacity>
      </View>
      {/* 지도에서 위치 검색 화면 이동 버튼 (일단 주석 처리) */}
      {/**
      <TouchableOpacity style={styles.mapButton} onPress={() => router.push('/map/naver')}>
        <Text style={styles.mapButtonText}>지도에서 위치 검색</Text>
      </TouchableOpacity>
      */}
      {/* 글 목록 */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            {/* 대표이미지 있으면 상단에 표시 */}
            {item.image && (
              <Image source={{ uri: item.image }} style={{ width: '100%', height: 140, borderRadius: 8, marginBottom: 8 }} resizeMode="cover" />
            )}
            <View style={styles.row}>
              <Text style={[styles.type, item.type === '잃어버림' ? styles.lost : styles.found]}>
                {item.type}
              </Text>
              {/* 날짜: 한 줄에 잘 보이도록 스타일 및 속성 추가 */}
              <Text
                style={[styles.date, { flexShrink: 1, minWidth: 90, maxWidth: 140, textAlign: 'right', overflow: 'hidden' }]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.date}
              </Text>
            </View>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.desc}>{item.desc}</Text>
            <Text style={styles.place}>장소: {item.place}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          locationFilterActive
            ? <Text style={styles.emptyText}>주변 5km 이내에 글이 없습니다.</Text>
            : <Text style={styles.emptyText}>검색 결과가 없습니다.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: Platform.OS === 'android' ? 32 : 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#222',
  },
  searchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  searchInput: {
    flex: 2,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  locationInput: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  typeButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#eee',
    marginRight: 6,
  },
  typeButtonActive: {
    backgroundColor: '#007AFF',
  },
  typeButtonText: {
    fontSize: 14,
    color: '#555',
  },
  typeButtonTextActive: {
    color: 'white',
    fontWeight: 'bold',
  },
  sortBox: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  sortButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#eee',
    marginLeft: 6,
  },
  sortButtonActive: {
    backgroundColor: '#007AFF',
  },
  sortButtonText: {
    fontSize: 14,
    color: '#555',
  },
  sortButtonTextActive: {
    color: 'white',
    fontWeight: 'bold',
  },
  mapButton: {
    backgroundColor: '#34C759',
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 10,
  },
  mapButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  type: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 8,
    overflow: 'hidden',
    color: 'white',
  },
  lost: {
    backgroundColor: '#FF3B30',
  },
  found: {
    backgroundColor: '#34C759',
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    marginTop: 2,
  },
  desc: {
    fontSize: 15,
    color: '#444',
    marginBottom: 6,
  },
  place: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 40,
    fontSize: 16,
  },
}); 