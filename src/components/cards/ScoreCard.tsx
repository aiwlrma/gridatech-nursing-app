import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Platform } from 'react-native';

// 웹에서는 react-native-reanimated를 import하지 않음
let Animated: any = null;
let useSharedValue: any = null;
let useAnimatedStyle: any = null;
let withTiming: any = null;
let withSpring: any = null;
let Easing: any = null;

if (Platform.OS !== 'web') {
  try {
    const Reanimated = require('react-native-reanimated');
    Animated = Reanimated.default;
    useSharedValue = Reanimated.useSharedValue;
    useAnimatedStyle = Reanimated.useAnimatedStyle;
    withTiming = Reanimated.withTiming;
    withSpring = Reanimated.withSpring;
    Easing = Reanimated.Easing;
  } catch (error) {
    console.warn('react-native-reanimated not available:', error);
  }
}
import { colors, typography, spacing, shadowLevels, gradientPresets, baseStyles } from '../../theme';
import { ProgressCircle } from '../charts/ProgressCircle';

interface ScoreCardProps {
  score: number;
  size?: number;
  label?: string;
  trend?: number;
  comparison?: string;
  animated?: boolean;
}

const AnimatedScore: React.FC<{ value: number; size: number }> = ({ value, size }) => {
  // 웹에서는 애니메이션 없이 정적 표시
  if (Platform.OS === 'web' || !Animated || !useSharedValue) {
    return (
      <View>
        <Text style={[styles.scoreText, { fontSize: size * 0.25 }]}>
          {Math.round(value)}
        </Text>
      </View>
    );
  }

  const animatedValue = useSharedValue(0);

  useEffect(() => {
    if (withTiming && Easing) {
      animatedValue.value = withTiming(value, {
        duration: 1500,
        easing: Easing.out(Easing.cubic),
      });
    }
  }, [value]);

  const animatedStyle = useAnimatedStyle ? useAnimatedStyle(() => ({
    transform: [{ scale: withSpring ? withSpring(1 + (animatedValue.value / 100) * 0.1) : 1 }],
  })) : {};

  return (
    <Animated.View style={animatedStyle}>
      <Text style={[styles.scoreText, { fontSize: size * 0.25 }]}>
        {Math.round(animatedValue.value)}
      </Text>
    </Animated.View>
  );
};

const ScoreCard: React.FC<ScoreCardProps> = ({ 
  score, 
  size = 100,
  label,
  trend,
  comparison,
  animated = true
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Label */}
        {label && <Text style={styles.label}>{label}</Text>}
        
        {/* Progress Circle */}
        <View style={styles.scoreContainer}>
          <ProgressCircle
            percent={score}
            size={size}
            strokeWidth={8}
            color={colors.primary.base}
            showPercentage={true}
          />
        </View>
        
        {/* Comparison */}
        {comparison && (
          <Text style={styles.comparison}>{comparison}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    ...baseStyles.CARD_STYLE,
    alignItems: 'center',
    justifyContent: 'center', // 내용을 중앙 정렬
    flex: 1, // 부모 컨테이너의 전체 공간 사용
    aspectRatio: 1, // 정사각형으로 만들기
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.secondary,
    marginBottom: 16,
  },
  scoreContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  comparison: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.text.tertiary,
    marginTop: 12,
    textAlign: 'center',
  },
});

export default ScoreCard;
