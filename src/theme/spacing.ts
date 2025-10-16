export const spacing = {
  // Base spacing unit (8px)
  base: 8,
  
  // Spacing scale
  xs: 4,    // 4px
  sm: 8,    // 8px
  md: 16,   // 16px
  lg: 24,   // 24px
  xl: 32,   // 32px
  '2xl': 40, // 40px
  '3xl': 48, // 48px
  '4xl': 64, // 64px
  '5xl': 80, // 80px
  '6xl': 96, // 96px
  
  // Specific spacing for common use cases
  padding: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  
  margin: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  
  // Component specific spacing
  component: {
    iconSize: {
      xs: 16,
      sm: 20,
      md: 24,
      lg: 32,
      xl: 40,
    },
    buttonHeight: {
      sm: 32,
      md: 44,
      lg: 56,
    },
    inputHeight: {
      sm: 36,
      md: 44,
      lg: 52,
    },
  },
  
  // Layout spacing
  layout: {
    screenPadding: 16,
    sectionSpacing: 24,
    cardPadding: 16,
    cardSpacing: 12,
  },
} as const;

export type Spacing = typeof spacing;
