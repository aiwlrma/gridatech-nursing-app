import React from 'react';
import { Platform } from 'react-native';
import App from '../App';

// React Native Web에서 App 컴포넌트를 렌더링
export default function HomePage() {
  if (Platform.OS === 'web') {
    return <App />;
  }
  
  return <App />;
}
