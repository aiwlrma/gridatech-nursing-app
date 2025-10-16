import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { colors, typography, spacing } from '../../theme';
import { Icon } from '../icons';

interface PracticeResult {
  id: string;
  type: string;
  site: string;
  date: string;
  time: string;
  score: number;
  status: 'success' | 'warning';
  feedback: string;
}

interface PracticeResultCardProps {
  practice: PracticeResult;
  onPress: () => void;
}

const PracticeResultCard: React.FC<PracticeResultCardProps> = ({ practice, onPress }) => {
  const getStatusIcon = (status: 'success' | 'warning'): string => {
    return status === 'success' ? 'check' : 'warning';
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
        {/* Header with icon and title */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Icon name="syringe" size={20} color={colors.primary.base} />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              {practice.type} - {practice.site}
            </Text>
            <Text style={styles.dateTime}>
              {practice.date}  {practice.time}
            </Text>
          </View>
          <View style={styles.scoreContainer}>
            <Text style={[styles.score, { color: getScoreColor(practice.score) }]}>
              {practice.score}점
            </Text>
            <View style={styles.statusIconContainer}>
              <Icon 
                name={getStatusIcon(practice.status)} 
                size={16} 
                color={getStatusColor(practice.status)} 
              />
            </View>
          </View>
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
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 8,
    borderWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
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
  iconContainer: {
    marginRight: spacing.sm,
    marginTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    ...typography.textStyles.body,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  dateTime: {
    ...typography.textStyles.bodySmall,
    color: colors.textSecondary,
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
  statusIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedbackContainer: {
    backgroundColor: colors.backgroundTertiary,
    borderRadius: 8,
    padding: spacing.sm,
    marginTop: spacing.xs,
  },
  feedback: {
    ...typography.textStyles.bodySmall,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
});

export default PracticeResultCard;
