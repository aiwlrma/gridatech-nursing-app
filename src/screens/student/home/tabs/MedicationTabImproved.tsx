import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { colors, typography, spacing } from '../../../../theme';
import SummaryDashboard from '../../../../components/medication/SummaryDashboard';
import AlertSection from '../../../../components/medication/AlertSection';
import RecentPractices from '../../../../components/medication/RecentPractices';
import CategoryAccordion from '../../../../components/medication/CategoryAccordion';
import FiveRightsCompact from '../../../../components/medication/FiveRightsCompact';
import QuickLearning from '../../../../components/medication/QuickLearning';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// TypeScript interfaces
interface TrendData {
  current: number;
  previous: number;
  change: number;
  direction: 'up' | 'down' | 'stable';
  sparkline: number[];
}

interface ImprovedMedicationData {
  summary: {
    overallScore: number;
    trend: TrendData;
    quickStats: {
      totalPractices: number;
      fiveRCompliance: number;
      highestScore: number;
    };
  };
  alerts: Array<{
    medication: string;
    score: number;
    urgency: 'high' | 'medium';
    lastPractice: string;
    quickActions: Array<{
      label: string;
      action: () => void;
    }>;
  }>;
  recentPractices: Array<{
    id: string;
    drugType: string;
    drugName: string;
    dosage: string;
    route: string;
    date: string;
    time: string;
    score: number;
    status: 'success' | 'warning';
    feedback: string;
  }>;
  categories: Array<{
    name: string;
    icon: string;
    score: number;
    color: string;
  }>;
  fiveRights: {
    patient: number;
    medication: number;
    dose: number;
    route: number;
    time: number;
    overall: number;
  };
  learningResources: Array<{
    id: string;
    title: string;
    duration: string;
    type: string;
    icon: string;
  }>;
}

interface MedicationTabImprovedProps {
  onRefresh?: () => void;
  refreshing?: boolean;
}

const MedicationTabImproved: React.FC<MedicationTabImprovedProps> = ({ 
  onRefresh, 
  refreshing = false 
}) => {
  const [expanded, setExpanded] = useState({
    recentPractices: true,
    categoryBreakdown: false,
    fiveRightsDetail: false,
  });

  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Mock data with improved structure
  const medicationData: ImprovedMedicationData = {
    summary: {
      overallScore: 87,
      trend: {
        current: 87,
        previous: 84,
        change: 3,
        direction: 'up',
        sparkline: [82, 85, 84, 86, 87],
      },
      quickStats: {
        totalPractices: 28,
        fiveRCompliance: 90,
        highestScore: 95,
      },
    },
    alerts: [
      {
        medication: '인슐린 (Insulin)',
        score: 78,
        urgency: 'high',
        lastPractice: '3일 전',
        quickActions: [
          {
            label: '용량 계산 퀴즈',
            action: () => Alert.alert('퀴즈 시작', '인슐린 용량 계산 퀴즈를 시작합니다.'),
          },
          {
            label: '학습하기',
            action: () => Alert.alert('학습 시작', '인슐린 투여 학습을 시작합니다.'),
          },
        ],
      },
      {
        medication: 'Right Time 준수',
        score: 80,
        urgency: 'medium',
        lastPractice: '1일 전',
        quickActions: [
          {
            label: '시간 관리 연습',
            action: () => Alert.alert('연습 시작', '시간 관리 연습을 시작합니다.'),
          },
        ],
      },
    ],
    recentPractices: [
      {
        id: '1',
        drugType: 'Antibiotic',
        drugName: 'Ceftriaxone',
        dosage: '1g',
        route: 'IV Push',
        date: '2025.10.15',
        time: '14:30',
        score: 95,
        status: 'success',
        feedback: '정확한 투여',
      },
      {
        id: '2',
        drugType: 'Analgesic',
        drugName: 'Morphine',
        dosage: '10mg',
        route: 'IM',
        date: '2025.10.14',
        time: '10:20',
        score: 88,
        status: 'success',
        feedback: '용량 재확인 필요',
      },
      {
        id: '3',
        drugType: 'Insulin',
        drugName: 'Regular Insulin',
        dosage: '8U',
        route: 'Subcutaneous',
        date: '2025.10.12',
        time: '08:45',
        score: 82,
        status: 'warning',
        feedback: '투여 시간 준수 필요',
      },
      {
        id: '4',
        drugType: 'Anticoagulant',
        drugName: 'Heparin',
        dosage: '5000U',
        route: 'IV',
        date: '2025.10.11',
        time: '16:20',
        score: 85,
        status: 'success',
        feedback: 'Double check 완료',
      },
      {
        id: '5',
        drugType: 'Antibiotic',
        drugName: 'Vancomycin',
        dosage: '1g',
        route: 'IV',
        date: '2025.10.10',
        time: '12:15',
        score: 92,
        status: 'success',
        feedback: '정확한 투여',
      },
    ],
    categories: [
      { name: '항생제 (Antibiotics)', icon: '약', score: 95, color: '#10B981' },
      { name: '진통제 (Analgesics)', icon: '주', score: 88, color: '#3B82F6' },
      { name: '항응고제 (Anticoagulants)', icon: '응', score: 82, color: '#F59E0B' },
      { name: '인슐린 (Insulin)', icon: '인', score: 78, color: '#EF4444' },
    ],
    fiveRights: {
      patient: 100,
      medication: 95,
      dose: 85,
      route: 92,
      time: 80,
      overall: 90,
    },
    learningResources: [
      {
        id: '1',
        title: '인슐린 투여',
        duration: '15분',
        type: 'Interactive',
        icon: '주',
      },
      {
        id: '2',
        title: '용량 계산',
        duration: '20분',
        type: 'Quiz',
        icon: '계',
      },
      {
        id: '3',
        title: 'IV Push',
        duration: '10분',
        type: 'VR',
        icon: '영',
      },
    ],
  };

  const handleToggleSection = (section: keyof typeof expanded) => {
    LayoutAnimation.configureNext({
      duration: 300,
      create: { type: 'easeInEaseOut', property: 'opacity' },
      update: { type: 'easeInEaseOut' },
      delete: { type: 'easeInEaseOut', property: 'opacity' },
    });

    setExpanded(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleAlertAction = (action: () => void) => {
    action();
  };

  const handlePracticePress = (practice: any) => {
    Alert.alert(
      '투약 상세',
      `${practice.drugName} ${practice.dosage}\n점수: ${practice.score}점\n피드백: ${practice.feedback}`
    );
  };

  const handleCategoryPress = (category: any) => {
    Alert.alert(
      category.name,
      `정확도: ${category.score}%\n이 카테고리에 대한 상세 정보를 확인하시겠습니까?`
    );
  };

  const handleFiveRightsPress = () => {
    Alert.alert('5 Rights 상세', '5 Rights 준수율 상세 정보를 확인하시겠습니까?');
  };

  const handleLearningPress = (resource: any) => {
    Alert.alert('학습 시작', `${resource.title} 학습을 시작하시겠습니까?`);
  };

  // Animate on mount
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Summary Dashboard */}
        <View style={styles.section}>
          <SummaryDashboard
            data={medicationData.summary}
          />
        </View>

        {/* 2. Alert Section (High Priority) */}
        <View style={styles.section}>
          <AlertSection
            items={medicationData.alerts.map(alert => ({
              id: alert.medication,
              name: alert.medication,
              nameEn: alert.medication,
              score: alert.score,
              priority: alert.urgency,
              lastPractice: alert.lastPractice,
              category: '고위험 약물',
              actions: alert.quickActions.map(action => ({
                label: action.label,
                type: 'primary' as const,
                onPress: action.action,
              })),
            }))}
            loading={refreshing}
            error={undefined}
            onRetry={() => {
              // Retry logic here
              console.log('Retrying alert data...');
            }}
          />
        </View>

        {/* 3. Recent Practices (Collapsible) */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => handleToggleSection('recentPractices')}
            activeOpacity={0.7}
          >
            <Text style={styles.sectionTitle}>최근 투약 실습</Text>
            <Text style={styles.expandIcon}>
              {expanded.recentPractices ? '▼' : '▶'}
            </Text>
          </TouchableOpacity>
          
          {expanded.recentPractices && (
            <RecentPractices
              practices={medicationData.recentPractices}
              onPracticePress={handlePracticePress}
            />
          )}
        </View>

        {/* 4. Category Breakdown (Accordion) */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => handleToggleSection('categoryBreakdown')}
            activeOpacity={0.7}
          >
            <Text style={styles.sectionTitle}>약물 종류별 정확도</Text>
            <Text style={styles.expandIcon}>
              {expanded.categoryBreakdown ? '▼' : '▶'}
            </Text>
          </TouchableOpacity>
          
          {expanded.categoryBreakdown && (
            <CategoryAccordion
              categories={medicationData.categories}
              onCategoryPress={handleCategoryPress}
            />
          )}
        </View>

        {/* 5. 5 Rights Compact View */}
        <View style={styles.section}>
          <FiveRightsCompact
            data={medicationData.fiveRights}
            onPress={handleFiveRightsPress}
          />
        </View>

        {/* 6. Quick Learning */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>추천 학습</Text>
          <QuickLearning
            resources={medicationData.learningResources}
            onResourcePress={handleLearningPress}
          />
        </View>

        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: spacing.layout.screenPadding,
  },
  section: {
    marginTop: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingVertical: spacing.xs,
  },
  sectionTitle: {
    ...typography.textStyles.heading3,
    fontSize: 18,
    color: colors.textPrimary,
  },
  expandIcon: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: 'bold',
  },
});

export default MedicationTabImproved;
