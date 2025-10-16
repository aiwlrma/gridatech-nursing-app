import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { colors, typography, spacing } from '../../theme';

interface InjectionSite {
  name: string;
  nameEn: string;
  score: number;
  color: string;
  lastPractice: string;
}

interface SiteScoreCardProps {
  site: InjectionSite;
  onPress: () => void;
}

const SiteScoreCard: React.FC<SiteScoreCardProps> = ({ site, onPress }) => {
  const getScoreColor = (score: number): string => {
    if (score >= 90) return colors.success;
    if (score >= 80) return colors.info;
    if (score >= 70) return colors.warning;
    return colors.error;
  };

  const getScoreLabel = (score: number): string => {
    if (score >= 90) return '우수';
    if (score >= 80) return '양호';
    if (score >= 70) return '보통';
    return '개선 필요';
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        {/* Site Info */}
        <View style={styles.siteInfo}>
          <Text style={styles.siteName}>{site.name}</Text>
          <Text style={styles.siteNameEn}>({site.nameEn})</Text>
        </View>

        {/* Score Display */}
        <View style={styles.scoreSection}>
          <View style={styles.scoreContainer}>
            <Text style={[styles.score, { color: getScoreColor(site.score) }]}>
              {site.score}%
            </Text>
            <Text style={[styles.scoreLabel, { color: getScoreColor(site.score) }]}>
              {getScoreLabel(site.score)}
            </Text>
          </View>
          
          {/* Color Indicator */}
          <View style={[styles.colorIndicator, { backgroundColor: site.color }]} />
        </View>

        {/* Last Practice */}
        <View style={styles.lastPracticeContainer}>
          <Text style={styles.lastPracticeLabel}>마지막 실습:</Text>
          <Text style={styles.lastPracticeDate}>{site.lastPractice}</Text>
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
  siteInfo: {
    marginBottom: spacing.sm,
  },
  siteName: {
    ...typography.textStyles.body,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  siteNameEn: {
    ...typography.textStyles.bodySmall,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  scoreSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  scoreContainer: {
    flex: 1,
  },
  score: {
    ...typography.textStyles.heading2,
    fontSize: 24,
    fontWeight: typography.fontWeight.bold,
    marginBottom: 2,
  },
  scoreLabel: {
    ...typography.textStyles.bodySmall,
    fontWeight: typography.fontWeight.medium,
  },
  colorIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.background,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  lastPracticeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundTertiary,
    borderRadius: 6,
    padding: spacing.xs,
  },
  lastPracticeLabel: {
    ...typography.textStyles.bodySmall,
    color: colors.textSecondary,
    marginRight: spacing.xs,
  },
  lastPracticeDate: {
    ...typography.textStyles.bodySmall,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
  },
});

export default SiteScoreCard;
