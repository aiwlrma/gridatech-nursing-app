import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { colors, typography, spacing } from '../../theme';

interface FiveRightsData {
  patient: number;
  medication: number;
  dose: number;
  route: number;
  time: number;
  overall: number;
}

interface FiveRightsCardProps {
  data: FiveRightsData;
  onItemPress: (right: string, score: number) => void;
}

const FiveRightsCard: React.FC<FiveRightsCardProps> = ({ data, onItemPress }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();

    return () => pulse.stop();
  }, []);

  const getScoreColor = (score: number): string => {
    if (score >= 90) return colors.success;
    if (score >= 80) return colors.info;
    if (score >= 70) return colors.warning;
    return colors.error;
  };

  const getStatusIcon = (score: number): string => {
    return score >= 85 ? '✓' : '⚠';
  };

  const getProgressBarWidth = (score: number): string => {
    return `${Math.max(score, 10)}%`; // Minimum 10% for visibility
  };

  const rightsData = [
    { key: 'patient', label: 'Right Patient', score: data.patient },
    { key: 'medication', label: 'Right Medication', score: data.medication },
    { key: 'dose', label: 'Right Dose', score: data.dose },
    { key: 'route', label: 'Right Route', score: data.route },
    { key: 'time', label: 'Right Time', score: data.time },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>5 Rights 준수율</Text>
      
      {rightsData.map((right, index) => (
        <TouchableOpacity
          key={right.key}
          style={styles.rightItem}
          onPress={() => onItemPress(right.key, right.score)}
          activeOpacity={0.7}
        >
          <View style={styles.rightContent}>
            <View style={styles.rightInfo}>
              <Animated.Text
                style={[
                  styles.statusIcon,
                  { 
                    color: getScoreColor(right.score),
                    transform: [{ scale: pulseAnim }],
                  },
                ]}
              >
                {getStatusIcon(right.score)}
              </Animated.Text>
              <Text style={styles.rightLabel}>{right.label}</Text>
            </View>
            <Text style={[styles.rightScore, { color: getScoreColor(right.score) }]}>
              {right.score}%
            </Text>
          </View>
          
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <View
                style={[
                  styles.progressBarFill,
                  {
                    width: getProgressBarWidth(right.score),
                    backgroundColor: getScoreColor(right.score),
                  },
                ]}
              />
            </View>
          </View>
        </TouchableOpacity>
      ))}

      {/* Overall Compliance */}
      <View style={styles.overallContainer}>
        <View style={styles.overallContent}>
          <Text style={styles.overallLabel}>Overall Compliance:</Text>
          <Text style={[styles.overallScore, { color: getScoreColor(data.overall) }]}>
            {data.overall}%
          </Text>
        </View>
        <View style={styles.overallProgressBar}>
          <View style={styles.progressBarBackground}>
            <View
              style={[
                styles.progressBarFill,
                {
                  width: getProgressBarWidth(data.overall),
                  backgroundColor: getScoreColor(data.overall),
                },
              ]}
            />
          </View>
        </View>
      </View>
    </View>
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
  },
  rightItem: {
    marginBottom: spacing.md,
  },
  rightContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  rightInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statusIcon: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: spacing.sm,
  },
  rightLabel: {
    ...typography.textStyles.body,
    color: colors.textPrimary,
    fontWeight: typography.fontWeight.medium,
  },
  rightScore: {
    ...typography.textStyles.body,
    fontWeight: typography.fontWeight.bold,
  },
  progressBarContainer: {
    marginTop: spacing.xs,
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  overallContainer: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  overallContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  overallLabel: {
    ...typography.textStyles.body,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
  },
  overallScore: {
    ...typography.textStyles.body,
    fontWeight: typography.fontWeight.bold,
    fontSize: 16,
  },
  overallProgressBar: {
    marginTop: spacing.xs,
  },
});

export default FiveRightsCard;
