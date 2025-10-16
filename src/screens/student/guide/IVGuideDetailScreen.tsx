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

type IVGuideDetailScreenRouteProp = RouteProp<RootStackParamList, 'IVGuideDetail'>;

const IVGuideDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<IVGuideDetailScreenRouteProp>();
  const { guideId, title } = route.params;
  
  const [progress, setProgress] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [currentSection, setCurrentSection] = useState(3);
  const [preInsertionChecklist, setPreInsertionChecklist] = useState([
    { id: 1, text: '환자 식별 확인', checked: false },
    { id: 2, text: '알레르기 확인', checked: false },
    { id: 3, text: '정맥 상태 평가', checked: false },
    { id: 4, text: '물품 준비 완료', checked: false },
  ]);
  const [postInsertionChecklist, setPostInsertionChecklist] = useState([
    { id: 1, text: '혈액 역류 확인', checked: false },
    { id: 2, text: '수액 주입 원활', checked: false },
    { id: 3, text: '삽입 부위 이상 無', checked: false },
    { id: 4, text: '환자 불편감 확인', checked: false },
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

  const handlePreInsertionChecklist = (id: number) => {
    setPreInsertionChecklist(prev => 
      prev.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handlePostInsertionChecklist = (id: number) => {
    setPostInsertionChecklist(prev => 
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
            2: 200,    // 준비 단계
            3: 400,    // 부위 선정
            4: 600,    // 삽입 방법
            5: 800,    // 고정 및 확인
            6: 1000,   // 합병증 관리
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
    { number: 1, title: '준비 단계', completed: true },
    { number: 2, title: '부위 선정', completed: true },
    { number: 3, title: '삽입 방법', completed: false, active: currentSection === 3 },
    { number: 4, title: '고정 및 확인', completed: false, active: currentSection === 4 },
    { number: 5, title: '합병증 관리', completed: false, active: currentSection === 5 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>IV 삽입 술기</Text>
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
              title="1. 준비 단계"
              content="IV 삽입 전 필요한 물품을 준비하고 환자를 확인합니다. 손위생을 철저히 시행하고 장갑을 착용합니다."
            />
          </View>

          <Image 
            source={{ uri: 'https://via.placeholder.com/300x200/1884FF/FFFFFF?text=IV+Preparation' }} 
            style={styles.guideImage}
          />

          <View ref={(ref) => { sectionRefs.current[3] = ref; }}>
            <GuideSection 
              title="2. 부위 선정"
              content="정맥을 촉진하여 적절한 부위를 선택합니다. 손등, 전완부, 상완부 순으로 고려하며, 관절 부위는 피합니다."
            />
          </View>

          {/* 삽입 전 체크리스트 */}
          <View style={styles.checklistCard}>
            <Text style={styles.checklistTitle}>✅ 삽입 전 확인사항</Text>
            {preInsertionChecklist.map((item) => (
              <CheckItem
                key={item.id}
                text={item.text}
                checked={item.checked}
                onPress={() => handlePreInsertionChecklist(item.id)}
              />
            ))}
          </View>

          <View ref={(ref) => { sectionRefs.current[4] = ref; }}>
            <GuideSection 
              title="3. 삽입 방법"
              content="지혈대를 적용하고 삽입 부위를 소독합니다. 15-30도 각도로 바늘을 삽입하고, 혈액 역류를 확인한 후 캐뉼라를 전진시킵니다."
            />
          </View>

          <Image 
            source={{ uri: 'https://via.placeholder.com/300x200/1884FF/FFFFFF?text=IV+Insertion' }} 
            style={styles.guideImage}
          />

          {/* 퀴즈 */}
          <QuizCard
            question="IV 삽입 시 적절한 각도는?"
            options={['5-10도', '15-30도', '45도', '90도']}
            correctAnswer={1}
            onAnswer={handleQuizAnswer}
          />

          <View ref={(ref) => { sectionRefs.current[5] = ref; }}>
            <GuideSection 
              title="4. 고정 및 확인"
              content="캐뉼라를 고정하고 수액 연결 후 정상 주입을 확인합니다. 삽입 부위와 주변을 관찰합니다."
            />
          </View>

          {/* 삽입 후 체크리스트 */}
          <View style={styles.checklistCard}>
            <Text style={styles.checklistTitle}>✅ 삽입 후 확인사항</Text>
            {postInsertionChecklist.map((item) => (
              <CheckItem
                key={item.id}
                text={item.text}
                checked={item.checked}
                onPress={() => handlePostInsertionChecklist(item.id)}
              />
            ))}
          </View>

          <View ref={(ref) => { sectionRefs.current[6] = ref; }}>
            <GuideSection 
              title="5. 합병증 관리"
              content="침윤, 정맥염, 감염 등의 합병증을 예방하고 조기 발견합니다. 삽입 부위를 정기적으로 관찰합니다."
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
  guideImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginVertical: 16,
    backgroundColor: '#F3F4F6',
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

export default IVGuideDetailScreen;
