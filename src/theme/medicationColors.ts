/**
 * Simplified Medication Administration Color System
 * Only 3 colors: #1884FF (primary), #F59E0B (warning), and neutral grays
 */

export const medicationColors = {
  // Primary - for all normal/good states
  primary: '#1884FF',
  
  // Warning - only for attention needed (<80%)
  warning: '#F59E0B',
  
  // Neutral - backgrounds and text
  background: {
    primary: '#FFFFFF',
    secondary: '#F9FAFB',
    tertiary: '#F3F4F6',
  },
  
  text: {
    primary: '#1A1F2E',
    secondary: '#6B7280',
    tertiary: '#9CA3AF',
  },
  
  border: '#E5E7EB',
  
  // Helper functions
  getProgressColor: (score: number) => {
    return score < 80 ? '#F59E0B' : '#1884FF';
  },
  
  getStatusColor: (score: number) => {
    return score < 80 ? '#F59E0B' : '#1884FF';
  },
  
  getBackgroundColor: (score: number) => {
    return score < 80 ? '#FEF3C7' : 'rgba(24, 132, 255, 0.1)';
  },
} as const;

export type MedicationColors = typeof medicationColors;
