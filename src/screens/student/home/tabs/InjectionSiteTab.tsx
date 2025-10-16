import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  FlatList,
  Dimensions,
  Alert,
  Animated,
  SafeAreaView,
} from 'react-native';
import { colors, typography, spacing } from '../../../../theme';
import { webScrollStyles, webTouchProps } from '../../../../styles/webStyles';
import { Icon } from '../../../../components/icons';
import AnatomyDiagram from '../../../../components/injection/AnatomyDiagram';
import SiteScoreCard from '../../../../components/injection/SiteScoreCard';
import PracticeResultCard from '../../../../components/injection/PracticeResultCard';
import AccuracyCard from '../../../../components/injection/AccuracyCard';
import PracticeCard from '../../../../components/injection/PracticeCard';

const { width } = Dimensions.get('window');

// TypeScript interfaces
interface InjectionSite {
  name: string;
  nameEn: string;
  score: number;
  color: string;
  lastPractice: string;
}

interface PracticeResult {
  id: string;
  type: string;
  site: string;
  date: string;
  time: string;
  score: number;
  status: 'success' | 'warning';
  feedback: string;
}

interface ImprovementArea {
  site: string;
  score: number;
  recommendation: string;
}

interface LearningResource {
  id: string;
  title: string;
  duration: string;
  type: string;
  icon: string;
}

interface InjectionSiteData {
  sites: InjectionSite[];
  recentPractices: PracticeResult[];
  improvements: ImprovementArea[];
  learningResources: LearningResource[];
  statistics: {
    totalPractices: number;
    averageScore: number;
    accuracy: number;
  };
}

interface InjectionSiteTabProps {
  onRefresh?: () => void;
}

const InjectionSiteTab: React.FC<InjectionSiteTabProps> = ({ onRefresh }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  // Mock data
  const injectionData: InjectionSiteData = {
    sites: [
      { name: '삼각근', nameEn: 'Deltoid', score: 95, color: '#10B981', lastPractice: '2025.10.15' },
      { name: '복부', nameEn: 'Abdomen', score: 88, color: '#A5F3E3', lastPractice: '2025.10.14' },
      { name: '대퇴부', nameEn: 'Thigh', score: 82, color: '#A5F3E3', lastPractice: '2025.10.12' },
      { name: '둔부', nameEn: 'Gluteal', score: 78, color: '#FACC15', lastPractice: '2025.10.10' },
    ],
    recentPractices: [
      {
        id: '1',
        type: 'IM Injection',
        site: 'Deltoid',
        date: '2025.10.15',
        time: '14:30',
        score: 95,
        status: 'success',
        feedback: '정확한 부위 선정',
      },
      {
        id: '2',
        type: 'Subcutaneous',
        site: 'Abdomen',
        date: '2025.10.14',
        time: '10:20',
        score: 88,
        status: 'success',
        feedback: '각도 조정 필요',
      },
      {
        id: '3',
        type: 'IM Injection',
        site: 'Thigh',
        date: '2025.10.12',
        time: '16:45',
        score: 82,
        status: 'warning',
        feedback: '부위 재확인 권장',
      },
    ],
    improvements: [
      {
        site: '둔부 주사 (Gluteal)',
        score: 78,
        recommendation: '해부학적 랜드마크 재학습',
      },
      {
        site: '대퇴부 주사 (Thigh)',
        score: 82,
        recommendation: '각도와 깊이 연습 필요',
      },
    ],
    learningResources: [
      {
        id: '1',
        title: '둔부 주사 부위 선정 가이드',
        duration: '15분',
        type: '해부학 복습',
        icon: 'book',
      },
      {
        id: '2',
        title: '대퇴부 IM 주사 시뮬레이션',
        duration: '12분',
        type: 'VR 실습',
        icon: 'video',
      },
    ],
    statistics: {
      totalPractices: 24,
      averageScore: 86,
      accuracy: 91,
    },
  };

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
      onRefresh?.();
    }, 2000);
  }, [onRefresh]);

  const handleSitePress = (site: InjectionSite) => {
    Alert.alert(
      `${site.name} (${site.nameEn})`,
      `최근 점수: ${site.score}점\n마지막 실습: ${site.lastPractice}`
    );
  };

  const handlePracticePress = (practice: PracticeResult) => {
    Alert.alert(
      '실습 상세',
      `${practice.type} - ${practice.site}\n점수: ${practice.score}점\n피드백: ${practice.feedback}`
    );
  };

  const handleLearningPress = (resource: LearningResource) => {
    Alert.alert('학습 시작', `${resource.title} 학습을 시작하시겠습니까?`);
  };


  const handleAnatomyReview = () => {
    Alert.alert('해부학 복습', '해부학 복습을 시작하시겠습니까?');
  };

  const renderSiteItem = ({ item }: { item: InjectionSite }) => (
    <SiteScoreCard
      site={item}
      onPress={() => handleSitePress(item)}
    />
  );

  const renderPracticeItem = ({ item }: { item: PracticeResult }) => (
    <PracticeResultCard
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
        <View style={styles.learningIconContainer}>
          <Icon name={item.icon} size={24} color={colors.primary.base} />
        </View>
        <View style={styles.learningText}>
          <Text style={styles.learningTitle}>{item.title}</Text>
          <Text style={styles.learningSubtitle}>
            {item.duration} · {item.type}
          </Text>
        </View>
      </View>
      <View style={styles.learningArrowContainer}>
        <Icon name="arrowRight" size={16} color={colors.textSecondary} />
      </View>
    </TouchableOpacity>
  );

  const renderImprovementItem = ({ item }: { item: ImprovementArea }) => (
    <View style={styles.improvementItem}>
      <View style={styles.improvementHeader}>
        <Text style={styles.improvementSite}>• {item.site}</Text>
        <Text style={styles.improvementScore}>{item.score}점</Text>
      </View>
      <Text style={styles.improvementRecommendation}>
        → {item.recommendation}
      </Text>
    </View>
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
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>주사 부위 선정</Text>
        </View>

        {/* Body Diagram Card */}
        <View style={styles.diagramCard}>
          <Text style={styles.cardTitle}>인체 부위별 정확도</Text>
          <AnatomyDiagram sites={injectionData.sites} />
        </View>

        {/* Accuracy List Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>부위별 상세 정확도</Text>
          
          <AccuracyCard
            name="삼각근 (Deltoid)"
            nameEn="Deltoid"
            score={95}
            color="#10B981"
          />
          
          <AccuracyCard
            name="복부 (Abdomen)"
            nameEn="Abdomen"
            score={88}
            color="#1884FF"
          />
          
          <AccuracyCard
            name="대퇴부 (Thigh)"
            nameEn="Thigh"
            score={82}
            color="#1884FF"
          />
          
          <AccuracyCard
            name="둔부 (Gluteal)"
            nameEn="Gluteal"
            score={78}
            color="#F59E0B"
          />
        </View>

        {/* Recent Practice Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>최근 실습 기록</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>전체보기 ›</Text>
            </TouchableOpacity>
          </View>
          
          <PracticeCard
            icon="💉"
            title="IM Injection - Deltoid"
            date="2025.10.15"
            score={95}
            status="completed"
          />
          
          <PracticeCard
            icon="💉"
            title="Subcutaneous - Abdomen"
            date="2025.10.14"
            score={88}
            status="completed"
          />
          
          <PracticeCard
            icon="💉"
            title="IM Injection - Thigh"
            date="2025.10.12"
            score={82}
            status="warning"
          />
        </View>

        <View style={{ height: 60 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1F2E',
  },
  diagramCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1F2E',
    marginBottom: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1F2E',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1884FF',
  },
});

export default InjectionSiteTab;
