import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  FlatList,
  Alert,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../../../../theme';
import { webScrollStyles, webTouchProps } from '../../../../styles/webStyles';
import ScoreCard from '../../../../components/cards/ScoreCard';
import { ScoreSummaryCard } from '../../../../components/cards/ScoreSummaryCard';
import { LearningCard } from '../../../../components/cards/LearningCard';
import StatusCard from '../../../../components/cards/StatusCard';

interface OverallTabProps {
  onRefresh?: () => void;
  refreshing?: boolean;
  homeData: {
    score: number;
    recommendations: Array<{
      id: string;
      icon: string;
      title: string;
      subtitle: string;
    }>;
    strengths: string[];
    improvements: string[];
  };
}

const OverallTab: React.FC<OverallTabProps> = ({ 
  onRefresh, 
  refreshing = false, 
  homeData 
}) => {
  const navigation = useNavigation();
  const handleRecommendationPress = (item: any) => {
    Alert.alert('학습 시작', `${item.title} 학습을 시작하시겠습니까?`);
  };

  const handleMorePress = (section: string) => {
    if (section === '성적 요약') {
      navigation.navigate('ScoreDetail' as never);
    } else if (section === '맞춤 추천') {
      navigation.navigate('RecommendedDetail' as never);
    } else if (section === 'VR 시나리오') {
      navigation.navigate('VRScenarioList' as never);
    } else if (section === '평가 세부 내용') {
      navigation.navigate('EvaluationDetail' as never, { evaluationId: 'sample-evaluation-id' } as never);
    } else {
      Alert.alert('더보기', `${section} 상세 페이지로 이동합니다.`);
    }
  };

  const handleRetryLearning = () => {
    Alert.alert('다시 학습하기', '학습을 다시 시작하시겠습니까?');
  };

  const handleFeedbackCheck = () => {
    navigation.navigate('InstructorFeedback' as never, { evaluationId: 'sample-evaluation-id' } as never);
  };

  const renderRecommendationItem = ({ item }: { item: any }) => (
    <LearningCard
      icon={item.icon === '문서' ? 'document' : 'syringe'}
      label={item.icon}
      title={item.title}
      subtitle={item.subtitle}
      onPress={() => handleRecommendationPress(item)}
    />
  );

  return (
    <ScrollView
      style={[
        styles.content,
        webScrollStyles.verticalScroll
      ]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
      // 웹에서 스크롤 개선
      {...webTouchProps}
    >
      {/* 성적 요약 Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>성적 요약</Text>
          <TouchableOpacity onPress={() => handleMorePress('성적 요약')}>
            <Text style={styles.moreLink}>더보기 ›</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.summaryCards}>
          <ScoreSummaryCard 
            totalScore={495} 
            averageScore={71} 
          />
          <ScoreCard score={homeData.score} />
        </View>
      </View>

      {/* 맞춤 추천 Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionIcon}>💡</Text>
            <Text style={styles.sectionTitle}>맞춤 추천</Text>
          </View>
          <TouchableOpacity onPress={() => handleMorePress('맞춤 추천')}>
            <Text style={styles.moreLink}>전체보기 ›</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.recommendationCards}>
          <View style={styles.recommendationCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardIcon}>💉</Text>
              <View style={styles.recommendationBadge}>
                <Text style={styles.badgeText}>추천</Text>
              </View>
            </View>
            <Text style={styles.cardTitle}>IM Injection Step 2</Text>
            <Text style={styles.cardSubtitle}>반복 학습 권장</Text>
            <View style={styles.cardFooter}>
              <View style={styles.cardFooterLeft}>
                <Text style={styles.cardFooterIcon}>🥽</Text>
                <Text style={styles.cardFooterText}>VR</Text>
              </View>
              <Text style={styles.cardTime}>15분</Text>
            </View>
          </View>
          
          <View style={styles.recommendationCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardIcon}>📄</Text>
              <View style={styles.recommendationBadge}>
                <Text style={styles.badgeText}>추천</Text>
              </View>
            </View>
            <Text style={styles.cardTitle}>투약 5R 원칙</Text>
            <Text style={styles.cardSubtitle}>보완 필요</Text>
            <View style={styles.cardFooter}>
              <View style={styles.cardFooterLeft}>
                <Text style={styles.cardFooterIcon}>📄</Text>
                <Text style={styles.cardFooterText}>문서</Text>
              </View>
              <Text style={styles.cardTime}>5분</Text>
            </View>
          </View>
        </View>
      </View>

      {/* VR 시나리오 Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionIcon}>🥽</Text>
            <Text style={styles.sectionTitle}>VR 시나리오</Text>
          </View>
          <TouchableOpacity onPress={() => handleMorePress('VR 시나리오')}>
            <Text style={styles.moreLink}>전체보기 ›</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 평가 세부 내용 Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>평가 세부 내용</Text>
          <TouchableOpacity onPress={() => handleMorePress('평가 세부 내용')}>
            <Text style={styles.moreLink}>더보기 ›</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.statusCardsContainer}>
          <StatusCard
            type="strength"
            title="강점"
            items={homeData.strengths}
          />
          <StatusCard
            type="improvement"
            title="보완점"
            items={homeData.improvements}
          />
        </View>
      </View>

      {/* Bottom Buttons */}
      <View style={styles.buttonSection}>
        <TouchableOpacity style={styles.retryButton} onPress={handleRetryLearning}>
          <Text style={styles.retryButtonText}>다시 학습하기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.feedbackButton} onPress={handleFeedbackCheck}>
          <Text style={styles.feedbackButtonText}>교수자 피드백 확인</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  section: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionHeaderCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1F2E',
  },
  moreLink: {
    fontSize: 14,
    color: colors.primary.base,
    fontWeight: '600',
  },
  summaryCards: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 16, // 카드 간격을 16px로 증가
    marginBottom: 24,
  },
  statusCardsContainer: {
    paddingHorizontal: 20,
  },
  buttonSection: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 32,
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  retryButton: {
    flex: 1,
    height: 48,
    backgroundColor: colors.primary.base,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1884FF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 4,
  },
  retryButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  feedbackButton: {
    flex: 1,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(24, 132, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  feedbackButtonText: {
    fontSize: 16,
    color: colors.primary.base,
    fontWeight: '600',
  },
  recommendationCards: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  recommendationCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardIcon: {
    fontSize: 24,
  },
  recommendationBadge: {
    backgroundColor: colors.primary.base,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1F2E',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardFooterLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardFooterIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  cardFooterText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  cardTime: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
});

export default OverallTab;
