import { colors } from './colors';

export const shadowLevels = {
  // Subtle elevation for cards (blue-tinted)
  card: {
    shadowColor: colors.primary.base,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  
  // Medium elevation for floating elements
  floating: {
    shadowColor: colors.primary.base,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  
  // High elevation for modals/sheets
  modal: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
  },
  
  // Premium hero card (blue glow)
  hero: {
    shadowColor: colors.primary.base,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 10,
  },
  
  // Button shadow (blue accent)
  button: {
    shadowColor: colors.primary.base,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 12,
    elevation: 4,
  },
  
  // Tab shadow
  tab: {
    shadowColor: colors.primary.base,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  
  // Icon shadow
  icon: {
    shadowColor: colors.primary.base,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
} as const;

export type ShadowLevels = typeof shadowLevels;
