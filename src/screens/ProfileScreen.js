import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (user) setProfile(user);
  }, [user]);

  const saveProfile = async () => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(profile));
      setEditing(false);
      Alert.alert('Success', 'Profile updated');
    } catch (e) {
      Alert.alert('Error', 'Update failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <TextInput
        style={[styles.input, !editing && styles.disabled]}
        value={profile.name}
        onChangeText={(v) => setProfile({ ...profile, name: v })}
        editable={editing}
        placeholder="Name"
      />
      <TextInput
        style={[styles.input, !editing && styles.disabled]}
        value={profile.email}
        onChangeText={(v) => setProfile({ ...profile, email: v })}
        editable={editing}
        placeholder="Email"
        keyboardType="email-address"
      />
      {editing ? (
        <TouchableOpacity style={styles.saveBtn} onPress={saveProfile}>
          <Text style={styles.btnText}>Save</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.editBtn} onPress={() => setEditing(true)}>
          <Text style={styles.btnText}>Edit Profile</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30 },
  input: { borderWidth: 1, padding: 15, marginBottom: 15, borderRadius: 8, backgroundColor: '#f9f9f9' },
  disabled: { backgroundColor: '#eee' },
  saveBtn: { backgroundColor: '#34C759', padding: 15, borderRadius: 8 },
  editBtn: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8 },
  btnText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
});

export default ProfileScreen;
