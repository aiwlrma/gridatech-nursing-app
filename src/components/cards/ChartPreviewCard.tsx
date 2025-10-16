import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { colors, typography, spacing, baseStyles } from '../../theme';
import { BarChart } from '../charts/BarChart';

interface ChartPreviewCardProps {
  title: string;
  data?: number[];
  totalScore?: number;
}

const ChartPreviewCard: React.FC<ChartPreviewCardProps> = ({ 
  title,
  data = [65, 80, 45, 90, 70, 85, 60],
  totalScore
}) => {
  const calculatedTotal = totalScore || data.reduce((sum, score) => sum + score, 0);
  const averageScore = Math.round(calculatedTotal / data.length);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      
      {/* Total Score Display */}
      <View style={styles.totalScoreContainer}>
        <View style={styles.totalScoreBox}>
          <Text style={styles.totalScoreLabel}>총점</Text>
          <Text style={styles.totalScoreValue}>{calculatedTotal}점</Text>
        </View>
        <View style={styles.averageScoreBox}>
          <Text style={styles.averageScoreLabel}>평균</Text>
          <Text style={styles.averageScoreValue}>{averageScore}점</Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <BarChart 
          data={data} 
          color={colors.primary.base}
          height={60}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...baseStyles.CARD_STYLE,
    flex: 1,
  },
  title: {
    ...typography.textStyles.heading3,
    marginBottom: 12,
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
  },
  totalScoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 8,
  },
  totalScoreBox: {
    flex: 1,
    backgroundColor: '#F8FBFF',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(24, 132, 255, 0.1)',
  },
  averageScoreBox: {
    flex: 1,
    backgroundColor: '#F0F7FF',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(24, 132, 255, 0.15)',
  },
  totalScoreLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: colors.text.secondary,
    marginBottom: 2,
  },
  totalScoreValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary.base,
  },
  averageScoreLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: colors.text.secondary,
    marginBottom: 2,
  },
  averageScoreValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary.base,
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default ChartPreviewCard;
