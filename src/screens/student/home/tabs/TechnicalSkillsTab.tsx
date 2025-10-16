import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
  Animated,
} from 'react-native';
import { colors, typography, spacing } from '../../../../theme';
import { webScrollStyles, webTouchProps } from '../../../../styles/webStyles';
import TossSkillScore from '../../../../components/skills/TossSkillScore';
import TossSkillAlert from '../../../../components/skills/TossSkillAlert';
import TossPracticeItem from '../../../../components/skills/TossPracticeItem';
import TossWeeklyChart from '../../../../components/skills/TossWeeklyChart';
import TossStats from '../../../../components/skills/TossStats';

// TypeScript interfaces
interface RecentPractice {
  skillName: string;
  date: string;
  time: string;
  score: number;
  status: 'done' | 'warning';
}

interface PracticeTime {
  day: string;
  hours: number;
}

interface TechnicalSkillsData {
  overallMastery: number;
  recentPractices: RecentPractice[];
  practiceTime: {
    weekly: PracticeTime[];
    total: number;
    target: number;
  };
  statistics: {
    totalPractices: number;
    averageScore: number;
    proficiencyRate: number;
  };
  alertItems: Array<{
    title: string;
    score: number;
    subtitle: string;
  }>;
}

interface TechnicalSkillsTabProps {
  onRefresh?: () => void;
  refreshing?: boolean;
}

const TechnicalSkillsTab: React.FC<TechnicalSkillsTabProps> = ({ 
  onRefresh, 
  refreshing = false 
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  // Mock data
  const technicalSkillsData: TechnicalSkillsData = {
    overallMastery: 88,
    recentPractices: [
      {
        skillName: '말초 정맥 주사 삽입',
        date: '10월 15일',
        time: '14:30',
        score: 95,
        status: 'done',
      },
      {
        skillName: '12-Lead ECG 적용',
        date: '10월 14일',
        time: '10:20',
        score: 92,
        status: 'done',
      },
      {
        skillName: '혈액 검체 채취',
        date: '10월 13일',
        time: '09:15',
        score: 88,
        status: 'warning',
      },
    ],
    practiceTime: {
      weekly: [
        { day: '월', hours: 1 },
        { day: '화', hours: 2 },
        { day: '수', hours: 1 },
        { day: '목', hours: 3 },
        { day: '금', hours: 2 },
        { day: '토', hours: 0 },
        { day: '일', hours: 0 },
      ],
      total: 9,
      target: 10,
    },
    statistics: {
      totalPractices: 45,
      averageScore: 88,
      proficiencyRate: 82,
    },
    alertItems: [
      {
        title: '기관내 삽관 보조',
        score: 78,
        subtitle: '마지막 실습 5일 전',
      },
      {
        title: '호흡 관리 술기',
        score: 82,
        subtitle: '마지막 실습 7일 전',
      },
    ],
  };

  const handleAlertPress = (item: { title: string; score: number; subtitle: string }) => {
    Alert.alert(
      item.title,
      `점수: ${item.score}점\n${item.subtitle}\n상세 정보를 확인하시겠습니까?`
    );
  };

  const handlePracticePress = (practice: RecentPractice) => {
    Alert.alert(
      '술기 상세',
      `${practice.skillName}\n점수: ${practice.score}점\n${practice.date} ${practice.time}`
    );
  };

  const handleSkillPractice = () => {
    Alert.alert('술기 연습', '술기 연습을 시작하시겠습니까?');
  };


  // Animate on mount
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <ScrollView
        style={[
          styles.scrollView,
          webScrollStyles.verticalScroll
        ]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        {...webTouchProps}
      >
        {/* 1. Hero Score */}
        <TossSkillScore
          score={technicalSkillsData.overallMastery}
          label="술기 숙련도 종합"
          comparison="지난 주 대비 +3점"
        />
        
        {/* Divider */}
        <View style={styles.divider} />
        
        {/* 2. Alert Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>주의가 필요한 항목</Text>
        </View>
        
        {technicalSkillsData.alertItems.map((item, index) => (
          <TossSkillAlert
            key={index}
            title={item.title}
            score={item.score}
            subtitle={item.subtitle}
            onPress={() => handleAlertPress(item)}
          />
        ))}
        
        {/* Divider */}
        <View style={styles.divider} />
        
        {/* 3. Recent Practices */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>최근 실습 기록</Text>
            <TouchableOpacity>
              <Text style={styles.sectionAction}>전체 보기</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {technicalSkillsData.recentPractices.map((practice, index) => (
          <TossPracticeItem
            key={index}
            title={practice.skillName}
            subtitle={`${practice.date} ${practice.time}`}
            score={practice.score}
            status={practice.status}
            onPress={() => handlePracticePress(practice)}
          />
        ))}
        
        {/* Divider */}
        <View style={styles.divider} />
        
        {/* 4. Weekly Chart */}
        <TossWeeklyChart
          data={technicalSkillsData.practiceTime.weekly}
          total={technicalSkillsData.practiceTime.total}
          target={technicalSkillsData.practiceTime.target}
        />
        
        {/* Divider */}
        <View style={styles.divider} />
        
        {/* 5. Stats */}
        <TossStats
          totalPractices={technicalSkillsData.statistics.totalPractices}
          averageScore={technicalSkillsData.statistics.averageScore}
          proficiency={technicalSkillsData.statistics.proficiencyRate}
        />
        
        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
        
        {/* Action Button */}
        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleSkillPractice}>
            <Text style={styles.primaryButtonText}>술기 연습 시작</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  divider: {
    height: 8,
    backgroundColor: '#F2F4F6',
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 12,
    backgroundColor: '#F9FAFB',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#191F28',
  },
  sectionAction: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3182F6',
  },
  bottomSpacing: {
    height: 32,
  },
  buttonSection: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  primaryButton: {
    height: 48,
    backgroundColor: '#3182F6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default TechnicalSkillsTab;
