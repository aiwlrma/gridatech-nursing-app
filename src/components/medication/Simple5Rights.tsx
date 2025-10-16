import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { medicationColors } from '../../theme/medicationColors';

interface Simple5RightsProps {
  checks: {
    patient: boolean;
    medication: boolean;
    route: boolean;
    dose: boolean;
    time: boolean;
  };
  score: number;
}

const Simple5Rights: React.FC<Simple5RightsProps> = ({ 
  checks, 
  score 
}) => {
  return (
    <View style={styles.rightsCard}>
      <View style={styles.rightsHeader}>
        <Text style={styles.rightsTitle}>5 Rights 준수율</Text>
        <Text style={styles.rightsScore}>{score}%</Text>
      </View>
      
      <View style={styles.rightsGrid}>
        {Object.entries(checks).map(([key, passed], index) => (
          <View key={key} style={styles.rightItem}>
            <View style={[
              styles.rightIndicator,
              passed 
                ? { backgroundColor: 'rgba(24, 132, 255, 0.1)' }
                : { backgroundColor: '#FEF3C7' }
            ]}>
              <Text style={[
                styles.rightIcon,
                passed ? { color: medicationColors.primary } : { color: medicationColors.warning }
              ]}>
                {passed ? '✓' : '!'}
              </Text>
            </View>
            <Text style={styles.rightLabel}>
              {['P', 'M', 'R', 'D', 'T'][index]}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rightsCard: {
    backgroundColor: medicationColors.background.primary,
    padding: 20,
    marginHorizontal: 20,
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
  rightsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  rightsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: medicationColors.text.primary,
  },
  rightsScore: {
    fontSize: 20,
    fontWeight: '700',
    color: medicationColors.primary,
  },
  rightsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  rightItem: {
    alignItems: 'center',
    gap: 8,
  },
  rightIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightIcon: {
    fontSize: 18,
    fontWeight: '700',
  },
  rightLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: medicationColors.text.secondary,
  },
});

export default Simple5Rights;
