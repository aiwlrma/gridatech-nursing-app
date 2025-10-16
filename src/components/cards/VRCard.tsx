import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { colors, typography, spacing } from '../../theme';

interface VRCardProps {
  title: string;
  difficulty: '기초' | '중급' | '고급';
  duration: string;
  score?: number;
  status: 'completed' | 'in-progress' | 'locked' | 'new';
  lockReason?: string;
  progress?: number;
  icon?: string;
  onPress?: () => void;
}

const VRCard: React.FC<VRCardProps> = ({
  title,
  difficulty,
  duration,
  score,
  status,
  lockReason,
  progress = 0,
  icon = '🥽',
  onPress,
}) => {
  const difficultyColor = {
    기초: colors.status.success.base,
    중급: colors.unified.brand,
    고급: colors.status.warning.base,
  }[difficulty];

  const isLocked = status === 'locked';

  return (
    <TouchableOpacity 
      style={[styles.vrCard, isLocked && styles.lockedCard]}
      disabled={isLocked}
      onPress={onPress}
    >
      <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>
          <Text style={styles.vrIcon}>{icon}</Text>
        </View>
        
        <View style={styles.cardInfo}>
          <View style={styles.titleRow}>
            <Text style={[styles.cardTitle, isLocked && styles.lockedText]}>
              {title}
            </Text>
            {status === 'new' && (
              <View style={styles.newBadge}>
                <Text style={styles.newText}>NEW</Text>
              </View>
            )}
          </View>
          
          <View style={styles.metaRow}>
            <View style={[styles.difficultyBadge, { backgroundColor: difficultyColor }]}>
              <Text style={styles.difficultyText}>{difficulty}</Text>
            </View>
            <Text style={[styles.duration, isLocked && styles.lockedText]}>
              ⏱ {duration}
            </Text>
          </View>
        </View>
      </View>

      {/* Status Display */}
      {status === 'completed' && score && (
        <View style={styles.statusRow}>
          <Text style={styles.scoreText}>{score}점</Text>
          <Text style={styles.checkmark}>✓</Text>
        </View>
      )}

      {status === 'in-progress' && (
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>{progress}% 완료</Text>
        </View>
      )}

      {status === 'locked' && (
        <View style={styles.lockedOverlay}>
          <Text style={styles.lockIcon}>🔒</Text>
          <Text style={styles.lockReason}>{lockReason}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  vrCard: {
    backgroundColor: colors.unified.card,
    borderWidth: 1.5,
    borderColor: colors.unified.border,
    borderRadius: 16,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
    shadowColor: colors.shadow.card,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  lockedCard: {
    opacity: 0.6,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  iconContainer: {
    width: 48,
    height: 48,
    backgroundColor: colors.background.blue,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  vrIcon: {
    fontSize: 24,
  },
  cardInfo: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  cardTitle: {
    ...typography.textStyles.body,
    fontWeight: typography.fontWeight.semibold,
    fontFamily: typography.fontFamily.semibold,
    color: colors.unified.textPrimary,
    flex: 1,
  },
  lockedText: {
    color: colors.unified.textSecondary,
  },
  newBadge: {
    backgroundColor: colors.status.error.base,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 4,
    marginLeft: spacing.sm,
  },
  newText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily.bold,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  difficultyBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 6,
  },
  difficultyText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily.bold,
  },
  duration: {
    ...typography.textStyles.bodySmall,
    color: colors.unified.textSecondary,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.unified.border,
  },
  scoreText: {
    ...typography.textStyles.body,
    fontWeight: typography.fontWeight.semibold,
    fontFamily: typography.fontFamily.semibold,
    color: colors.status.success.base,
  },
  checkmark: {
    fontSize: 20,
    color: colors.status.success.base,
    fontWeight: 'bold',
  },
  progressContainer: {
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.unified.border,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.background.secondary,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: spacing.xs,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.unified.brand,
    borderRadius: 3,
  },
  progressText: {
    ...typography.textStyles.bodySmall,
    color: colors.unified.textSecondary,
    textAlign: 'center',
  },
  lockedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockIcon: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  lockReason: {
    ...typography.textStyles.bodySmall,
    color: colors.unified.textSecondary,
    textAlign: 'center',
    paddingHorizontal: spacing.md,
  },
});

export default VRCard;
