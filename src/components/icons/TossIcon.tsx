import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon, IconName } from './index';
import { TossIconProps, iconSizes, iconColors } from './types';

/**
 * Toss-style icon wrapper with optional background
 * Provides consistent styling and background options for icons
 */
export const TossIcon: React.FC<TossIconProps & { name: IconName }> = ({
  name,
  size = 24,
  color,
  backgroundColor,
  rounded = false,
}) => {
  // If no background, just return the icon
  if (!backgroundColor) {
    return <Icon name={name} size={size} color={color} />;
  }

  const containerSize = size * 1.8;
  const borderRadius = rounded ? containerSize / 2 : 8;

  return (
    <View
      style={[
        styles.iconContainer,
        {
          width: containerSize,
          height: containerSize,
          backgroundColor,
          borderRadius,
        },
      ]}
    >
      <Icon name={name} size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// Predefined TossIcon variants for common use cases
export const TossIconVariants = {
  // Success variant
  success: (name: IconName, size?: number) => (
    <TossIcon
      name={name}
      size={size}
      color={iconColors.success}
      backgroundColor="#ECFDF5"
      rounded={true}
    />
  ),
  
  // Warning variant
  warning: (name: IconName, size?: number) => (
    <TossIcon
      name={name}
      size={size}
      color={iconColors.warning}
      backgroundColor="#FFFBEB"
      rounded={true}
    />
  ),
  
  // Error variant
  error: (name: IconName, size?: number) => (
    <TossIcon
      name={name}
      size={size}
      color={iconColors.error}
      backgroundColor="#FEF2F2"
      rounded={true}
    />
  ),
  
  // Info variant
  info: (name: IconName, size?: number) => (
    <TossIcon
      name={name}
      size={size}
      color={iconColors.primary}
      backgroundColor="#EFF6FF"
      rounded={true}
    />
  ),
  
  // Neutral variant
  neutral: (name: IconName, size?: number) => (
    <TossIcon
      name={name}
      size={size}
      color={iconColors.textSecondary}
      backgroundColor="#F2F4F6"
      rounded={true}
    />
  ),
  
  // Square variant
  square: (name: IconName, size?: number, color?: string) => (
    <TossIcon
      name={name}
      size={size}
      color={color || iconColors.text}
      backgroundColor="#F8F9FA"
      rounded={false}
    />
  ),
};