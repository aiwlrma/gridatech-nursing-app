import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { gradientPresets } from '../../theme';

interface ScreenGradientProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  style?: any;
}

const ScreenGradient: React.FC<ScreenGradientProps> = ({ 
  children, 
  variant = 'primary',
  style 
}) => {
  const gradient = variant === 'primary' 
    ? gradientPresets.screen.primary 
    : gradientPresets.screen.secondary;

  return (
    <LinearGradient
      colors={gradient.colors}
      start={gradient.start}
      end={gradient.end}
      style={[styles.container, style]}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ScreenGradient;
