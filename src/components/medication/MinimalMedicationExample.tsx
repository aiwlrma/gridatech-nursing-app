import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { medicationColors } from '../../theme/medicationColors';
import SimpleMedicationScore from './SimpleMedicationScore';
import SimpleMedicationItem from './SimpleMedicationItem';
import Simple5Rights from './Simple5Rights';
import SimpleRecentPractice from './SimpleRecentPractice';

/**
 * Example component demonstrating the minimal medication administration design
 * This shows how all components work together with the simplified color system
 */
const MinimalMedicationExample: React.FC = () => {
  // Example data showing the minimal design system
  const exampleData = {
    overallScore: 87,
    trend: 3,
    warningMedications: [
      {
        name: '인슐린 (Insulin)',
        nameEn: 'Regular Insulin',
        score: 78, // <80% triggers warning color
      },
      {
        name: 'Right Time 준수',
        nameEn: 'Time Management',
        score: 80, // Exactly 80% - still warning
      },
    ],
    goodMedications: [
      {
        name: '항생제 (Antibiotics)',
        nameEn: 'Ceftriaxone',
        score: 95, // >80% uses primary color
      },
      {
        name: '진통제 (Analgesics)',
        nameEn: 'Morphine',
        score: 88, // >80% uses primary color
      },
    ],
    fiveRights: {
      patient: true,
      medication: true,
      route: true,
      dose: false, // This will show warning
      time: false, // This will show warning
      overall: 90,
    },
    recentPractices: [
      {
        medication: 'Ceftriaxone',
        dose: '1g',
        route: 'IV Push',
        score: 95,
        date: '2025.10.15',
        status: 'good' as const,
      },
      {
        medication: 'Morphine',
        dose: '10mg',
        route: 'IM',
        score: 88,
        date: '2025.10.14',
        status: 'good' as const,
      },
      {
        medication: 'Regular Insulin',
        dose: '8U',
        route: 'Subcutaneous',
        score: 82,
        date: '2025.10.12',
        status: 'warning' as const,
      },
    ],
  };

  const handleMedicationPress = (medication: any) => {
    Alert.alert(
      medication.name,
      `정확도: ${medication.score}%\n${medication.score < 80 ? '주의가 필요한 약물입니다.' : '안전한 수준입니다.'}`
    );
  };

  const handlePracticePress = (practice: any) => {
    Alert.alert(
      '투약 상세',
      `${practice.medication} ${practice.dose}\n점수: ${practice.score}점\n날짜: ${practice.date}`
    );
  };

  const handleFiveRightsPress = () => {
    Alert.alert('5 Rights 상세', '5 Rights 준수율 상세 정보를 확인하시겠습니까?');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Minimal Medication Design</Text>
        <Text style={styles.headerSubtitle}>
          Only 2 colors: #1884FF (primary) + #F59E0B (warning)
        </Text>
      </View>

      {/* 1. Hero Score Card */}
      <SimpleMedicationScore
        score={exampleData.overallScore}
        trend={exampleData.trend}
      />

      {/* 2. Warning Medications (Only <80%) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>주의가 필요한 약물 (Warning Color)</Text>
        {exampleData.warningMedications.map((medication, index) => (
          <SimpleMedicationItem
            key={index}
            name={medication.name}
            nameEn={medication.nameEn}
            score={medication.score}
            onPress={() => handleMedicationPress(medication)}
          />
        ))}
      </View>

      {/* 3. Good Medications (≥80%) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>안전한 약물 (Primary Color)</Text>
        {exampleData.goodMedications.map((medication, index) => (
          <SimpleMedicationItem
            key={index}
            name={medication.name}
            nameEn={medication.nameEn}
            score={medication.score}
            onPress={() => handleMedicationPress(medication)}
          />
        ))}
      </View>

      {/* 4. 5 Rights Indicator */}
      <View style={styles.section}>
        <TouchableOpacity onPress={handleFiveRightsPress} activeOpacity={0.7}>
          <Simple5Rights
            checks={exampleData.fiveRights}
            score={exampleData.fiveRights.overall}
          />
        </TouchableOpacity>
      </View>

      {/* 5. Recent Practices */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>최근 투약 실습</Text>
        {exampleData.recentPractices.map((practice, index) => (
          <SimpleRecentPractice
            key={index}
            medication={practice.medication}
            dose={practice.dose}
            route={practice.route}
            score={practice.score}
            date={practice.date}
            status={practice.status}
            onPress={() => handlePracticePress(practice)}
          />
        ))}
      </View>

      {/* Color System Demo */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Color System</Text>
        <View style={styles.colorDemo}>
          <View style={styles.colorItem}>
            <View style={[styles.colorSwatch, { backgroundColor: medicationColors.primary }]} />
            <Text style={styles.colorLabel}>#1884FF (Primary)</Text>
            <Text style={styles.colorDescription}>Normal states (≥80%)</Text>
          </View>
          <View style={styles.colorItem}>
            <View style={[styles.colorSwatch, { backgroundColor: medicationColors.warning }]} />
            <Text style={styles.colorLabel}>#F59E0B (Warning)</Text>
            <Text style={styles.colorDescription}>Attention needed (<80%)</Text>
          </View>
        </View>
      </View>

      <View style={{ height: 32 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: medicationColors.background.secondary,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: medicationColors.background.primary,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: medicationColors.text.primary,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: medicationColors.text.secondary,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: medicationColors.text.primary,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  colorDemo: {
    marginHorizontal: 20,
    gap: 16,
  },
  colorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: medicationColors.background.primary,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: medicationColors.background.tertiary,
  },
  colorSwatch: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 12,
  },
  colorLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: medicationColors.text.primary,
    marginRight: 12,
  },
  colorDescription: {
    fontSize: 14,
    color: medicationColors.text.secondary,
    flex: 1,
  },
});

export default MinimalMedicationExample;
