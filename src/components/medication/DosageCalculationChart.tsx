import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { colors, typography, spacing } from '../../theme';

const { width } = Dimensions.get('window');

interface DosageCalculationData {
  accuracy: number;
  unitConversion: { correct: number; total: number };
  concentration: { correct: number; total: number };
  ivRate: { correct: number; total: number };
}

interface DosageCalculationChartProps {
  data: DosageCalculationData;
  onPress: () => void;
}

const DosageCalculationChart: React.FC<DosageCalculationChartProps> = ({ 
  data, 
  onPress 
}) => {
  const strokeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Animate chart appearance
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start();
  }, []);

  const getAccuracyColor = (accuracy: number): string => {
    if (accuracy >= 90) return colors.success;
    if (accuracy >= 80) return colors.info;
    if (accuracy >= 70) return colors.warning;
    return colors.error;
  };

  const getPercentage = (correct: number, total: number): number => {
    return Math.round((correct / total) * 100);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.title}>용량 계산 정확도</Text>
      
      <View style={styles.chartContainer}>
        {/* Circular Chart - Simplified without SVG */}
        <Animated.View
          style={[
            styles.chartWrapper,
            { transform: [{ scale: scaleAnim }] },
          ]}
        >
          <View style={styles.circularChart}>
            <View style={[styles.circleBackground, { borderColor: colors.border }]} />
            <View 
              style={[
                styles.circleProgress, 
                { 
                  borderColor: getAccuracyColor(data.accuracy),
                  transform: [{ rotate: `${(data.accuracy / 100) * 360}deg` }]
                }
              ]} 
            />
            
            {/* Center Text */}
            <View style={styles.centerText}>
              <Text style={[styles.percentage, { color: getAccuracyColor(data.accuracy) }]}>
                {data.accuracy}%
              </Text>
              <Text style={styles.accuracyLabel}>정확도</Text>
            </View>
          </View>
        </Animated.View>

        {/* Breakdown Stats */}
        <View style={styles.breakdownContainer}>
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>단위 환산 문제</Text>
            <Text style={styles.breakdownScore}>
              {data.unitConversion.correct}/{data.unitConversion.total} 정답
            </Text>
            <Text style={[styles.breakdownPercentage, { color: getAccuracyColor(getPercentage(data.unitConversion.correct, data.unitConversion.total)) }]}>
              {getPercentage(data.unitConversion.correct, data.unitConversion.total)}%
            </Text>
          </View>

          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>농도 계산 문제</Text>
            <Text style={styles.breakdownScore}>
              {data.concentration.correct}/{data.concentration.total} 정답
            </Text>
            <Text style={[styles.breakdownPercentage, { color: getAccuracyColor(getPercentage(data.concentration.correct, data.concentration.total)) }]}>
              {getPercentage(data.concentration.correct, data.concentration.total)}%
            </Text>
          </View>

          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>IV 주입 속도</Text>
            <Text style={styles.breakdownScore}>
              {data.ivRate.correct}/{data.ivRate.total} 정답
            </Text>
            <Text style={[styles.breakdownPercentage, { color: getAccuracyColor(getPercentage(data.ivRate.correct, data.ivRate.total)) }]}>
              {getPercentage(data.ivRate.correct, data.ivRate.total)}%
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: spacing.md,
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
    fontSize: 18,
    color: colors.textPrimary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  chartContainer: {
    alignItems: 'center',
  },
  chartWrapper: {
    position: 'relative',
    marginBottom: spacing.lg,
  },
  circularChart: {
    width: 140,
    height: 140,
    position: 'relative',
    alignSelf: 'center',
  },
  circleBackground: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 12,
    borderColor: colors.border,
  },
  circleProgress: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 12,
    borderColor: colors.info,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  centerText: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentage: {
    ...typography.textStyles.heading1,
    fontSize: 28,
    fontWeight: typography.fontWeight.bold,
  },
  accuracyLabel: {
    ...typography.textStyles.bodySmall,
    color: colors.textSecondary,
    marginTop: 2,
  },
  breakdownContainer: {
    width: '100%',
  },
  breakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  breakdownLabel: {
    ...typography.textStyles.body,
    color: colors.textPrimary,
    flex: 1,
  },
  breakdownScore: {
    ...typography.textStyles.bodySmall,
    color: colors.textSecondary,
    marginRight: spacing.sm,
  },
  breakdownPercentage: {
    ...typography.textStyles.body,
    fontWeight: typography.fontWeight.semibold,
    minWidth: 40,
    textAlign: 'right',
  },
});

export default DosageCalculationChart;
