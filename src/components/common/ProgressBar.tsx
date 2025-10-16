import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { colors, typography, gradientPresets } from '../../theme';

interface ProgressBarProps {
  value: number;
  max: number;
  color?: string;
  showPercentage?: boolean;
  animated?: boolean;
  height?: number;
  label?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  color = colors.primary.base,
  showPercentage = true,
  animated = true,
  height = 8,
  label,
}) => {
  const percentage = (value / max) * 100;
  const progress = useSharedValue(0);

  useEffect(() => {
    if (animated) {
      progress.value = withTiming(percentage, {
        duration: 1000,
        easing: Easing.out(Easing.cubic),
      });
    } else {
      progress.value = percentage;
    }
  }, [percentage, animated]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value}%`,
  }));

  const getGradientColors = () => {
    if (color === colors.primary.base) {
      return gradientPresets.button.primary.colors;
    } else if (color === colors.status.success.base) {
      return gradientPresets.status.success.colors;
    } else if (color === colors.status.warning.base) {
      return gradientPresets.status.warning.colors;
    } else if (color === colors.status.error.base) {
      return gradientPresets.status.error.colors;
    } else {
      return [color, color, `${color}CC`];
    }
  };

  return (
    <View style={styles.progressContainer}>
      {label && (
        <View style={styles.labelRow}>
          <Text style={styles.label}>{label}</Text>
          {showPercentage && (
            <Text style={styles.percentage}>
              {Math.round(percentage)}%
            </Text>
          )}
        </View>
      )}
      
      <View style={[styles.progressTrack, { height }]}>
        <Animated.View style={animatedStyle}>
          <LinearGradient
            colors={getGradientColors()}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.progressBar, { height }]}
          />
        </Animated.View>
      </View>
      
      {!label && showPercentage && (
        <View style={styles.infoRow}>
          <Text style={styles.progressText}>
            {value}/{max}
          </Text>
          <Text style={styles.progressText}>
            {Math.round(percentage)}%
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    width: '100%',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  percentage: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  progressTrack: {
    backgroundColor: 'rgba(24, 132, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    borderRadius: 4,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
});

export default ProgressBar;
