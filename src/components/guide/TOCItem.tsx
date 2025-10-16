import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface TOCItemProps {
  number: number;
  title: string;
  completed?: boolean;
  active?: boolean;
  onPress?: () => void;
}

const TOCItem: React.FC<TOCItemProps> = ({ 
  number, 
  title, 
  completed = false, 
  active = false,
  onPress 
}) => {
  return (
    <TouchableOpacity style={styles.tocItem} onPress={onPress}>
      <View style={[styles.tocNumber, completed && styles.tocCompleted]}>
        {completed ? (
          <Text style={styles.checkmark}>✓</Text>
        ) : (
          <Text style={styles.number}>{number}</Text>
        )}
      </View>
      <Text style={[styles.tocText, active && styles.tocActive]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tocItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  tocNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tocCompleted: {
    backgroundColor: '#10B981',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  number: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6B7280',
  },
  tocText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    flex: 1,
  },
  tocActive: {
    color: '#1884FF',
    fontWeight: '700',
  },
});

export default TOCItem;
