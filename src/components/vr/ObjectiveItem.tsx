import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ObjectiveItemProps {
  text: string;
}

const ObjectiveItem: React.FC<ObjectiveItemProps> = ({ text }) => {
  return (
    <View style={styles.objectiveItem}>
      <Text style={styles.bullet}>•</Text>
      <Text style={styles.objectiveText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  objectiveItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bullet: {
    fontSize: 18,
    color: '#1884FF',
    marginRight: 8,
    marginTop: -2,
  },
  objectiveText: {
    flex: 1,
    fontSize: 15,
    color: '#1A1F2E',
    lineHeight: 22,
  },
});

export default ObjectiveItem;
