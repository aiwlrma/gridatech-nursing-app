import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { colors, typography, spacing } from '../../theme';

interface ProtocolComplianceBarProps {
  protocol: {
    name: string;
    nameEn: string;
    score: number;
    icon: string;
  };
  onPress: () => void;
}

const ProtocolComplianceBar: React.FC<ProtocolComplianceBarProps> = ({ protocol, onPress }) => {
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: protocol.score,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [protocol.score]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return colors.success;
    if (score >= 85) return colors.info;
    if (score >= 80) return colors.warning;
    return colors.error;
  };

  const getStatusIcon = (score: number) => {
    if (score >= 90) return '✓';
    if (score >= 80) return '⚠';
    return '✗';
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <View style={styles.leftSection}>
          <Text style={styles.icon}>{protocol.icon}</Text>
          <Text style={styles.protocolName}>{protocol.name}</Text>
        </View>
        <View style={styles.rightSection}>
          <Text style={styles.statusIcon}>{getStatusIcon(protocol.score)}</Text>
          <Text style={[styles.score, { color: getScoreColor(protocol.score) }]}>
            {protocol.score}%
          </Text>
        </View>
      </View>
      
      <View style={styles.progressBarBackground}>
        <Animated.View
          style={[
            styles.progressBarFill,
            {
              width: animatedWidth.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
                extrapolate: 'clamp',
              }),
              backgroundColor: getScoreColor(protocol.score),
            },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  protocolName: {
    ...typography.textStyles.body,
    fontWeight: typography.fontWeight.medium,
    flex: 1,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIcon: {
    fontSize: 16,
    marginRight: spacing.xs,
    fontWeight: 'bold',
  },
  score: {
    ...typography.textStyles.body,
    fontWeight: typography.fontWeight.bold,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
});

export default ProtocolComplianceBar;
