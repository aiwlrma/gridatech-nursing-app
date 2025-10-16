import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { colors, typography, spacing } from '../../theme';

interface PerformanceItem {
  text: string;
  score: string;
  status: 'success' | 'error';
  tip?: string;
}

interface PerformanceCategory {
  id: string;
  title: string;
  score: number;
  items: PerformanceItem[];
}

interface PerformanceBreakdownProps {
  categories: PerformanceCategory[];
}

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const PerformanceBreakdown: React.FC<PerformanceBreakdownProps> = ({ categories }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [animatedValues, setAnimatedValues] = useState<Animated.Value[]>([]);
  const [arrowRotations, setArrowRotations] = useState<Animated.Value[]>([]);

  useEffect(() => {
    // Initialize animated values for progress bars and arrows
    const progressValues = categories.map(() => new Animated.Value(0));
    const rotationValues = categories.map(() => new Animated.Value(0));
    
    setAnimatedValues(progressValues);
    setArrowRotations(rotationValues);

    // Animate progress bars on mount
    progressValues.forEach((value, index) => {
      Animated.timing(value, {
        toValue: categories[index].score,
        duration: 500,
        useNativeDriver: false,
      }).start();
    });
  }, [categories]);

  const handleToggle = (categoryId: string) => {
    // Configure layout animation
    LayoutAnimation.configureNext({
      duration: 300,
      create: { type: 'easeInEaseOut', property: 'opacity' },
      update: { type: 'easeInEaseOut' },
      delete: { type: 'easeInEaseOut', property: 'opacity' },
    });

    const categoryIndex = categories.findIndex(cat => cat.id === categoryId);
    const isCurrentlyExpanded = expandedId === categoryId;
    
    // Animate arrow rotation
    if (arrowRotations[categoryIndex]) {
      Animated.timing(arrowRotations[categoryIndex], {
        toValue: isCurrentlyExpanded ? 0 : 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }

    setExpandedId(isCurrentlyExpanded ? null : categoryId);
  };

  const getStatusIcon = (status: 'success' | 'error') => {
    return status === 'success' ? '✓' : '✗';
  };

  const getStatusColor = (status: 'success' | 'error') => {
    return status === 'success' ? colors.success : colors.error;
  };

  const getArrowRotation = (categoryIndex: number) => {
    return arrowRotations[categoryIndex]?.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '90deg'],
    }) || '0deg';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>성과 분석</Text>
      
      {categories.map((category, categoryIndex) => {
        const isExpanded = expandedId === category.id;
        
        return (
          <View key={category.id} style={styles.card}>
            <TouchableOpacity
              style={styles.categoryHeader}
              onPress={() => handleToggle(category.id)}
              activeOpacity={0.7}
            >
              <View style={styles.categoryInfo}>
                <Text style={styles.categoryTitle}>{category.title}</Text>
                <Text style={styles.categoryScore}>{category.score}%</Text>
              </View>
              <Animated.Text
                style={[
                  styles.expandIcon,
                  {
                    transform: [{ rotate: getArrowRotation(categoryIndex) }],
                  },
                ]}
              >
                ▶
              </Animated.Text>
            </TouchableOpacity>

            {/* Progress Bar */}
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBarBackground}>
                <Animated.View
                  style={[
                    styles.progressBarFill,
                    {
                      width: animatedValues[categoryIndex]?.interpolate({
                        inputRange: [0, 100],
                        outputRange: ['0%', '100%'],
                        extrapolate: 'clamp',
                      }) || '0%',
                    },
                  ]}
                />
              </View>
            </View>

            {/* Expandable Items */}
            {isExpanded && (
              <View style={styles.itemsContainer}>
                {category.items.map((item, itemIndex) => (
                  <View key={itemIndex} style={styles.itemContainer}>
                    <View style={styles.itemRow}>
                      <View style={styles.itemLeft}>
                        <Text style={[
                          styles.statusIcon,
                          { color: getStatusColor(item.status) }
                        ]}>
                          {getStatusIcon(item.status)}
                        </Text>
                        <Text style={styles.itemText}>{item.text}</Text>
                      </View>
                      <Text style={styles.itemScore}>{item.score}</Text>
                    </View>
                    
                    {item.tip && (
                      <View style={styles.tipBox}>
                        <Text style={styles.tipIcon}>💡</Text>
                        <Text style={styles.tipText}>{item.tip}</Text>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.lg,
  },
  sectionTitle: {
    ...typography.textStyles.heading3,
    fontSize: 18,
    marginBottom: spacing.md,
  },
  card: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: spacing.sm,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    ...typography.textStyles.body,
    fontWeight: typography.fontWeight.semibold,
    marginBottom: 2,
  },
  categoryScore: {
    ...typography.textStyles.bodySmall,
    color: colors.primary,
    fontWeight: typography.fontWeight.semibold,
  },
  expandIcon: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  progressBarContainer: {
    marginVertical: 12,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  itemsContainer: {
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  itemContainer: {
    marginBottom: spacing.sm,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    justifyContent: 'space-between',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statusIcon: {
    fontSize: 16,
    marginRight: spacing.sm,
    width: 20,
    fontWeight: 'bold',
  },
  itemText: {
    ...typography.textStyles.bodySmall,
    flex: 1,
  },
  itemScore: {
    ...typography.textStyles.bodySmall,
    color: colors.textSecondary,
    fontWeight: typography.fontWeight.medium,
  },
  tipBox: {
    backgroundColor: '#FEF3C7',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    marginLeft: 24,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tipIcon: {
    fontSize: 16,
    marginRight: spacing.sm,
  },
  tipText: {
    ...typography.textStyles.bodySmall,
    flex: 1,
    color: '#92400E',
    lineHeight: 18,
  },
});

export default PerformanceBreakdown;
