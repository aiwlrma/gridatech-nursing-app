import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { colors, typography, spacing } from '../../../theme';
import AppIcon from '../../../components/common/AppIcon';
import TabBar from '../../../components/navigation/TabBar';
// BottomTabBar removed - now handled by BottomTabNavigator
import ScreenGradient from '../../../components/common/ScreenGradient';
import { Icon } from '../../../components/icons';
import TossHomeScreen from './TossHomeScreen';
import InjectionSiteTab from './tabs/InjectionSiteTab';
import OverallTab from './tabs/OverallTab';
import MedicationTabMinimal from './tabs/MedicationTabMinimal';
import PatientSafetyTabImproved from './tabs/PatientSafetyTabImproved';
import TechnicalSkillsTab from './tabs/TechnicalSkillsTab';
import IconTest from '../../../components/test/IconTest';
import EmergencyCareTab from './tabs/EmergencyCareTab';
// HomeScreenProps removed - now using BottomTabNavigator types

const { width } = Dimensions.get('window');

interface HomeData {
  user: { name: string; studentId: string; year: number };
  weeklyProgress: { completed: number; total: number };
  score: number;
  recommendations: Array<{
    id: string;
    icon: string;
    title: string;
    subtitle: string;
  }>;
  strengths: string[];
  improvements: string[];
}

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  console.log('HomeScreen rendered');
  const [activeTab, setActiveTab] = useState(0); // "종합 순위" is active
  const [refreshing, setRefreshing] = useState(false);

  // Mock data
  const homeData: HomeData = {
    user: { name: '김간호', studentId: '202291930', year: 3 },
    weeklyProgress: { completed: 6, total: 10 },
    score: 80,
    recommendations: [
      { id: '1', icon: '문서', title: 'IM Injection Step 2', subtitle: '반복 학습 권장' },
      { id: '2', icon: '주사', title: 'IM Injection Step 3', subtitle: '반복 학습 권장' },
      { id: '3', icon: '목록', title: 'IM Injection Step 4', subtitle: '반복 학습 권장' },
    ],
    strengths: [
      '정확한 물품을 준비하였습니다.',
      '무균술에 대한 문제를 모두 맞췄습니다.',
      '안전한 간호를 제공하였습니다.',
    ],
    improvements: [
      '주사부위에 대한 정확한 지식이 필요합니다.',
      '해부학적 위치에대한 사전학습이 필요합니다.',
      '주사 약물 준비에 대한 연습이 필요합니다.',
    ],
  };

  const tabs = [
    '종합 순위', 
    '주사 부위 선정', 
    '약물 투약',
    '환자 안전',
    '기술 술기',
    '응급처치'
  ];

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleTabPress = (index: number) => {
    setActiveTab(index);
  };

  // Bottom tab navigation removed - now handled by BottomTabNavigator


  return (
    <ScreenGradient variant="primary">
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.userInfo}>
              <Text style={styles.greeting}>{homeData.user.name} 님</Text>
              <Text style={styles.userDetails}>
                {homeData.user.studentId}
              </Text>
            </View>
            <View style={styles.headerIcons}>
              <TouchableOpacity style={styles.iconButton}>
                <Icon name="bell" size={20} color={colors.textPrimary} />
                <View style={styles.badge} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Icon name="more" size={20} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Tab Navigation */}
        <TabBar
          tabs={tabs}
          activeTab={activeTab}
          onTabPress={handleTabPress}
        />

        {/* Content */}
        {activeTab === 0 ? (
          // Overall Tab Content
          <OverallTab 
            onRefresh={onRefresh} 
            refreshing={refreshing}
            homeData={homeData}
          />
        ) : activeTab === 1 ? (
          // Injection Site Tab Content
          <InjectionSiteTab onRefresh={onRefresh} />
        ) : activeTab === 2 ? (
          // Medication Tab Content
          <MedicationTabMinimal 
            onRefresh={onRefresh} 
            refreshing={refreshing}
          />
        ) : activeTab === 3 ? (
          // Patient Safety Tab Content
          <PatientSafetyTabImproved />
        ) : activeTab === 4 ? (
          // Technical Skills Tab Content
          <TechnicalSkillsTab 
            onRefresh={onRefresh} 
            refreshing={refreshing}
          />
        ) : activeTab === 5 ? (
          // Emergency Care Tab Content
          <EmergencyCareTab 
            onRefresh={onRefresh} 
            refreshing={refreshing}
          />
        ) : null}

        {/* Bottom Tab Bar removed - now handled by BottomTabNavigator */}
      </View>
    </ScreenGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: colors.backgroundTertiary,
    paddingTop: 50, // Status bar height
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  userDetails: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    position: 'relative',
  },
  icon: {
    fontSize: 20,
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.statusError,
  },
});

export default HomeScreen;
