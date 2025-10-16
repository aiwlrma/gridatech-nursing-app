import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface TossPracticeItemProps {
  title: string;
  subtitle: string;
  score: number;
  status: 'done' | 'warning';
  onPress: () => void;
}

const TossPracticeItem: React.FC<TossPracticeItemProps> = ({
  title,
  subtitle,
  score,
  status,
  onPress
}) => {
  return (
    <TouchableOpacity style={styles.practiceItem} onPress={onPress}>
      {/* Status indicator (minimal) */}
      <View style={[
        styles.practiceIndicator,
        status === 'done' 
          ? { backgroundColor: '#F2F4F6' }
          : { backgroundColor: '#FFF7ED' }
      ]}>
        <Text style={styles.practiceIcon}>
          {status === 'done' ? '✓' : '!'}
        </Text>
      </View>
      
      {/* Content */}
      <View style={styles.practiceContent}>
        <Text style={styles.practiceTitle}>{title}</Text>
        <Text style={styles.practiceSubtitle}>{subtitle}</Text>
      </View>
      
      {/* Score */}
      <Text style={[
        styles.practiceScore,
        status === 'warning' && { color: '#F59E0B' }
      ]}>
        {score}점
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  practiceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F4F6',
  },
  practiceIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  practiceIcon: {
    fontSize: 16,
    fontWeight: '600',
    color: '#191F28',
  },
  practiceContent: {
    flex: 1,
  },
  practiceTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#191F28',
    marginBottom: 4,
  },
  practiceSubtitle: {
    fontSize: 13,
    fontWeight: '400',
    color: '#8B95A1',
  },
  practiceScore: {
    fontSize: 18,
    fontWeight: '700',
    color: '#191F28',
    marginLeft: 12,
  },
});

export default TossPracticeItem;
