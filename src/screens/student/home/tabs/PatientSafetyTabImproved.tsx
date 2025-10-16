import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
  Alert,
  Animated,
} from 'react-native';
import { colors, typography, spacing } from '../../../../theme';
import { webScrollStyles, webTouchProps } from '../../../../styles/webStyles';

const { width } = Dimensions.get('window');

// Types
interface TrendData {
  scores: number[];
  change: number;
  direction: 'up' | 'down' | 'stable';
  streak: number;
}

interface AlertItem {
  protocol: string;
  score: number;
  urgency: 'high' | 'medium';
  lastPractice: string;
  actions: Array<{
    label: string;
    action: () => void;
  }>;
}

interface ImprovedSafetyData {
  score: {
    current: number;
    trend: TrendData;
    badge: {
      icon: string;
      name: string;
      earnedAt: string;
    };
  };
  alerts: AlertItem[];
  protocolSummary: {
    overall: number;
    items: Array<{ name: string; score: number; icon: string }>;
    collapsed: boolean;
  };
  incidentReporting: {
    completed: number;
    total: number;
    percentage: number;
    scenarios: Array<{ name: string; status: 'done' | 'pending' }>;
    collapsed: boolean;
  };
  recentPractices: Array<{
    category: string;
    title: string;
    date: string;
    score: number;
    status: 'success' | 'warning';
  }>;
  statistics: {
    totalPractices: number;
    safetyScore: number;
    incidentFreeRate: number;
    trend: TrendData;
  };
}

// Mini Sparkline Component
const Sparkline: React.FC<{
  data: number[];
  color: string;
  height: number;
  animate?: boolean;
}> = ({ data, color, height, animate = true }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animate) {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 600,
        useNativeDriver: false,
      }).start();
    }
  }, [animate]);

  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue || 1;

  const points = data.map((value, index) => ({
    x: (index / (data.length - 1)) * (width - 60),
    y: height - ((value - minValue) / range) * height,
  }));

  const pathData = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ');

  return (
    <View style={[styles.sparklineContainer, { height }]}>
      <Animated.View
        style={[
          styles.sparklinePath,
          {
            opacity: animatedValue,
            transform: [
              {
                scaleX: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
              },
            ],
          },
        ]}
      >
        <View style={[styles.sparklineLine, { backgroundColor: color }]} />
      </Animated.View>
    </View>
  );
};

// Hero Card with Score + Badge Integration
const ScoreCardWithBadge: React.FC<{
  data: ImprovedSafetyData['score'];
}> = ({ data }) => {

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
    <View style={styles.heroCard}>
      <View style={styles.scoreHeader}>
        <Text style={styles.heroTitle}>안전 점수</Text>
        <Text style={styles.scoreTrend}>+{data.trend.change}점 ↑</Text>
      </View>
      
      <View style={styles.scoreContainer}>
        <View style={styles.scoreDisplay}>
          <Text style={styles.scoreText}>
            {data.current}
          </Text>
          <Text style={styles.scoreMax}>/100</Text>
        </View>
        
        <View style={styles.scoreInfo}>
          <Text style={styles.scoreLabel}>반 평균 84점 대비 높음</Text>
        </View>
      </View>

      <View style={styles.badgeContainer}>
        <Text style={styles.badgeIcon}>{data.badge.icon}</Text>
        <Text style={styles.badgeTitle}>{data.badge.name}</Text>
      </View>
    </View>
  );
};

// Alert Section with Red Cards
const AlertSection: React.FC<{
  alerts: AlertItem[];
}> = ({ alerts }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.02,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, []);

  if (alerts.length === 0) return null;

  return (
    <View style={styles.alertSection}>
      <Text style={styles.alertTitle}>주의가 필요한 영역</Text>
      {alerts.map((alert, index) => (
        <View key={index} style={styles.alertCard}>
          <View style={styles.alertHeader}>
            <View style={styles.alertNameRow}>
              <View style={[styles.alertDot, { 
                backgroundColor: alert.score >= 85 ? '#F59E0B' : '#EF4444' 
              }]} />
              <Text style={styles.alertProtocol}>{alert.protocol}</Text>
              {alert.score < 85 && <Text style={styles.warningIcon}>!</Text>}
            </View>
            <Text style={[
              styles.alertScore,
              { color: alert.score >= 85 ? '#F59E0B' : '#EF4444' }
            ]}>
              {alert.score}점
            </Text>
          </View>
          <Text style={styles.alertDate}>{alert.lastPractice}</Text>
          <View style={styles.alertActions}>
            {alert.actions.map((action, actionIndex) => (
              <TouchableOpacity
                key={actionIndex}
                style={[
                  styles.actionButton,
                  actionIndex === 0 ? styles.primaryAction : styles.secondaryAction
                ]}
                onPress={action.action}
              >
                <Text style={[
                  styles.actionButtonText,
                  actionIndex === 0 ? styles.primaryActionText : styles.secondaryActionText
                ]}>
                  {actionIndex === 0 ? action.label : '가이드 →'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

// Collapsible Protocol Summary
const ProtocolSummaryAccordion: React.FC<{
  data: ImprovedSafetyData['protocolSummary'];
  onToggle: () => void;
}> = ({ data, onToggle }) => {
  const [isExpanded, setIsExpanded] = useState(!data.collapsed);
  const heightAnim = useRef(new Animated.Value(isExpanded ? 1 : 0)).current;

  const toggleExpanded = () => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    
    Animated.timing(heightAnim, {
      toValue: newExpanded ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
    
    onToggle();
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return colors.success;
    if (score >= 85) return colors.info;
    if (score >= 80) return colors.warning;
    return colors.error;
  };

  const getStatusIcon = (score: number) => {
    if (score >= 90) return '✓';
    if (score >= 80) return '!';
    return '✗';
  };

  return (
    <View style={styles.protocolSection}>
      <TouchableOpacity style={styles.protocolHeader} onPress={toggleExpanded}>
        <Text style={styles.protocolTitle}>핵심 안전 프로토콜</Text>
        <Text style={styles.protocolToggle}>
          전체 {data.items.length}개 →
        </Text>
      </TouchableOpacity>
      
      <View style={styles.protocolSummary}>
        <Text style={styles.protocolOverall}>Overall: {data.overall}%</Text>
        <View style={styles.protocolChips}>
          {data.items.slice(0, 3).map((item, index) => (
            <View key={index} style={styles.protocolChip}>
              <Text style={styles.protocolChipText}>{item.name}</Text>
              <Text style={[
                styles.protocolChipScore,
                { color: getScoreColor(item.score) }
              ]}>
                {item.score}점 {getStatusIcon(item.score)}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <Animated.View
        style={[
          styles.protocolExpanded,
          {
            height: heightAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 200],
            }),
            opacity: heightAnim,
          },
        ]}
      >
        {data.items.map((item, index) => (
          <View key={index} style={styles.protocolBar}>
            <View style={styles.protocolBarHeader}>
              <Text style={styles.protocolBarName}>{item.name}</Text>
              <Text style={[
                styles.protocolBarScore,
                { color: getScoreColor(item.score) }
              ]}>
                {item.score}%
              </Text>
            </View>
            <View style={styles.protocolBarBackground}>
              <View
                style={[
                  styles.protocolBarFill,
                  {
                    width: `${item.score}%`,
                    backgroundColor: getScoreColor(item.score),
                  },
                ]}
              />
            </View>
          </View>
        ))}
      </Animated.View>
    </View>
  );
};

// Incident Reporting Compact
const IncidentProgressCompact: React.FC<{
  data: ImprovedSafetyData['incidentReporting'];
  onToggle: () => void;
}> = ({ data, onToggle }) => {
  const [isExpanded, setIsExpanded] = useState(!data.collapsed);
  const heightAnim = useRef(new Animated.Value(isExpanded ? 1 : 0)).current;

  const toggleExpanded = () => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    
    Animated.timing(heightAnim, {
      toValue: newExpanded ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
    
    onToggle();
  };

  const completedScenarios = data.scenarios.filter(s => s.status === 'done');
  const pendingScenarios = data.scenarios.filter(s => s.status === 'pending');

  return (
    <View style={styles.incidentSection}>
      <TouchableOpacity style={styles.incidentHeader} onPress={toggleExpanded}>
        <Text style={styles.incidentTitle}>사고 보고 교육</Text>
        <Text style={styles.incidentToggle}>
          {data.completed}/{data.total} 완료
        </Text>
      </TouchableOpacity>
      
      <View style={styles.incidentProgress}>
        <View style={styles.incidentSummary}>
          <Text style={styles.incidentSubtitle}>최근 완료:</Text>
          <Text style={styles.incidentItem}>- 아차사고 보고 (10/15)</Text>
          <Text style={styles.incidentItem}>- 투약 오류 대응 (10/12)</Text>
        </View>
        
        <View style={styles.incidentActions}>
          <Text style={styles.incidentSubtitle}>진행 중:</Text>
          <Text style={styles.incidentItem}>- 부작용 보고 교육</Text>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllButtonText}>전체 {data.total}개 보기 →</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Animated.View
        style={[
          styles.incidentExpanded,
          {
            height: heightAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 150],
            }),
            opacity: heightAnim,
          },
        ]}
      >
        {data.scenarios.map((scenario, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.scenarioItem,
              scenario.status === 'done' ? styles.scenarioCompleted : styles.scenarioPending
            ]}
          >
            <Text style={styles.scenarioItemText}>
              {scenario.status === 'done' ? '✓' : '○'} {scenario.name}
            </Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </View>
  );
};

// Recent Practices Minimal
const RecentPracticesMinimal: React.FC<{
  practices: ImprovedSafetyData['recentPractices'];
  onToggle: () => void;
}> = ({ practices, onToggle }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const heightAnim = useRef(new Animated.Value(0)).current;

  const toggleExpanded = () => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    
    Animated.timing(heightAnim, {
      toValue: newExpanded ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
    
    onToggle();
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return colors.success;
    if (score >= 85) return colors.info;
    if (score >= 80) return colors.warning;
    return colors.error;
  };

  return (
    <View style={styles.practicesSection}>
      <TouchableOpacity style={styles.practicesHeader} onPress={toggleExpanded}>
        <Text style={styles.practicesTitle}>최근 실습 기록</Text>
        <Text style={styles.practicesToggle}>
          전체 보기 →
        </Text>
      </TouchableOpacity>
      
      {practices.slice(0, 3).map((practice, index) => (
        <View key={index} style={styles.practiceRow}>
          <View style={styles.practiceInfo}>
            <Text style={styles.practiceName}>{practice.title}</Text>
            <Text style={styles.practiceDate}>{practice.date}</Text>
          </View>
          <Text style={[
            styles.practiceScoreText,
            { color: getScoreColor(practice.score) }
          ]}>
            {practice.score}점
          </Text>
        </View>
      ))}

      <Animated.View
        style={[
          styles.practicesExpanded,
          {
            height: heightAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, (practices.length - 3) * 50],
            }),
            opacity: heightAnim,
          },
        ]}
      >
        {practices.slice(3).map((practice, index) => (
          <View key={index + 3} style={styles.practiceRow}>
            <Text style={styles.practiceIcon}>
              {practice.category.split(' ')[0]}
            </Text>
            <View style={styles.practiceInfo}>
              <Text style={styles.practiceName}>{practice.title}</Text>
              <Text style={styles.practiceDate}>{practice.date}</Text>
            </View>
            <View style={styles.practiceScore}>
              <Text style={[
                styles.practiceScoreText,
                { color: getScoreColor(practice.score) }
              ]}>
                {practice.score}점
              </Text>
              <Text style={styles.practiceStatus}>
                {practice.status === 'success' ? '✓' : '!'}
              </Text>
            </View>
          </View>
        ))}
      </Animated.View>
    </View>
  );
};

// Stats with Trend
const StatsWithTrend: React.FC<{
  data: ImprovedSafetyData['statistics'];
}> = ({ data }) => {
  return (
    <View style={styles.statsSection}>
      <Text style={styles.statsTitle}>달성 기록</Text>
      
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{data.trend.streak}주</Text>
          <Text style={styles.statLabel}>손위생95%+</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{data.incidentFreeRate}%</Text>
          <Text style={styles.statLabel}>환자확인</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{data.totalPractices}회</Text>
          <Text style={styles.statLabel}>무사고실습</Text>
        </View>
      </View>
    </View>
  );
};

// Main Component
const PatientSafetyTabImproved: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    protocols: false,
    incidents: false,
    practices: false,
  });

  // Mock data with improved structure
  const safetyData: ImprovedSafetyData = {
    score: {
      current: 92,
      trend: {
        scores: [86, 88, 90, 91, 92],
        change: 8,
        direction: 'up',
        streak: 3,
      },
      badge: {
        icon: 'H',
        name: '손 위생 95%+ 유지 (3주)',
        earnedAt: '2025.10.15',
      },
    },
    alerts: [
      {
        protocol: '낙상 예방 (Fall Prevention)',
        score: 85,
        urgency: 'medium',
        lastPractice: '7일 전',
        actions: [
          { label: '평가 연습', action: () => Alert.alert('평가 연습', '낙상 예방 평가 연습을 시작합니다.') },
          { label: '가이드 보기', action: () => Alert.alert('가이드', '낙상 예방 가이드를 표시합니다.') },
        ],
      },
      {
        protocol: '욕창 예방 (Pressure Ulcer)',
        score: 80,
        urgency: 'high',
        lastPractice: '12일 전',
        actions: [
          { label: '평가 연습', action: () => Alert.alert('평가 연습', '욕창 예방 평가 연습을 시작합니다.') },
          { label: '가이드 보기', action: () => Alert.alert('가이드', '욕창 예방 가이드를 표시합니다.') },
        ],
      },
    ],
    protocolSummary: {
      overall: 93,
      items: [
        { name: 'ID', score: 98, icon: '🛡️' },
        { name: 'Hand', score: 95, icon: '🧼' },
        { name: 'Fall', score: 85, icon: '⚠️' },
        { name: 'Infection', score: 92, icon: '' },
        { name: 'Pressure', score: 80, icon: '' },
      ],
      collapsed: true,
    },
    incidentReporting: {
      completed: 5,
      total: 8,
      percentage: 63,
      scenarios: [
        { name: 'Near Miss', status: 'done' },
        { name: 'Med Error', status: 'done' },
        { name: 'Fall', status: 'done' },
        { name: 'Equipment Failure', status: 'done' },
        { name: 'Infection Outbreak', status: 'done' },
        { name: 'Adverse Event', status: 'pending' },
        { name: 'Communication Error', status: 'pending' },
        { name: 'Documentation Error', status: 'pending' },
      ],
      collapsed: true,
    },
    recentPractices: [
      {
        category: '🛡️ ID Check',
        title: '2-Identifier Check',
        date: '2일전',
        score: 98,
        status: 'success',
      },
      {
        category: '🧼 Hand Hygiene',
        title: 'Aseptic Technique',
        date: '1일전',
        score: 95,
        status: 'success',
      },
      {
        category: '⚠️ Fall Assessment',
        title: 'Fall Risk Assessment',
        date: '7일전',
        score: 85,
        status: 'warning',
      },
      {
        category: 'Infection Control',
        title: 'Isolation Precautions',
        date: '3일전',
        score: 92,
        status: 'success',
      },
      {
        category: 'Pressure Ulcer',
        title: 'Skin Assessment',
        date: '5일전',
        score: 80,
        status: 'warning',
      },
    ],
    statistics: {
      totalPractices: 32,
      safetyScore: 92,
      incidentFreeRate: 100,
      trend: {
        scores: [86, 88, 90, 91, 92],
        change: 5,
        direction: 'up',
        streak: 3,
      },
    },
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleSectionToggle = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <ScrollView
      style={[
        styles.container,
        webScrollStyles.verticalScroll
      ]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
      {...webTouchProps}
    >
      {/* 1. Hero Card (Score + Badge Integration) */}
      <View style={styles.section}>
        <ScoreCardWithBadge data={safetyData.score} />
      </View>

      {/* 2. Alert Section (Top Priority) */}
      <View style={styles.section}>
        <AlertSection alerts={safetyData.alerts} />
      </View>

      {/* 3. Protocol Summary (Collapsible) */}
      <View style={styles.section}>
        <ProtocolSummaryAccordion
          data={safetyData.protocolSummary}
          onToggle={() => handleSectionToggle('protocols')}
        />
      </View>

      {/* 4. Incident Reporting Compact */}
      <View style={styles.section}>
        <IncidentProgressCompact
          data={safetyData.incidentReporting}
          onToggle={() => handleSectionToggle('incidents')}
        />
      </View>

      {/* 5. Recent Practices (Minimal) */}
      <View style={styles.section}>
        <RecentPracticesMinimal
          practices={safetyData.recentPractices}
          onToggle={() => handleSectionToggle('practices')}
        />
      </View>

      {/* 6. Stats with Trend */}
      <View style={styles.section}>
        <StatsWithTrend data={safetyData.statistics} />
      </View>

      <View style={{ height: spacing.xl }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  section: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  
  // Hero Card Styles
  heroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  scoreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  scoreTrend: {
    fontSize: 14,
    fontWeight: '600',
    color: '#059669',
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreDisplay: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  scoreText: {
    fontSize: 64,
    fontWeight: '700',
    color: '#1F2937',
    letterSpacing: -2,
  },
  scoreMax: {
    fontSize: 28,
    fontWeight: '400',
    color: '#9CA3AF',
    marginLeft: 4,
  },
  scoreInfo: {
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
  },
  badgeIcon: {
    fontSize: 16,
    marginRight: 8,
    color: '#059669',
  },
  badgeTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },

  // Alert Section Styles
  alertSection: {
    marginBottom: 16,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  alertCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  alertNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  alertDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  alertProtocol: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  warningIcon: {
    fontSize: 16,
    marginLeft: 4,
  },
  alertScore: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  alertDate: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 12,
  },
  alertActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryAction: {
    backgroundColor: '#F3F4F6',
  },
  secondaryAction: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  primaryActionText: {
    color: '#374151',
  },
  secondaryActionText: {
    color: '#6B7280',
  },

  // Protocol Section Styles
  protocolSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  protocolHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  protocolTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  protocolToggle: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  protocolSummary: {
    marginBottom: 12,
  },
  protocolOverall: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  protocolChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  protocolChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  protocolChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginRight: 8,
  },
  protocolChipScore: {
    fontSize: 14,
    fontWeight: '600',
  },
  protocolExpanded: {
    overflow: 'hidden',
    marginTop: spacing.sm,
  },
  protocolBar: {
    marginBottom: spacing.sm,
  },
  protocolBarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  protocolBarName: {
    ...typography.textStyles.bodySmall,
    fontWeight: typography.fontWeight.medium,
  },
  protocolBarScore: {
    ...typography.textStyles.bodySmall,
    fontWeight: typography.fontWeight.bold,
  },
  protocolBarBackground: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  protocolBarFill: {
    height: '100%',
    borderRadius: 3,
  },

  // Incident Section Styles
  incidentSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  incidentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  incidentTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  incidentToggle: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  incidentProgress: {
    gap: 12,
  },
  incidentSummary: {
    marginBottom: 8,
  },
  incidentSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  incidentItem: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 2,
  },
  incidentActions: {
    marginTop: 8,
  },
  viewAllButton: {
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  viewAllButtonText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  incidentExpanded: {
    overflow: 'hidden',
    marginTop: spacing.sm,
  },
  scenarioItem: {
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  scenarioCompleted: {
    backgroundColor: colors.success + '10',
  },
  scenarioPending: {
    backgroundColor: colors.backgroundSecondary,
  },
  scenarioItemText: {
    ...typography.textStyles.bodySmall,
    fontWeight: typography.fontWeight.medium,
  },

  // Practices Section Styles
  practicesSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  practicesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  practicesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  practicesToggle: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  practiceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  practiceInfo: {
    flex: 1,
  },
  practiceName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 2,
  },
  practiceDate: {
    fontSize: 13,
    color: '#6B7280',
  },
  practiceScoreText: {
    fontSize: 16,
    fontWeight: '600',
  },
  practicesExpanded: {
    overflow: 'hidden',
  },

  // Stats Section Styles
  statsSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },

  // Sparkline Styles
  sparklineContainer: {
    width: width - 60,
    marginBottom: spacing.xs,
  },
  sparklinePath: {
    height: '100%',
  },
  sparklineLine: {
    height: 2,
    borderRadius: 1,
  },
});

export default PatientSafetyTabImproved;
