export const colors = {
  // Premium Brand Color System with #1884FF
  
  // Primary Brand Colors
  primary: {
    base: '#1884FF',        // Main brand blue
    light: '#4DA3FF',       // Lighter variant (hover, active states)
    dark: '#0066E6',        // Darker variant (pressed state)
    pressed: '#0F6BCC',     // Legacy support
  },
  
  // Complementary Gradients with #1884FF
  gradients: {
    hero: ['#1884FF', '#0066E6'],           // Primary gradient
    card: ['#F0F7FF', '#E6F2FF'],           // Light blue background
    button: ['#1884FF', '#0066E6'],         // Button gradient
    accent: ['#1884FF', '#4DA3FF'],         // Accent gradient
    screen: ['#FAFBFD', '#F0F7FF'],         // Screen background
    glass: ['rgba(24, 132, 255, 0.08)', 'rgba(24, 132, 255, 0.02)'],
    icon: ['#E6F2FF', '#D6EBFF'],           // Icon background
  },
  
  // Background Layers (harmonized with #1884FF)
  background: {
    primary: '#FAFBFD',      // Main background (cool tint)
    secondary: '#F5F8FC',    // Secondary background
    tertiary: '#FFFFFF',     // Card background
    blue: '#F0F7FF',         // Light blue accent background
    blueGradient: ['#F8FBFF', '#F0F7FF'],
  },
  
  // Text Colors (harmonized with #1884FF)
  text: {
    primary: '#1A1F2E',      // Main text (slightly blue-tinted black)
    secondary: '#4E5D78',    // Secondary text
    tertiary: '#8B95A8',     // Tertiary text
    disabled: '#C9CDD8',     // Disabled text
    blue: '#1884FF',         // Brand blue for emphasis
  },
  
  // Status Colors (harmonized with #1884FF)
  status: {
    success: {
      base: '#10B981',
      light: '#34D399',
      background: 'rgba(16, 185, 129, 0.08)',
      gradient: ['#10B981', '#059669'],
    },
    warning: {
      base: '#F59E0B',
      light: '#FBBF24',
      background: 'rgba(245, 158, 11, 0.08)',
      gradient: ['#F59E0B', '#D97706'],
    },
    error: {
      base: '#EF4444',
      light: '#F87171',
      background: 'rgba(239, 68, 68, 0.08)',
      gradient: ['#EF4444', '#DC2626'],
    },
    info: {
      base: '#1884FF',
      light: '#4DA3FF',
      background: 'rgba(24, 132, 255, 0.08)',
      gradient: ['#1884FF', '#4DA3FF'],
    },
  },
  
  // Unified Border System - #E5E7EB for all borders
  border: {
    light: '#E5E7EB',        // Standard border for all cards/inputs
    medium: '#E5E7EB',       // Same as light for consistency
    strong: '#E5E7EB',       // Same as light for consistency
    primary: '#E5E7EB',      // Primary border color
    secondary: '#E5E7EB',    // Secondary border color
    accent: '#E5E7EB',       // Accent border color
    // Special cases
    error: '#EF4444',        // Error border (logout button)
    active: '#1884FF',       // Active state border (tabs)
  },
  
  // Shadow with Blue Tint
  shadow: {
    primary: 'rgba(24, 132, 255, 0.12)',
    secondary: 'rgba(0, 0, 0, 0.04)',
    card: 'rgba(24, 132, 255, 0.06)',
    floating: 'rgba(24, 132, 255, 0.08)',
    hero: 'rgba(24, 132, 255, 0.12)',
    button: 'rgba(24, 132, 255, 0.16)',
  },
  
  // Unified Color System - #E5E7EB Border System
  unified: {
    background: '#F9FAFB',     // Main background
    border: '#E5E7EB',         // All borders
    card: '#FFFFFF',           // Card background
    textPrimary: '#1A1F2E',    // Primary text
    textSecondary: '#6B7280',  // Secondary text
    brand: '#1884FF',          // Brand color (buttons, badges, emphasis)
    success: '#10B981',        // Success color
    warning: '#F59E0B',        // Warning color
    error: '#EF4444',          // Error color
  },

  // Legacy Support (mapped to new system)
  gray900: '#1A1F2E',        // Primary text
  gray800: '#333D4B',        // Secondary text
  gray700: '#4E5D78',        // Tertiary text
  gray600: '#6B7684',        // Disabled text
  gray500: '#8B95A8',        // Placeholder
  gray400: '#B0B8C1',        // Divider
  gray300: '#C9CDD8',        // Line
  gray200: '#E5E7EB',        // Updated to match unified border
  gray100: '#F2F4F6',        // Background light
  gray50: '#FAFBFD',         // Background lightest
  white: '#FFFFFF',
  
  // Functional Colors
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  
  // Legacy Background Support (mapped to new system)
  backgroundSecondary: '#F5F8FC',
  backgroundTertiary: '#F0F7FF',
  textPrimary: '#1A1F2E',
  textSecondary: '#4E5D78',
  textTertiary: '#8B95A8',
  borderLight: 'rgba(24, 132, 255, 0.08)',
  statusSuccess: '#10B981',
  statusWarning: '#F59E0B',
  statusError: '#EF4444',
  accent: '#1884FF',
  primaryDark: '#0066E6',
  primaryLight: '#4DA3FF',
  info: '#1884FF',
  textLight: '#8B95A8',
  
  // Overlay Colors
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
  
  // Gradient Colors (legacy support)
  gradientStart: '#1884FF',
  gradientEnd: '#4DA3FF',
} as const;

export type Colors = typeof colors;
