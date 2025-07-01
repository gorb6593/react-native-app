import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, FlatList, Image, Modal, Platform, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// 테스트용 잃어버린/발견한 물건 데이터 (위도/경도, 대표이미지 추가)
function getPastDate(minutesAgo: number) {
  const d = new Date(Date.now() - minutesAgo * 60000);
  const str = d.toISOString().slice(0, 19).replace('T', ' ');
  console.log(`[getPastDate] ${minutesAgo}분 전:`, str);
  return str;
}
export const testItems: ItemType[] = [
  {
    id: '1',
    type: '잃어버림',
    title: '검정색 지갑을 잃어버렸어요',
    desc: '강남역 근처에서 검정색 지갑을 잃어버렸습니다. 안에 신분증과 카드가 들어있어요.',
    date: getPastDate(5), // 5분 전
    place: '강남역',
    lat: 37.4979,
    lng: 127.0276,
    image: [
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    ],
  },
  {
    id: '2',
    type: '발견',
    title: '강아지를 발견했습니다',
    desc: '공원에서 작은 흰색 강아지를 발견했어요. 주인을 찾습니다.',
    date: getPastDate(60), // 1시간 전
    place: '한강공원',
    lat: 37.5271,
    lng: 126.9326,
    image: [
      'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    ],
  },
  {
    id: '3',
    type: '잃어버림',
    title: '에어팟 분실',
    desc: '카페에서 에어팟을 두고 온 것 같습니다. 흰색 케이스입니다.',
    date: getPastDate(180), // 3시간 전
    place: '스타벅스 시청점',
    lat: 37.5663,
    lng: 126.9779,
    image: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    ],
  },
  {
    id: '4',
    type: '발견',
    title: '지갑을 주웠어요',
    desc: '버스 정류장에서 갈색 지갑을 주웠습니다. 연락 주세요.',
    date: getPastDate(1440), // 1일 전
    place: '서울역 버스정류장',
    lat: 37.5547,
    lng: 126.9706,
    image: [
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    ],
  },
  // 실제 테스트를 위해 강남역 근처(내 위치)와 매우 가까운 데이터 추가
  {
    id: '5',
    type: '잃어버림',
    title: '파란색 우산을 잃어버렸어요',
    desc: '강남역 11번 출구 근처에서 파란색 우산을 분실했습니다.',
    date: getPastDate(2880), // 2일 전
    place: '강남역 11번 출구',
    lat: 37.4981,
    lng: 127.0276,
    image: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    ],
  },
  {
    id: '6',
    type: '발견',
    title: '지하철에서 이어폰을 주웠어요',
    desc: '2호선 강남역 방면 열차에서 이어폰을 발견했습니다.',
    date: getPastDate(10), // 10분 전
    place: '강남역 2호선',
    lat: 37.4979,
    lng: 127.0280,
    image: [
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80',
    ],
  },
  {
    id: '7',
    type: '잃어버림',
    title: '노트북 가방을 잃어버렸어요',
    desc: '구로디지털단지역 근처에서 검정색 노트북 가방을 분실했습니다.',
    date: getPastDate(30), // 30분 전
    place: '구로디지털단지역',
    lat: 37.4850,
    lng: 126.9015,
    image: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    ],
  },
  {
    id: '8',
    type: '발견',
    title: '지갑을 주웠어요',
    desc: '신대방삼거리역 2번 출구 앞에서 갈색 지갑을 발견했습니다.',
    date: getPastDate(7200), // 5일 전
    place: '신대방삼거리역',
    lat: 37.4992,
    lng: 126.9286,
    image: [
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
    ],
  },
];

const typeOptions = ['전체', '잃어버림', '발견'];
const sortOptions = ['최신순', '오래된순'];

export type ItemType = {
  id: string;
  type: string;
  title: string;
  desc: string;
  date: string;
  place: string;
  lat: number;
  lng: number;
  image: string | string[];
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

const areaOptions = [
  { key: 'near5', label: '주변 5km' },
  { key: 'near10', label: '주변 10km' },
  { key: 'seoul', label: '서울 전체' },
  { key: 'gyeonggi', label: '경기도 전체' },
];

// 상대적 시간 포맷 함수 (NaN 방지 및 포맷 개선)
function getRelativeTime(dateString: string): string {
  const now = new Date();
  let date: Date;
  try {
    date = new Date(dateString.replace(/-/g, '/'));
    if (isNaN(date.getTime())) throw new Error('Invalid date');
  } catch {
    return '방금 등록';
  }
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return '방금 등록';
  if (diffMin < 60) return `${diffMin}분 전`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour}시간 전`;
  const diffDay = Math.floor(diffHour / 24);
  return `${diffDay}일 전`;
}

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('전체');
  const [selectedSort, setSelectedSort] = useState('최신순');
  const [location, setLocation] = useState('');
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [locationFilterActive, setLocationFilterActive] = useState(false);
  const [selectedArea, setSelectedArea] = useState('near5');
  const [areaSelectOpen, setAreaSelectOpen] = useState(false);
  const [typeSelectOpen, setTypeSelectOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [newItem, setNewItem] = useState({
    type: '잃어버림',
    title: '',
    desc: '',
    place: '',
    image: '',
  });
  const [items, setItems] = useState<ItemType[]>(testItems);
  const router = useRouter();

  // 지역별 필터링 함수
  function filterByArea(items: ItemType[]): ItemType[] {
    if (selectedArea === 'near5' && userLocation) {
      return items.filter((item: ItemType) => {
        if (!item.lat || !item.lng) return false;
        const dist = getDistanceFromLatLonInKm(userLocation.latitude, userLocation.longitude, item.lat, item.lng);
        return dist <= 5;
      });
    }
    if (selectedArea === 'near10' && userLocation) {
      return items.filter((item: ItemType) => {
        if (!item.lat || !item.lng) return false;
        const dist = getDistanceFromLatLonInKm(userLocation.latitude, userLocation.longitude, item.lat, item.lng);
        return dist <= 10;
      });
    }
    if (selectedArea === 'seoul') {
      // 서울시 대략적 범위: 위도 37.4133~37.7151, 경도 126.7341~127.2693
      return items.filter((item: ItemType) =>
        item.lat >= 37.4133 && item.lat <= 37.7151 &&
        item.lng >= 126.7341 && item.lng <= 127.2693
      );
    }
    if (selectedArea === 'gyeonggi') {
      // 경기도 대략적 범위: 위도 36.8931~38.3076, 경도 126.1172~127.8723
      return items.filter((item: ItemType) =>
        item.lat >= 36.8931 && item.lat <= 38.3076 &&
        item.lng >= 126.1172 && item.lng <= 127.8723
      );
    }
    return items;
  }

  // 글 목록 필터링 (items 사용)
  let filtered = items.filter(item =>
    selectedType === '전체' || item.type === selectedType
  );
  filtered = filterByArea(filtered);

  // 주변 위치 갱신 핸들러 (위치 권한 요청 및 userLocation 갱신)
  const handleUpdateLocation = async () => {
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
      const msg = `내 위치\n위도: ${coords.latitude}\n경도: ${coords.longitude}`;
      Alert.alert('내 위치', msg);
      console.log('[내 위치]', coords);
    } catch (e) {
      Alert.alert('현위치 정보를 가져올 수 없습니다.');
    }
  };

  // 등록하기 핸들러
  const handleRegister = () => {
    if (!newItem.title || !newItem.desc || !newItem.place) {
      Alert.alert('제목, 내용, 장소를 모두 입력해 주세요.');
      return;
    }
    const now = new Date();
    setItems([
      {
        id: String(Date.now()),
        type: newItem.type,
        title: newItem.title,
        desc: newItem.desc,
        date: now.toISOString().slice(0, 19).replace('T', ' '),
        place: newItem.place,
        lat: userLocation?.latitude || 37.5,
        lng: userLocation?.longitude || 127.0,
        image: newItem.image || 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
      },
      ...items,
    ]);
    setModalVisible(false);
    setNewItem({ type: '잃어버림', title: '', desc: '', place: '', image: '' });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 상단: 드롭다운 2개 왼쪽, 등록하기 오른쪽, 좌우 여백 추가 */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8, paddingHorizontal: 16 }}>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          {/* 5km/10km 드롭다운 */}
          <View style={{ marginRight: 8 }}>
            <TouchableOpacity
              style={{
                paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, minWidth: 80,
                backgroundColor: '#eee', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
              }}
              onPress={() => setAreaSelectOpen(!areaSelectOpen)}
            >
              <Text style={{ color: '#333', fontWeight: 'bold' }}>{areaOptions.find(opt => opt.key === selectedArea)?.label}</Text>
              <Text style={{ marginLeft: 6, color: '#888' }}>{areaSelectOpen ? '▲' : '▼'}</Text>
            </TouchableOpacity>
            {areaSelectOpen && (
              <View style={{ position: 'absolute', top: 44, left: 0, right: 0, backgroundColor: 'white', borderRadius: 12, elevation: 4, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8, zIndex: 10 }}>
                {areaOptions.filter(opt => opt.key === 'near5' || opt.key === 'near10').map(opt => (
                  <Pressable
                    key={opt.key}
                    style={{ padding: 12, backgroundColor: selectedArea === opt.key ? '#00C85122' : 'transparent', borderRadius: 12 }}
                    onPress={() => { setSelectedArea(opt.key); setAreaSelectOpen(false); }}
                  >
                    <Text style={{ color: selectedArea === opt.key ? '#00C851' : '#333', fontWeight: selectedArea === opt.key ? 'bold' : 'normal' }}>{opt.label}</Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>
          {/* 전체/잃어버림/발견 드롭다운 */}
          <View style={{ marginRight: 8 }}>
            <TouchableOpacity
              style={{
                paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, minWidth: 80,
                backgroundColor: '#eee', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
              }}
              onPress={() => setTypeSelectOpen(!typeSelectOpen)}
            >
              <Text style={{ color: '#333', fontWeight: 'bold' }}>{selectedType}</Text>
              <Text style={{ marginLeft: 6, color: '#888' }}>{typeSelectOpen ? '▲' : '▼'}</Text>
            </TouchableOpacity>
            {typeSelectOpen && (
              <View style={{ position: 'absolute', top: 44, left: 0, right: 0, backgroundColor: 'white', borderRadius: 12, elevation: 4, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8, zIndex: 10 }}>
                {typeOptions.map(type => (
                  <Pressable
                    key={type}
                    style={{ padding: 12, backgroundColor: selectedType === type ? '#00C85122' : 'transparent', borderRadius: 12 }}
                    onPress={() => { setSelectedType(type); setTypeSelectOpen(false); }}
                  >
                    <Text style={{ color: selectedType === type ? '#00C851' : '#333', fontWeight: selectedType === type ? 'bold' : 'normal' }}>{type}</Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>
        </View>
        {/* 등록하기 오른쪽 정렬, 오른쪽 여백 */}
        <TouchableOpacity onPress={() => setModalVisible(true)} style={{ paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: '#00C851', marginLeft: 'auto', marginRight: 4 }}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>등록하기</Text>
        </TouchableOpacity>
      </View>
      {/* 등록 폼 Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={{ flex: 1, backgroundColor: '#0008', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', borderRadius: 16, padding: 24, width: 320 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 12 }}>새 글 등록</Text>
            {/* 유형 선택 */}
            <View style={{ flexDirection: 'row', marginBottom: 8 }}>
              {typeOptions.map(type => (
                <TouchableOpacity
                  key={type}
                  style={{
                    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, marginRight: 8,
                    backgroundColor: newItem.type === type ? '#00C851' : '#eee',
                  }}
                  onPress={() => setNewItem({ ...newItem, type })}
                >
                  <Text style={{ color: newItem.type === type ? 'white' : '#333', fontWeight: 'bold' }}>{type}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TextInput
              placeholder="제목"
              value={newItem.title}
              onChangeText={t => setNewItem({ ...newItem, title: t })}
              style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, marginBottom: 8, padding: 8 }}
            />
            <TextInput
              placeholder="내용"
              value={newItem.desc}
              onChangeText={t => setNewItem({ ...newItem, desc: t })}
              style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, marginBottom: 8, padding: 8, height: 60, textAlignVertical: 'top' }}
              multiline
            />
            <TextInput
              placeholder="장소"
              value={newItem.place}
              onChangeText={t => setNewItem({ ...newItem, place: t })}
              style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, marginBottom: 8, padding: 8 }}
            />
            <TextInput
              placeholder="이미지 URL (선택)"
              value={newItem.image}
              onChangeText={t => setNewItem({ ...newItem, image: t })}
              style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, marginBottom: 8, padding: 8 }}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginRight: 12 }}>
                <Text style={{ color: '#888', fontWeight: 'bold' }}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleRegister}>
                <Text style={{ color: '#00C851', fontWeight: 'bold' }}>등록</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* 글 목록 */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={{ flexDirection: 'row', alignItems: 'center', padding: 12, marginBottom: 0, borderBottomColor: '#eee', borderBottomWidth: 1 }}
            onPress={() => {
              router.push({ pathname: '../detail/[id]', params: { id: item.id } });
            }}
          >
            {/* 왼쪽: 이미지(여러 개면 horizontal 스크롤) */}
            <View style={{ width: 130, height: 130, marginRight: 2 }}>
              <Image
                source={
                  item.image && ((Array.isArray(item.image) && item.image[0]) || (!Array.isArray(item.image) && item.image))
                    ? { uri: Array.isArray(item.image) ? item.image[0] : item.image }
                    : require('../../assets/images/icon.png')
                }
                style={{ width: 120, height: 120, borderRadius: 18 }}
                resizeMode="cover"
              />
            </View>
            {/* 오른쪽: 텍스트 정보 */}
            <View style={{ flex: 1, minWidth: 0 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                <Text style={[styles.type, item.type === '잃어버림' ? styles.lost : styles.found, { marginRight: 8, fontSize: 15 }]}>{item.type}</Text>
                <Text
                  style={[styles.date, { minWidth: 60, maxWidth: 120, textAlign: 'right', overflow: 'visible', flexShrink: 0, flexGrow: 0, fontWeight: 'bold', color: '#888', fontSize: 13 }]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {getRelativeTime(item.date)}
                </Text>
              </View>
              <Text style={[styles.itemTitle, { fontSize: 18, fontWeight: 'bold', marginBottom: 2 }]} numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>
              <Text 
                style={[styles.desc, { fontSize: 14, color: '#444' }]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.desc}
              </Text>
              <Text style={[styles.place, { fontSize: 13, color: '#888', marginTop: 2 }]} numberOfLines={1} ellipsizeMode="tail">장소: {item.place}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>해당 지역/반경에 글이 없습니다.</Text>
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