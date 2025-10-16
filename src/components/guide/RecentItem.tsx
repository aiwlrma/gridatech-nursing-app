import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { colors, typography, spacing } from '../../theme';

interface RecentItemProps {
  icon: string;
  title: string;
  time: string;
  onPress: () => void;
}

const RecentItem: React.FC<RecentItemProps> = ({
  icon,
  title,
  time,
  onPress
}) => {
  return (
    <TouchableOpacity 
      style={styles.recentItem} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.recentLeft}>
        <Text style={styles.recentIcon}>{icon}</Text>
        <View style={styles.recentContent}>
          <Text style={styles.recentTitle}>{title}</Text>
          <Text style={styles.recentTime}>{time}</Text>
        </View>
      </View>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background.tertiary,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    padding: spacing.md,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: colors.border.light,
  },
  recentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  recentIcon: {
    fontSize: 24,
    marginRight: spacing.md,
  },
  recentContent: {
    flex: 1,
  },
  recentTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 2,
    fontFamily: 'Pretendard-SemiBold',
  },
  recentTime: {
    fontSize: 13,
    color: colors.textTertiary,
    fontFamily: 'Pretendard-Regular',
  },
  arrow: {
    fontSize: 24,
    color: colors.textTertiary,
    fontWeight: '300',
  },
});

export default RecentItem;
