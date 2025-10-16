import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { colors, typography, spacing } from '../../theme';

interface PracticeTime {
  day: string;
  hours: number;
}

interface WeeklyPracticeChartProps {
  data: PracticeTime[];
  total: number;
  target: number;
  animated?: boolean;
}

const WeeklyPracticeChart: React.FC<WeeklyPracticeChartProps> = ({ 
  data, 
  total, 
  target,
  animated = true 
}) => {
  const animatedValues = useRef(data.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    if (animated) {
      const animations = animatedValues.map((animValue, index) =>
        Animated.timing(animValue, {
          toValue: 1,
          duration: 400,
          delay: index * 50,
          useNativeDriver: false,
        })
      );

      Animated.stagger(50, animations).start();
    } else {
      animatedValues.forEach(animValue => animValue.setValue(1));
    }
  }, [animated, animatedValues]);

  const maxHours = Math.max(...data.map(d => d.hours), 1);

  const renderBar = (day: PracticeTime, index: number) => {
    const animatedValue = animatedValues[index];
    const barHeight = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, Math.max((day.hours / maxHours) * 80, 4)],
    });

    return (
      <View key={index} style={styles.barContainer}>
        <Animated.View
          style={[
            styles.bar,
            {
              height: barHeight,
              backgroundColor: day.hours > 0 ? '#007AFF' : '#E5E7EB',
            },
          ]}
        />
        <Text style={styles.barLabel}>{day.day}</Text>
        <Text style={styles.barValue}>{day.hours}h</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>이번 주 실습 시간</Text>
      
      <View style={styles.chartContainer}>
        <View style={styles.barsContainer}>
          {data.map((day, index) => renderBar(day, index))}
        </View>
      </View>
      
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: {total}시간 / Target: {target}시간
        </Text>
        <View style={styles.targetProgress}>
          <View style={styles.targetBar}>
            <View 
              style={[
                styles.targetFill, 
                { 
                  width: `${Math.min((total / target) * 100, 100)}%`,
                  backgroundColor: total >= target ? '#10B981' : '#007AFF'
                }
              ]} 
            />
          </View>
          <Text style={styles.targetPercentage}>
            {Math.round((total / target) * 100)}%
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    textAlign: 'center',
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  barsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 120,
    width: '100%',
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 20,
    borderRadius: 10,
    marginBottom: spacing.xs,
  },
  barLabel: {
    ...typography.textStyles.bodySmall,
    color: colors.textSecondary,
    marginBottom: 2,
    fontSize: 12,
  },
  barValue: {
    ...typography.textStyles.bodySmall,
    color: colors.textSecondary,
    fontSize: 11,
  },
  summary: {
    alignItems: 'center',
  },
  summaryText: {
    ...typography.textStyles.body,
    color: colors.textPrimary,
    fontWeight: typography.fontWeight.medium,
    marginBottom: spacing.sm,
  },
  targetProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  targetBar: {
    flex: 1,
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    marginRight: spacing.sm,
    overflow: 'hidden',
  },
  targetFill: {
    height: '100%',
    borderRadius: 4,
  },
  targetPercentage: {
    ...typography.textStyles.bodySmall,
    color: colors.textPrimary,
    fontWeight: typography.fontWeight.semibold,
    minWidth: 40,
    textAlign: 'right',
  },
});

export default WeeklyPracticeChart;
