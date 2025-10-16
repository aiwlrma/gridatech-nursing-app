import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { colors, typography, spacing } from '../../theme';

interface BookmarkCardProps {
  icon: string;
  title: string;
  subtitle: string;
  onPress: () => void;
}

const BookmarkCard: React.FC<BookmarkCardProps> = ({
  icon,
  title,
  subtitle,
  onPress
}) => {
  return (
    <TouchableOpacity 
      style={styles.bookmarkCard} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.bookmarkIcon}>{icon}</Text>
      <Text style={styles.bookmarkTitle}>{title}</Text>
      <Text style={styles.bookmarkSubtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bookmarkCard: {
    width: 140,
    height: 120,
    backgroundColor: colors.background.tertiary,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: colors.border.medium,
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  bookmarkIcon: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  bookmarkTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: 4,
    fontFamily: 'Pretendard-SemiBold',
  },
  bookmarkSubtitle: {
    fontSize: 11,
    color: colors.textSecondary,
    textAlign: 'center',
    fontFamily: 'Pretendard-Regular',
  },
});

export default BookmarkCard;
