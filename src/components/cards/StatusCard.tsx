import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { colors, typography, spacing, baseStyles } from '../../theme';

interface StatusCardProps {
  type: 'strength' | 'improvement';
  title: string;
  items: string[];
}

const StatusCard: React.FC<StatusCardProps> = ({ type, title, items }) => {
  const dotColor = type === 'strength' ? colors.primary : '#FACC15';
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.dot, { backgroundColor: dotColor }]} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.content}>
        {items.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...baseStyles.CARD_STYLE,
    padding: 16,
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  dot: {
    ...baseStyles.STATUS_INDICATOR,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  content: {
    paddingLeft: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  bullet: {
    fontSize: 12,
    color: colors.text.secondary,
    marginRight: 8,
    marginTop: 2,
  },
  itemText: {
    fontSize: 14,
    color: colors.text.secondary,
    flex: 1,
    lineHeight: 20,
  },
});

export default StatusCard;
