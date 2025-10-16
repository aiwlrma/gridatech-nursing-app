import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { baseStyles } from '../../theme';

interface PracticeCardProps {
  icon: string;
  title: string;
  date: string;
  score: number;
  status: 'completed' | 'warning';
  onPress?: () => void;
}

const PracticeCard: React.FC<PracticeCardProps> = ({
  icon,
  title,
  date,
  score,
  status,
  onPress
}) => {
  return (
    <TouchableOpacity 
      style={styles.practiceCard}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={styles.practiceLeft}>
        <Text style={styles.practiceIcon}>{icon}</Text>
        <View>
          <Text style={styles.practiceTitle}>{title}</Text>
          <Text style={styles.practiceDate}>{date}</Text>
        </View>
      </View>
      
      <View style={styles.practiceRight}>
        <Text 
          style={[
            styles.practiceScore,
            { color: status === 'completed' ? '#10B981' : '#F59E0B' }
          ]}
        >
          {score}점
        </Text>
        {status === 'completed' ? (
          <Text style={styles.checkmark}>✓</Text>
        ) : (
          <Text style={styles.warning}>⚠</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  practiceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: baseStyles.BORDER_WIDTH,
    borderColor: baseStyles.BORDER_COLOR,
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
  },
  practiceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  practiceIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  practiceTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1F2E',
    marginBottom: 2,
  },
  practiceDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  practiceRight: {
    alignItems: 'flex-end',
  },
  practiceScore: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  checkmark: {
    fontSize: 14,
    color: '#10B981',
  },
  warning: {
    fontSize: 14,
    color: '#F59E0B',
  },
});

export default PracticeCard;
