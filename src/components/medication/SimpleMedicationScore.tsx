import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { medicationColors } from '../../theme/medicationColors';

interface SimpleMedicationScoreProps {
  score: number;
  trend?: number;
}

const SimpleMedicationScore: React.FC<SimpleMedicationScoreProps> = ({
  score,
  trend
}) => {
  return (
    <View style={styles.heroCard}>
      <Text style={styles.label}>약물 투약 종합 점수</Text>
      
      <View style={styles.scoreRow}>
        <Text style={styles.scoreValue}>{score}점</Text>
        {trend && trend > 0 && (
          <View style={styles.trendBadge}>
            <Text style={styles.trendText}>↑ {trend}점</Text>
          </View>
        )}
      </View>
      
      <Text style={styles.subtitle}>
        28회 실습 · 90% 5R준수 · 95% 최고
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  heroCard: {
    backgroundColor: medicationColors.background.primary,
    padding: 32,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: medicationColors.border,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  label: {
    fontSize: 15,
    fontWeight: '400',
    color: medicationColors.text.secondary,
    marginBottom: 12,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  scoreValue: {
    fontSize: 56,
    fontWeight: '700',
    color: medicationColors.text.primary,
    letterSpacing: -2,
  },
  trendBadge: {
    backgroundColor: 'rgba(24, 132, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  trendText: {
    fontSize: 15,
    fontWeight: '600',
    color: medicationColors.primary,
  },
  subtitle: {
    fontSize: 14,
    color: medicationColors.text.tertiary,
    marginTop: 8,
  },
});

export default SimpleMedicationScore;
