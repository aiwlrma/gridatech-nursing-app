import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { colors, typography, spacing } from '../../theme';

interface SafetyBadgeProps {
  earned: string[];
  inProgress: Array<{
    name: string;
    progress: number;
  }>;
}

const SafetyBadge: React.FC<SafetyBadgeProps> = ({ earned, inProgress }) => {
  const handleBadgePress = (badge: string, isEarned: boolean) => {
    if (isEarned) {
      Alert.alert('획득한 인증', `${badge}\n\n이 인증을 성공적으로 획득했습니다!`);
    } else {
      Alert.alert('진행 중인 인증', `${badge}\n\n아직 진행 중입니다.`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>획득한 안전 인증</Text>
      
      {earned.length > 0 ? (
        <View style={styles.badgesContainer}>
          {earned.map((badge, index) => (
            <TouchableOpacity
              key={index}
              style={styles.earnedBadge}
              onPress={() => handleBadgePress(badge, true)}
              activeOpacity={0.7}
            >
              <Text style={styles.badgeText}>{badge}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>아직 획득한 인증이 없습니다.</Text>
        </View>
      )}

      {inProgress.length > 0 && (
        <>
          <Text style={styles.subtitle}>진행 중인 인증:</Text>
          <View style={styles.badgesContainer}>
            {inProgress.map((badge, index) => (
              <TouchableOpacity
                key={index}
                style={styles.progressBadge}
                onPress={() => handleBadgePress(badge.name, false)}
                activeOpacity={0.7}
              >
                <View style={styles.badgeHeader}>
                  <Text style={styles.badgeText}>{badge.name}</Text>
                  <Text style={styles.progressText}>{badge.progress}%</Text>
                </View>
                <View style={styles.progressBarBackground}>
                  <View 
                    style={[
                      styles.progressBarFill, 
                      { width: `${badge.progress}%` }
                    ]} 
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
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
    marginBottom: spacing.md,
  },
  subtitle: {
    ...typography.textStyles.body,
    fontWeight: typography.fontWeight.semibold,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
    color: colors.textSecondary,
  },
  badgesContainer: {
    gap: spacing.sm,
  },
  earnedBadge: {
    backgroundColor: colors.success + '15',
    borderWidth: 1,
    borderColor: colors.success + '40',
    borderRadius: 8,
    padding: spacing.md,
    alignItems: 'center',
  },
  progressBadge: {
    backgroundColor: colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: spacing.md,
  },
  badgeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  badgeText: {
    ...typography.textStyles.body,
    fontWeight: typography.fontWeight.medium,
    flex: 1,
  },
  progressText: {
    ...typography.textStyles.bodySmall,
    color: colors.primary,
    fontWeight: typography.fontWeight.bold,
  },
  progressBarBackground: {
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  emptyText: {
    ...typography.textStyles.bodySmall,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default SafetyBadge;
