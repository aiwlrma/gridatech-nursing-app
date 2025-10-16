export interface IconProps {
  size?: number;
  color?: string;
}

export interface TossIconProps extends IconProps {
  backgroundColor?: string;
  rounded?: boolean;
}

// Icon size tokens following Toss design system
export const iconSizes = {
  tiny: 12,      // Small indicators
  small: 16,     // List items, inline text
  medium: 20,    // Buttons, cards
  large: 24,     // Headers, main actions
  xlarge: 32,    // Feature highlights
  huge: 48,      // Hero sections
} as const;

// Icon color tokens following Toss design system
export const iconColors = {
  primary: '#3182F6',
  secondary: '#8B95A1',
  tertiary: '#C9CDD2',
  success: '#10B981',
  error: '#F04452',
  warning: '#F59E0B',
  text: '#191F28',
  textSecondary: '#6B7684',
  disabled: '#B0B8C1',
} as const;

export type IconSize = keyof typeof iconSizes;
export type IconColor = keyof typeof iconColors;