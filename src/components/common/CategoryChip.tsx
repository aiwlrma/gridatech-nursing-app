import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { colors, typography, spacing } from '../../theme';

interface CategoryChipProps {
  title: string;
  active: boolean;
  onPress?: () => void;
}

const CategoryChip: React.FC<CategoryChipProps> = ({ 
  title, 
  active, 
  onPress 
}) => {
  return (
    <TouchableOpacity 
      style={[styles.chip, active && styles.chipActive]}
      onPress={onPress}
    >
      <Text style={[styles.chipText, active && styles.chipTextActive]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.background.secondary,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.unified.border,
  },
  chipActive: {
    backgroundColor: colors.unified.brand,
    borderColor: colors.unified.brand,
  },
  chipText: {
    ...typography.textStyles.bodySmall,
    fontWeight: typography.fontWeight.semibold,
    fontFamily: typography.fontFamily.semibold,
    color: colors.unified.textSecondary,
  },
  chipTextActive: {
    color: colors.white,
  },
});

export default CategoryChip;
