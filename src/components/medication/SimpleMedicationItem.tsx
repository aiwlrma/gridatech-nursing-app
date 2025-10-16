import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { medicationColors } from '../../theme/medicationColors';

interface SimpleMedicationItemProps {
  name: string;
  nameEn: string;
  score: number;
  onPress: () => void;
}

const SimpleMedicationItem: React.FC<SimpleMedicationItemProps> = ({
  name,
  nameEn,
  score,
  onPress
}) => {
  const isWarning = score < 80;
  const progressColor = medicationColors.getProgressColor(score);

  return (
    <TouchableOpacity 
      style={styles.medCard}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Content */}
      <View style={styles.medContent}>
        <Text style={styles.medName}>{name}</Text>
        <Text style={styles.medNameEn}>{nameEn}</Text>
        
        {/* Single color progress bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressTrack}>
            <View 
              style={[
                styles.progressBar,
                { 
                  width: `${score}%`,
                  backgroundColor: progressColor
                }
              ]} 
            />
          </View>
        </View>
      </View>
      
      {/* Score */}
      <Text style={[
        styles.medScore,
        isWarning && { color: medicationColors.warning }
      ]}>
        {score}%
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  medCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: medicationColors.background.primary,
    padding: 20,
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
  medContent: {
    flex: 1,
  },
  medName: {
    fontSize: 16,
    fontWeight: '600',
    color: medicationColors.text.primary,
    marginBottom: 4,
  },
  medNameEn: {
    fontSize: 14,
    color: medicationColors.text.tertiary,
    marginBottom: 12,
  },
  progressContainer: {
    width: '100%',
  },
  progressTrack: {
    height: 6,
    backgroundColor: medicationColors.background.tertiary,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  medScore: {
    fontSize: 24,
    fontWeight: '700',
    color: medicationColors.text.primary,
    marginLeft: 16,
  },
});

export default SimpleMedicationItem;
