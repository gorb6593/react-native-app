import React, { useState } from 'react';
import { FlatList, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// 테스트용 잃어버린/발견한 물건 데이터
const testItems = [
  {
    id: '1',
    type: '잃어버림',
    title: '검정색 지갑을 잃어버렸어요',
    desc: '강남역 근처에서 검정색 지갑을 잃어버렸습니다. 안에 신분증과 카드가 들어있어요.',
    date: '2024-06-01',
    place: '강남역',
  },
  {
    id: '2',
    type: '발견',
    title: '강아지를 발견했습니다',
    desc: '공원에서 작은 흰색 강아지를 발견했어요. 주인을 찾습니다.',
    date: '2024-06-02',
    place: '한강공원',
  },
  {
    id: '3',
    type: '잃어버림',
    title: '에어팟 분실',
    desc: '카페에서 에어팟을 두고 온 것 같습니다. 흰색 케이스입니다.',
    date: '2024-06-03',
    place: '스타벅스 시청점',
  },
  {
    id: '4',
    type: '발견',
    title: '지갑을 주웠어요',
    desc: '버스 정류장에서 갈색 지갑을 주웠습니다. 연락 주세요.',
    date: '2024-06-04',
    place: '서울역 버스정류장',
  },
];

const typeOptions = ['전체', '잃어버림', '발견'];
const sortOptions = ['최신순', '오래된순'];

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('전체');
  const [selectedSort, setSelectedSort] = useState('최신순');
  const [location, setLocation] = useState('');

  // 필터링 및 정렬
  let filtered = testItems.filter(item =>
    (selectedType === '전체' || item.type === selectedType) &&
    (search === '' || item.title.includes(search) || item.desc.includes(search)) &&
    (location === '' || item.place.includes(location))
  );
  if (selectedSort === '최신순') {
    filtered = filtered.sort((a, b) => b.date.localeCompare(a.date));
  } else {
    filtered = filtered.sort((a, b) => a.date.localeCompare(b.date));
  }

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
      {/* 지도에서 현위치 검색 버튼 */}
      <TouchableOpacity style={styles.mapButton} onPress={() => alert('지도에서 현위치 검색 기능은 준비 중입니다!')}>
        <Text style={styles.mapButtonText}>지도에서 현위치로 검색</Text>
      </TouchableOpacity>
      {/* 글 목록 */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <View style={styles.row}>
              <Text style={[styles.type, item.type === '잃어버림' ? styles.lost : styles.found]}>
                {item.type}
              </Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.desc}>{item.desc}</Text>
            <Text style={styles.place}>장소: {item.place}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>검색 결과가 없습니다.</Text>}
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