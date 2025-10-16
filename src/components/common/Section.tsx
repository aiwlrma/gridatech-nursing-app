import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { colors, typography, spacing } from '../../theme';

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.textStyles.subtitle,
    fontFamily: typography.fontFamily.semibold,
    color: colors.unified.textPrimary,
    marginBottom: spacing.md,
    marginHorizontal: spacing.md,
  },
  content: {
    // Content styling handled by individual cards
  },
});

export default Section;
