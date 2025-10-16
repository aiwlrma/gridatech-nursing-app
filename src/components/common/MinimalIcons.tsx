import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme';

// Minimal Status Dot Component
interface StatusDotProps {
  status: 'success' | 'warning' | 'error';
  size?: number;
}

export const StatusDot: React.FC<StatusDotProps> = ({ 
  status, 
  size = 6 
}) => {
  const statusColors = {
    success: colors.statusSuccess,
    warning: colors.statusWarning,
    error: colors.statusError,
  };

  return (
    <View style={[
      styles.dot,
      { 
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: statusColors[status]
      }
    ]} />
  );
};

// Minimal Badge Component
interface BadgeProps {
  type: 'hygiene' | 'idCheck' | 'infection' | 'medication' | 'safety';
  size?: 'small' | 'medium';
}

export const Badge: React.FC<BadgeProps> = ({ 
  type, 
  size = 'medium' 
}) => {
  const badgeConfig = {
    hygiene: { initial: 'H', label: '손 위생', color: colors.statusSuccess },
    idCheck: { initial: 'I', label: '환자 확인', color: colors.accent },
    infection: { initial: 'C', label: '감염 관리', color: colors.statusWarning },
    medication: { initial: 'M', label: '약물 관리', color: colors.statusError },
    safety: { initial: 'S', label: '안전 관리', color: colors.accent },
  };

  const badge = badgeConfig[type];
  const isSmall = size === 'small';

  return (
    <View style={styles.badgeContainer}>
      <View style={[
        styles.badgeCircle,
        { 
          borderColor: badge.color,
          width: isSmall ? 24 : 32,
          height: isSmall ? 24 : 32,
          borderRadius: isSmall ? 12 : 16,
        }
      ]}>
        <Text style={[
          styles.badgeInitial,
          { 
            color: badge.color,
            fontSize: isSmall ? 12 : 14,
          }
        ]}>
          {badge.initial}
        </Text>
      </View>
      {!isSmall && (
        <Text style={styles.badgeLabel}>{badge.label}</Text>
      )}
    </View>
  );
};

// Minimal Status Icon Component
interface StatusIconProps {
  status: 'done' | 'pending' | 'warning';
  size?: number;
}

export const StatusIcon: React.FC<StatusIconProps> = ({ 
  status, 
  size = 16 
}) => {
  const getStatusSymbol = () => {
    switch (status) {
      case 'done':
        return '✓';
      case 'pending':
        return '○';
      case 'warning':
        return '!';
      default:
        return '○';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'done':
        return colors.statusSuccess;
      case 'pending':
        return colors.textTertiary;
      case 'warning':
        return colors.statusWarning;
      default:
        return colors.textTertiary;
    }
  };

  return (
    <Text style={[
      styles.statusIcon,
      { 
        fontSize: size,
        color: getStatusColor()
      }
    ]}>
      {getStatusSymbol()}
    </Text>
  );
};

// Minimal Priority Indicator Component
interface PriorityIndicatorProps {
  priority: 'high' | 'medium' | 'low';
  style?: 'dot' | 'border' | 'text';
}

export const PriorityIndicator: React.FC<PriorityIndicatorProps> = ({ 
  priority, 
  style = 'dot' 
}) => {
  const priorityConfig = {
    high: { color: colors.statusError, text: '!' },
    medium: { color: colors.statusWarning, text: '!' },
    low: { color: colors.statusSuccess, text: '✓' },
  };

  const config = priorityConfig[priority];

  if (style === 'border') {
    return (
      <View style={[
        styles.priorityBorder,
        { borderLeftColor: config.color }
      ]} />
    );
  }

  if (style === 'text') {
    return (
      <Text style={[
        styles.priorityText,
        { color: config.color }
      ]}>
        {config.text}
      </Text>
    );
  }

  // Default: dot style
  return (
    <View style={[
      styles.priorityDot,
      { backgroundColor: config.color }
    ]} />
  );
};

// Minimal Achievement Component
interface AchievementProps {
  value: string;
  label: string;
  sublabel?: string;
}

export const Achievement: React.FC<AchievementProps> = ({ 
  value, 
  label, 
  sublabel 
}) => {
  return (
    <View style={styles.achievement}>
      <Text style={styles.achievementValue}>{value}</Text>
      <Text style={styles.achievementLabel}>{label}</Text>
      {sublabel && (
        <Text style={styles.achievementSublabel}>{sublabel}</Text>
      )}
    </View>
  );
};

// Minimal Tab Icon Component
interface TabIconProps {
  label: string;
  isActive: boolean;
}

export const TabIcon: React.FC<TabIconProps> = ({ 
  label, 
  isActive 
}) => {
  return (
    <View style={styles.tabItem}>
      <Text style={[
        styles.tabLabel,
        isActive && styles.tabLabelActive
      ]}>
        {label}
      </Text>
      {isActive && <View style={styles.tabIndicator} />}
    </View>
  );
};

const styles = StyleSheet.create({
  // Status Dot
  dot: {
    marginRight: 8,
  },

  // Badge
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badgeCircle: {
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  badgeInitial: {
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  badgeLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
  },

  // Status Icon
  statusIcon: {
    fontWeight: '700',
    marginRight: 8,
  },

  // Priority Indicator
  priorityBorder: {
    width: 3,
    height: '100%',
    borderLeftWidth: 3,
  },
  priorityText: {
    fontSize: 14,
    fontWeight: '700',
    marginRight: 6,
  },
  priorityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 8,
  },

  // Achievement
  achievement: {
    alignItems: 'center',
  },
  achievementValue: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  achievementLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: 4,
  },
  achievementSublabel: {
    fontSize: 11,
    fontWeight: '400',
    color: colors.textTertiary,
    marginTop: 2,
  },

  // Tab Icon
  tabItem: {
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textTertiary,
  },
  tabLabelActive: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
  tabIndicator: {
    width: 32,
    height: 3,
    backgroundColor: colors.accent,
    borderRadius: 2,
    marginTop: 4,
  },
});

export default {
  StatusDot,
  Badge,
  StatusIcon,
  PriorityIndicator,
  Achievement,
  TabIcon,
};
