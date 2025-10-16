import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, baseStyles } from '../../theme';

interface ScoreSummaryCardProps {
  totalScore: number;
  averageScore: number;
}

export const ScoreSummaryCard: React.FC<ScoreSummaryCardProps> = ({
  totalScore,
  averageScore
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>항목별 총점</Text>
      
      {/* Total Score */}
      <View style={styles.scoreRow}>
        <Text style={styles.label}>총점</Text>
        <Text style={styles.bigNumber}>{totalScore}점</Text>
      </View>
      
      {/* Divider */}
      <View style={styles.divider} />
      
      {/* Average Score */}
      <View style={styles.scoreRow}>
        <Text style={styles.label}>평균</Text>
        <Text style={styles.number}>{averageScore}점</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
    flex: 1,
    minHeight: 140, // 최소 높이 설정
    justifyContent: 'space-between', // 요소들을 균등하게 분배
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 12,
    textAlign: 'left',
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  bigNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primary.base,
    letterSpacing: -1,
  },
  divider: {
    ...baseStyles.DIVIDER_STYLE,
    marginVertical: 8,
  },
  number: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1F2E',
  },
});

