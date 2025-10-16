import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme';

interface BarChartProps {
  data: number[];
  color?: string;
  height?: number;
  labels?: string[];
}

export const BarChart: React.FC<BarChartProps> = ({ 
  data, 
  color = '#1884FF',
  height = 100,
  labels = []
}) => {
  const max = Math.max(...data);
  
  return (
    <View style={[styles.container, { height }]}>
      {data.map((value, index) => (
        <View key={index} style={styles.barWrapper}>
          <View 
            style={[
              styles.bar,
              { 
                height: `${(value / max) * 100}%`,
                backgroundColor: color 
              }
            ]} 
          />
          {labels[index] && (
            <View style={styles.labelContainer}>
              <Text style={styles.label}>{labels[index]}</Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    gap: 8,
    paddingHorizontal: 4,
  },
  barWrapper: {
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bar: {
    width: '100%',
    borderRadius: 4,
    minHeight: 4,
  },
  labelContainer: {
    marginTop: 8,
    alignItems: 'center',
  },
  label: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '500',
  },
});
