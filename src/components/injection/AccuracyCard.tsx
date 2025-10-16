import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { baseStyles } from '../../theme';

interface AccuracyCardProps {
  name: string;
  nameEn: string;
  score: number;
  color: string;
}

const AccuracyCard: React.FC<AccuracyCardProps> = ({
  name,
  nameEn,
  score,
  color
}) => {
  return (
    <View style={styles.accuracyCard}>
      <View style={styles.accuracyLeft}>
        <Text style={styles.accuracyName}>{name}</Text>
        <Text style={styles.accuracyNameEn}>{nameEn}</Text>
      </View>
      
      <View style={styles.accuracyRight}>
        <Text style={[styles.accuracyScore, { color }]}>{score}%</Text>
        <View style={styles.progressMini}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${score}%`, backgroundColor: color }
            ]} 
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  accuracyCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
  },
  accuracyLeft: {
    flex: 1,
  },
  accuracyName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1F2E',
    marginBottom: 2,
  },
  accuracyNameEn: {
    fontSize: 12,
    color: '#6B7280',
  },
  accuracyRight: {
    alignItems: 'flex-end',
    minWidth: 60,
  },
  accuracyScore: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  progressMini: {
    width: 40,
    height: 3,
    backgroundColor: '#F3F4F6',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
});

export default AccuracyCard;
