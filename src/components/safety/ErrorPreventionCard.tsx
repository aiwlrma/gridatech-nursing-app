import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import { colors, typography, spacing } from '../../theme';

interface ErrorPreventionCardProps {
  data: {
    timeout: number;
    doubleCheck: number;
    allergyCheck: number;
    documentation: number;
    equipmentCheck: number;
    overall: number;
  };
}

const ErrorPreventionCard: React.FC<ErrorPreventionCardProps> = ({ data }) => {
  const animatedValues = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  useEffect(() => {
    const values = [data.timeout, data.doubleCheck, data.allergyCheck, data.documentation, data.equipmentCheck];
    
    values.forEach((value, index) => {
      Animated.timing(animatedValues[index], {
        toValue: value,
        duration: 500,
        delay: index * 100,
        useNativeDriver: false,
      }).start();
    });
  }, [data]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return colors.success;
    if (score >= 85) return colors.info;
    if (score >= 80) return colors.warning;
    return colors.error;
  };

  const getStatusIcon = (score: number) => {
    if (score >= 90) return '✓';
    if (score >= 80) return '!';
    return '✗';
  };

  const checklistItems = [
    { name: 'Timeout 절차', value: data.timeout, animatedValue: animatedValues[0] },
    { name: 'Double Check (고위험)', value: data.doubleCheck, animatedValue: animatedValues[1] },
    { name: '알레르기 확인', value: data.allergyCheck, animatedValue: animatedValues[2] },
    { name: '수기 기록 정확성', value: data.documentation, animatedValue: animatedValues[3] },
    { name: '장비 안전 점검', value: data.equipmentCheck, animatedValue: animatedValues[4] },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>오류 예방 체크리스트</Text>
      
      {checklistItems.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <View style={styles.itemHeader}>
            <View style={styles.itemLeft}>
              <Text style={[styles.statusIcon, { color: getScoreColor(item.value) }]}>
                {getStatusIcon(item.value)}
              </Text>
              <Text style={styles.itemName}>{item.name}</Text>
            </View>
            <Text style={[styles.itemScore, { color: getScoreColor(item.value) }]}>
              {item.value}%
            </Text>
          </View>
          
          <View style={styles.progressBarBackground}>
            <Animated.View
              style={[
                styles.progressBarFill,
                {
                  width: item.animatedValue.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0%', '100%'],
                    extrapolate: 'clamp',
                  }),
                  backgroundColor: getScoreColor(item.value),
                },
              ]}
            />
          </View>
        </View>
      ))}
      
      <View style={styles.overallContainer}>
        <Text style={styles.overallLabel}>Overall:</Text>
        <Text style={[styles.overallScore, { color: getScoreColor(data.overall) }]}>
          {data.overall}%
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: spacing.md,
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
  title: {
    ...typography.textStyles.heading3,
    marginBottom: spacing.md,
  },
  itemContainer: {
    marginBottom: spacing.md,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statusIcon: {
    fontSize: 16,
    marginRight: spacing.sm,
    fontWeight: 'bold',
  },
  itemName: {
    ...typography.textStyles.body,
    fontWeight: typography.fontWeight.medium,
    flex: 1,
  },
  itemScore: {
    ...typography.textStyles.body,
    fontWeight: typography.fontWeight.bold,
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  overallContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  overallLabel: {
    ...typography.textStyles.body,
    fontWeight: typography.fontWeight.semibold,
  },
  overallScore: {
    ...typography.textStyles.heading3,
    fontWeight: typography.fontWeight.bold,
  },
});

export default ErrorPreventionCard;
