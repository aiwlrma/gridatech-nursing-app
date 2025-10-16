import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { colors, typography, spacing, baseStyles } from '../../theme';

interface RecommendedCardProps {
  icon: string;
  title: string;
  subtitle: string;
  type: 'video' | 'document' | 'vr' | 'quiz';
  duration?: string;
  onPress: () => void;
}

const RecommendedCard: React.FC<RecommendedCardProps> = ({
  icon,
  title,
  subtitle,
  type,
  duration,
  onPress
}) => {
  const getTypeLabel = () => {
    switch (type) {
      case 'video': return '📹 동영상';
      case 'document': return '📄 문서';
      case 'vr': return '🥽 VR';
      case 'quiz': return '✍️ 퀴즈';
    }
  };

  return (
    <TouchableOpacity 
      style={styles.recommendedCard} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.cardBadge}>
        <Text style={styles.badgeText}>추천</Text>
      </View>
      
      <Text style={styles.cardIcon}>{icon}</Text>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
      
      <View style={styles.cardFooter}>
        <Text style={styles.typeLabel}>{getTypeLabel()}</Text>
        {duration && <Text style={styles.duration}>{duration}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  recommendedCard: {
    width: 160,
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: baseStyles.BORDER_WIDTH,
    borderColor: baseStyles.BORDER_COLOR,
    padding: spacing.md,
    position: 'relative',
    marginRight: spacing.md,
    ...colors.shadow.card,
  },
  cardBadge: {
    ...baseStyles.BADGE_STYLE,
  },
  badgeText: {
    ...baseStyles.BADGE_TEXT,
  },
  cardIcon: {
    fontSize: 32,
    marginBottom: spacing.md,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
    ...typography.bodyMedium,
  },
  cardSubtitle: {
    fontSize: 12,
    color: colors.text.secondary,
    marginBottom: spacing.md,
    ...typography.bodySmall,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  typeLabel: {
    fontSize: 12,
    color: colors.primary.base,
    fontWeight: '600',
    ...typography.caption,
  },
  duration: {
    fontSize: 12,
    color: colors.text.tertiary,
    ...typography.caption,
  },
});

export default RecommendedCard;
