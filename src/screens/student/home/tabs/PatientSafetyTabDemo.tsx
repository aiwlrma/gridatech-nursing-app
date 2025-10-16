import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { colors, typography, spacing } from '../../../../theme';
import PatientSafetyTabImproved from './PatientSafetyTabImproved';

/**
 * Demo component showing how to integrate the improved Patient Safety tab
 * This can be used to test the new design before replacing the original
 */
const PatientSafetyTabDemo: React.FC = () => {
  const handleSwitchToOriginal = () => {
    Alert.alert(
      'Switch to Original',
      'This would switch back to the original PatientSafetyTab component',
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Patient Safety Tab - Improved Version</Text>
        <TouchableOpacity style={styles.switchButton} onPress={handleSwitchToOriginal}>
          <Text style={styles.switchButtonText}>Switch to Original</Text>
        </TouchableOpacity>
      </View>
      
      <PatientSafetyTabImproved />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.layout.screenPadding,
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    ...typography.textStyles.heading3,
    color: colors.primary,
  },
  switchButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
  },
  switchButtonText: {
    ...typography.textStyles.bodySmall,
    color: colors.background,
    fontWeight: typography.fontWeight.medium,
  },
});

export default PatientSafetyTabDemo;
