import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { colors, typography, spacing } from '../../../theme';
import { webScrollStyles, webTouchProps } from '../../../styles/webStyles';

const { width } = Dimensions.get('window');

interface TossHomeScreenProps {
  navigation: any;
}

// Toss Score Card Component
interface TossScoreCardProps {
  score: number;
  label: string;
  comparison?: string;
}

const TossScoreCard: React.FC<TossScoreCardProps> = ({
  score,
  label,
  comparison
}) => {
  return (
    <View style={styles.scoreCard}>
      <Text style={styles.scoreLabel}>{label}</Text>
      <Text style={styles.scoreValue}>{score}점</Text>
      {comparison && (
        <Text style={styles.scoreComparison}>{comparison}</Text>
      )}
    </View>
  );
};

// Toss Alert Item Component
interface TossAlertItemProps {
  title: string;
  score: number;
  subtitle: string;
  onPress: () => void;
}

const TossAlertItem: React.FC<TossAlertItemProps> = ({
  title,
  score,
  subtitle,
  onPress
}) => {
  return (
    <TouchableOpacity 
      style={styles.alertItem}
      onPress={onPress}
      activeOpacity={0.6}
    >
      <View style={styles.alertContent}>
        <View style={styles.alertLeft}>
          <Text style={styles.alertTitle}>{title}</Text>
          <Text style={styles.alertSubtitle}>{subtitle}</Text>
        </View>
        
        <View style={styles.alertRight}>
          <Text style={styles.alertScore}>{score}점</Text>
          <Text style={styles.alertArrow}>→</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Toss Section Header Component
interface TossSectionHeaderProps {
  title: string;
  action?: {
    label: string;
    onPress: () => void;
  };
}

const TossSectionHeader: React.FC<TossSectionHeaderProps> = ({
  title,
  action
}) => {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action && (
        <TouchableOpacity onPress={action.onPress}>
          <Text style={styles.sectionAction}>{action.label}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// Toss Status Card Component
interface TossStatusCardProps {
  title: string;
  date: string;
  score: number;
  status: 'success' | 'warning';
  onPress: () => void;
}

const TossStatusCard: React.FC<TossStatusCardProps> = ({
  title,
  date,
  score,
  status,
  onPress
}) => {
  return (
    <TouchableOpacity 
      style={styles.statusCard}
      onPress={onPress}
      activeOpacity={0.6}
    >
      <View style={styles.statusIndicator}>
        <Text style={styles.statusIcon}>
          {status === 'success' ? '✓' : '!'}
        </Text>
      </View>
      
      <View style={styles.statusContent}>
        <Text style={styles.statusTitle}>{title}</Text>
        <Text style={styles.statusDate}>{date}</Text>
      </View>
      
      <Text style={[
        styles.statusScore,
        status === 'warning' && styles.statusScoreWarning
      ]}>
        {score}점
      </Text>
    </TouchableOpacity>
  );
};

const TossHomeScreen: React.FC<TossHomeScreenProps> = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleAlertPress = (title: string) => {
    console.log(`Alert pressed: ${title}`);
  };

  const handleStatusPress = (title: string) => {
    console.log(`Status pressed: ${title}`);
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
      

      {/* Score Card (Hero) */}
      <TossScoreCard
        label="이번 주 실습 점수"
        score={85}
        comparison="평균보다 6.5점 높아요"
      />

      {/* Divider */}
      <View style={styles.divider} />

      {/* Alert Section */}
      <TossSectionHeader title="주의가 필요해요" />
      
      <TossAlertItem
        title="인슐린 투여"
        score={78}
        subtitle="마지막 실습 3일 전"
        onPress={() => handleAlertPress('인슐린 투여')}
      />
      
      <TossAlertItem
        title="Right Time 준수"
        score={80}
        subtitle="마지막 실습 1일 전"
        onPress={() => handleAlertPress('Right Time 준수')}
      />

      {/* Divider */}
      <View style={styles.divider} />

      {/* Recent Section */}
      <TossSectionHeader 
        title="최근 완료한 실습"
        action={{ label: '전체 보기', onPress: () => {} }}
      />
      
      <TossStatusCard
        title="환자 확인 프로토콜"
        date="10월 15일 14:30"
        score={98}
        status="success"
        onPress={() => handleStatusPress('환자 확인 프로토콜')}
      />
      
      <TossStatusCard
        title="손 위생 및 무균술"
        date="10월 14일 10:20"
        score={95}
        status="success"
        onPress={() => handleStatusPress('손 위생 및 무균술')}
      />
      
      <TossStatusCard
        title="낙상 위험 평가"
        date="10월 12일 16:45"
        score={85}
        status="warning"
        onPress={() => handleStatusPress('낙상 위험 평가')}
      />

      {/* Bottom Spacing */}
      <View style={{ height: 32 }} />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray50,
  },
  
  
  // Score Card Styles
  scoreCard: {
    backgroundColor: colors.white,
    paddingVertical: 32,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.gray600,
    marginBottom: 8,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.gray900,
    letterSpacing: -1.5,
  },
  scoreComparison: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.gray700,
    marginTop: 8,
  },
  
  // Divider
  divider: {
    height: 8,
    backgroundColor: colors.gray100,
  },
  
  // Section Header Styles
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 12,
    backgroundColor: colors.gray50,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.gray900,
  },
  sectionAction: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  
  // Alert Item Styles
  alertItem: {
    backgroundColor: colors.white,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  alertContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alertLeft: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.gray900,
    marginBottom: 4,
  },
  alertSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.gray500,
  },
  alertRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  alertScore: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.gray900,
  },
  alertArrow: {
    fontSize: 18,
    color: colors.gray300,
  },
  
  // Status Card Styles
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  statusIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.gray100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  statusIcon: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.gray900,
  },
  statusContent: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.gray900,
    marginBottom: 4,
  },
  statusDate: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.gray500,
  },
  statusScore: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.gray900,
    marginLeft: 12,
  },
  statusScoreWarning: {
    color: colors.error,
  },
});

export default TossHomeScreen;
