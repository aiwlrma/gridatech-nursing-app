import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import { colors, typography, spacing } from '../../../theme';
import ProgressSummary from '../../../components/learning/ProgressSummary';
import RecommendedCard from '../../../components/learning/RecommendedCard';
import VRScenario from '../../../components/learning/VRScenario';
import ContentItem from '../../../components/learning/ContentItem';
// BottomTabBar removed - now handled by BottomTabNavigator

interface LearningScreenProps {
  navigation: any;
}

const LearningScreen: React.FC<LearningScreenProps> = ({ navigation }) => {
  console.log('LearningScreen rendered');
  
  // 마우스 드래그 스크롤을 위한 ref와 상태
  const recommendationScrollRef = useRef<ScrollView>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStartX, setScrollStartX] = useState(0);
  const recommendedContent = [
    { 
      id: '1', 
      icon: '💉', 
      title: 'IM Injection Step 2', 
      subtitle: '반복 학습 권장', 
      type: 'vr' as const, 
      duration: '15분' 
    },
    { 
      id: '2', 
      icon: '📄', 
      title: '투약 5R 원칙', 
      subtitle: '보완 필요', 
      type: 'document' as const, 
      duration: '5분' 
    },
    { 
      id: '3', 
      icon: '📹', 
      title: 'IV 삽입 영상', 
      subtitle: '추천 강의', 
      type: 'video' as const, 
      duration: '12분' 
    },
    { 
      id: '4', 
      icon: '🩺', 
      title: '환자 사정 기법', 
      subtitle: '기초 필수', 
      type: 'document' as const, 
      duration: '8분' 
    },
    { 
      id: '5', 
      icon: '💊', 
      title: '약물 상호작용', 
      subtitle: '중요 학습', 
      type: 'video' as const, 
      duration: '20분' 
    },
    { 
      id: '6', 
      icon: '🚨', 
      title: '응급처치 프로토콜', 
      subtitle: '실습 필수', 
      type: 'vr' as const, 
      duration: '25분' 
    },
  ];

  const vrScenarios = [
    { 
      id: 'v1', 
      title: 'IM Injection - 기초', 
      difficulty: 'basic' as const, 
      duration: '15분', 
      completed: true, 
      score: 87 
    },
    { 
      id: 'v2', 
      title: 'IV 삽입 술기', 
      difficulty: 'intermediate' as const, 
      duration: '20분', 
      completed: false 
    },
    { 
      id: 'v3', 
      title: 'CPR 시뮬레이션', 
      difficulty: 'advanced' as const, 
      duration: '25분', 
      completed: false 
    },
  ];

  const videos = [
    { 
      id: 'd1', 
      icon: '📹', 
      title: '환자 평가 방법', 
      duration: '10분', 
      completed: true 
    },
    { 
      id: 'd2', 
      icon: '📹', 
      title: '약물 투여 절차', 
      duration: '8분', 
      completed: false 
    },
  ];

  const documents = [
    { 
      id: 'd1', 
      icon: '📄', 
      title: '간호 프로토콜 가이드', 
      completed: false 
    },
    { 
      id: 'd2', 
      icon: '📄', 
      title: '응급처치 매뉴얼', 
      completed: true 
    },
  ];

  const handleRecommendedPress = (item: any) => {
    console.log('Recommended item pressed:', item.title);
    
    // Navigate to DocumentDetailScreen for document types
    if (item.type === 'document') {
      navigation.navigate('DocumentDetail' as never, {
        documentId: item.id,
        title: item.title,
        documentUri: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', // Sample PDF URL
      } as never);
    } else {
      // TODO: Navigate to other content types (vr, video, etc.)
      console.log('Navigate to other content type:', item.type);
    }
  };

  const handleVRPress = (item: any) => {
    console.log('VR scenario pressed:', item.title);
    // TODO: Navigate to VR scenario
  };

  const handleContentPress = (item: any) => {
    console.log('Content item pressed:', item.title);
    
    // Navigate to DocumentDetailScreen for document types
    if (item.type === 'document') {
      navigation.navigate('DocumentDetail' as never, {
        documentId: item.id,
        title: item.title,
        documentUri: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', // Sample PDF URL
      } as never);
    } else {
      // TODO: Navigate to other content types (video, etc.)
      console.log('Navigate to other content type:', item.type);
    }
  };

  // Bottom tab navigation removed - now handled by BottomTabNavigator

  // 마우스 드래그 스크롤 핸들러들
  const handleMouseDown = useCallback((event: any) => {
    if (Platform.OS === 'web') {
      setIsDragging(true);
      setStartX(event.clientX);
      setScrollStartX(event.currentTarget.scrollLeft);
      event.preventDefault();
    }
  }, []);

  const handleMouseMove = useCallback((event: any) => {
    if (Platform.OS === 'web' && isDragging) {
      const deltaX = startX - event.clientX;
      const newScrollX = scrollStartX + deltaX;
      event.currentTarget.scrollLeft = newScrollX;
      event.preventDefault();
    }
  }, [isDragging, startX, scrollStartX]);

  const handleMouseUp = useCallback(() => {
    if (Platform.OS === 'web') {
      setIsDragging(false);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (Platform.OS === 'web') {
      setIsDragging(false);
    }
  }, []);

  const handleWheel = useCallback((event: any) => {
    if (Platform.OS === 'web') {
      event.preventDefault();
      const scrollAmount = event.deltaY > 0 ? 100 : -100;
      event.currentTarget.scrollLeft += scrollAmount;
    }
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>학습</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Progress Summary */}
        <ProgressSummary completed={6} total={10} weeklyGoal={8} />

        {/* Recommended Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>💡 맞춤 추천</Text>
          </View>
          <ScrollView 
            ref={recommendationScrollRef}
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
            style={[styles.recommendationScrollView, isDragging && styles.dragging]}
            {...(Platform.OS === 'web' && {
              onMouseDown: handleMouseDown,
              onMouseMove: handleMouseMove,
              onMouseUp: handleMouseUp,
              onMouseLeave: handleMouseLeave,
              onWheel: handleWheel,
            })}
          >
            {recommendedContent.map((item) => (
              <RecommendedCard 
                key={item.id} 
                {...item} 
                onPress={() => handleRecommendedPress(item)} 
              />
            ))}
          </ScrollView>
        </View>

        {/* VR Scenarios */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🥽 VR 시나리오</Text>
            <TouchableOpacity onPress={() => navigation.navigate('VRScenarioList' as never)}>
              <Text style={styles.seeAll}>전체보기 ›</Text>
            </TouchableOpacity>
          </View>
          {vrScenarios.map((item) => (
            <VRScenario 
              key={item.id} 
              {...item} 
              onPress={() => handleVRPress(item)} 
            />
          ))}
        </View>

        {/* Videos */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📹 동영상 강의</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>전체보기 ›</Text>
            </TouchableOpacity>
          </View>
          {videos.map((item) => (
            <ContentItem 
              key={item.id} 
              {...item} 
              type="video"
              onPress={() => handleContentPress(item)} 
            />
          ))}
        </View>

        {/* Documents */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📚 학습 자료</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>전체보기 ›</Text>
            </TouchableOpacity>
          </View>
          {documents.map((item) => (
            <ContentItem 
              key={item.id} 
              {...item} 
              type="document"
              onPress={() => handleContentPress(item)} 
            />
          ))}
        </View>

        <View style={{ height: 60 }} />
      </ScrollView>
      
      {/* Bottom Tab Bar removed - now handled by BottomTabNavigator */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
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
    color: colors.text.primary,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text.primary,
    ...typography.headingLarge,
  },
  headerSpacer: {
    width: 40,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
    ...typography.headingMedium,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary.base,
    ...typography.bodyMedium,
  },
  horizontalScroll: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  recommendationScrollView: {
    ...(Platform.OS === 'web' && {
      cursor: 'grab',
      userSelect: 'none',
    }),
  },
  dragging: {
    ...(Platform.OS === 'web' && {
      cursor: 'grabbing',
    }),
  },
});

export default LearningScreen;
