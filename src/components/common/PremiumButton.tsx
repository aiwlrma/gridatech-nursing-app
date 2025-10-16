import React from 'react';
import {
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Platform } from 'react-native';

// 웹에서는 react-native-reanimated를 import하지 않음
let Animated: any = null;
let useSharedValue: any = null;
let useAnimatedStyle: any = null;
let withSpring: any = null;

if (Platform.OS !== 'web') {
  try {
    const Reanimated = require('react-native-reanimated');
    Animated = Reanimated.default;
    useSharedValue = Reanimated.useSharedValue;
    useAnimatedStyle = Reanimated.useAnimatedStyle;
    withSpring = Reanimated.withSpring;
  } catch (error) {
    console.warn('react-native-reanimated not available:', error);
  }
}
import { colors, typography, shadowLevels, gradientPresets, baseStyles } from '../../theme';

interface PremiumButtonProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  onPress: () => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}

const PremiumButton: React.FC<PremiumButtonProps> = ({
  label,
  variant = 'primary',
  onPress,
  disabled = false,
  size = 'medium',
  fullWidth = false,
}) => {
  // 웹에서는 애니메이션 없이 정적 스타일 사용
  const pressed = useSharedValue ? useSharedValue(false) : { value: false };
  
  const animatedStyle = useAnimatedStyle && withSpring ? useAnimatedStyle(() => ({
    transform: [
      { scale: withSpring(pressed.value ? 0.96 : 1) }
    ],
  })) : {};

  const getButtonGradient = () => {
    switch (variant) {
      case 'primary':
        return gradientPresets.button.primary;
      case 'secondary':
        return gradientPresets.button.secondary;
      case 'ghost':
        return gradientPresets.button.ghost;
    }
  };

  const getButtonSize = () => {
    switch (size) {
      case 'small':
        return { height: 40, paddingHorizontal: 16, fontSize: 14 };
      case 'medium':
        return { height: 56, paddingHorizontal: 24, fontSize: 16 };
      case 'large':
        return { height: 64, paddingHorizontal: 32, fontSize: 18 };
    }
  };

  const sizeStyles = getButtonSize();

  return (
    <Pressable
      onPressIn={() => pressed.value = true}
      onPressOut={() => pressed.value = false}
      onPress={onPress}
      disabled={disabled}
      style={({ pressed: isPressed }) => [
        styles.buttonContainer,
        fullWidth && styles.fullWidth,
        disabled && styles.buttonDisabled
      ]}
    >
      {Animated ? (
        <Animated.View style={animatedStyle}>
      ) : (
        <View style={animatedStyle}>
      )}
        <LinearGradient
          colors={getButtonGradient().colors}
          start={getButtonGradient().start}
          end={getButtonGradient().end}
          style={[
            styles.button,
            {
              height: sizeStyles.height,
              paddingHorizontal: sizeStyles.paddingHorizontal,
            },
            variant === 'primary' && shadowLevels.button,
            variant === 'ghost' && styles.buttonGhost,
            disabled && styles.buttonDisabled
          ]}
        >
          <Text style={[
            styles.buttonText,
            { fontSize: sizeStyles.fontSize },
            variant === 'secondary' && { color: colors.primary.base },
            variant === 'ghost' && { color: colors.textPrimary },
            disabled && styles.buttonTextDisabled
          ]}>
            {label}
          </Text>
        </LinearGradient>
      {Animated ? (
        </Animated.View>
      ) : (
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: 'flex-start',
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  button: {
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  buttonGhost: {
    ...baseStyles.BUTTON_OUTLINE,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.2,
    textAlign: 'center',
  },
  buttonTextDisabled: {
    opacity: 0.6,
  },
});

export default PremiumButton;
