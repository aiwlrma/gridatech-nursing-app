import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '../icons';

interface TossSkillAlertProps {
  title: string;
  score: number;
  subtitle: string;
  onPress: () => void;
}

const TossSkillAlert: React.FC<TossSkillAlertProps> = ({
  title,
  score,
  subtitle,
  onPress
}) => {
  const isLowScore = score < 80;
  
  return (
    <TouchableOpacity style={styles.alertItem} onPress={onPress}>
      <View style={styles.alertContent}>
        <View style={styles.alertLeft}>
          {/* Small dot indicator */}
          <View style={[
            styles.alertDot,
            { backgroundColor: isLowScore ? '#F59E0B' : '#6B7684' }
          ]} />
          
          <View style={styles.alertText}>
            <Text style={styles.alertTitle}>{title}</Text>
            <Text style={styles.alertSubtitle}>{subtitle}</Text>
          </View>
        </View>
        
        <View style={styles.alertRight}>
          <Text style={styles.alertScore}>{score}점</Text>
          <Icon name="arrowRight" size={18} color="#C9CDD2" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  alertItem: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F4F6',
  },
  alertContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alertLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  alertDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  alertText: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#191F28',
    marginBottom: 4,
  },
  alertSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#8B95A1',
  },
  alertRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  alertScore: {
    fontSize: 18,
    fontWeight: '700',
    color: '#191F28',
  },
});

export default TossSkillAlert;
