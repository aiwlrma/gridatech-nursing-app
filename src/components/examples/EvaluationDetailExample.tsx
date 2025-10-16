import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// This is an example component showing how to navigate to EvaluationDetailScreen
// with different evaluation scenarios
export const EvaluationDetailExample: React.FC = () => {
  const navigation = useNavigation();

  const evaluationScenarios = [
    {
      id: 'injection-001',
      title: '주사 부위 선정 평가',
      score: 87,
      date: '2025.10.15',
    },
    {
      id: 'medication-002',
      title: '약물 투약 평가',
      score: 92,
      date: '2025.10.14',
    },
    {
      id: 'safety-003',
      title: '안전 관리 평가',
      score: 78,
      date: '2025.10.13',
    },
  ];

  const handleNavigateToDetail = (evaluationId: string) => {
    navigation.navigate('EvaluationDetail', { evaluationId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>평가 상세 페이지 예시</Text>
      <Text style={styles.subtitle}>다음 버튼들을 클릭하여 각 평가의 상세 내용을 확인하세요</Text>
      
      {evaluationScenarios.map((scenario) => (
        <TouchableOpacity
          key={scenario.id}
          style={styles.scenarioCard}
          onPress={() => handleNavigateToDetail(scenario.id)}
        >
          <View style={styles.scenarioInfo}>
            <Text style={styles.scenarioTitle}>{scenario.title}</Text>
            <Text style={styles.scenarioScore}>{scenario.score}점</Text>
            <Text style={styles.scenarioDate}>{scenario.date}</Text>
          </View>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F9FAFB',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1F2E',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 24,
    lineHeight: 20,
  },
  scenarioCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scenarioInfo: {
    flex: 1,
  },
  scenarioTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1F2E',
    marginBottom: 4,
  },
  scenarioScore: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1884FF',
    marginBottom: 2,
  },
  scenarioDate: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  arrow: {
    fontSize: 18,
    color: '#6B7280',
    marginLeft: 12,
  },
});

export default EvaluationDetailExample;
