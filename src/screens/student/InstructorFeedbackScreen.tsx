import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { colors, typography, spacing } from '../../theme';

interface FeedbackItemProps {
  category: string;
  score: number;
  strength: string;
  improvement: string;
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

interface InstructorFeedbackScreenProps {
  route: {
    params: {
      evaluationId: string;
    };
  };
  navigation: any;
}

const FeedbackItem: React.FC<FeedbackItemProps> = ({
  category,
  score,
  strength,
  improvement,
}) => {
  return (
    <View style={styles.feedbackItem}>
      <View style={styles.feedbackHeader}>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.score}>{score}점</Text>
      </View>
      
      <View style={styles.feedbackRow}>
        <Text style={styles.label}>👍 잘한 점</Text>
        <Text style={styles.value}>{strength}</Text>
      </View>
      
      {improvement !== '없음' && (
        <View style={styles.feedbackRow}>
          <Text style={styles.label}>💡 개선점</Text>
          <Text style={styles.improvementValue}>{improvement}</Text>
        </View>
      )}
    </View>
  );
};

const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
};

export const InstructorFeedbackScreen: React.FC<InstructorFeedbackScreenProps> = ({ 
  route, 
  navigation 
}) => {
  const { evaluationId } = route.params;

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleRecommendationPress = (title: string) => {
    // Navigate to learning content
    console.log(`Navigate to: ${title}`);
  };

  const handleReplyPress = () => {
    // Navigate to question/chat screen
    console.log('Navigate to question screen');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>교수자 피드백</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Instructor Info */}
        <View style={styles.instructorCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👨‍⚕️</Text>
          </View>
          <View style={styles.instructorInfo}>
            <Text style={styles.instructorName}>김교수 교수님</Text>
            <Text style={styles.department}>간호학과</Text>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.date}>2025.10.15</Text>
          </View>
        </View>

        {/* Overall Comment */}
        <View style={styles.commentCard}>
          <Text style={styles.commentTitle}>💬 종합 의견</Text>
          <Text style={styles.commentText}>
            전반적으로 우수한 수행 능력을 보였습니다. 특히 환자 식별과 
            소독 절차가 매우 정확했습니다. 다만 주사 각도 부분에서 
            개선이 필요하니 추가 연습을 권장합니다.
          </Text>
        </View>

        {/* Detailed Feedback by Category */}
        <Section title="항목별 피드백">
          <FeedbackItem
            category="주사 부위 선정"
            score={87}
            strength="환자 식별 절차 완벽"
            improvement="부위 촉진 시간 더 확보"
          />
          
          <FeedbackItem
            category="약물 투약"
            score={88}
            strength="5R 원칙 정확히 적용"
            improvement="용량 재확인 습관화"
          />
          
          <FeedbackItem
            category="환자 안전"
            score={92}
            strength="낙상 예방 조치 우수"
            improvement="없음"
          />
        </Section>

        {/* Recommendations */}
        <View style={styles.recommendCard}>
          <Text style={styles.recommendTitle}>📚 추천 학습</Text>
          <TouchableOpacity 
            style={styles.recommendItem}
            onPress={() => handleRecommendationPress('IM Injection 고급 과정')}
          >
            <Text style={styles.recommendText}>
              IM Injection 고급 과정
            </Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.recommendItem}
            onPress={() => handleRecommendationPress('주사 각도 집중 학습')}
          >
            <Text style={styles.recommendText}>
              주사 각도 집중 학습
            </Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Reply Button */}
        <TouchableOpacity style={styles.replyButton} onPress={handleReplyPress}>
          <Text style={styles.replyText}>질문하기</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backIcon: {
    fontSize: 24,
    color: '#1A1F2E',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1F2E',
  },
  placeholder: {
    width: 24,
  },
  content: {
    flex: 1,
  },
  instructorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 24,
  },
  avatar: {
    width: 56,
    height: 56,
    backgroundColor: '#F0F7FF',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 28,
  },
  instructorInfo: {
    flex: 1,
  },
  instructorName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1F2E',
  },
  department: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
  },
  dateContainer: {
    marginLeft: 'auto',
  },
  date: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  commentCard: {
    backgroundColor: '#F0F7FF',
    borderWidth: 1.5,
    borderColor: '#1884FF',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 24,
  },
  commentTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1F2E',
    marginBottom: 12,
  },
  commentText: {
    fontSize: 15,
    color: '#1A1F2E',
    lineHeight: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1F2E',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  feedbackItem: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 12,
  },
  feedbackHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  category: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1F2E',
  },
  score: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1884FF',
  },
  feedbackRow: {
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 6,
  },
  value: {
    fontSize: 14,
    color: '#10B981',
    lineHeight: 20,
  },
  improvementValue: {
    fontSize: 14,
    color: '#F59E0B',
    lineHeight: 20,
  },
  recommendCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 24,
  },
  recommendTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1F2E',
    marginBottom: 16,
  },
  recommendItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  recommendText: {
    fontSize: 15,
    color: '#1884FF',
    fontWeight: '600',
  },
  arrow: {
    fontSize: 18,
    color: '#9CA3AF',
  },
  replyButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#1884FF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 40,
  },
  replyText: {
    color: '#1884FF',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default InstructorFeedbackScreen;
