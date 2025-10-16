import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { colors, typography, spacing } from '../../theme';

const { width } = Dimensions.get('window');

interface TrendData {
  current: number;
  previous: number;
  change: number;
  direction: 'up' | 'down' | 'stable';
  sparkline: number[];
}

interface SummaryDashboardProps {
  data: {
    overallScore: number;
    trend: TrendData;
    quickStats: {
      totalPractices: number;
      fiveRCompliance: number;
      highestScore: number;
    };
  };
}

const SummaryDashboard: React.FC<SummaryDashboardProps> = ({ data }) => {
  const scoreAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const trendAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate score counting
    Animated.timing(scoreAnim, {
      toValue: data.overallScore,
      duration: 800,
      useNativeDriver: false,
    }).start();

    // Animate scale
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start();

    // Animate trend arrow
    Animated.timing(trendAnim, {
      toValue: 1,
      duration: 300,
      delay: 400,
      useNativeDriver: true,
    }).start();
  }, [data.overallScore]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return colors.success;
    if (score >= 85) return colors.info;
    if (score >= 80) return colors.warning;
    return colors.error;
  };

  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case 'up': return '↑';
      case 'down': return '↓';
      default: return '→';
    }
  };

  const getTrendColor = (direction: string) => {
    switch (direction) {
      case 'up': return colors.success;
      case 'down': return colors.error;
      default: return colors.textSecondary;
    }
  };

  const renderMiniChart = () => {
    const maxValue = Math.max(...data.trend.sparkline);
    const minValue = Math.min(...data.trend.sparkline);
    const range = maxValue - minValue;
    
    return (
      <View style={styles.chartContainer}>
        <View style={styles.chart}>
          {data.trend.sparkline.map((value, index) => {
            const height = range > 0 ? ((value - minValue) / range) * 20 : 10;
            return (
              <View
                key={index}
                style={[
                  styles.chartBar,
                  {
                    height: height,
                    backgroundColor: colors.primary,
                  }
                ]}
              />
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
      <Text style={styles.title}>약물 투약 종합 점수</Text>
      
      <View style={styles.scoreContainer}>
        <Animated.Text style={[styles.scoreText, { color: getScoreColor(data.overallScore) }]}>
          {scoreAnim.interpolate({
            inputRange: [0, 100],
            outputRange: ['0', '100'],
            extrapolate: 'clamp',
          })}
        </Animated.Text>
        <Text style={styles.scoreUnit}>점</Text>
      </View>

      {renderMiniChart()}

      <Animated.View style={[styles.trendContainer, { opacity: trendAnim }]}>
        <Text style={[styles.trendText, { color: getTrendColor(data.trend.direction) }]}>
          {getTrendIcon(data.trend.direction)} {Math.abs(data.trend.change)}점 
          {data.trend.direction === 'up' ? ' 상승' : data.trend.direction === 'down' ? ' 하락' : ' 유지'} 
          (지난 주 대비)
        </Text>
      </Animated.View>

      <View style={styles.quickStatsContainer}>
        <Text style={styles.quickStatsLabel}>Quick Stats:</Text>
        <View style={styles.statsRow}>
          <Text style={styles.statText}>
            {data.quickStats.totalPractices}회 실습
          </Text>
          <Text style={styles.statSeparator}>·</Text>
          <Text style={styles.statText}>
            {data.quickStats.fiveRCompliance}% 5R준수
          </Text>
          <Text style={styles.statSeparator}>·</Text>
          <Text style={styles.statText}>
            {data.quickStats.highestScore}% 최고
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    ...typography.textStyles.heading3,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: spacing.md,
  },
  scoreText: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  scoreUnit: {
    fontSize: 24,
    fontWeight: '500',
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  chartContainer: {
    marginBottom: spacing.md,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 30,
    gap: 4,
  },
  chartBar: {
    width: 8,
    borderRadius: 2,
    minHeight: 4,
  },
  trendContainer: {
    marginBottom: spacing.lg,
  },
  trendText: {
    ...typography.textStyles.body,
    fontWeight: typography.fontWeight.semibold,
    textAlign: 'center',
  },
  quickStatsContainer: {
    alignItems: 'center',
  },
  quickStatsLabel: {
    ...typography.textStyles.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    ...typography.textStyles.bodySmall,
    color: colors.textPrimary,
    fontWeight: typography.fontWeight.medium,
  },
  statSeparator: {
    ...typography.textStyles.bodySmall,
    color: colors.textSecondary,
    marginHorizontal: spacing.xs,
  },
});

export default SummaryDashboard;
