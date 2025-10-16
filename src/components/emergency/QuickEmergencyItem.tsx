import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { colors } from '../../theme';

interface QuickEmergencyItemProps {
  title: string;
  subtitle: string;
  urgency: 'critical' | 'normal';
  icon: React.ReactNode;
  onPress: () => void;
}

const QuickEmergencyItem: React.FC<QuickEmergencyItemProps> = ({
  title,
  subtitle,
  urgency,
  icon,
  onPress
}) => {
  return (
    <TouchableOpacity 
      style={[
        styles.quickItem,
        urgency === 'critical' && styles.criticalItem
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[
        styles.quickIcon,
        urgency === 'critical' 
          ? { backgroundColor: colors.status.error.background }
          : { backgroundColor: colors.status.info.background }
      ]}>
        {icon}
      </View>
      
      <View style={styles.quickContent}>
        <Text style={styles.quickTitle}>{title}</Text>
        <Text style={styles.quickSubtitle}>{subtitle}</Text>
      </View>
      
      {urgency === 'critical' && (
        <View style={styles.criticalBadge}>
          <Text style={styles.criticalText}>!</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  quickItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.tertiary,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 8,
    borderRadius: 12,
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
  criticalItem: {
    borderColor: colors.status.error.light,
    backgroundColor: colors.background.tertiary,
  },
  quickIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  quickContent: {
    flex: 1,
  },
  quickTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
    fontFamily: 'Pretendard-SemiBold',
  },
  quickSubtitle: {
    fontSize: 13,
    color: colors.text.secondary,
    fontFamily: 'Pretendard-Regular',
  },
  criticalBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.status.error.base,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.status.error.base,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  criticalText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Pretendard-Bold',
  },
});

export default QuickEmergencyItem;
