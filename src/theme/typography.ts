import { Platform } from 'react-native';

export const typography = {
  // Toss Design System Typography
  
  // Font families - Pretendard fonts
  fontFamily: {
    regular: 'Pretendard-Regular',
    medium: 'Pretendard-Medium',
    semibold: 'Pretendard-SemiBold',
    bold: 'Pretendard-Bold',
  },
  
  // Toss font sizes (clear hierarchy)
  fontSize: {
    hero: 48,        // Giant numbers for key metrics
    title: 28,       // Main titles
    subtitle: 20,    // Section titles
    body: 16,        // Body text
    base: 16,        // Base font size
    caption: 14,     // Small text
    tiny: 12,        // Very small text
  },
  
  // Line heights (optimized for readability)
  lineHeight: {
    hero: 56,
    title: 36,
    subtitle: 28,
    body: 24,
    caption: 20,
    tiny: 16,
  },
  
  // Font weights (only 3 weights like Toss)
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  
  // Toss text styles with Pretendard fonts
  textStyles: {
    // Hero numbers (48px bold)
    hero: {
      fontFamily: 'Pretendard-Bold',
      fontSize: 48,
      lineHeight: 56,
      letterSpacing: -1.5,
      color: '#191F28',
    },
    
    // Main titles (28px bold)
    title: {
      fontFamily: 'Pretendard-Bold',
      fontSize: 28,
      lineHeight: 36,
      color: '#191F28',
    },
    
    // Section titles (20px semibold)
    subtitle: {
      fontFamily: 'Pretendard-SemiBold',
      fontSize: 20,
      lineHeight: 28,
      color: '#191F28',
    },
    
    // Body text (16px regular)
    body: {
      fontFamily: 'Pretendard-Regular',
      fontSize: 16,
      lineHeight: 24,
      color: '#191F28',
    },
    
    // Secondary text (16px regular, gray)
    bodySecondary: {
      fontFamily: 'Pretendard-Regular',
      fontSize: 16,
      lineHeight: 24,
      color: '#4E5968',
    },
    
    // Small text (14px regular)
    caption: {
      fontFamily: 'Pretendard-Regular',
      fontSize: 14,
      lineHeight: 20,
      color: '#8B95A1',
    },
    
    // Button text (16px semibold)
    button: {
      fontFamily: 'Pretendard-SemiBold',
      fontSize: 16,
      lineHeight: 24,
    },
    
    // Legacy support
    heading1: {
      fontFamily: 'Pretendard-Bold',
      fontSize: 28,
      lineHeight: 36,
      color: '#191F28',
    },
    heading2: {
      fontFamily: 'Pretendard-SemiBold',
      fontSize: 20,
      lineHeight: 28,
      color: '#191F28',
    },
    heading3: {
      fontFamily: 'Pretendard-SemiBold',
      fontSize: 18,
      lineHeight: 24,
      color: '#191F28',
    },
    bodySmall: {
      fontFamily: 'Pretendard-Regular',
      fontSize: 14,
      lineHeight: 20,
      color: '#8B95A1',
    },
    
    // Additional useful styles
    medium: {
      fontFamily: 'Pretendard-Medium',
      fontSize: 16,
      lineHeight: 24,
      color: '#191F28',
    },
    
    semibold: {
      fontFamily: 'Pretendard-SemiBold',
      fontSize: 16,
      lineHeight: 24,
      color: '#191F28',
    },
    
    bold: {
      fontFamily: 'Pretendard-Bold',
      fontSize: 16,
      lineHeight: 24,
      color: '#191F28',
    },
    
    // Splash screen styles
    splashTitle: {
      fontFamily: 'Pretendard-Bold',
      fontSize: 32,
      lineHeight: 40,
      color: '#191F28',
    },
    splashSubtitle: {
      fontFamily: 'Pretendard-Regular',
      fontSize: 16,
      lineHeight: 24,
      color: '#4E5968',
    },
  },
} as const;

export type Typography = typeof typography;
