import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DocumentIcon } from '../icons/common/DocumentIcon';
import { SyringeIcon } from '../icons/medical/SyringeIcon';
import { colors, typography, spacing, baseStyles } from '../../theme';

interface LearningCardProps {
  icon: 'document' | 'syringe';
  label: string;
  title: string;
  subtitle: string;
  onPress: () => void;
}

export const LearningCard: React.FC<LearningCardProps> = ({
  icon,
  label,
  title,
  subtitle,
  onPress
}) => {
  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        {icon === 'document' ? (
          <DocumentIcon size={24} color="#6B7280" />
        ) : (
          <SyringeIcon size={24} color="#6B7280" />
        )}
      </View>
      
      <View style={styles.content}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    ...baseStyles.CARD_STYLE,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 8,
  },
  iconContainer: {
    ...baseStyles.ICON_CONTAINER_STYLE,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9CA3AF',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1F2E',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7280',
  },
  arrow: {
    fontSize: 24,
    color: '#D1D5DB',
  },
});
