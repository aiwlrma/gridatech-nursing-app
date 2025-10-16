import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AlertSection } from './AlertSection';

// Example usage of the AlertSection component
export const AlertSectionExample: React.FC = () => {
  const alertItems = [
    {
      id: 'insulin',
      name: '인슐린',
      nameEn: 'Insulin',
      score: 78,
      priority: 'high' as const,
      lastPractice: '3일 전',
      category: '고위험 약물',
      actions: [
        {
          label: '용량 계산 퀴즈',
          type: 'primary' as const,
          onPress: () => console.log('Dosage calculation quiz pressed'),
        },
        {
          label: '학습 가이드',
          type: 'secondary' as const,
          onPress: () => console.log('Learning guide pressed'),
        },
      ],
    },
    {
      id: 'right-time',
      name: 'Right Time 준수',
      nameEn: 'Right Time Compliance',
      score: 80,
      priority: 'medium' as const,
      lastPractice: '1일 전',
      category: '5 Rights',
      actions: [
        {
          label: '시간 관리 연습',
          type: 'primary' as const,
          onPress: () => console.log('Time management practice pressed'),
        },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <AlertSection items={alertItems} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9FAFB',
  },
});

export default AlertSectionExample;
