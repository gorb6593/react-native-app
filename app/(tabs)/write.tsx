import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

export default function WriteScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>글쓰기</Text>
      <Text style={styles.desc}>여기서 잃어버린 물건/발견한 물건을 등록할 수 있습니다.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  desc: {
    fontSize: 16,
    color: '#666',
  },
}); 