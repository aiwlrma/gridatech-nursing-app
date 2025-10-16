import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { colors, typography, spacing } from '../../theme';

interface Equipment {
  name: string;
  icon: string;
  proficiency: number;
}

interface EquipmentProficiencyBarProps {
  equipment: Equipment;
  onPress?: () => void;
  delay?: number;
  animated?: boolean;
}

const EquipmentProficiencyBar: React.FC<EquipmentProficiencyBarProps> = ({ 
  equipment, 
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
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(progressAnimatedValue, {
            toValue: 1,
            duration: 600,
            delay: 100,
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
    outputRange: ['0%', `${equipment.proficiency}%`],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: animatedValue,
          transform: [
            {
              translateY: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
        },
      ]}
    >
      <TouchableOpacity
        style={styles.equipmentItem}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.header}>
          <Text style={styles.icon}>{equipment.icon}</Text>
          <Text style={styles.name} numberOfLines={2}>
            {equipment.name}
          </Text>
          <View style={styles.scoreContainer}>
            <Text style={[styles.score, { color: getScoreColor(equipment.proficiency) }]}>
              {equipment.proficiency}%
            </Text>
          </View>
        </View>
        
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  width: progressWidth,
                  backgroundColor: getScoreColor(equipment.proficiency),
                },
              ]}
            />
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  equipmentItem: {
    paddingVertical: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  icon: {
    fontSize: 20,
    marginRight: spacing.sm,
    width: 24,
    textAlign: 'center',
  },
  name: {
    ...typography.textStyles.body,
    color: colors.textPrimary,
    flex: 1,
    marginRight: spacing.sm,
  },
  scoreContainer: {
    backgroundColor: colors.background,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  score: {
    ...typography.textStyles.bodySmall,
    fontWeight: typography.fontWeight.semibold,
    fontSize: 12,
  },
  progressBarContainer: {
    marginLeft: 32, // Align with text (icon width + margin)
  },
  progressBar: {
    height: 12,
    backgroundColor: colors.border,
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 6,
  },
});

export default EquipmentProficiencyBar;
