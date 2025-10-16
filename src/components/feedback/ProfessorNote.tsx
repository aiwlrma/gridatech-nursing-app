import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { colors, typography, spacing } from '../../theme';

interface ProfessorNoteProps {
  note: string;
}

const ProfessorNote: React.FC<ProfessorNoteProps> = ({ note }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>교수님의 피드백</Text>
      </View>
      <Text style={styles.note}>{note}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 12,
    padding: spacing.lg,
    marginTop: spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: '#A5F3E3',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  icon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  title: {
    ...typography.textStyles.body,
    fontWeight: typography.fontWeight.semibold,
  },
  note: {
    ...typography.textStyles.bodySmall,
    lineHeight: 22,
    color: colors.textPrimary,
  },
});

export default ProfessorNote;
