import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MetaBadgeProps {
  icon: string;
  text: string;
  color?: string;
}

const MetaBadge: React.FC<MetaBadgeProps> = ({ icon, text, color = '#FFFFFF' }) => {
  return (
    <View style={styles.metaBadge}>
      <Text style={styles.metaIcon}>{icon}</Text>
      <Text style={[styles.metaText, { color }]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  metaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  metaIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  metaText: {
    fontSize: 13,
    fontWeight: '600',
  },
});

export default MetaBadge;
