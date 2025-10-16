import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ScriptSectionProps {
  step: number;
  title: string;
  script: string;
  tip: string;
}

const ScriptSection: React.FC<ScriptSectionProps> = ({
  step, title, script, tip
}) => {
  return (
    <View style={styles.scriptSection}>
      <View style={styles.stepHeader}>
        <View style={styles.stepBadge}>
          <Text style={styles.stepNumber}>{step}</Text>
        </View>
        <Text style={styles.stepTitle}>{title}</Text>
      </View>

      <View style={styles.scriptCard}>
        <Text style={styles.scriptLabel}>💬 말하기</Text>
        <Text style={styles.scriptText}>{script}</Text>
      </View>

      <View style={styles.tipCard}>
        <Text style={styles.tipIcon}>💡</Text>
        <Text style={styles.tipText}>{tip}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scriptSection: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1884FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1F2E',
  },
  scriptCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
  },
  scriptLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
  },
  scriptText: {
    fontSize: 15,
    color: '#1A1F2E',
    lineHeight: 24,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF7ED',
    borderWidth: 1.5,
    borderColor: '#F59E0B',
    borderRadius: 12,
    padding: 16,
  },
  tipIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#78350F',
    lineHeight: 20,
  },
});

export default ScriptSection;
