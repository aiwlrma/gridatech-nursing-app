import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { colors, typography, spacing } from '../../theme';

interface CategoryAccordionProps {
  categories: Array<{
    name: string;
    icon: string;
    score: number;
    color: string;
  }>;
  onCategoryPress: (category: any) => void;
}

const CategoryAccordion: React.FC<CategoryAccordionProps> = ({ categories, onCategoryPress }) => {
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

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryText}>
          {categories.slice(0, 2).map(cat => cat.name.split(' ')[0]).join(' | ')} | 2개 더...
        </Text>
      </View>

      <View style={styles.categoriesContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={styles.categoryCard}
            onPress={() => onCategoryPress(category)}
            activeOpacity={0.7}
          >
            <View style={styles.categoryHeader}>
              <View style={styles.categoryLeft}>
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryName}>{category.name}</Text>
              </View>
              <Text style={[styles.categoryScore, { color: getScoreColor(category.score) }]}>
                {category.score}%
              </Text>
            </View>

            <View style={styles.progressBarBackground}>
              <View
                style={[
                  styles.progressBarFill,
                  {
                    width: `${category.score}%`,
                    backgroundColor: getScoreColor(category.score),
                  },
                ]}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  summaryRow: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 8,
    padding: spacing.sm,
    alignItems: 'center',
  },
  summaryText: {
    ...typography.textStyles.bodySmall,
    color: colors.textSecondary,
    fontWeight: typography.fontWeight.medium,
  },
  categoriesContainer: {
    gap: spacing.sm,
  },
  categoryCard: {
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
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  categoryName: {
    ...typography.textStyles.body,
    fontWeight: typography.fontWeight.medium,
    flex: 1,
  },
  categoryScore: {
    ...typography.textStyles.body,
    fontWeight: typography.fontWeight.bold,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
});

export default CategoryAccordion;
