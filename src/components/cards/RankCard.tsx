import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface RankCardProps {
  rank: number;
  totalStudents: number;
  percentile: number;
  rankChange?: number; // 순위 변동 (양수: 상승, 음수: 하락)
  myScore?: number;
  classAverage?: number;
}

const RankCard: React.FC<RankCardProps> = ({
  rank,
  totalStudents,
  percentile,
  rankChange = 0,
  myScore = 80,
  classAverage = 72
}) => {
  const getRankChangeColor = () => {
    if (rankChange > 0) return '#10B981'; // 상승 - 초록색
    if (rankChange < 0) return '#EF4444'; // 하락 - 빨간색
    return '#6B7280'; // 변화 없음 - 회색
  };

  const getRankChangeIcon = () => {
    if (rankChange > 0) return '▲';
    if (rankChange < 0) return '▼';
    return '—';
  };

  return (
    <View style={styles.rankCard}>
      <View style={styles.rankRow}>
        <View style={styles.rankInfo}>
          <Text style={styles.rankLabel}>나의 순위</Text>
          <View style={styles.rankContainer}>
            <Text style={styles.rankText}>
              {rank}위 <Text style={styles.total}>/ {totalStudents}명</Text>
            </Text>
            {rankChange !== 0 && (
              <View style={[styles.rankChange, { backgroundColor: getRankChangeColor() }]}>
                <Text style={styles.rankChangeText}>
                  {getRankChangeIcon()}{Math.abs(rankChange)}
                </Text>
              </View>
            )}
          </View>
        </View>
        
        <View style={styles.percentileCircle}>
          <Text style={styles.percentileText}>상위</Text>
          <Text style={styles.percentileValue}>{percentile}%</Text>
        </View>
      </View>
      
      {/* Score Comparison */}
      <View style={styles.scoreComparison}>
        <View style={styles.scoreItem}>
          <Text style={styles.scoreLabel}>내 점수</Text>
          <Text style={styles.scoreValue}>{myScore}점</Text>
        </View>
        <View style={styles.scoreItem}>
          <Text style={styles.scoreLabel}>반 평균</Text>
          <Text style={styles.scoreValue}>{classAverage}점</Text>
        </View>
        <View style={styles.scoreItem}>
          <Text style={styles.scoreLabel}>차이</Text>
          <Text style={[styles.scoreValue, { color: myScore > classAverage ? '#10B981' : '#EF4444' }]}>
            {myScore > classAverage ? '+' : ''}{myScore - classAverage}점
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rankCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
  },
  rankRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  rankInfo: {
    flex: 1,
  },
  rankLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  rankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1F2E',
  },
  total: {
    fontSize: 18,
    color: '#6B7280',
  },
  rankChange: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 12,
  },
  rankChangeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  percentileCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0F7FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#1884FF',
  },
  percentileText: {
    fontSize: 12,
    color: '#6B7280',
  },
  percentileValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1884FF',
  },
  scoreComparison: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  scoreItem: {
    alignItems: 'center',
    flex: 1,
  },
  scoreLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  scoreValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1F2E',
  },
});

export default RankCard;
