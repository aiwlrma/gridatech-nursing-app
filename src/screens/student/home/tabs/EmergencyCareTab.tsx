import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../../../../theme';
import { Icon } from '../../../../components/icons';
import EmergencySearchBar from '../../../../components/emergency/EmergencySearchBar';

// Strict color rules
const EMERGENCY_COLORS = {
  critical: '#EF4444',      // Only for 119 and critical procedures
  primary: '#1884FF',       // All other items
  background: '#FFFFFF',    // Card backgrounds
  text: '#1A1F2E',         // Primary text
  textSecondary: '#6B7280', // Secondary text
};

interface EmergencyCareTabProps {
  onRefresh?: () => void;
  refreshing?: boolean;
}

// Compact Emergency Row Component
interface EmergencyRowProps {
  icon: string;
  title: string;
  number: string;
  color: string;
  critical?: boolean;
  onPress: () => void;
}

const EmergencyRow: React.FC<EmergencyRowProps> = ({
  icon, title, number, color, critical, onPress
}) => (
  <TouchableOpacity style={styles.row} onPress={onPress}>
    <View style={[styles.iconCircle, { backgroundColor: `${color}15` }]}>
      <Icon name={icon} size={24} color={color} />
    </View>
    <View style={styles.rowContent}>
      <Text style={styles.rowTitle}>{title}</Text>
      <Text style={[styles.rowNumber, { color }]}>{number}</Text>
    </View>
    <TouchableOpacity style={[styles.callButton, { backgroundColor: color }]}>
      <Icon name="phone" size={20} color="#FFF" />
    </TouchableOpacity>
  </TouchableOpacity>
);

// Compact Situation Row Component
interface CompactRowProps {
  icon: string;
  title: string;
  badge?: string;
  color: string;
  onPress: () => void;
}

const CompactRow: React.FC<CompactRowProps> = ({ icon, title, badge, color, onPress }) => (
  <TouchableOpacity style={styles.compactRow} onPress={onPress}>
    <View style={[styles.smallIcon, { backgroundColor: `${color}15` }]}>
      <Icon name={icon} size={18} color={color} />
    </View>
    <Text style={styles.compactTitle}>{title}</Text>
    {badge && (
      <View style={[styles.badge, { backgroundColor: color }]}>
        <Text style={styles.badgeText}>{badge}</Text>
      </View>
    )}
    <Icon name="arrowRight" size={16} color="#D1D5DB" />
  </TouchableOpacity>
);

// Grid Item Component
interface GridItemProps {
  icon: string;
  title: string;
  color: string;
  onPress: () => void;
}

const GridItem: React.FC<GridItemProps> = ({ icon, title, color, onPress }) => (
  <TouchableOpacity style={styles.gridItem} onPress={onPress}>
    <View style={[styles.gridIcon, { backgroundColor: `${color}15` }]}>
      <Icon name={icon} size={24} color={color} />
    </View>
    <Text style={styles.gridTitle}>{title}</Text>
  </TouchableOpacity>
);

const EmergencyCareTab: React.FC<EmergencyCareTabProps> = ({
  onRefresh,
  refreshing
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleCall119 = () => {
    Alert.alert(
      '119 구급대 호출',
      '119로 전화를 걸어 구급차를 요청하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        { text: '호출', onPress: () => console.log('Calling 119') }
      ]
    );
  };

  const handleCallHospital = () => {
    Alert.alert(
      '응급실 직통',
      '응급실로 전화를 걸어 응급상황을 알리시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        { text: '호출', onPress: () => console.log('Calling hospital') }
      ]
    );
  };

  const handleCPR = () => {
    Alert.alert(
      '심폐소생술 (CPR)',
      'CPR 절차를 확인하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        { text: '확인', onPress: () => console.log('Opening CPR procedure') }
      ]
    );
  };

  const handleHeimlich = () => {
    Alert.alert(
      '하임리히 기법',
      '기도 폐쇄 응급처치 절차를 확인하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        { text: '확인', onPress: () => console.log('Opening Heimlich procedure') }
      ]
    );
  };

  const handleCategoryPress = (category: string) => {
    Alert.alert(
      `${category} 응급처치`,
      `${category} 관련 응급처치 절차를 확인하시겠습니까?`,
      [
        { text: '취소', style: 'cancel' },
        { text: '확인', onPress: () => console.log(`Opening ${category} procedures`) }
      ]
    );
  };

  const handleProcedurePress = (procedure: string) => {
    Alert.alert(
      procedure,
      '상세 절차를 확인하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        { text: '확인', onPress: () => console.log(`Opening ${procedure} details`) }
      ]
    );
  };

  return (
    <ScrollView 
      style={styles.container} 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Search Bar */}
      <EmergencySearchBar onSearchChange={handleSearchChange} />
      
      {/* Section 1: 긴급 대응 (Compact single card) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>긴급 대응</Text>
        
        <View style={styles.card}>
          <EmergencyRow
            icon="ambulance"
            title="119 구급대"
            number="119"
            color={EMERGENCY_COLORS.critical}
            critical
            onPress={handleCall119}
          />
          <View style={styles.divider} />
          <EmergencyRow
            icon="hospital"
            title="응급실 직통"
            number="02-1234-5678"
            color={EMERGENCY_COLORS.primary}
            onPress={handleCallHospital}
          />
        </View>

        {/* Compact critical procedures */}
        <View style={[styles.card, { marginTop: 8 }]}>
          <Text style={styles.cardSubtitle}>위급 상황 대응</Text>
          <CompactRow 
            icon="heart" 
            title="심폐소생술 (CPR)" 
            badge="위급" 
            color={EMERGENCY_COLORS.critical} 
            onPress={handleCPR}
          />
          <CompactRow 
            icon="alertTriangle" 
            title="기도 폐쇄 (하임리히)" 
            badge="위급" 
            color={EMERGENCY_COLORS.critical} 
            onPress={handleHeimlich}
          />
        </View>
      </View>

      {/* Section 2: 증상별 응급처치 (Compact 2x3 grid) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>증상별 응급처치</Text>
        
        <View style={styles.grid}>
          <GridItem icon="bandage" title="출혈" color={EMERGENCY_COLORS.primary} onPress={() => handleCategoryPress('출혈')} />
          <GridItem icon="firstAid" title="골절" color={EMERGENCY_COLORS.primary} onPress={() => handleCategoryPress('골절')} />
          <GridItem icon="warning" title="화상" color={EMERGENCY_COLORS.primary} onPress={() => handleCategoryPress('화상')} />
          <GridItem icon="error" title="쇼크" color={EMERGENCY_COLORS.primary} onPress={() => handleCategoryPress('쇼크')} />
          <GridItem icon="bandage" title="상처" color={EMERGENCY_COLORS.primary} onPress={() => handleCategoryPress('상처')} />
          <GridItem icon="heartRate" title="열상" color={EMERGENCY_COLORS.primary} onPress={() => handleCategoryPress('열상')} />
        </View>
      </View>
      
      {/* Bottom Spacing */}
      <View style={{ height: 20 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    paddingBottom: 12, // Reduced from 20
  },
  section: {
    marginBottom: 12, // Reduced from 20
  },
  sectionTitle: {
    fontSize: 16, // Reduced from 18
    fontWeight: '700',
    color: EMERGENCY_COLORS.text,
    paddingHorizontal: 20,
    marginBottom: 8, // Reduced from 12
  },
  card: {
    backgroundColor: EMERGENCY_COLORS.background,
    borderRadius: 12, // Reduced from 16
    padding: 12, // Reduced from 16
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 4, // Reduced from 8
    elevation: 1, // Reduced from 2
  },
  cardSubtitle: {
    fontSize: 13, // Reduced from 14
    fontWeight: '600',
    color: EMERGENCY_COLORS.textSecondary,
    marginBottom: 8, // Reduced from 12
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 8, // Reduced from 12
  },
  // Emergency Row Styles
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8, // Reduced from 12
    gap: 10, // Reduced from 12
  },
  iconCircle: {
    width: 36, // Reduced from 40
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowContent: {
    flex: 1,
  },
  rowTitle: {
    fontSize: 15, // Reduced from 16
    fontWeight: '600',
    color: EMERGENCY_COLORS.text,
    marginBottom: 1, // Reduced from 2
  },
  rowNumber: {
    fontSize: 13, // Reduced from 14
    fontWeight: '500',
  },
  callButton: {
    width: 36, // Reduced from 40
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Compact Row Styles
  compactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8, // Reduced from 10
    gap: 8, // Reduced from 10
  },
  smallIcon: {
    width: 28, // Reduced from 32
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compactTitle: {
    flex: 1,
    fontSize: 13, // Reduced from 14
    fontWeight: '500',
    color: EMERGENCY_COLORS.text,
  },
  badge: {
    paddingHorizontal: 5, // Reduced from 6
    paddingVertical: 1, // Reduced from 2
    borderRadius: 3, // Reduced from 4
    marginLeft: 'auto',
    marginRight: 6, // Reduced from 8
  },
  badgeText: {
    fontSize: 9, // Reduced from 10
    fontWeight: '600',
    color: '#FFFFFF',
  },
  // Grid Styles
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 8, // Reduced from 10
  },
  gridItem: {
    width: '31%',
    aspectRatio: 1,
    backgroundColor: EMERGENCY_COLORS.background,
    borderRadius: 10, // Reduced from 12
    padding: 10, // Reduced from 12
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 4, // Reduced from 8
    elevation: 1, // Reduced from 2
  },
  gridIcon: {
    width: 40, // Reduced from 44
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6, // Reduced from 8
  },
  gridTitle: {
    fontSize: 11, // Reduced from 12
    fontWeight: '500',
    color: EMERGENCY_COLORS.text,
    textAlign: 'center',
  },
});

export default EmergencyCareTab;
