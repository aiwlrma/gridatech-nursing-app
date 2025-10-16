import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { medicationColors } from '../../../../theme/medicationColors';
import SimpleMedicationScore from '../../../../components/medication/SimpleMedicationScore';
import SimpleMedicationItem from '../../../../components/medication/SimpleMedicationItem';
import Simple5Rights from '../../../../components/medication/Simple5Rights';
import SimpleRecentPractice from '../../../../components/medication/SimpleRecentPractice';

// TypeScript interfaces
interface MinimalMedicationData {
  overallScore: number;
  trend: number;
  warningMedications: Array<{
    name: string;
    nameEn: string;
    score: number;
  }>;
  fiveRights: {
    patient: boolean;
    medication: boolean;
    route: boolean;
    dose: boolean;
    time: boolean;
    overall: number;
  };
  recentPractices: Array<{
    medication: string;
    dose: string;
    route: string;
    score: number;
    date: string;
    status: 'good' | 'warning';
  }>;
}

interface MedicationTabMinimalProps {
  onRefresh?: () => void;
  refreshing?: boolean;
}

const MedicationTabMinimal: React.FC<MedicationTabMinimalProps> = ({ 
  onRefresh, 
  refreshing = false 
}) => {
  // Mock data with simplified structure
  const medicationData: MinimalMedicationData = {
    overallScore: 87,
    trend: 3,
    warningMedications: [
      {
        name: '인슐린 (Insulin)',
        nameEn: 'Regular Insulin',
        score: 78,
      },
      {
        name: 'Right Time 준수',
        nameEn: 'Time Management',
        score: 80,
      },
    ],
    fiveRights: {
      patient: true,
      medication: true,
      route: true,
      dose: false,
      time: false,
      overall: 90,
    },
    recentPractices: [
      {
        medication: 'Ceftriaxone',
        dose: '1g',
        route: 'IV Push',
        score: 95,
        date: '2025.10.15',
        status: 'good',
      },
      {
        medication: 'Morphine',
        dose: '10mg',
        route: 'IM',
        score: 88,
        date: '2025.10.14',
        status: 'good',
      },
      {
        medication: 'Regular Insulin',
        dose: '8U',
        route: 'Subcutaneous',
        score: 82,
        date: '2025.10.12',
        status: 'warning',
      },
    ],
  };

  const handleMedicationPress = (medication: any) => {
    Alert.alert(
      medication.name,
      `정확도: ${medication.score}%\n이 약물에 대한 상세 정보를 확인하시겠습니까?`
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
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Hero Score Card */}
        <SimpleMedicationScore
          score={medicationData.overallScore}
          trend={medicationData.trend}
        />

        {/* 2. Warning Medications (Only show if <80%) */}
        {medicationData.warningMedications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>주의가 필요한 약물</Text>
            {medicationData.warningMedications.map((medication, index) => (
              <SimpleMedicationItem
                key={index}
                name={medication.name}
                nameEn={medication.nameEn}
                score={medication.score}
                onPress={() => handleMedicationPress(medication)}
              />
            ))}
          </View>
        )}

        {/* 3. 5 Rights Indicator */}
        <View style={styles.section}>
          <TouchableOpacity onPress={handleFiveRightsPress} activeOpacity={0.7}>
            <Simple5Rights
              checks={medicationData.fiveRights}
              score={medicationData.fiveRights.overall}
            />
          </TouchableOpacity>
        </View>

        {/* 4. Recent Practices */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>최근 투약 실습</Text>
          {medicationData.recentPractices.map((practice, index) => (
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

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: medicationColors.background.secondary,
  },
  scrollView: {
    flex: 1,
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
});

export default MedicationTabMinimal;
