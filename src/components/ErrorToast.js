import { Alert } from 'react-native';

export const showError = (message) => Alert.alert('Error', message);
export const showSuccess = (message) => Alert.alert('Success', message);
