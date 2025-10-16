import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
  Alert,
} from 'react-native';
import { colors, typography, spacing } from '../../../../theme';
import SafetyScoreCircle from '../../../../components/safety/SafetyScoreCircle';
import ProtocolComplianceBar from '../../../../components/safety/ProtocolComplianceBar';
import ErrorPreventionCard from '../../../../components/safety/ErrorPreventionCard';
import IncidentScenarioCard from '../../../../components/safety/IncidentScenarioCard';
import SafetyBadge from '../../../../components/safety/SafetyBadge';

const { width } = Dimensions.get('window');

interface PatientSafetyData {
  overallScore: number;
  comparisonToAverage: number;
  safetyProtocols: Array<{
    name: string;
    nameEn: string;
    score: number;
    icon: string;
  }>;
  errorPrevention: {
    timeout: number;
    doubleCheck: number;
    allergyCheck: number;
    documentation: number;
    equipmentCheck: number;
    overall: number;
  };
  recentPractices: Array<{
    category: string;
    title: string;
    date: string;
    score: number;
    feedback: string;
    status: 'success' | 'warning';
  }>;
  riskAreas: Array<{
    area: string;
    score: number;
    recommendations: string[];
  }>;
  incidentReporting: {
    completed: number;
    total: number;
    scenarios: Array<{
      name: string;
      status: 'completed' | 'pending';
    }>;
  };
  badges: {
    earned: string[];
    inProgress: Array<{
      name: string;
      progress: number;
    }>;
  };
  statistics: {
    totalPractices: number;
    safetyScore: number;
    incidentFreeRate: number;
  };
}

const PatientSafetyTab: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);

  // Mock data
  const safetyData: PatientSafetyData = {
    overallScore: 92,
    comparisonToAverage: 8,
    safetyProtocols: [
      { name: '환자 확인 (ID Check)', nameEn: 'Patient Identification', score: 98, icon: '🛡️' },
      { name: '손 위생 (Hand Hygiene)', nameEn: 'Hand Hygiene', score: 95, icon: '🧼' },
      { name: '낙상 예방 (Fall Prevention)', nameEn: 'Fall Prevention', score: 85, icon: '⚠️' },
      { name: '감염 관리 (Infection Control)', nameEn: 'Infection Control', score: 92, icon: '' },
      { name: '욕창 예방 (Pressure Ulcer)', nameEn: 'Pressure Ulcer Prevention', score: 80, icon: '' },
    ],
    errorPrevention: {
      timeout: 100,
      doubleCheck: 95,
      allergyCheck: 98,
      documentation: 82,
      equipmentCheck: 90,
      overall: 93,
    },
    recentPractices: [
      {
        category: '🛡️ 환자 확인 프로토콜',
        title: '2-Identifier Check',
        date: '2025.10.15  14:30',
        score: 98,
        feedback: '완벽한 프로토콜 준수',
        status: 'success',
      },
      {
        category: '🧼 손 위생 및 무균술',
        title: 'Aseptic Technique',
        date: '2025.10.14  10:20',
        score: 95,
        feedback: '적절한 순서 준수',
        status: 'success',
      },
      {
        category: '⚠️ 낙상 위험 평가 및 관리',
        title: 'Fall Risk Assessment',
        date: '2025.10.12  16:45',
        score: 85,
        feedback: '추가 안전 조치 필요',
        status: 'warning',
      },
    ],
    riskAreas: [
      {
        area: '낙상 예방 조치',
        score: 85,
        recommendations: [
          '낙상 위험 평가 재학습',
          '안전 보조기구 사용법 복습',
        ],
      },
      {
        area: '욕창 예방 관리',
        score: 80,
        recommendations: [
          '체위 변경 타이밍 연습',
          '피부 사정 기술 향상',
        ],
      },
      {
        area: '수기 기록 정확성',
        score: 82,
        recommendations: [
          '표준 약어 사용 학습',
          '기록 작성 원칙 복습',
        ],
      },
    ],
    incidentReporting: {
      completed: 5,
      total: 8,
      scenarios: [
        { name: 'Near Miss 보고', status: 'completed' },
        { name: 'Medication Error', status: 'completed' },
        { name: 'Fall Incident', status: 'completed' },
        { name: 'Equipment Failure', status: 'completed' },
        { name: 'Infection Outbreak', status: 'completed' },
        { name: 'Adverse Event', status: 'pending' },
        { name: 'Communication Error', status: 'pending' },
        { name: 'Documentation Error', status: 'pending' },
      ],
    },
    badges: {
      earned: [
        '🥇 Hand Hygiene Champion',
        '🥈 ID Check Master',
        '🥉 Infection Control Specialist',
      ],
      inProgress: [
        { name: '🔒 Fall Prevention Expert', progress: 80 },
        { name: '🔒 Safety Ambassador', progress: 60 },
      ],
    },
    statistics: {
      totalPractices: 32,
      safetyScore: 92,
      incidentFreeRate: 100,
    },
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleProtocolPress = (protocol: any) => {
    Alert.alert(
      protocol.name,
      `${protocol.nameEn}\n점수: ${protocol.score}%\n상세 기록을 확인하시겠습니까?`
    );
  };

  const handlePracticePress = (practice: any) => {
    Alert.alert(
      practice.category,
      `${practice.title}\n${practice.date}\n점수: ${practice.score}점\n\n${practice.feedback}`
    );
  };

  const handleRiskAreaPress = (area: any) => {
    Alert.alert(
      area.area,
      `현재 점수: ${area.score}점\n\n개선 방안:\n${area.recommendations.map(rec => `• ${rec}`).join('\n')}`
    );
  };

  const handleIncidentScenarioPress = (scenario: any) => {
    if (scenario.status === 'completed') {
      Alert.alert('완료된 시나리오', `${scenario.name} 시나리오를 이미 완료했습니다.`);
    } else {
      Alert.alert('시나리오 시작', `${scenario.name} 시뮬레이션을 시작하시겠습니까?`);
    }
  };

  const handleSafetyScenario = () => {
    Alert.alert('안전 시나리오 연습', '안전 시나리오 연습 화면으로 이동합니다.');
  };

  const handleIncidentReporting = () => {
    Alert.alert('사고 보고 시뮬레이션', '사고 보고 시뮬레이션 화면으로 이동합니다.');
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return colors.success;
    if (score >= 85) return colors.info;
    if (score >= 80) return colors.warning;
    return colors.error;
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 85) return 'Good';
    if (score >= 80) return 'Needs Attention';
    return 'Critical';
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
    >
      {/* Overall Safety Score */}
      <View style={styles.section}>
        <SafetyScoreCircle
          score={safetyData.overallScore}
          comparison={safetyData.comparisonToAverage}
        />
      </View>

      {/* Safety Protocol Compliance */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>핵심 안전 프로토콜</Text>
        {safetyData.safetyProtocols.map((protocol, index) => (
          <ProtocolComplianceBar
            key={index}
            protocol={protocol}
            onPress={() => handleProtocolPress(protocol)}
          />
        ))}
      </View>

      {/* Error Prevention Checklist */}
      <View style={styles.section}>
        <ErrorPreventionCard
          data={safetyData.errorPrevention}
        />
      </View>

      {/* Recent Safety Practices */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>최근 안전 실습</Text>
        {safetyData.recentPractices.map((practice, index) => (
          <TouchableOpacity
            key={index}
            style={styles.practiceCard}
            onPress={() => handlePracticePress(practice)}
          >
            <View style={styles.practiceHeader}>
              <Text style={styles.practiceCategory}>{practice.category}</Text>
              <View style={styles.practiceScore}>
                <Text style={[styles.scoreText, { color: getScoreColor(practice.score) }]}>
                  {practice.score}점
                </Text>
                <Text style={styles.statusIcon}>
                  {practice.status === 'success' ? '✓' : '⚠'}
                </Text>
              </View>
            </View>
            <Text style={styles.practiceTitle}>{practice.title}</Text>
            <Text style={styles.practiceDate}>{practice.date}</Text>
            <Text style={styles.practiceFeedback}>{practice.feedback}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Risk Management Areas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚠ 개선이 필요한 안전 영역</Text>
        {safetyData.riskAreas.map((area, index) => (
          <TouchableOpacity
            key={index}
            style={styles.riskCard}
            onPress={() => handleRiskAreaPress(area)}
          >
            <View style={styles.riskHeader}>
              <Text style={styles.riskArea}>• {area.area}</Text>
              <Text style={[styles.riskScore, { color: getScoreColor(area.score) }]}>
                {area.score}점
              </Text>
            </View>
            <View style={styles.recommendations}>
              {area.recommendations.map((rec, recIndex) => (
                <Text key={recIndex} style={styles.recommendation}>
                  → {rec}
                </Text>
              ))}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Incident Reporting */}
      <View style={styles.section}>
        <IncidentScenarioCard
          data={safetyData.incidentReporting}
          onScenarioPress={handleIncidentScenarioPress}
        />
      </View>

      {/* Safety Badges */}
      <View style={styles.section}>
        <SafetyBadge
          earned={safetyData.badges.earned}
          inProgress={safetyData.badges.inProgress}
        />
      </View>

      {/* Statistics Summary */}
      <View style={styles.section}>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{safetyData.statistics.totalPractices}</Text>
            <Text style={styles.statLabel}>총 실습</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{safetyData.statistics.safetyScore}</Text>
            <Text style={styles.statLabel}>안전 점수</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{safetyData.statistics.incidentFreeRate}%</Text>
            <Text style={styles.statLabel}>무사고</Text>
          </View>
        </View>
      </View>

      {/* Bottom Action Buttons */}
      <View style={styles.buttonSection}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleSafetyScenario}>
          <Text style={styles.primaryButtonText}>안전 시나리오 연습</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={handleIncidentReporting}>
          <Text style={styles.secondaryButtonText}>사고 보고 시뮬레이션</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: spacing.xl }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  section: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.layout.screenPadding,
  },
  sectionTitle: {
    ...typography.textStyles.heading3,
    fontSize: 18,
    marginBottom: spacing.md,
  },
  practiceCard: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  practiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  practiceCategory: {
    ...typography.textStyles.body,
    fontWeight: typography.fontWeight.semibold,
    flex: 1,
  },
  practiceScore: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreText: {
    ...typography.textStyles.body,
    fontWeight: typography.fontWeight.bold,
    marginRight: spacing.xs,
  },
  statusIcon: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  practiceTitle: {
    ...typography.textStyles.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.xs / 2,
  },
  practiceDate: {
    ...typography.textStyles.caption,
    color: colors.textLight,
    marginBottom: spacing.xs,
  },
  practiceFeedback: {
    ...typography.textStyles.bodySmall,
    color: colors.textPrimary,
  },
  riskCard: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  riskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  riskArea: {
    ...typography.textStyles.body,
    fontWeight: typography.fontWeight.semibold,
    flex: 1,
  },
  riskScore: {
    ...typography.textStyles.body,
    fontWeight: typography.fontWeight.bold,
  },
  recommendations: {
    paddingLeft: spacing.md,
  },
  recommendation: {
    ...typography.textStyles.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.xs / 2,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    ...typography.textStyles.heading2,
    color: colors.primary,
    fontWeight: typography.fontWeight.bold,
  },
  statLabel: {
    ...typography.textStyles.bodySmall,
    color: colors.textSecondary,
    marginTop: spacing.xs / 2,
  },
  buttonSection: {
    flexDirection: 'row',
    paddingHorizontal: spacing.layout.screenPadding,
    marginTop: spacing.xl,
    gap: spacing.md,
  },
  primaryButton: {
    flex: 1,
    height: spacing.component.buttonHeight.md,
    backgroundColor: colors.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    ...typography.textStyles.body,
    color: colors.background,
    fontWeight: typography.fontWeight.semibold,
  },
  secondaryButton: {
    flex: 1,
    height: spacing.component.buttonHeight.md,
    backgroundColor: colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButtonText: {
    ...typography.textStyles.body,
    color: colors.primary,
    fontWeight: typography.fontWeight.semibold,
  },
});

export default PatientSafetyTab;
