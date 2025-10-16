import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { colors, typography, shadowLevels, gradientPresets } from '../../theme';

interface PremiumListItemProps {
  title: string;
  subtitle?: string;
  score?: number;
  icon?: React.ReactNode;
  status?: 'normal' | 'warning' | 'success' | 'error';
  onPress?: () => void;
  rightElement?: React.ReactNode;
}

const PremiumListItem: React.FC<PremiumListItemProps> = ({
  title,
  subtitle,
  score,
  icon,
  status = 'normal',
  onPress,
  rightElement,
}) => {
  const pressed = useSharedValue(false);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(pressed.value ? 0.98 : 1) }],
  }));

  const getStatusColor = () => {
    switch (status) {
      case 'warning':
        return colors.status.warning.base;
      case 'success':
        return colors.status.success.base;
      case 'error':
        return colors.status.error.base;
      default:
        return colors.textPrimary;
    }
  };

  return (
    <Pressable
      onPressIn={() => pressed.value = true}
      onPressOut={() => pressed.value = false}
      onPress={onPress}
      disabled={!onPress}
    >
      <Animated.View style={[styles.listItem, animatedStyle]}>
        {/* Icon with blue gradient background */}
        {icon && (
          <LinearGradient
            colors={gradientPresets.icon.primary.colors}
            start={gradientPresets.icon.primary.start}
            end={gradientPresets.icon.primary.end}
            style={styles.iconContainer}
          >
            {icon}
          </LinearGradient>
        )}
        
        <View style={styles.listContent}>
          <Text style={styles.listTitle}>{title}</Text>
          {subtitle && (
            <Text style={styles.listSubtitle}>{subtitle}</Text>
          )}
        </View>
        
        <View style={styles.rightContent}>
          {score && (
            <Text style={[
              styles.listScore,
              { color: getStatusColor() }
            ]}>
              {score}점
            </Text>
          )}
          
          {rightElement || (
            onPress && (
              <Text style={styles.listArrow}>→</Text>
            )
          )}
        </View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 8,
    backgroundColor: colors.backgroundTertiary,
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...shadowLevels.card,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    ...shadowLevels.icon,
  },
  listContent: {
    flex: 1,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  listSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listScore: {
    fontSize: 16,
    fontWeight: '700',
    marginRight: 8,
  },
  listArrow: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textTertiary,
  },
});

export default PremiumListItem;
