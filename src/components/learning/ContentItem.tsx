import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { colors, typography, spacing } from '../../theme';

interface ContentItemProps {
  icon: string;
  title: string;
  type: 'video' | 'document' | 'article';
  duration?: string;
  completed: boolean;
  onPress: () => void;
}

const ContentItem: React.FC<ContentItemProps> = ({
  icon,
  title,
  type,
  duration,
  completed,
  onPress
}) => {
  return (
    <TouchableOpacity 
      style={styles.contentItem} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.contentLeft}>
        <Text style={styles.contentIcon}>{icon}</Text>
        <View>
          <Text style={styles.contentTitle}>{title}</Text>
          {duration && (
            <Text style={styles.contentDuration}>{duration}</Text>
          )}
        </View>
      </View>
      
      {completed ? (
        <Text style={styles.checkmark}>✓</Text>
      ) : (
        <Text style={styles.arrow}>›</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    padding: spacing.md,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: colors.gray200,
    ...colors.shadow.card,
  },
  contentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  contentIcon: {
    fontSize: 24,
    marginRight: spacing.md,
  },
  contentTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 2,
    ...typography.bodyMedium,
  },
  contentDuration: {
    fontSize: 13,
    color: colors.text.tertiary,
    ...typography.bodySmall,
  },
  checkmark: {
    fontSize: 20,
    color: colors.status.success.base,
  },
  arrow: {
    fontSize: 24,
    color: colors.text.tertiary,
  },
});

export default ContentItem;
