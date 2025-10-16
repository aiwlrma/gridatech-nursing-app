import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface KeyPointProps {
  icon: string;
  text: string;
}

const KeyPoint: React.FC<KeyPointProps> = ({ icon, text }) => {
  return (
    <View style={styles.keyPoint}>
      <Text style={styles.keyIcon}>{icon}</Text>
      <Text style={styles.keyText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  keyPoint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  keyIcon: {
    fontSize: 16,
    marginRight: 12,
    color: '#10B981',
  },
  keyText: {
    flex: 1,
    fontSize: 15,
    color: '#1A1F2E',
    lineHeight: 22,
  },
});

export default KeyPoint;
