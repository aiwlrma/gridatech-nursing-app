import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TossSkillScoreProps {
  score: number;
  label: string;
  comparison?: string;
}

const TossSkillScore: React.FC<TossSkillScoreProps> = ({
  score,
  label,
  comparison
}) => {
  return (
    <View style={styles.scoreCard}>
      <Text style={styles.scoreLabel}>{label}</Text>
      
      {/* Giant number */}
      <Text style={styles.scoreValue}>{score}점</Text>
      
      {comparison && (
        <Text style={styles.scoreComparison}>{comparison}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  scoreCard: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 16,
    fontWeight: '400',
    color: '#6B7684',
    marginBottom: 8,
  },
  scoreValue: {
    fontSize: 56,
    fontWeight: '700',
    color: '#191F28',
    letterSpacing: -2,
  },
  scoreComparison: {
    fontSize: 15,
    fontWeight: '400',
    color: '#4E5968',
    marginTop: 8,
  },
});

export default TossSkillScore;
