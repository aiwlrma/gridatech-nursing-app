import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { medicationColors } from '../../theme/medicationColors';

interface SimpleRecentPracticeProps {
  medication: string;
  dose: string;
  route: string;
  score: number;
  date: string;
  status: 'good' | 'warning';
  onPress: () => void;
}

const SimpleRecentPractice: React.FC<SimpleRecentPracticeProps> = ({
  medication,
  dose,
  route,
  score,
  date,
  status,
  onPress
}) => {
  return (
    <TouchableOpacity 
      style={styles.practiceCard}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Icon */}
      <View style={[
        styles.practiceIcon,
        status === 'warning' 
          ? { backgroundColor: '#FEF3C7' }
          : { backgroundColor: 'rgba(24, 132, 255, 0.1)' }
      ]}>
        <Text style={styles.practiceEmoji}>💊</Text>
      </View>
      
      {/* Content */}
      <View style={styles.practiceContent}>
        <Text style={styles.practiceTitle}>{medication}</Text>
        <Text style={styles.practiceMeta}>
          {dose} · {route}
        </Text>
        <Text style={styles.practiceDate}>{date}</Text>
      </View>
      
      {/* Score & Status */}
      <View style={styles.practiceRight}>
        <Text style={[
          styles.practiceScore,
          status === 'warning' && { color: medicationColors.warning }
        ]}>
          {score}점
        </Text>
        <View style={[
          styles.practiceStatus,
          status === 'warning' 
            ? { backgroundColor: medicationColors.warning }
            : { backgroundColor: medicationColors.primary }
        ]}>
          <Text style={styles.practiceStatusIcon}>
            {status === 'good' ? '✓' : '!'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  practiceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: medicationColors.background.primary,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: medicationColors.background.tertiary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  practiceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  practiceEmoji: {
    fontSize: 24,
  },
  practiceContent: {
    flex: 1,
  },
  practiceTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: medicationColors.text.primary,
    marginBottom: 4,
  },
  practiceMeta: {
    fontSize: 13,
    color: medicationColors.text.secondary,
    marginBottom: 2,
  },
  practiceDate: {
    fontSize: 12,
    color: medicationColors.text.tertiary,
  },
  practiceRight: {
    alignItems: 'flex-end',
    gap: 6,
  },
  practiceScore: {
    fontSize: 20,
    fontWeight: '700',
    color: medicationColors.text.primary,
  },
  practiceStatus: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  practiceStatusIcon: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '700',
  },
});

export default SimpleRecentPractice;
