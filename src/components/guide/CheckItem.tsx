import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface CheckItemProps {
  text: string;
  checked?: boolean;
  onPress?: () => void;
}

const CheckItem: React.FC<CheckItemProps> = ({ text, checked = false, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.checkItem}
      onPress={onPress}
    >
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && <Text style={styles.check}>✓</Text>}
      </View>
      <Text style={[styles.checkText, checked && styles.checkTextChecked]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  check: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  checkText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    flex: 1,
  },
  checkTextChecked: {
    color: '#10B981',
    textDecorationLine: 'line-through',
  },
});

export default CheckItem;
