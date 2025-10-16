import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../../theme';
import VRCard from '../../components/cards/VRCard';
import CategoryChip from '../../components/common/CategoryChip';

interface VRScenario {
  id: string;
  title: string;
  difficulty: '기초' | '중급' | '고급';
  duration: string;
  score?: number;
  status: 'completed' | 'in-progress' | 'locked' | 'new';
  lockReason?: string;
  progress?: number;
  icon?: string;
}

const VRScenarioListScreen: React.FC = () => {
  const navigation = useNavigation();
  const [activeCategory, setActiveCategory] = useState('all');

  // Mock VR scenarios data
  const vrScenarios: VRScenario[] = [
    {
      id: '1',
      title: 'IM Injection - 기초',
      difficulty: '기초',
      duration: '15분',
      score: 87,
      status: 'completed',
      icon: '💉',
    },
    {
      id: '2',
      title: 'IV 삽입 술기',
      difficulty: '중급',
      duration: '20분',
      status: 'in-progress',
      progress: 60,
      icon: '💉',
    },
    {
      id: '3',
      title: 'CPR 시뮬레이션',
      difficulty: '중급',
      duration: '25분',
      status: 'locked',
      lockReason: 'IM Injection 완료 필요',
      icon: '🫀',
    },
    {
      id: '4',
      title: '환자 평가 - 고급',
      difficulty: '고급',
      duration: '30분',
      status: 'new',
      icon: '🩺',
    },
    {
      id: '5',
      title: '투약 관리 기본',
      difficulty: '기초',
      duration: '12분',
      score: 92,
      status: 'completed',
      icon: '💊',
    },
    {
      id: '6',
      title: '응급처치 프로토콜',
      difficulty: '고급',
      duration: '30분',
      status: 'locked',
      lockReason: 'IV 삽입 술기 완료 필요',
      icon: '🚨',
    },
    {
      id: '7',
      title: '환자 안전 체크리스트',
      difficulty: '기초',
      duration: '10분',
      status: 'new',
      icon: '✅',
    },
    {
      id: '8',
      title: '복합 투약 시나리오',
      difficulty: '고급',
      duration: '35분',
      status: 'locked',
      lockReason: '투약 관리 기본 완료 필요',
      icon: '💊',
    },
    {
      id: '9',
      title: '상처 관리 실습',
      difficulty: '중급',
      duration: '18분',
      status: 'in-progress',
      progress: 30,
      icon: '🩹',
    },
  ];

  const categories = [
    { key: 'all', title: '전체' },
    { key: 'basic', title: '기초' },
    { key: 'intermediate', title: '중급' },
    { key: 'advanced', title: '고급' },
  ];

  const filteredScenarios = useMemo(() => {
    if (activeCategory === 'all') {
      return vrScenarios;
    }
    
    const difficultyMap = {
      basic: '기초',
      intermediate: '중급',
      advanced: '고급',
    };
    
    return vrScenarios.filter(
      scenario => scenario.difficulty === difficultyMap[activeCategory as keyof typeof difficultyMap]
    );
  }, [activeCategory]);

  const handleScenarioPress = (scenario: VRScenario) => {
    if (scenario.status === 'locked') {
      return;
    }
    
    console.log(`Starting VR scenario: ${scenario.title}`);
    // TODO: Navigate to VR scenario detail or start screen
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>VR 시나리오</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Category Filter */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryContent}
      >
        {categories.map((category) => (
          <CategoryChip
            key={category.key}
            title={category.title}
            active={activeCategory === category.key}
            onPress={() => setActiveCategory(category.key)}
          />
        ))}
      </ScrollView>

      {/* VR Scenarios List */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filteredScenarios.map((scenario) => (
          <VRCard
            key={scenario.id}
            title={scenario.title}
            difficulty={scenario.difficulty}
            duration={scenario.duration}
            score={scenario.score}
            status={scenario.status}
            lockReason={scenario.lockReason}
            progress={scenario.progress}
            icon={scenario.icon}
            onPress={() => handleScenarioPress(scenario)}
          />
        ))}

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.unified.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.unified.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.unified.border,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: colors.background.secondary,
  },
  backIcon: {
    fontSize: 20,
    color: colors.unified.textPrimary,
    fontWeight: '600',
  },
  headerTitle: {
    ...typography.textStyles.subtitle,
    fontFamily: typography.fontFamily.semibold,
    color: colors.unified.textPrimary,
  },
  headerSpacer: {
    width: 40,
  },
  categoryScroll: {
    maxHeight: 60,
    backgroundColor: colors.unified.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.unified.border,
  },
  categoryContent: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: spacing.lg,
  },
  bottomSpacing: {
    height: spacing['2xl'],
  },
});

export default VRScenarioListScreen;
