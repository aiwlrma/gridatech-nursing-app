import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Alert,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, spacing } from '../../../theme';
import PerformanceBreakdown from '../../../components/feedback/PerformanceBreakdown';
import ProfessorNote from '../../../components/feedback/ProfessorNote';

const { width } = Dimensions.get('window');

interface FeedbackDetailScreenProps {
  navigation: any;
}

interface PerformanceItem {
  text: string;
  score: string;
  status: 'success' | 'error';
  tip?: string;
}

interface PerformanceCategory {
  id: string;
  title: string;
  score: number;
  items: PerformanceItem[];
}

interface FeedbackDetail {
  title: string;
  duration: string;
  overallScore: number;
  date: string;
  performance: PerformanceCategory[];
  professorNote: string;
}

const FeedbackDetailScreen: React.FC<FeedbackDetailScreenProps> = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  // Mock data
  const feedbackData: FeedbackDetail = {
    title: 'IM Injection Step 3',
    duration: '12분 34초',
    overallScore: 85,
    date: '2025년 10월 15일',
    performance: [
      {
        id: 'initial-assessment',
        title: '초기 평가',
        score: 90,
        items: [
          { text: '장면 안전 확인', score: '10/10', status: 'success' },
          { text: '1차 조사 완료', score: '10/10', status: 'success' },
          { text: '활력징후 측정', score: '10/10', status: 'success' },
        ],
      },
      {
        id: 'critical-thinking',
        title: '비판적 사고',
        score: 75,
        items: [
          { text: '문제 파악', score: '10/10', status: 'success' },
          { text: '우선순위 설정', score: '0/10', status: 'error' },
          { 
            text: '의사결정 속도', 
            score: '8/10', 
            status: 'success',
            tip: 'ABC 프로토콜을 먼저 고려하세요'
          },
        ],
      },
      {
        id: 'technical-skills',
        title: '기술적 술기',
        score: 88,
        items: [
          { text: 'IV 삽입', score: '10/10', status: 'success' },
          { text: '약물 준비', score: '10/10', status: 'success' },
          { text: '장비 취급', score: '9/10', status: 'success' },
        ],
      },
    ],
    professorNote: '훌륭한 반응 시간과 기술적 실행입니다.\n압박 상황에서의 우선순위 설정에 집중하세요.\n고급 중환자 관리 모듈 수강을 고려해보세요.',
  };

  useEffect(() => {
    // Animate score card on mount
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleReplayPress = () => {
    Alert.alert('다시보기', 'VR 시뮬레이션을 다시 재생합니다.');
  };

  const handleRecommendedLearning = () => {
    Alert.alert('추천 학습', '추천 학습 목록으로 이동합니다.');
  };

  const handleConsultationBooking = () => {
    Alert.alert('1:1 상담 예약', '상담 예약 페이지로 이동합니다.');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>피드백 상세</Text>
          <Text style={styles.headerDate}>{feedbackData.date}</Text>
        </View>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Score Card */}
        <Animated.View
          style={[
            styles.scoreCard,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <LinearGradient
            colors={[colors.primary, '#8A76FF']}
            style={styles.scoreCardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.scoreCardTitle}>{feedbackData.title}</Text>
            <Text style={styles.scoreCardDuration}>
              소요시간: {feedbackData.duration}
            </Text>
            <Text style={styles.scoreCardScore}>{feedbackData.overallScore}점</Text>
            <TouchableOpacity style={styles.replayButton} onPress={handleReplayPress}>
              <Text style={styles.replayButtonText}>▶ 다시보기</Text>
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>

        {/* Performance Breakdown */}
        <PerformanceBreakdown categories={feedbackData.performance} />

        {/* Professor Note */}
        <ProfessorNote note={feedbackData.professorNote} />
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={styles.recommendedButton}
          onPress={handleRecommendedLearning}
        >
          <Text style={styles.recommendedButtonText}>추천 학습 보기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.consultationButton}
          onPress={handleConsultationBooking}
        >
          <Text style={styles.consultationButtonText}>1:1 상담 예약</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
    paddingTop: 50,
    paddingHorizontal: spacing.layout.screenPadding,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: colors.textPrimary,
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    ...typography.textStyles.heading3,
    fontSize: 18,
    marginBottom: 2,
  },
  headerDate: {
    ...typography.textStyles.bodySmall,
    color: colors.textSecondary,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.layout.screenPadding,
  },
  scoreCard: {
    marginTop: spacing.lg,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  scoreCardGradient: {
    padding: spacing.xl,
    borderRadius: 16,
    alignItems: 'center',
  },
  scoreCardTitle: {
    ...typography.textStyles.heading2,
    color: colors.background,
    fontSize: 20,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  scoreCardDuration: {
    ...typography.textStyles.bodySmall,
    color: colors.background,
    opacity: 0.8,
    marginBottom: spacing.lg,
  },
  scoreCardScore: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.background,
    marginBottom: spacing.lg,
  },
  replayButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.background,
    borderRadius: 8,
  },
  replayButtonText: {
    ...typography.textStyles.body,
    color: colors.background,
    fontWeight: typography.fontWeight.semibold,
  },
  bottomButtons: {
    flexDirection: 'row',
    paddingHorizontal: spacing.layout.screenPadding,
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: spacing.sm,
  },
  recommendedButton: {
    flex: 1,
    height: 52,
    backgroundColor: colors.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recommendedButtonText: {
    ...typography.textStyles.body,
    color: colors.background,
    fontWeight: typography.fontWeight.semibold,
  },
  consultationButton: {
    flex: 1,
    height: 52,
    backgroundColor: colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  consultationButtonText: {
    ...typography.textStyles.body,
    color: colors.primary,
    fontWeight: typography.fontWeight.semibold,
  },
});

export default FeedbackDetailScreen;
