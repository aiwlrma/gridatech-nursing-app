import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { colors } from '../../theme';

interface EmergencyCategoryProps {
  title: string;
  icon: React.ReactNode;
  urgency: 'critical' | 'urgent' | 'normal';
  onPress: () => void;
}

const EmergencyCategory: React.FC<EmergencyCategoryProps> = ({
  title,
  icon,
  urgency,
  onPress
}) => {
  const getBorderColor = () => {
    switch (urgency) {
      case 'critical': return colors.status.error.base;
      case 'urgent': return colors.status.warning.base;
      default: return colors.primary.base;
    }
  };

  const getBackgroundColor = () => {
    switch (urgency) {
      case 'critical': return colors.status.error.background;
      case 'urgent': return colors.status.warning.background;
      default: return colors.status.info.background;
    }
  };

  return (
    <TouchableOpacity 
      style={[
        styles.categoryCard, 
        { borderColor: getBorderColor() }
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Icon Container */}
      <View style={[
        styles.iconContainer,
        { backgroundColor: getBackgroundColor() }
      ]}>
        {icon}
      </View>
      
      {/* Title */}
      <Text style={styles.categoryTitle}>{title}</Text>
      
      {/* Urgency Badge (if critical/urgent) */}
      {urgency !== 'normal' && (
        <View style={[
          styles.urgencyBadge,
          urgency === 'critical' && { backgroundColor: colors.status.error.base },
          urgency === 'urgent' && { backgroundColor: colors.status.warning.base }
        ]}>
          <Text style={styles.urgencyText}>
            {urgency === 'critical' ? '위급' : '긴급'}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryCard: {
    width: '47%',
    aspectRatio: 1,
    backgroundColor: colors.background.tertiary,
    borderRadius: 20,
    borderWidth: 2,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: colors.shadow.card,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    textAlign: 'center',
    fontFamily: 'Pretendard-SemiBold',
  },
  urgencyBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    shadowColor: colors.shadow.primary,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
  },
  urgencyText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Pretendard-Bold',
  },
});

export default EmergencyCategory;
