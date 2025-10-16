import { colors } from './colors';

export const gradientPresets = {
  // Screen Background Gradients
  screen: {
    primary: {
      colors: ['#FAFBFD', '#F5F8FC', '#F0F7FF'],
      start: { x: 0, y: 0 },
      end: { x: 0, y: 1 },
    },
    secondary: {
      colors: ['#F8FBFF', '#F0F7FF'],
      start: { x: 0, y: 0 },
      end: { x: 0, y: 1 },
    },
  },
  
  // Card Gradients
  card: {
    hero: {
      colors: ['#FFFFFF', '#F8FBFF', '#FFFFFF'],
      start: { x: 0, y: 0 },
      end: { x: 0, y: 1 },
      locations: [0, 0.5, 1],
    },
    glass: {
      colors: [
        'rgba(255, 255, 255, 0.9)',
        'rgba(240, 247, 255, 0.8)',
      ],
      start: { x: 0, y: 0 },
      end: { x: 0, y: 1 },
    },
    subtle: {
      colors: ['#F0F7FF', '#E6F2FF'],
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
    },
  },
  
  // Button Gradients
  button: {
    primary: {
      colors: ['#1884FF', '#0066E6'],
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
    },
    secondary: {
      colors: ['#F0F7FF', '#E6F2FF'],
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
    },
    ghost: {
      colors: ['transparent', 'transparent'],
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
    },
  },
  
  // Icon Background Gradients
  icon: {
    primary: {
      colors: ['#E6F2FF', '#D6EBFF'],
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
    },
    accent: {
      colors: ['#4DA3FF', '#1884FF'],
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
    },
  },
  
  // Status Gradients
  status: {
    success: {
      colors: ['#10B981', '#059669'],
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
    },
    warning: {
      colors: ['#F59E0B', '#D97706'],
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
    },
    error: {
      colors: ['#EF4444', '#DC2626'],
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
    },
    info: {
      colors: ['#1884FF', '#4DA3FF'],
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
    },
  },
  
  // Accent Gradients
  accent: {
    primary: {
      colors: ['#4DA3FF', '#1884FF', '#0066E6'],
      start: { x: 0, y: 0 },
      end: { x: 1, y: 0 },
    },
    glow: {
      colors: ['rgba(24, 132, 255, 0.1)', 'transparent'],
      start: { x: 0, y: 0 },
      end: { x: 0, y: 1 },
    },
  },
} as const;

export type GradientPresets = typeof gradientPresets;
