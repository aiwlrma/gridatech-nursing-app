import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { colors } from '../../theme';
import { Icon } from '../icons';

interface EmergencyProcedureProps {
  title: string;
  steps: number;
  duration: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  icon: React.ReactNode;
  onPress: () => void;
}

const EmergencyProcedure: React.FC<EmergencyProcedureProps> = ({
  title,
  steps,
  duration,
  difficulty,
  icon,
  onPress
}) => {
  const getDifficultyText = () => {
    switch (difficulty) {
      case 'basic': return '기초';
      case 'intermediate': return '중급';
      case 'advanced': return '고급';
      default: return '기초';
    }
  };

  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'basic': return colors.status.success.base;
      case 'intermediate': return colors.status.warning.base;
      case 'advanced': return colors.status.error.base;
      default: return colors.status.success.base;
    }
  };

  return (
    <TouchableOpacity 
      style={styles.procedureCard}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Icon */}
      <View style={styles.procedureIcon}>
        {icon}
      </View>
      
      {/* Content */}
      <View style={styles.procedureContent}>
        <Text style={styles.procedureTitle}>{title}</Text>
        <View style={styles.procedureMeta}>
          <Text style={styles.metaText}>{steps}단계</Text>
          <Text style={styles.metaDot}>·</Text>
          <Text style={styles.metaText}>{duration}</Text>
          <Text style={styles.metaDot}>·</Text>
          <Text style={[styles.metaText, { color: getDifficultyColor() }]}>
            {getDifficultyText()}
          </Text>
        </View>
      </View>
      
      {/* Arrow */}
      <View style={styles.arrow}>
        <Icon name="arrowRight" size={20} color={colors.text.tertiary} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  procedureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.tertiary,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border.light,
    shadowColor: colors.shadow.card,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
  },
  procedureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.status.info.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  procedureContent: {
    flex: 1,
  },
  procedureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 6,
    fontFamily: 'Pretendard-SemiBold',
  },
  procedureMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 13,
    color: colors.text.secondary,
    fontFamily: 'Pretendard-Regular',
  },
  metaDot: {
    fontSize: 13,
    color: colors.text.tertiary,
  },
  arrow: {
    marginLeft: 8,
  },
});

export default EmergencyProcedure;
