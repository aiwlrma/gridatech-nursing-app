import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/RootNavigator';
import { ScriptSection, KeyPoint, FAQItem, VoicePracticeModal } from '../../../components/script';
import { InfoSection } from '../../../components/vr';

type ExplanationScriptScreenRouteProp = RouteProp<RootStackParamList, 'ExplanationScript'>;

const ExplanationScriptScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<ExplanationScriptScreenRouteProp>();
  const { scriptId, title } = route.params;
  
  const [isPracticing, setIsPracticing] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [currentScript, setCurrentScript] = useState('');

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  const handlePractice = (script: string) => {
    setCurrentScript(script);
    setIsPracticing(true);
  };

  const scriptSections = [
    {
      step: 1,
      title: '인사 및 확인',
      script: '안녕하세요, 김철수 환자분이시죠? 오늘은 인슐린 주사 방법에 대해 설명드리겠습니다. 혹시 궁금하신 점이 있으시면 언제든 말씀해주세요.',
      tip: '환자 이름을 직접 부르며 친근하게 시작'
    },
    {
      step: 2,
      title: '인슐린 설명',
      script: '인슐린은 혈당을 조절하는 호르몬입니다. 환자분께서는 매일 정해진 시간에 주사하셔야 합니다.',
      tip: '전문 용어 대신 쉬운 말 사용'
    },
    {
      step: 3,
      title: '주사 방법 설명',
      script: '주사는 배, 팔, 허벅지 부위에 할 수 있습니다. 매번 같은 자리가 아닌 조금씩 다른 위치에 주사하시는 것이 좋습니다.',
      tip: '시범 보이며 설명'
    },
    {
      step: 4,
      title: '확인 및 마무리',
      script: '설명 드린 내용 중 궁금하신 부분이 있으신가요? 직접 해보시겠어요?',
      tip: '환자의 이해도 확인'
    }
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

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Scenario Info */}
        <View style={styles.scenarioCard}>
          <Text style={styles.scenarioTitle}>💬 시나리오</Text>
          <Text style={styles.scenarioText}>
            환자: 김철수 (65세, 남){'\n'}
            상황: 당뇨병 환자에게 인슐린 자가 주사 교육
          </Text>
        </View>

        {/* Key Points */}
        <InfoSection title="핵심 포인트">
          <KeyPoint 
            icon="✓"
            text="환자의 이해 수준 확인"
          />
          <KeyPoint 
            icon="✓"
            text="쉬운 용어로 설명"
          />
          <KeyPoint 
            icon="✓"
            text="질문 유도 및 피드백"
          />
        </InfoSection>

        {/* Script Sections */}
        {scriptSections.map((section) => (
          <View key={section.step}>
            <ScriptSection 
              step={section.step}
              title={section.title}
              script={section.script}
              tip={section.tip}
            />
            <View style={styles.practiceButtonContainer}>
              <TouchableOpacity 
                style={styles.practiceButton}
                onPress={() => handlePractice(section.script)}
              >
                <Text style={styles.practiceText}>🎤 음성 연습하기</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Common Questions */}
        <View style={styles.faqCard}>
          <Text style={styles.faqTitle}>❓ 예상 질문</Text>
          <FAQItem 
            question="아프지 않나요?"
            answer="처음엔 약간 따끔할 수 있지만, 곧 익숙해지실 거예요. 바늘도 매우 가늘어서 통증이 적습니다."
          />
          <FAQItem 
            question="실수하면 어떻게 하나요?"
            answer="걱정 마세요. 처음엔 누구나 어색합니다. 천천히 연습하시면 됩니다."
          />
          <FAQItem 
            question="언제 주사해야 하나요?"
            answer="의사선생님이 정해주신 시간에 맞춰 주사하시면 됩니다. 보통 식사 30분 전에 하시는 경우가 많아요."
          />
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Voice Practice Modal */}
      <VoicePracticeModal
        visible={isPracticing}
        onClose={() => setIsPracticing(false)}
        script={currentScript}
      />
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
  scrollView: {
    flex: 1,
  },
  scenarioCard: {
    backgroundColor: '#F0F7FF',
    borderWidth: 1.5,
    borderColor: '#1884FF',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 20,
  },
  scenarioTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1F2E',
    marginBottom: 12,
  },
  scenarioText: {
    fontSize: 14,
    color: '#1E40AF',
    lineHeight: 22,
  },
  practiceButtonContainer: {
    paddingHorizontal: 20,
    marginTop: 12,
  },
  practiceButton: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  practiceText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  faqCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 24,
  },
  faqTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1F2E',
    marginBottom: 16,
  },
  bottomSpacing: {
    height: 20,
  },
});

export default ExplanationScriptScreen;
