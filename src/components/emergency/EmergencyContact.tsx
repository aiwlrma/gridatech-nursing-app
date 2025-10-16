import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';
import { colors } from '../../theme';
import { Icon } from '../icons';

interface EmergencyContactProps {
  name: string;
  number: string;
  icon: React.ReactNode;
  onCall?: () => void;
}

const EmergencyContact: React.FC<EmergencyContactProps> = ({
  name,
  number,
  icon,
  onCall
}) => {
  const handleCall = () => {
    if (onCall) {
      onCall();
    } else {
      // Default behavior - open phone dialer
      Linking.openURL(`tel:${number}`);
    }
  };

  return (
    <View style={styles.contactCard}>
      <View style={styles.contactIcon}>
        {icon}
      </View>
      
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{name}</Text>
        <Text style={styles.contactNumber}>{number}</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.callButton}
        onPress={handleCall}
        activeOpacity={0.7}
      >
        <Icon name="phone" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  contactCard: {
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
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.status.error.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
    fontFamily: 'Pretendard-SemiBold',
  },
  contactNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.status.error.base,
    letterSpacing: 0.5,
    fontFamily: 'Pretendard-Bold',
  },
  callButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.status.error.base,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.status.error.base,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default EmergencyContact;
