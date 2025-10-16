import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  FlatList,
  Alert,
  Animated,
} from 'react-native';
import { colors, typography, spacing } from '../../../../theme';
import { webScrollStyles, webTouchProps } from '../../../../styles/webStyles';
import CategoryScoreBar from '../../../../components/medication/CategoryScoreBar';
import FiveRightsCard from '../../../../components/medication/FiveRightsCard';
import DosageCalculationChart from '../../../../components/medication/DosageCalculationChart';
import MedicationPracticeCard from '../../../../components/medication/MedicationPracticeCard';

// TypeScript interfaces
interface MedicationCategory {
  name: string;
  icon: string;
  score: number;
  color: string;
}

interface FiveRightsData {
  patient: number;
  medication: number;
  dose: number;
  route: number;
  time: number;
  overall: number;
}

interface MedicationPractice {
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
}

interface HighRiskMedication {
  name: string;
  score: number;
  recommendations: string[];
}

interface DosageCalculationData {
  accuracy: number;
  unitConversion: { correct: number; total: number };
  concentration: { correct: number; total: number };
  ivRate: { correct: number; total: number };
}

interface LearningResource {
  id: string;
  title: string;
  duration: string;
  type: string;
  icon: string;
}

interface MedicationData {
  categories: MedicationCategory[];
  fiveRights: FiveRightsData;
  recentPractices: MedicationPractice[];
  highRiskMeds: HighRiskMedication[];
  dosageCalculation: DosageCalculationData;
  learningResources: LearningResource[];
  statistics: {
    totalAdministrations: number;
    averageScore: number;
    fiveRCompliance: number;
  };
}

interface MedicationTabProps {
  onRefresh?: () => void;
  refreshing?: boolean;
}

const MedicationTab: React.FC<MedicationTabProps> = ({ 
  onRefresh, 
  refreshing = false 
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  // Mock data
  const medicationData: MedicationData = {
    categories: [
      { name: '항생제 (Antibiotics)', icon: '💊', score: 95, color: '#10B981' },
      { name: '진통제 (Analgesics)', icon: '💉', score: 88, color: '#A5F3E3' },
      { name: '항응고제 (Anticoagulants)', icon: '🩹', score: 82, color: '#A5F3E3' },
      { name: '인슐린 (Insulin)', icon: '⚕️', score: 78, color: '#FACC15' },
    ],
    fiveRights: {
      patient: 100,
      medication: 95,
      dose: 85,
      route: 92,
      time: 80,
      overall: 90,
    },
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
    ],
    highRiskMeds: [
      {
        name: '인슐린 (Insulin)',
        score: 78,
        recommendations: [
          '용량 계산 재학습',
          '투여 시간 준수 연습',
        ],
      },
      {
        name: '헤파린 (Heparin)',
        score: 75,
        recommendations: [
          'Double check 절차 복습',
          '항응고 모니터링 학습',
        ],
      },
    ],
    dosageCalculation: {
      accuracy: 86,
      unitConversion: { correct: 42, total: 50 },
      concentration: { correct: 38, total: 45 },
      ivRate: { correct: 35, total: 40 },
    },
    learningResources: [
      {
        id: '1',
        title: '인슐린 투여 가이드라인',
        duration: '20분',
        type: '고위험 약물',
        icon: '📚',
      },
      {
        id: '2',
        title: '약물 용량 계산 연습',
        duration: '15문제',
        type: 'Interactive Quiz',
        icon: '🧮',
      },
      {
        id: '3',
        title: 'IV Push 투약 시뮬레이션',
        duration: '10분',
        type: 'VR 실습',
        icon: '🎥',
      },
    ],
    statistics: {
      totalAdministrations: 28,
      averageScore: 87,
      fiveRCompliance: 90,
    },
  };

  const handleCategoryPress = (category: MedicationCategory) => {
    Alert.alert(
      category.name,
      `정확도: ${category.score}%\n이 카테고리에 대한 상세 정보를 확인하시겠습니까?`
    );
  };

  const handleFiveRightsPress = (right: string, score: number) => {
    Alert.alert(
      right,
      `준수율: ${score}%\n상세 정보를 확인하시겠습니까?`
    );
  };

  const handlePracticePress = (practice: MedicationPractice) => {
    Alert.alert(
      '투약 상세',
      `${practice.drugName} ${practice.dosage}\n점수: ${practice.score}점\n피드백: ${practice.feedback}`
    );
  };

  const handleHighRiskPress = (med: HighRiskMedication) => {
    Alert.alert(
      med.name,
      `점수: ${med.score}점\n권장사항:\n${med.recommendations.join('\n')}`
    );
  };

  const handleDosageCalculationPress = () => {
    Alert.alert('용량 계산', '용량 계산 연습을 시작하시겠습니까?');
  };

  const handleLearningPress = (resource: LearningResource) => {
    Alert.alert('학습 시작', `${resource.title} 학습을 시작하시겠습니까?`);
  };

  const handleDosagePractice = () => {
    Alert.alert('약물 계산 연습', '약물 계산 연습을 시작하시겠습니까?');
  };

  const handleHighRiskReview = () => {
    Alert.alert('고위험 약물 복습', '고위험 약물 복습을 시작하시겠습니까?');
  };

  const renderCategoryItem = ({ item }: { item: MedicationCategory }) => (
    <CategoryScoreBar
      category={item}
      onPress={() => handleCategoryPress(item)}
      delay={item.score * 5} // Stagger animation
    />
  );

  const renderPracticeItem = ({ item }: { item: MedicationPractice }) => (
    <MedicationPracticeCard
      practice={item}
      onPress={() => handlePracticePress(item)}
    />
  );

  const renderLearningItem = ({ item }: { item: LearningResource }) => (
    <TouchableOpacity
      style={styles.learningCard}
      onPress={() => handleLearningPress(item)}
    >
      <View style={styles.learningContent}>
        <Text style={styles.learningIcon}>{item.icon}</Text>
        <View style={styles.learningText}>
          <Text style={styles.learningTitle}>{item.title}</Text>
          <Text style={styles.learningSubtitle}>
            {item.duration} · {item.type}
          </Text>
        </View>
      </View>
      <Text style={styles.learningArrow}>›</Text>
    </TouchableOpacity>
  );

  const renderHighRiskItem = ({ item }: { item: HighRiskMedication }) => (
    <TouchableOpacity
      style={styles.highRiskItem}
      onPress={() => handleHighRiskPress(item)}
    >
      <View style={styles.highRiskHeader}>
        <Text style={styles.highRiskName}>• {item.name}</Text>
        <Text style={styles.highRiskScore}>{item.score}점</Text>
      </View>
      {item.recommendations.map((rec, index) => (
        <Text key={index} style={styles.highRiskRecommendation}>
          → {rec}
        </Text>
      ))}
    </TouchableOpacity>
  );

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
        style={[
          styles.scrollView,
          webScrollStyles.verticalScroll
        ]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        {...webTouchProps}
      >
        {/* Medication Categories Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>약물 종류별 투여 정확도</Text>
          <FlatList
            data={medicationData.categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.name}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* 5 Rights Section */}
        <View style={styles.section}>
          <FiveRightsCard
            data={medicationData.fiveRights}
            onItemPress={handleFiveRightsPress}
          />
        </View>

        {/* Recent Practices Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>최근 투약 실습</Text>
          <FlatList
            data={medicationData.recentPractices}
            renderItem={renderPracticeItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* High-Risk Medications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚠ 고위험 약물 관리</Text>
          <View style={styles.highRiskCard}>
            <FlatList
              data={medicationData.highRiskMeds}
              renderItem={renderHighRiskItem}
              keyExtractor={(item) => item.name}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>

        {/* Dosage Calculation Section */}
        <View style={styles.section}>
          <DosageCalculationChart
            data={medicationData.dosageCalculation}
            onPress={handleDosageCalculationPress}
          />
        </View>

        {/* Learning Resources Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>추천 학습 리소스</Text>
          <FlatList
            data={medicationData.learningResources}
            renderItem={renderLearningItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Statistics Summary */}
        <View style={styles.section}>
          <View style={styles.statisticsCard}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{medicationData.statistics.totalAdministrations}회</Text>
              <Text style={styles.statLabel}>총 투약</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{medicationData.statistics.averageScore}점</Text>
              <Text style={styles.statLabel}>평균 점수</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{medicationData.statistics.fiveRCompliance}%</Text>
              <Text style={styles.statLabel}>5R 준수</Text>
            </View>
          </View>
        </View>

        {/* Bottom Action Buttons */}
        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleDosagePractice}>
            <Text style={styles.primaryButtonText}>약물 계산 연습하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={handleHighRiskReview}>
            <Text style={styles.secondaryButtonText}>고위험 약물 복습</Text>
          </TouchableOpacity>
        </View>
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
  sectionTitle: {
    ...typography.textStyles.heading3,
    fontSize: 18,
    marginBottom: spacing.md,
    color: colors.textPrimary,
  },
  learningCard: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  learningContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  learningIcon: {
    fontSize: 24,
    marginRight: spacing.sm,
  },
  learningText: {
    flex: 1,
  },
  learningTitle: {
    ...typography.textStyles.body,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  learningSubtitle: {
    ...typography.textStyles.bodySmall,
    color: colors.textSecondary,
  },
  learningArrow: {
    fontSize: 20,
    color: colors.textSecondary,
    fontWeight: 'bold',
  },
  highRiskCard: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  highRiskItem: {
    marginBottom: spacing.md,
  },
  highRiskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  highRiskName: {
    ...typography.textStyles.body,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
  },
  highRiskScore: {
    ...typography.textStyles.bodySmall,
    fontWeight: typography.fontWeight.semibold,
    color: colors.warning,
  },
  highRiskRecommendation: {
    ...typography.textStyles.bodySmall,
    color: colors.textSecondary,
    marginLeft: spacing.sm,
    marginBottom: 2,
  },
  statisticsCard: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    ...typography.textStyles.heading2,
    fontSize: 24,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  statLabel: {
    ...typography.textStyles.bodySmall,
    color: colors.textSecondary,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
    marginHorizontal: spacing.sm,
  },
  buttonSection: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
  primaryButton: {
    flex: 1,
    height: spacing.component.buttonHeight.md,
    backgroundColor: '#007AFF', // Blue color for medication tab
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    ...typography.textStyles.body,
    color: colors.background,
    fontWeight: typography.fontWeight.semibold,
  },
  secondaryButton: {
    flex: 1,
    height: spacing.component.buttonHeight.md,
    backgroundColor: colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButtonText: {
    ...typography.textStyles.body,
    color: '#007AFF',
    fontWeight: typography.fontWeight.semibold,
  },
});

export default MedicationTab;
