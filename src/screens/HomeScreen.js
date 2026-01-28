import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';

const dummyData = [
  { id: '1', title: 'Welcome to Home', desc: 'Dummy card 1' },
  { id: '2', title: 'Feature List', desc: 'Dummy card 2' },
];

const HomeScreen = () => {
  const { user, logout } = useAuth();

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text>{item.desc}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome, {user?.name}!</Text>
      <FlatList data={dummyData} renderItem={renderItem} keyExtractor={(item) => item.id} />
      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  welcome: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: { backgroundColor: '#f0f0f0', padding: 15, marginBottom: 10, borderRadius: 8 },
  cardTitle: { fontWeight: 'bold' },
  logoutBtn: { backgroundColor: '#FF3B30', padding: 15, borderRadius: 5, marginTop: 20 },
  logoutText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
});

export default HomeScreen;
