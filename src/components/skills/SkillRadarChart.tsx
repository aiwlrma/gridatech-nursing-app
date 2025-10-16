import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { colors, typography, spacing } from '../../theme';

interface RadarChartData {
  skill: string;
  score: number;
}

interface SkillRadarChartProps {
  data: RadarChartData[];
  size?: number;
  animated?: boolean;
}

const { width } = Dimensions.get('window');

const SkillRadarChart: React.FC<SkillRadarChartProps> = ({ 
  data, 
  size = 200, 
  animated = true 
}) => {
  const animatedValues = useRef(data.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    if (animated) {
      const animations = animatedValues.map((animValue, index) =>
        Animated.timing(animValue, {
          toValue: 1,
          duration: 800,
          delay: index * 100,
          useNativeDriver: true,
        })
      );

      Animated.stagger(100, animations).start();
    } else {
      animatedValues.forEach(animValue => animValue.setValue(1));
    }
  }, [animated, animatedValues]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#10B981'; // Green
    if (score >= 85) return '#007AFF'; // Blue
    if (score >= 80) return '#A5F3E3'; // Mint
    if (score >= 75) return '#FACC15'; // Amber
    return '#EF4444'; // Red
  };

  const renderRadarItem = (item: RadarChartData, index: number) => {
    const animatedValue = animatedValues[index];
    
    return (
      <Animated.View
        key={index}
        style={[
          styles.radarItem,
          {
            opacity: animatedValue,
            transform: [
              {
                scale: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1],
                }),
              },
            ],
          },
        ]}
      >
        <View style={styles.radarItemContent}>
          <Text style={styles.radarSkill} numberOfLines={2}>
            {item.skill}
          </Text>
          <View style={styles.radarScoreContainer}>
            <Text style={[styles.radarScore, { color: getScoreColor(item.score) }]}>
              {item.score}%
            </Text>
          </View>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={styles.radarGrid}>
        {/* Hexagonal grid lines */}
        <View style={[styles.hexagon, styles.hexagon1]} />
        <View style={[styles.hexagon, styles.hexagon2]} />
        <View style={[styles.hexagon, styles.hexagon3]} />
      </View>
      
      <View style={styles.radarContent}>
        {data.map((item, index) => renderRadarItem(item, index))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  radarGrid: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hexagon: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
  },
  hexagon1: {
    width: 180,
    height: 180,
  },
  hexagon2: {
    width: 120,
    height: 120,
  },
  hexagon3: {
    width: 60,
    height: 60,
  },
  radarContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  radarItem: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: spacing.xs,
    minWidth: 70,
    minHeight: 60,
  },
  radarItemContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  radarSkill: {
    ...typography.textStyles.bodySmall,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 4,
    fontSize: 11,
    lineHeight: 14,
  },
  radarScoreContainer: {
    backgroundColor: colors.background,
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  radarScore: {
    ...typography.textStyles.bodySmall,
    fontWeight: typography.fontWeight.semibold,
    fontSize: 12,
  },
});

export default SkillRadarChart;
