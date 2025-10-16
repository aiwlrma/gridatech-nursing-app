import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, shadowLevels, gradientPresets, baseStyles } from '../../theme';

interface GlassCardProps {
  children: React.ReactNode;
  style?: any;
  padding?: number;
  borderRadius?: number;
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  style,
  padding = 20,
  borderRadius = 20,
}) => {
  return (
    <View style={[styles.glassContainer, { borderRadius }, style]}>
      <LinearGradient
        colors={gradientPresets.card.glass.colors}
        start={gradientPresets.card.glass.start}
        end={gradientPresets.card.glass.end}
        style={styles.glassGradient}
      />
      <View style={[styles.glassContent, { padding, borderRadius }]}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  glassContainer: {
    overflow: 'hidden',
    borderWidth: baseStyles.BORDER_WIDTH,
    borderColor: baseStyles.BORDER_COLOR,
    ...shadowLevels.floating,
  },
  glassGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  glassContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
});

export default GlassCard;
