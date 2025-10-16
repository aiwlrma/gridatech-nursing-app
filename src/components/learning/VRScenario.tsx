import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { colors, typography, spacing, baseStyles } from '../../theme';

interface VRScenarioProps {
  title: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  duration: string;
  completed: boolean;
  score?: number;
  onPress: () => void;
}

const VRScenario: React.FC<VRScenarioProps> = ({
  title,
  difficulty,
  duration,
  completed,
  score,
  onPress
}) => {
  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'basic': return colors.status.success.base;
      case 'intermediate': return colors.status.warning.base;
      case 'advanced': return colors.status.error.base;
    }
  };

  const getDifficultyLabel = () => {
    switch (difficulty) {
      case 'basic': return '기초';
      case 'intermediate': return '중급';
      case 'advanced': return '고급';
    }
  };

  return (
    <TouchableOpacity 
      style={styles.vrCard} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.vrLeft}>
        <Text style={styles.vrIcon}>🥽</Text>
        <View style={styles.vrInfo}>
          <Text style={styles.vrTitle}>{title}</Text>
          <View style={styles.vrMeta}>
            <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor() }]}>
              <Text style={styles.difficultyText}>{getDifficultyLabel()}</Text>
            </View>
            <Text style={styles.vrDuration}>{duration}</Text>
          </View>
        </View>
      </View>
      
      {completed ? (
        <View style={styles.completedBadge}>
          <Text style={styles.completedIcon}>✓</Text>
          {score && <Text style={styles.scoreText}>{score}점</Text>}
        </View>
      ) : (
        <Text style={styles.arrow}>›</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  vrCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    padding: spacing.md,
    borderRadius: 16,
    borderWidth: baseStyles.BORDER_WIDTH,
    borderColor: baseStyles.BORDER_COLOR,
    ...colors.shadow.card,
  },
  vrLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  vrIcon: {
    fontSize: 32,
    marginRight: spacing.md,
  },
  vrInfo: {
    flex: 1,
  },
  vrTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 6,
    ...typography.bodyMedium,
  },
  vrMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  difficultyBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.white,
    ...typography.caption,
  },
  vrDuration: {
    fontSize: 13,
    color: colors.text.secondary,
    ...typography.bodySmall,
  },
  completedBadge: {
    alignItems: 'center',
  },
  completedIcon: {
    fontSize: 24,
    color: colors.status.success.base,
  },
  scoreText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.status.success.base,
    marginTop: 2,
    ...typography.caption,
  },
  arrow: {
    fontSize: 24,
    color: colors.text.tertiary,
  },
});

export default VRScenario;
