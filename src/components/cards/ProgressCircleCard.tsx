import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProgressCircle } from '../charts/ProgressCircle';
import { colors } from '../../theme';

interface ProgressCircleCardProps {
  score: number;
  size?: number;
}

const ProgressCircleCard: React.FC<ProgressCircleCardProps> = ({ 
  score, 
  size = 80  // 카드 크기에 맞게 축소
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <ProgressCircle
          percent={score}
          size={size}
          strokeWidth={6}  // strokeWidth도 축소
          color={colors.primary.base}
          showPercentage={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
    flex: 1,
    minHeight: 140, // ScoreSummaryCard와 같은 높이
  },
});

export default ProgressCircleCard;
