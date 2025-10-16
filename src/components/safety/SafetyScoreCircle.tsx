import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { colors, typography, spacing } from '../../theme';

const { width } = Dimensions.get('window');

interface SafetyScoreCircleProps {
  score: number;
  comparison: number;
}

const SafetyScoreCircle: React.FC<SafetyScoreCircleProps> = ({ score, comparison }) => {

  const getScoreColor = (score: number) => {
    if (score >= 90) return colors.success;
    if (score >= 85) return colors.info;
    if (score >= 80) return colors.warning;
    return colors.error;
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 85) return 'Good';
    if (score >= 80) return 'Needs Attention';
    return 'Critical';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patient Safety Score</Text>
      
      <View style={styles.circleContainer}>
        <View style={styles.circleBackground}>
          <View style={[styles.circleProgress, { borderColor: getScoreColor(score) }]} />
        </View>
        
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>{score}%</Text>
          <Text style={styles.scoreLabel}>{getScoreLabel(score)}</Text>
        </View>
      </View>

      <Text style={styles.comparisonText}>
        전체 평균보다 +{comparison}% 높습니다
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.primary,
    borderRadius: 16,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border.medium,
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
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  circleBackground: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 8,
    borderColor: colors.border.medium,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  circleProgress: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 8,
    borderColor: colors.primary.base,
    transform: [{ rotate: '-90deg' }],
  },
  scoreContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.xs / 2,
  },
  scoreLabel: {
    ...typography.textStyles.body,
    color: colors.textSecondary,
    fontWeight: typography.fontWeight.medium,
  },
  comparisonText: {
    ...typography.textStyles.bodySmall,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default SafetyScoreCircle;
