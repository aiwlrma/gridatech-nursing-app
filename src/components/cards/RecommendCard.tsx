import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { colors, typography, spacing } from '../../theme';

interface RecommendCardProps {
  icon: string;
  title: string;
  subtitle: string;
  reason?: string;
  badge?: string;
  onPress?: () => void;
}

const RecommendCard: React.FC<RecommendCardProps> = ({
  icon,
  title,
  subtitle,
  reason,
  badge,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardLeft}>
        <Text style={styles.icon}>{icon}</Text>
        <View style={styles.content}>
          {badge && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          )}
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          {reason && (
            <Text style={styles.reason}>💡 {reason}</Text>
          )}
        </View>
      </View>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    fontSize: 24,
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
  },
  badge: {
    backgroundColor: colors.unified.brand,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: spacing.xs,
  },
  badgeText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily.bold,
  },
  title: {
    ...typography.textStyles.body,
    fontWeight: typography.fontWeight.semibold,
    fontFamily: typography.fontFamily.semibold,
    color: colors.unified.textPrimary,
    marginBottom: 2,
  },
  subtitle: {
    ...typography.textStyles.bodySmall,
    color: colors.unified.textSecondary,
    marginBottom: 4,
  },
  reason: {
    fontSize: 12,
    color: colors.status.warning.base,
    fontFamily: typography.fontFamily.regular,
    marginTop: 2,
  },
  arrow: {
    fontSize: 20,
    color: colors.unified.textSecondary,
    fontWeight: '300',
    marginLeft: spacing.sm,
  },
});

export default RecommendCard;
