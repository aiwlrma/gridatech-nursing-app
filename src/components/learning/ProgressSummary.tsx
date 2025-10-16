import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { colors, typography, spacing, baseStyles } from '../../theme';

interface ProgressSummaryProps {
  completed: number;
  total: number;
  weeklyGoal: number;
}

const ProgressSummary: React.FC<ProgressSummaryProps> = ({
  completed,
  total,
  weeklyGoal
}) => {
  const progress = (completed / total) * 100;

  return (
    <View style={styles.progressCard}>
      <View style={styles.progressHeader}>
        <Text style={styles.progressTitle}>이번 주 학습 목표</Text>
        <Text style={styles.progressPercentage}>{Math.round(progress)}%</Text>
      </View>
      
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>
      
      <View style={styles.progressStats}>
        <Text style={styles.statText}>완료: {completed}/{total}</Text>
        <Text style={styles.statText}>목표: {weeklyGoal}개</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressCard: {
    backgroundColor: colors.white,
    marginHorizontal: spacing.md,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
    padding: spacing.lg,
    borderRadius: 16,
    borderWidth: baseStyles.BORDER_WIDTH,
    borderColor: baseStyles.BORDER_COLOR,
    ...colors.shadow.card,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    ...typography.bodyMedium,
  },
  progressPercentage: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary.base,
    ...typography.headingLarge,
  },
  progressBarContainer: {
    ...baseStyles.PROGRESS_BAR_CONTAINER,
    marginBottom: spacing.md,
  },
  progressBar: {
    ...baseStyles.PROGRESS_BAR_FILL,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statText: {
    fontSize: 14,
    color: colors.text.secondary,
    ...typography.bodySmall,
  },
});

export default ProgressSummary;
