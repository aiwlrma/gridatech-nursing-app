import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { colors, typography, spacing } from '../../theme';

interface CoreCategory {
  name: string;
  icon: string;
  score: number;
  lastPractice: string;
  color: string;
}

interface CategoryScoreCardProps {
  category: CoreCategory;
  onPress?: () => void;
  delay?: number;
  animated?: boolean;
}

const CategoryScoreCard: React.FC<CategoryScoreCardProps> = ({ 
  category, 
  onPress, 
  delay = 0,
  animated = true 
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const progressAnimatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animated) {
      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(progressAnimatedValue, {
            toValue: 1,
            duration: 800,
            delay: 200,
            useNativeDriver: false,
          }),
        ]),
      ]).start();
    } else {
      animatedValue.setValue(1);
      progressAnimatedValue.setValue(1);
    }
  }, [animated, delay, animatedValue, progressAnimatedValue]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#10B981'; // Green
    if (score >= 85) return '#007AFF'; // Blue
    if (score >= 80) return '#A5F3E3'; // Mint
    if (score >= 75) return '#FACC15'; // Amber
    return '#EF4444'; // Red
  };

  const progressWidth = progressAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', `${category.score}%`],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: animatedValue,
          transform: [
            {
              translateX: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [-50, 0],
              }),
            },
          ],
        },
      ]}
    >
      <TouchableOpacity
        style={styles.card}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.content}>
          <Text style={styles.icon}>{category.icon}</Text>
          
          <View style={styles.textContainer}>
            <Text style={styles.name} numberOfLines={2}>
              {category.name}
            </Text>
            <Text style={styles.lastPractice}>
              마지막 실습: {category.lastPractice}
            </Text>
          </View>

          <View style={styles.scoreContainer}>
            <Text style={[styles.score, { color: getScoreColor(category.score) }]}>
              {category.score}%
            </Text>
            
            <View style={styles.progressBar}>
              <Animated.View
                style={[
                  styles.progressFill,
                  {
                    width: progressWidth,
                    backgroundColor: getScoreColor(category.score),
                  },
                ]}
              />
            </View>
          </View>
        </View>

        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.sm,
  },
  card: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    fontSize: 24,
    marginRight: spacing.sm,
  },
  textContainer: {
    flex: 1,
    marginRight: spacing.sm,
  },
  name: {
    ...typography.textStyles.body,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  lastPractice: {
    ...typography.textStyles.bodySmall,
    color: colors.textSecondary,
  },
  scoreContainer: {
    alignItems: 'flex-end',
    marginRight: spacing.sm,
  },
  score: {
    ...typography.textStyles.body,
    fontWeight: typography.fontWeight.semibold,
    marginBottom: 4,
  },
  progressBar: {
    width: 60,
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  arrow: {
    fontSize: 20,
    color: colors.textSecondary,
    fontWeight: 'bold',
  },
});

export default CategoryScoreCard;
