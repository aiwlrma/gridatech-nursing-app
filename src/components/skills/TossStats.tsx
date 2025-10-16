import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TossStatsProps {
  totalPractices: number;
  averageScore: number;
  proficiency: number;
}

const TossStats: React.FC<TossStatsProps> = ({
  totalPractices,
  averageScore,
  proficiency
}) => {
  return (
    <View style={styles.statsCard}>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{totalPractices}회</Text>
        <Text style={styles.statLabel}>총 실습</Text>
      </View>
      
      <View style={styles.statDivider} />
      
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{averageScore}점</Text>
        <Text style={styles.statLabel}>평균 점수</Text>
      </View>
      
      <View style={styles.statDivider} />
      
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{proficiency}%</Text>
        <Text style={styles.statLabel}>숙련도</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 24,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#191F28',
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 13,
    fontWeight: '400',
    color: '#8B95A1',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E5E8EB',
  },
});

export default TossStats;
