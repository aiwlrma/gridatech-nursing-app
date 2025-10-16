import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { colors, typography, spacing } from '../../theme';

interface RecentPracticesProps {
  practices: Array<{
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
  }>;
  onPracticePress: (practice: any) => void;
}

const RecentPractices: React.FC<RecentPracticesProps> = ({ practices, onPracticePress }) => {
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

  const getStatusIcon = (status: 'success' | 'warning') => {
    return status === 'success' ? '✓' : '⚠';
  };

  const getDrugIcon = (drugType: string) => {
    switch (drugType.toLowerCase()) {
      case 'antibiotic': return '💊';
      case 'analgesic': return '💉';
      case 'insulin': return '⚕️';
      case 'anticoagulant': return '🩹';
      default: return '💊';
    }
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {practices.slice(0, 3).map((practice, index) => (
        <TouchableOpacity
          key={practice.id}
          style={styles.practiceCard}
          onPress={() => onPracticePress(practice)}
          activeOpacity={0.7}
        >
          <View style={styles.practiceHeader}>
            <View style={styles.practiceLeft}>
              <Text style={styles.drugIcon}>{getDrugIcon(practice.drugType)}</Text>
              <View style={styles.practiceInfo}>
                <Text style={styles.drugName}>{practice.drugName}</Text>
                <Text style={styles.drugDetails}>
                  {practice.dosage} · {practice.route}
                </Text>
              </View>
            </View>
            <View style={styles.practiceRight}>
              <Text style={[styles.practiceScore, { color: getScoreColor(practice.score) }]}>
                {practice.score}점
              </Text>
              <Text style={styles.statusIcon}>{getStatusIcon(practice.status)}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}

      {practices.length > 3 && (
        <TouchableOpacity style={styles.showMoreButton} activeOpacity={0.7}>
          <Text style={styles.showMoreText}>Show {practices.length - 3} more</Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  practiceCard: {
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
  practiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  practiceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  drugIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  practiceInfo: {
    flex: 1,
  },
  drugName: {
    ...typography.textStyles.body,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.xs / 2,
  },
  drugDetails: {
    ...typography.textStyles.bodySmall,
    color: colors.textSecondary,
  },
  practiceRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  practiceScore: {
    ...typography.textStyles.body,
    fontWeight: typography.fontWeight.bold,
    marginRight: spacing.xs,
  },
  statusIcon: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  showMoreButton: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 8,
    padding: spacing.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  showMoreText: {
    ...typography.textStyles.bodySmall,
    color: colors.primary,
    fontWeight: typography.fontWeight.medium,
  },
});

export default RecentPractices;
