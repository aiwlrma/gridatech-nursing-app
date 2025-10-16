import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { colors, typography, spacing } from '../../theme';

interface MedicationPractice {
  id: string;
  drugType: string;
  drugName: string;
  dosage: string;
  route: string;
  date: string;
  time: string;
  score: number;
  status: 'success' | 'warning';
  feedback: string;
}

interface MedicationPracticeCardProps {
  practice: MedicationPractice;
  onPress: () => void;
}

const MedicationPracticeCard: React.FC<MedicationPracticeCardProps> = ({ 
  practice, 
  onPress 
}) => {
  const getDrugIcon = (drugType: string): string => {
    switch (drugType.toLowerCase()) {
      case 'antibiotic':
        return '항';
      case 'analgesic':
        return '진';
      case 'anticoagulant':
        return '응';
      case 'insulin':
        return '인';
      default:
        return '약';
    }
  };

  const getStatusIcon = (status: 'success' | 'warning'): string => {
    return status === 'success' ? '✓' : '!';
  };

  const getStatusColor = (status: 'success' | 'warning'): string => {
    return status === 'success' ? colors.success : colors.warning;
  };

  const getScoreColor = (score: number): string => {
    if (score >= 90) return colors.success;
    if (score >= 80) return colors.info;
    if (score >= 70) return colors.warning;
    return colors.error;
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        {/* Header with drug info */}
        <View style={styles.header}>
          <View style={[styles.drugIconBadge, { backgroundColor: getScoreColor(practice.score) }]}>
            <Text style={styles.drugIconText}>{getDrugIcon(practice.drugType)}</Text>
          </View>
          <View style={styles.drugInfo}>
            <Text style={styles.drugType}>
              {practice.drugType} - {practice.route}
            </Text>
            <Text style={styles.drugName}>
              {practice.drugName} {practice.dosage}
            </Text>
          </View>
          <View style={styles.scoreContainer}>
            <Text style={[styles.score, { color: getScoreColor(practice.score) }]}>
              {practice.score}점
            </Text>
            <Text style={[styles.statusIcon, { color: getStatusColor(practice.status) }]}>
              {getStatusIcon(practice.status)}
            </Text>
          </View>
        </View>

        {/* Date and time */}
        <View style={styles.dateTimeContainer}>
          <Text style={styles.dateTime}>
            {practice.date}  {practice.time}
          </Text>
        </View>

        {/* Feedback */}
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedback}>{practice.feedback}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderRadius: 12,
    marginBottom: spacing.sm,
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
  content: {
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  drugIconBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  drugIconText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.background,
  },
  drugInfo: {
    flex: 1,
  },
  drugType: {
    ...typography.textStyles.body,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  drugName: {
    ...typography.textStyles.bodySmall,
    color: colors.textSecondary,
    fontWeight: typography.fontWeight.medium,
  },
  scoreContainer: {
    alignItems: 'flex-end',
  },
  score: {
    ...typography.textStyles.body,
    fontWeight: typography.fontWeight.bold,
    fontSize: 16,
    marginBottom: 2,
  },
  statusIcon: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateTimeContainer: {
    marginBottom: spacing.sm,
  },
  dateTime: {
    ...typography.textStyles.bodySmall,
    color: colors.textSecondary,
  },
  feedbackContainer: {
    backgroundColor: colors.backgroundTertiary,
    borderRadius: 8,
    padding: spacing.sm,
  },
  feedback: {
    ...typography.textStyles.bodySmall,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
});

export default MedicationPracticeCard;
