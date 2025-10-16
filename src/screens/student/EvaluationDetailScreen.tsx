import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

// Types
interface ChecklistItemProps {
  text: string;
  checked: boolean;
  points: number;
  feedback?: string;
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

// ChecklistItem Component
const ChecklistItem: React.FC<ChecklistItemProps> = ({
  text,
  checked,
  points,
  feedback,
}) => {
  return (
    <View style={styles.checklistItem}>
      <View style={styles.checkRow}>
        <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
          {checked && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text style={[styles.checkText, !checked && styles.checkTextFailed]}>
          {text}
        </Text>
        <Text style={[styles.points, checked ? styles.pointsGained : styles.pointsLost]}>
          {checked ? `+${points}` : `-${points}`}
        </Text>
      </View>
      
      {feedback && !checked && (
        <View style={styles.feedbackRow}>
          <Text style={styles.feedbackIcon}>💡</Text>
          <Text style={styles.feedbackHint}>{feedback}</Text>
        </View>
      )}
    </View>
  );
};

// Section Component
const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
};

// Main Screen Component
export const EvaluationDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { evaluationId } = route.params as { evaluationId: string };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>평가 세부 내용</Text>
      </View>

      <ScrollView>
        {/* Overall Score */}
        <View style={styles.scoreCard}>
          <Text style={styles.scoreTitle}>종합 점수</Text>
          <Text style={styles.bigScore}>87점</Text>
          <Text style={styles.date}>2025.10.15</Text>
        </View>

        {/* Checklist by Category */}
        <Section title="주사 부위 선정">
          <ChecklistItem 
            text="환자 식별 확인" 
            checked={true} 
            points={20}
          />
          <ChecklistItem 
            text="부위 소독 완료" 
            checked={true} 
            points={20}
          />
          <ChecklistItem 
            text="적절한 각도 유지" 
            checked={false} 
            points={15}
            feedback="45도 각도 권장"
          />
        </Section>

        <Section title="약물 투약">
          <ChecklistItem text="5R 확인" checked={true} points={25} />
          <ChecklistItem text="용량 정확" checked={true} points={20} />
        </Section>

        <Section title="안전 관리">
          <ChecklistItem text="손 소독" checked={true} points={15} />
          <ChecklistItem 
            text="소독 시간 준수" 
            checked={false} 
            points={10}
            feedback="30초 이상 소독하세요"
          />
        </Section>

        {/* AI Feedback */}
        <View style={styles.feedbackCard}>
          <Text style={styles.feedbackTitle}>💡 개선 제안</Text>
          <Text style={styles.feedbackText}>
            • 주사 각도를 45도로 유지하면 더 정확한 투여가 가능합니다.{'\n'}
            • 소독 시간을 30초 이상 유지하세요.{'\n'}
            • 환자와의 소통을 통해 불안감을 줄일 수 있습니다.
          </Text>
        </View>

        {/* Retry Button */}
        <TouchableOpacity style={styles.retryButton}>
          <Text style={styles.retryText}>다시 도전하기</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backIcon: {
    fontSize: 24,
    color: '#1A1F2E',
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1F2E',
  },
  scoreCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 24,
    alignItems: 'center',
  },
  scoreTitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  bigScore: {
    fontSize: 48,
    fontWeight: '700',
    color: '#1884FF',
  },
  date: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1F2E',
    marginHorizontal: 20,
    marginBottom: 12,
  },
  checklistItem: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 8,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  checkText: {
    flex: 1,
    fontSize: 15,
    color: '#1A1F2E',
  },
  checkTextFailed: {
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  points: {
    fontSize: 16,
    fontWeight: '700',
  },
  pointsGained: {
    color: '#10B981',
  },
  pointsLost: {
    color: '#EF4444',
  },
  feedbackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  feedbackIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  feedbackHint: {
    flex: 1,
    fontSize: 13,
    color: '#F59E0B',
  },
  feedbackCard: {
    backgroundColor: '#FFF7ED',
    borderWidth: 1.5,
    borderColor: '#F59E0B',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 24,
  },
  feedbackTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1F2E',
    marginBottom: 12,
  },
  feedbackText: {
    fontSize: 14,
    color: '#78350F',
    lineHeight: 22,
  },
  retryButton: {
    backgroundColor: '#1884FF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 40,
  },
  retryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default EvaluationDetailScreen;
