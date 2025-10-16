import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors } from '../../theme';

interface ProgressCircleProps {
  percent: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  children?: React.ReactNode;
  showPercentage?: boolean;
}

export const ProgressCircle: React.FC<ProgressCircleProps> = ({
  percent,
  size = 120,
  strokeWidth = 8,
  color = '#1884FF',
  children,
  showPercentage = true
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        {/* Background circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#F3F4F6"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="none"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <View style={styles.centerContent}>
        {children || (showPercentage && (
          <Text style={[styles.scoreText, { fontSize: size * 0.2 }]}>
            {Math.round(percent)}점
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centerContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
  },
});

