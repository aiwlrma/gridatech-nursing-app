import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/RootNavigator';
import { TOCItem, CheckItem, QuizCard, GuideSection } from '../../../components/guide';

type GuideDetailScreenRouteProp = RouteProp<RootStackParamList, 'GuideDetail'>;

const GuideDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<GuideDetailScreenRouteProp>();
  const { guideId, title } = route.params;
  
  const [progress, setProgress] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [currentSection, setCurrentSection] = useState(4);
  const [checklistItems, setChecklistItems] = useState([
    { id: 1, text: '환자 식별 확인', checked: false },
    { id: 2, text: '인슐린 종류 확인', checked: false },
    { id: 3, text: '용량 재확인', checked: false },
  ]);
  
  const scrollViewRef = useRef<ScrollView>(null);
  const sectionRefs = useRef<{ [key: number]: View | null }>({});

  const handleScroll = (event: any) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const scrollProgress = contentOffset.y / (contentSize.height - layoutMeasurement.height);
    const progressPercentage = Math.min(Math.max(scrollProgress * 100, 0), 100);
    setProgress(Math.round(progressPercentage));
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  const handleChecklistItem = (id: number) => {
    setChecklistItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleQuizAnswer = (isCorrect: boolean) => {
    console.log('Quiz answer:', isCorrect);
  };

  const scrollToSection = (sectionNumber: number) => {
    const sectionRef = sectionRefs.current[sectionNumber];
    if (sectionRef) {
      sectionRef.measureLayout(
        scrollViewRef.current as any,
        (x, y) => {
          scrollViewRef.current?.scrollTo({ y: y - 20, animated: true });
        },
        () => {
          // fallback to approximate positions if measureLayout fails
          const sectionPositions = {
            1: 0,      // 목차
            2: 200,    // 인슐린 종류
            3: 400,    // 투약 용량 계산
            4: 600,    // 주사 부위 선택
            5: 800,    // 투약 방법
            6: 1000,   // 주의사항
          };
          const targetY = sectionPositions[sectionNumber as keyof typeof sectionPositions] || 0;
          scrollViewRef.current?.scrollTo({ y: targetY, animated: true });
        }
      );
    }
  };

  const handleTOCPress = (sectionNumber: number) => {
    setCurrentSection(sectionNumber);
    scrollToSection(sectionNumber);
  };

  const handlePrevious = () => {
    if (currentSection > 2) {
      const newSection = currentSection - 1;
      setCurrentSection(newSection);
      scrollToSection(newSection);
    }
  };

  const handleNext = () => {
    if (currentSection < 6) {
      const newSection = currentSection + 1;
      setCurrentSection(newSection);
      scrollToSection(newSection);
    }
  };

  const tocItems = [
    { number: 2, title: '인슐린 종류', completed: true },
    { number: 3, title: '투약 용량 계산', completed: true },
    { number: 4, title: '주사 부위 선택', completed: false, active: currentSection === 4 },
    { number: 5, title: '투약 방법', completed: false, active: currentSection === 5 },
    { number: 6, title: '주의사항', completed: false, active: currentSection === 6 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <TouchableOpacity onPress={handleBookmark}>
          <Text style={styles.bookmarkIcon}>{bookmarked ? '🔖' : '🔖'}</Text>
        </TouchableOpacity>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>{progress}% 완료</Text>
      </View>

      {/* Content */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollView}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* 목차 */}
          <View 
            ref={(ref) => { sectionRefs.current[1] = ref; }}
            style={styles.tocCard}
          >
            <Text style={styles.tocTitle}>📑 목차</Text>
            {tocItems.map((item) => (
              <TOCItem
                key={item.number}
                number={item.number}
                title={item.title}
                completed={item.completed}
                active={item.active}
                onPress={() => handleTOCPress(item.number)}
              />
            ))}
          </View>

          {/* 본문 */}
          <View ref={(ref) => { sectionRefs.current[2] = ref; }}>
            <GuideSection 
              title="1. 인슐린 종류"
              content="인슐린은 작용 시간에 따라 초속효성, 속효성, 중간형, 지속형으로 분류됩니다. 각각의 특성을 이해하고 환자에게 적합한 인슐린을 선택하는 것이 중요합니다."
            />
          </View>

          <View ref={(ref) => { sectionRefs.current[3] = ref; }}>
            <GuideSection 
              title="2. 투약 용량 계산"
              content="인슐린 용량은 환자의 혈당 수치, 체중, 식사량 등을 고려하여 계산합니다. 정확한 용량 계산을 위해 의료진과 상의하고, 투약 전 반드시 재확인해야 합니다."
            />
          </View>

          <View ref={(ref) => { sectionRefs.current[4] = ref; }}>
            <GuideSection 
              title="3. 주사 부위 선택"
              content="인슐린 주사는 복부, 대퇴부, 상완부, 둔부에 시행할 수 있습니다. 각 부위별 흡수 속도가 다르므로 환자의 상황에 맞는 부위를 선택해야 합니다."
              imageUrl="injection-sites.jpg"
            />
          </View>

          {/* 체크리스트 */}
          <View style={styles.checklistCard}>
            <Text style={styles.checklistTitle}>✅ 확인사항</Text>
            {checklistItems.map((item) => (
              <CheckItem
                key={item.id}
                text={item.text}
                checked={item.checked}
                onPress={() => handleChecklistItem(item.id)}
              />
            ))}
          </View>

          {/* 퀴즈 */}
          <QuizCard
            question="인슐린 투약 전 반드시 확인해야 할 것은?"
            options={['환자 이름', '투약 시간', '혈당 수치', '모두']}
            correctAnswer={3}
            onAnswer={handleQuizAnswer}
          />

          <View ref={(ref) => { sectionRefs.current[5] = ref; }}>
            <GuideSection 
              title="4. 투약 방법"
              content="인슐린 주사 시 올바른 각도와 깊이를 유지하고, 주사 후 부위를 가볍게 마사지하여 흡수를 돕습니다. 주사기나 펜을 사용할 때는 공기 방울을 제거해야 합니다."
            />
          </View>

          <View ref={(ref) => { sectionRefs.current[6] = ref; }}>
            <GuideSection 
              title="5. 주의사항"
              content="인슐린 투약 시 저혈당 증상에 주의하고, 환자에게 증상과 대처법을 교육해야 합니다. 또한 인슐린 보관 방법과 유통기한을 확인하는 것이 중요합니다."
            />
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={[styles.navButton, currentSection === 2 && styles.navButtonDisabled]}
          onPress={handlePrevious}
          disabled={currentSection === 2}
        >
          <Text style={[styles.navText, currentSection === 2 && styles.navTextDisabled]}>
            ← 이전
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navButton, styles.navButtonPrimary]}
          onPress={handleNext}
        >
          <Text style={styles.navTextPrimary}>
            {currentSection === 6 ? '완료' : '다음 →'}
          </Text>
        </TouchableOpacity>
      </View>
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backIcon: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1884FF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1F2E',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  bookmarkIcon: {
    fontSize: 24,
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#1884FF',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'right',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  tocCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  tocTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1F2E',
    marginBottom: 16,
  },
  checklistCard: {
    backgroundColor: '#F0F7FF',
    borderWidth: 1.5,
    borderColor: '#1884FF',
    borderRadius: 16,
    padding: 20,
    marginVertical: 24,
  },
  checklistTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1F2E',
    marginBottom: 16,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 12,
  },
  navButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  navButtonDisabled: {
    backgroundColor: '#F9FAFB',
    borderColor: '#F3F4F6',
  },
  navButtonPrimary: {
    backgroundColor: '#1884FF',
    borderColor: '#1884FF',
  },
  navText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6B7280',
  },
  navTextDisabled: {
    color: '#D1D5DB',
  },
  navTextPrimary: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default GuideDetailScreen;
