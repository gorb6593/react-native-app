import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>잃어버린/발견한 물건 글 목록</Text>
      <Text style={styles.desc}>여기에 잃어버린 물건, 발견한 물건의 글 목록이 표시됩니다.</Text>
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