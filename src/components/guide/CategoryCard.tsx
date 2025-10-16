import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { colors, typography, spacing } from '../../theme';

interface CategoryCardProps {
  icon: string;
  title: string;
  subtitle: string;
  onPress: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  icon,
  title,
  subtitle,
  onPress
}) => {
  return (
    <TouchableOpacity 
      style={styles.categoryCard} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.categoryIcon}>{icon}</Text>
      <Text style={styles.categoryTitle}>{title}</Text>
      <Text style={styles.categorySubtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryCard: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: colors.background.tertiary,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: colors.border.medium,
    padding: spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  categoryIcon: {
    fontSize: 40,
    marginBottom: spacing.md,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: 4,
    fontFamily: 'Pretendard-SemiBold',
  },
  categorySubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    fontFamily: 'Pretendard-Regular',
  },
});

export default CategoryCard;
