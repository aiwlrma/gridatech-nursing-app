import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { colors, typography, spacing } from '../../theme';

interface ChecklistLevel {
  name: string;
  completed: number;
  total: number;
  color: string;
  icon: string;
}

interface SkillChecklistCardProps {
  levels: ChecklistLevel[];
  totalProgress: number;
  onPress?: () => void;
  animated?: boolean;
}

const SkillChecklistCard: React.FC<SkillChecklistCardProps> = ({ 
  levels, 
  totalProgress,
  onPress,
  animated = true 
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const progressAnimatedValues = useRef(levels.map(() => new Animated.Value(0))).current;
  const totalProgressAnimatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animated) {
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.stagger(100, [
          ...progressAnimatedValues.map(animValue =>
            Animated.timing(animValue, {
              toValue: 1,
              duration: 600,
              useNativeDriver: false,
            })
          ),
          Animated.timing(totalProgressAnimatedValue, {
            toValue: 1,
            duration: 800,
            useNativeDriver: false,
          }),
        ]),
      ]).start();
    } else {
      animatedValue.setValue(1);
      progressAnimatedValues.forEach(animValue => animValue.setValue(1));
      totalProgressAnimatedValue.setValue(1);
    }
  }, [animated, animatedValue, progressAnimatedValues, totalProgressAnimatedValue]);

  const renderLevel = (level: ChecklistLevel, index: number) => {
    const progressAnimatedValue = progressAnimatedValues[index];
    const percentage = (level.completed / level.total) * 100;
    
    const progressWidth = progressAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', `${percentage}%`],
    });

    return (
      <View key={index} style={styles.level}>
        <View style={styles.levelHeader}>
          <View style={styles.levelTitleContainer}>
            <Text style={styles.levelIcon}>{level.icon}</Text>
            <Text style={styles.levelName}>{level.name}</Text>
          </View>
          <View style={styles.levelProgress}>
            <Text style={styles.levelProgressText}>
              {level.completed}/{level.total}
            </Text>
            <Text style={styles.levelStatus}>
              {percentage === 100 ? '✓' : percentage >= 80 ? '⚠' : '⏳'}
            </Text>
          </View>
        </View>
        
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  width: progressWidth,
                  backgroundColor: level.color,
                },
              ]}
            />
          </View>
          <Text style={styles.percentage}>{Math.round(percentage)}%</Text>
        </View>
      </View>
    );
  };

  const totalProgressWidth = totalProgressAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', `${totalProgress}%`],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: animatedValue,
          transform: [
            {
              translateY: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
        },
      ]}
    >
      <TouchableOpacity
        style={styles.card}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Text style={styles.title}>필수 술기 체크리스트</Text>
        
        <View style={styles.levelsContainer}>
          {levels.map((level, index) => renderLevel(level, index))}
        </View>

        <View style={styles.totalContainer}>
          <View style={styles.totalHeader}>
            <Text style={styles.totalTitle}>Total Progress</Text>
            <Text style={styles.totalPercentage}>{totalProgress}%</Text>
          </View>
          
          <View style={styles.totalProgressBar}>
            <Animated.View
              style={[
                styles.totalProgressFill,
                {
                  width: totalProgressWidth,
                },
              ]}
            />
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  card: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    ...typography.textStyles.heading3,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  levelsContainer: {
    marginBottom: spacing.lg,
  },
  level: {
    marginBottom: spacing.lg,
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  levelTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  levelIcon: {
    fontSize: 16,
    marginRight: spacing.xs,
  },
  levelName: {
    ...typography.textStyles.body,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
    flex: 1,
  },
  levelProgress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelProgressText: {
    ...typography.textStyles.bodySmall,
    color: colors.textSecondary,
    marginRight: spacing.xs,
  },
  levelStatus: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    marginRight: spacing.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  percentage: {
    ...typography.textStyles.bodySmall,
    color: colors.textSecondary,
    minWidth: 35,
    textAlign: 'right',
  },
  totalContainer: {
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  totalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  totalTitle: {
    ...typography.textStyles.body,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
  },
  totalPercentage: {
    ...typography.textStyles.body,
    fontWeight: typography.fontWeight.semibold,
    color: '#007AFF',
  },
  totalProgressBar: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  totalProgressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
});

export default SkillChecklistCard;
