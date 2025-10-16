import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface WeeklyData {
  day: string;
  hours: number;
}

interface TossWeeklyChartProps {
  data: WeeklyData[];
  total: number;
  target: number;
}

const TossWeeklyChart: React.FC<TossWeeklyChartProps> = ({
  data,
  total,
  target
}) => {
  const maxHours = Math.max(...data.map(d => d.hours), target);
  
  return (
    <View style={styles.chartCard}>
      <Text style={styles.chartTitle}>이번 주 실습 시간</Text>
      
      {/* Simple bar chart */}
      <View style={styles.chartBars}>
        {data.map((item, index) => (
          <View key={index} style={styles.chartBarContainer}>
            <View style={styles.chartBarWrapper}>
              <View style={[
                styles.chartBar,
                { height: `${(item.hours / maxHours) * 100}%` }
              ]} />
            </View>
            <Text style={styles.chartLabel}>{item.day}</Text>
            <Text style={styles.chartValue}>{item.hours}h</Text>
          </View>
        ))}
      </View>
      
      {/* Summary */}
      <View style={styles.chartSummary}>
        <Text style={styles.chartSummaryText}>
          {total}시간 / 목표 {target}시간
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chartCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#191F28',
    marginBottom: 20,
  },
  chartBars: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 120,
    marginBottom: 16,
  },
  chartBarContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  chartBarWrapper: {
    width: '100%',
    height: 80,
    justifyContent: 'flex-end',
  },
  chartBar: {
    width: '100%',
    backgroundColor: '#3182F6',
    borderRadius: 4,
  },
  chartLabel: {
    fontSize: 12,
    fontWeight: '400',
    color: '#8B95A1',
    marginTop: 8,
  },
  chartValue: {
    fontSize: 11,
    fontWeight: '400',
    color: '#B0B8C1',
    marginTop: 2,
  },
  chartSummary: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F2F4F6',
    alignItems: 'center',
  },
  chartSummaryText: {
    fontSize: 15,
    fontWeight: '400',
    color: '#6B7684',
  },
});

export default TossWeeklyChart;
