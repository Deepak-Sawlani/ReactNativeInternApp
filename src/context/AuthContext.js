import React, { createContext, useState, useEffect, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import "../components/ErrorToast";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showError } from '../components/ErrorToast';
import Loader from '../components/Loader';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    restoreTokens();
  }, []);

  const restoreTokens = async () => {
    try {
      const access = await SecureStore.getItemAsync('accessToken');
      const refresh = await SecureStore.getItemAsync('refreshToken');
      const userData = await AsyncStorage.getItem('user');
      if (access && refresh && userData) {
        setAccessToken(access);
        setRefreshToken(refresh);
        setUser(JSON.parse(userData));
      }
    } catch (e) {
      console.error('Restore error:', e);
    } finally {
      setLoading(false);
    }
  };

  const mockLoginAPI = async (credentials) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      accessToken: `mock_access_${Date.now()}`,
      refreshToken: `mock_refresh_${Date.now()}`,
      user: { name: credentials.username || 'User', email: credentials.email },
    };
  };

  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await mockLoginAPI(credentials);
      await SecureStore.setItemAsync('accessToken', response.accessToken);
      await SecureStore.setItemAsync('refreshToken', response.refreshToken);
      await AsyncStorage.setItem('user', JSON.stringify(response.user));
      setAccessToken(response.accessToken);
      setRefreshToken(response.refreshToken);
      setUser(response.user);
      return true;
    } catch (e) {
      showError('Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (credentials) => {
    return await login({ ...credentials, username: credentials.email.split('@')[0] });
  };

  const refreshAccess = async () => {
    try {
      setLoading(true);
      // Simulate refresh
      await new Promise(resolve => setTimeout(resolve, 500));
      const newAccess = `mock_new_access_${Date.now()}`;
      await SecureStore.setItemAsync('accessToken', newAccess);
      setAccessToken(newAccess);
      return true;
    } catch (e) {
      logout();
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync('accessToken');
      await SecureStore.deleteItemAsync('refreshToken');
      await AsyncStorage.removeItem('user');
      setUser(null);
      setAccessToken(null);
      setRefreshToken(null);
    } catch (e) {
      console.error('Logout error:', e);
    }
  };

  const value = {
    user, login, signup, logout, refreshAccess, loading, isAuthenticated: !!user,
  };

  if (loading) return <Loader />;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
