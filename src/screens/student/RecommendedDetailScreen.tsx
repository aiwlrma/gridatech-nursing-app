import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../../theme';
import RecommendCard from '../../components/cards/RecommendCard';
import Section from '../../components/common/Section';

const RecommendedDetailScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleCardPress = (title: string) => {
    console.log(`Navigating to: ${title}`);
    // TODO: Implement navigation to specific learning content
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>맞춤 추천</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 약점 기반 추천 */}
        <Section title="약점 보완 학습">
          <RecommendCard 
            icon="💉"
            title="의사소통 집중 학습"
            subtitle="예상 소요 30분"
            reason="78점 → 85점 목표"
            badge="추천"
            onPress={() => handleCardPress('의사소통 집중 학습')}
          />
          <RecommendCard 
            icon="🩺"
            title="환자 안전 프로토콜"
            subtitle="예상 소요 45분"
            reason="72점 → 80점 목표"
            badge="추천"
            onPress={() => handleCardPress('환자 안전 프로토콜')}
          />
          <RecommendCard 
            icon="📋"
            title="기록 작성법"
            subtitle="예상 소요 25분"
            reason="68점 → 75점 목표"
            onPress={() => handleCardPress('기록 작성법')}
          />
        </Section>

        {/* 다음 단계 학습 */}
        <Section title="다음 단계">
          <RecommendCard 
            icon="🎯"
            title="IV 삽입 술기 고급"
            subtitle="VR 시뮬레이션"
            reason="기초 과정 완료"
            onPress={() => handleCardPress('IV 삽입 술기 고급')}
          />
          <RecommendCard 
            icon="🏥"
            title="응급처치 심화"
            subtitle="실습 기반 학습"
            reason="중급 과정 완료"
            onPress={() => handleCardPress('응급처치 심화')}
          />
          <RecommendCard 
            icon="💊"
            title="복합 투약 관리"
            subtitle="고급 시나리오"
            reason="기본 투약 완료"
            onPress={() => handleCardPress('복합 투약 관리')}
          />
        </Section>

        {/* 복습 필요 */}
        <Section title="복습 추천">
          <RecommendCard 
            icon="📝"
            title="투약 5R 원칙"
            subtitle="7일 전 학습"
            reason="주기적 복습 필요"
            onPress={() => handleCardPress('투약 5R 원칙')}
          />
          <RecommendCard 
            icon="🩹"
            title="상처 관리 기본"
            subtitle="10일 전 학습"
            reason="기억 강화 필요"
            onPress={() => handleCardPress('상처 관리 기본')}
          />
          <RecommendCard 
            icon="🌡️"
            title="체온 측정 정확도"
            subtitle="5일 전 학습"
            reason="정확도 향상 필요"
            onPress={() => handleCardPress('체온 측정 정확도')}
          />
        </Section>

        {/* 인기 콘텐츠 */}
        <Section title="다른 학생들이 많이 본">
          <RecommendCard 
            icon="🔥"
            title="응급처치 프로토콜"
            subtitle="조회수 1,245회"
            onPress={() => handleCardPress('응급처치 프로토콜')}
          />
          <RecommendCard 
            icon="⭐"
            title="간호사 면접 준비"
            subtitle="조회수 987회"
            onPress={() => handleCardPress('간호사 면접 준비')}
          />
          <RecommendCard 
            icon="📚"
            title="간호학 핵심 개념"
            subtitle="조회수 1,156회"
            onPress={() => handleCardPress('간호학 핵심 개념')}
          />
        </Section>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.unified.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.unified.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.unified.border,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: colors.background.secondary,
  },
  backIcon: {
    fontSize: 20,
    color: colors.unified.textPrimary,
    fontWeight: '600',
  },
  headerTitle: {
    ...typography.textStyles.subtitle,
    fontFamily: typography.fontFamily.semibold,
    color: colors.unified.textPrimary,
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: spacing.lg,
  },
  bottomSpacing: {
    height: spacing['2xl'],
  },
});

export default RecommendedDetailScreen;
