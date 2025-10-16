import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  StatusBar,
  BackHandler,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../../theme';
import { ScoreSummaryCard } from '../../components/cards/ScoreSummaryCard';
import ProgressCircleCard from '../../components/cards/ProgressCircleCard';
import CategoryScoreCard from '../../components/cards/CategoryScoreCard';
import RankCard from '../../components/cards/RankCard';
import { LineChart } from 'react-native-chart-kit';

const { width: screenWidth } = Dimensions.get('window');

const ScoreDetailScreen: React.FC = () => {
  const navigation = useNavigation();

  // 뒤로가기 핸들러
  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      // 이전 페이지가 없는 경우 홈으로 이동
      navigation.navigate('Home');
    }
  };

  // Android 하드웨어 백 버튼 처리
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        handleBack();
        return true; // 이벤트 처리됨
      }
    );

    return () => backHandler.remove();
  }, []);

  // Enhanced monthly scores data
  const monthlyScores = {
    labels: ['6월', '7월', '8월', '9월', '10월'],
    datasets: [{
      data: [65, 72, 78, 75, 80],
      color: () => '#1884FF',
      strokeWidth: 3,
    }],
  };

  const chartConfig = {
    backgroundColor: '#FFFFFF',
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(24, 132, 255, ${opacity})`,
    labelColor: () => '#6B7280',
    strokeWidth: 3,
    propsForDots: {
      r: '6',
      strokeWidth: '3',
      stroke: '#1884FF',
      fill: '#FFFFFF',
    },
    propsForLabels: {
      fontSize: 12,
      fontWeight: '600',
    },
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
    paddingBottom: 20,
    formatYLabel: (value: string) => `${value}점`,
    formatXLabel: (value: string) => value,
    count: 5, // Y축 그리드 라인 수
    fromZero: true, // Y축을 0부터 시작
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={handleBack}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>전체 성적</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Summary Cards */}
        <View style={styles.summaryRow}>
          <ScoreSummaryCard totalScore={495} averageScore={71} />
          <ProgressCircleCard score={80} />
        </View>

        {/* Category Scores */}
        <View style={styles.section}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>항목별 점수</Text>
          </View>
          
          <CategoryScoreCard
            title="주사 부위 선정"
            score={87}
            maxScore={100}
            onPress={() => console.log('주사 부위 선정 상세')}
          />
          <CategoryScoreCard
            title="약물 투약"
            score={88}
            maxScore={100}
            onPress={() => console.log('약물 투약 상세')}
          />
          <CategoryScoreCard
            title="환자 안전"
            score={92}
            maxScore={100}
            onPress={() => console.log('환자 안전 상세')}
          />
          <CategoryScoreCard
            title="의사소통"
            score={78}
            maxScore={100}
            improvementTip="환자와의 소통 시 공감적 경청을 연습해보세요"
            onPress={() => console.log('의사소통 상세')}
          />
          <CategoryScoreCard
            title="응급처치"
            score={82}
            maxScore={100}
            onPress={() => console.log('응급처치 상세')}
          />
        </View>

        {/* Growth Chart */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>5개월 성장 추이</Text>
            <TouchableOpacity style={styles.insightButton}>
              <Text style={styles.insightButtonText}>📊 인사이트</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.chartContainer}>
            <LineChart
              data={monthlyScores}
              width={screenWidth - 100}
              height={220}
              chartConfig={chartConfig}
              bezier
              withInnerLines={true}
              withOuterLines={true}
              withVerticalLines={true}
              withHorizontalLines={true}
              withVerticalLabels={true}
              withHorizontalLabels={true}
              style={styles.chart}
            />
            {/* Chart Insights */}
            <View style={styles.chartInsights}>
              <View style={styles.insightItem}>
                <Text style={styles.insightLabel}>최고점</Text>
                <Text style={styles.insightValue}>80점 (10월)</Text>
              </View>
              <View style={styles.insightItem}>
                <Text style={styles.insightLabel}>평균</Text>
                <Text style={styles.insightValue}>74점</Text>
              </View>
              <View style={styles.insightItem}>
                <Text style={styles.insightLabel}>성장률</Text>
                <Text style={styles.insightValue}>+15점</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Rank Info */}
        <View style={styles.section}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>반 순위</Text>
          </View>
          <RankCard 
            rank={3} 
            totalStudents={45} 
            percentile={93}
            rankChange={2}
            myScore={80}
            classAverage={72}
          />
        </View>

        {/* Action Items */}
        <View style={styles.section}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>다음 목표</Text>
          </View>
          
          <View style={styles.actionCard}>
            <View style={styles.actionHeader}>
              <Text style={styles.actionTitle}>의사소통 점수 향상</Text>
              <Text style={styles.actionTarget}>78점 → 85점</Text>
            </View>
            <Text style={styles.actionDescription}>
              환자와의 소통 능력을 개선하여 상위 10% 진입을 목표로 합니다.
            </Text>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>학습 계획 보기</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.actionCard}>
            <View style={styles.actionHeader}>
              <Text style={styles.actionTitle}>추천 학습 콘텐츠</Text>
              <Text style={styles.actionBadge}>NEW</Text>
            </View>
            <Text style={styles.actionDescription}>
              의사소통 스킬 향상을 위한 맞춤형 학습 콘텐츠를 추천합니다.
            </Text>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>학습 시작하기</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />

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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: '#1A1F2E',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1F2E',
  },
  headerSpacer: {
    width: 40,
  },
  summaryRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 24,
    marginBottom: 24,
    gap: 16, // 카드 간격을 16px로 증가
  },
  section: {
    marginTop: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitleContainer: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1F2E',
  },
  insightButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F0F7FF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1884FF',
  },
  insightButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1884FF',
  },
  chartContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  chart: {
    borderRadius: 16,
  },
  chartInsights: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    marginTop: 16,
  },
  insightItem: {
    alignItems: 'center',
    flex: 1,
  },
  insightLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  insightValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1F2E',
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 12,
  },
  actionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1F2E',
  },
  actionTarget: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1884FF',
  },
  actionBadge: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
    backgroundColor: '#EF4444',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  actionDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: '#1884FF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  bottomSpacing: {
    height: 40,
  },
});

export default ScoreDetailScreen;
