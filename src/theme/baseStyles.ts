import { colors } from './colors';

/**
 * Unified Base Styles with #E5E7EB Border System
 * All cards, inputs, and buttons use consistent border styling
 */

// Unified Border Color
export const BORDER_COLOR = '#E5E7EB';
export const BORDER_WIDTH = 1.5;

// Base Card Style - Used for all cards
export const CARD_STYLE = {
  backgroundColor: '#FFFFFF',
  borderWidth: BORDER_WIDTH,
  borderColor: BORDER_COLOR,
  borderRadius: 16,
  padding: 20,
  shadowColor: 'rgba(0, 0, 0, 0.08)',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 1,
  shadowRadius: 8,
  elevation: 2,
};

// Base Input Style - Used for all input fields
export const INPUT_STYLE = {
  backgroundColor: '#FFFFFF',
  borderWidth: BORDER_WIDTH,
  borderColor: BORDER_COLOR,
  borderRadius: 12,
  padding: 16,
  height: 48,
  fontSize: 16,
  color: colors.unified.textPrimary,
};

// Base Button Styles
export const BUTTON_OUTLINE = {
  borderWidth: BORDER_WIDTH,
  borderColor: BORDER_COLOR,
  borderRadius: 12,
  padding: 16,
  backgroundColor: 'transparent',
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
};

export const BUTTON_PRIMARY = {
  backgroundColor: colors.unified.brand,
  borderWidth: 0,
  borderRadius: 12,
  padding: 16,
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
};

export const BUTTON_ERROR = {
  borderWidth: BORDER_WIDTH,
  borderColor: colors.unified.error,
  borderRadius: 12,
  padding: 16,
  backgroundColor: 'transparent',
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
};

// Special Cases
export const ACTIVE_TAB_BORDER = {
  borderBottomWidth: 2,
  borderBottomColor: colors.unified.brand,
};

export const LOGOUT_BUTTON = {
  ...BUTTON_ERROR,
};

// Badge Style for Recommendations/Highlights
export const BADGE_STYLE = {
  position: 'absolute' as const,
  top: 8,
  right: 8,
  backgroundColor: colors.unified.brand,
  paddingHorizontal: 8,
  paddingVertical: 4,
  borderRadius: 8,
};

export const BADGE_TEXT = {
  color: '#FFFFFF',
  fontSize: 11,
  fontWeight: '700' as const,
};

// Search Bar Style
export const SEARCH_BAR_STYLE = {
  ...INPUT_STYLE,
  flexDirection: 'row' as const,
  alignItems: 'center' as const,
  paddingHorizontal: 16,
};

// List Item Style
export const LIST_ITEM_STYLE = {
  backgroundColor: '#FFFFFF',
  borderWidth: BORDER_WIDTH,
  borderColor: BORDER_COLOR,
  borderRadius: 12,
  padding: 16,
  marginBottom: 8,
};

// Modal/Dialog Style
export const MODAL_STYLE = {
  backgroundColor: '#FFFFFF',
  borderWidth: BORDER_WIDTH,
  borderColor: BORDER_COLOR,
  borderRadius: 16,
  padding: 24,
  margin: 20,
};

// Form Field Style
export const FORM_FIELD_STYLE = {
  marginBottom: 16,
};

export const FORM_LABEL_STYLE = {
  fontSize: 14,
  fontWeight: '600' as const,
  color: colors.unified.textPrimary,
  marginBottom: 8,
};

// Divider Style
export const DIVIDER_STYLE = {
  height: 1,
  backgroundColor: BORDER_COLOR,
  marginVertical: 16,
};

// Icon Container Style
export const ICON_CONTAINER_STYLE = {
  width: 48,
  height: 48,
  borderRadius: 24,
  backgroundColor: '#F9FAFB',
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
  borderWidth: BORDER_WIDTH,
  borderColor: BORDER_COLOR,
};

// Progress Bar Style
export const PROGRESS_BAR_CONTAINER = {
  height: 8,
  backgroundColor: '#F3F4F6',
  borderRadius: 4,
  overflow: 'hidden' as const,
};

export const PROGRESS_BAR_FILL = {
  height: '100%',
  backgroundColor: colors.unified.brand,
  borderRadius: 4,
};

// Status Indicator Style
export const STATUS_INDICATOR = {
  width: 8,
  height: 8,
  borderRadius: 4,
  marginRight: 8,
};

// Text Styles
export const TEXT_PRIMARY = {
  fontSize: 16,
  fontWeight: '600' as const,
  color: colors.unified.textPrimary,
};

export const TEXT_SECONDARY = {
  fontSize: 14,
  color: colors.unified.textSecondary,
};

export const TEXT_TERTIARY = {
  fontSize: 12,
  color: colors.unified.textSecondary,
};

export const TEXT_BRAND = {
  fontSize: 16,
  fontWeight: '700' as const,
  color: colors.unified.brand,
};

// Spacing Constants
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
};

// Border Radius Constants
export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

export default {
  CARD_STYLE,
  INPUT_STYLE,
  BUTTON_OUTLINE,
  BUTTON_PRIMARY,
  BUTTON_ERROR,
  ACTIVE_TAB_BORDER,
  LOGOUT_BUTTON,
  BADGE_STYLE,
  BADGE_TEXT,
  SEARCH_BAR_STYLE,
  LIST_ITEM_STYLE,
  MODAL_STYLE,
  FORM_FIELD_STYLE,
  FORM_LABEL_STYLE,
  DIVIDER_STYLE,
  ICON_CONTAINER_STYLE,
  PROGRESS_BAR_CONTAINER,
  PROGRESS_BAR_FILL,
  STATUS_INDICATOR,
  TEXT_PRIMARY,
  TEXT_SECONDARY,
  TEXT_TERTIARY,
  TEXT_BRAND,
  SPACING,
  BORDER_RADIUS,
  BORDER_COLOR,
  BORDER_WIDTH,
};
