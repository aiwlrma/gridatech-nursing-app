import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { colors, typography, spacing } from '../../theme';

interface FiveRightsCompactProps {
  data: {
    patient: number;
    medication: number;
    dose: number;
    route: number;
    time: number;
    overall: number;
  };
  onPress: () => void;
}

const FiveRightsCompact: React.FC<FiveRightsCompactProps> = ({ data, onPress }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 90) return colors.success;
    if (score >= 85) return colors.info;
    if (score >= 80) return colors.warning;
    return colors.error;
  };

  const getStatusIcon = (score: number) => {
    if (score >= 90) return '✓';
    if (score >= 80) return '⚠';
    return '✗';
  };

  const rights = [
    { name: 'Patient', score: data.patient, short: 'P' },
    { name: 'Med', score: data.medication, short: 'M' },
    { name: 'Route', score: data.route, short: 'R' },
    { name: 'Dose', score: data.dose, short: 'D' },
    { name: 'Time', score: data.time, short: 'T' },
  ];

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
        <View style={styles.header}>
          <Text style={styles.title}>🎯 5 Rights 준수율: {data.overall}%</Text>
          <Text style={styles.detailLink}>상세 ></Text>
        </View>

        <View style={styles.rightsContainer}>
          {rights.map((right, index) => (
            <View key={index} style={styles.rightItem}>
              <Text style={[
                styles.rightIcon,
                { color: getScoreColor(right.score) }
              ]}>
                {getStatusIcon(right.score)}
              </Text>
              <Text style={styles.rightLabel}>{right.short}</Text>
            </View>
          ))}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.sm,
  },
  card: {
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.textStyles.body,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
  },
  detailLink: {
    ...typography.textStyles.bodySmall,
    color: colors.primary,
    fontWeight: typography.fontWeight.medium,
  },
  rightsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightItem: {
    alignItems: 'center',
  },
  rightIcon: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: spacing.xs / 2,
  },
  rightLabel: {
    ...typography.textStyles.caption,
    color: colors.textSecondary,
    fontWeight: typography.fontWeight.medium,
  },
});

export default FiveRightsCompact;
