import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme';
import { HomeIcon, GuideIcon, LearningIcon, SettingsIcon } from '../components/icons/TabIcons';

// Import screens
import HomeScreen from '../screens/student/home/HomeScreen';
import GuideScreen from '../screens/student/guide/GuideScreen';
import LearningScreen from '../screens/student/learning/LearningScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';

export type BottomTabParamList = {
  Home: undefined;
  Guide: undefined;
  Learning: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator: React.FC = () => {
  console.log('BottomTabNavigator rendered');
  const insets = useSafeAreaInsets();
  
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        unmountOnBlur: false, // 🔥 핵심: 탭 전환 시 화면 유지
        tabBarActiveTintColor: '#1884FF',      // 활성 색상
        tabBarInactiveTintColor: '#9CA3AF',   // 비활성 색상
        tabBarStyle: {
          height: 80 + insets.bottom,          // 높이 증가로 라벨 공간 확보
          paddingBottom: insets.bottom,        // 하단 SafeArea 패딩
          paddingTop: 12,                      // 상단 패딩 증가
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          elevation: 8,                        // Android 그림자
          shadowColor: '#000',                 // iOS 그림자
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 2,                        // 마진 조정
          marginBottom: 4,                     // 하단 마진 추가
        },
        tabBarIconStyle: {
          marginTop: 0,                        // 아이콘 마진 조정
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: '홈',
          tabBarIcon: ({ color }) => (
            <HomeIcon color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Guide"
        component={GuideScreen}
        options={{
          tabBarLabel: '가이드',
          tabBarIcon: ({ color }) => (
            <GuideIcon color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Learning"
        component={LearningScreen}
        options={{
          tabBarLabel: '학습',
          tabBarIcon: ({ color }) => (
            <LearningIcon color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: '설정',
          tabBarIcon: ({ color }) => (
            <SettingsIcon color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
