import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';

const SignupScreen = ({ navigation }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '', username: '' });
  const { signup } = useAuth();

  const handleSignup = async () => {
    if (!credentials.email || !credentials.password || !credentials.username) return;
    const success = await signup(credentials);
    if (success) navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Username" value={credentials.username} onChangeText={(v) => setCredentials({ ...credentials, username: v })} />
      <TextInput style={styles.input} placeholder="Email" value={credentials.email} onChangeText={(v) => setCredentials({ ...credentials, email: v })} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password" value={credentials.password} onChangeText={(v) => setCredentials({ ...credentials, password: v })} secureTextEntry />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { borderWidth: 1, padding: 12, marginBottom: 10, borderRadius: 5 },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 5, marginBottom: 10 },
  buttonText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
  link: { textAlign: 'center', color: '#007AFF' },
});

export default SignupScreen;
