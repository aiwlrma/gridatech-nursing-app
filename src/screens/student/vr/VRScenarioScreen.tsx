import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/RootNavigator';
import { MetaBadge, ObjectiveItem, InfoSection } from '../../../components/vr';

type VRScenarioScreenRouteProp = RouteProp<RootStackParamList, 'VRScenario'>;

const VRScenarioScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<VRScenarioScreenRouteProp>();
  const { scenarioId, title } = route.params;
  
  const [previousScore] = useState(85); // Mock previous score

  const checkVRDevice = async (): Promise<boolean> => {
    // Mock VR device check - in real implementation, this would check actual VR hardware
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate 80% chance of VR device being available
        resolve(Math.random() > 0.2);
      }, 1000);
    });
  };

  const handleStartVR = async () => {
    try {
      // Show loading state
      Alert.alert('VR 연결 확인 중...', 'VR 헤드셋 연결을 확인하고 있습니다.');
      
      // VR 헤드셋 연결 확인
      const isVRReady = await checkVRDevice();
      
      if (!isVRReady) {
        Alert.alert(
          'VR 헤드셋 미연결',
          'VR 헤드셋을 연결해주세요.\n\n• Quest 2 헤드셋을 켜주세요\n• Wi-Fi 연결을 확인해주세요\n• 충분한 공간을 확보해주세요',
          [{ text: '확인' }]
        );
        return;
      }

      // VR 시나리오 화면으로 이동 (실제 구현에서는 VRSimulation 화면으로 이동)
      Alert.alert(
        'VR 시나리오 시작',
        'VR 시뮬레이션이 시작됩니다.\n\n안전을 위해 주변 장애물을 제거하고 충분한 공간을 확보해주세요.',
        [
          { text: '취소', style: 'cancel' },
          { 
            text: '시작', 
            onPress: () => {
              // TODO: Navigate to actual VR simulation screen
              console.log('Starting VR simulation for scenario:', scenarioId);
              Alert.alert('VR 시뮬레이션', 'VR 시뮬레이션이 시작되었습니다!');
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('오류', 'VR 연결 확인 중 오류가 발생했습니다.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Card */}
        <View style={styles.heroCard}>
          <Text style={styles.heroIcon}>🥽</Text>
          <Text style={styles.heroTitle}>IV 삽입 술기</Text>
          <View style={styles.metaRow}>
            <MetaBadge icon="⏱" text="20분" />
            <MetaBadge icon="📊" text="중급" color="#1884FF" />
            <MetaBadge icon="⭐" text="VR" color="#10B981" />
          </View>
        </View>

        {/* Description */}
        <InfoSection title="시나리오 개요">
          <Text style={styles.description}>
            정맥 주사 삽입의 전체 과정을 VR로 체험합니다.{'\n'}
            환자 확인부터 삽입, 고정까지 단계별로 학습합니다.
          </Text>
        </InfoSection>

        {/* Learning Objectives */}
        <InfoSection title="학습 목표">
          <ObjectiveItem text="정맥 주사 부위 선택" />
          <ObjectiveItem text="무균 술기 준수" />
          <ObjectiveItem text="정확한 각도로 삽입" />
          <ObjectiveItem text="고정 및 관찰" />
        </InfoSection>

        {/* Requirements */}
        <View style={styles.requirementCard}>
          <Text style={styles.requirementTitle}>⚠️ 필요 장비</Text>
          <Text style={styles.requirementText}>
            • VR 헤드셋 (Quest 2 권장){'\n'}
            • 충분한 공간 (2m x 2m){'\n'}
            • 안정적인 Wi-Fi 연결
          </Text>
        </View>

        {/* Previous Score */}
        {previousScore && (
          <View style={styles.scoreCard}>
            <Text style={styles.scoreTitle}>이전 기록</Text>
            <Text style={styles.scoreBig}>{previousScore}점</Text>
            <Text style={styles.scoreDate}>2025.01.15</Text>
          </View>
        )}

        {/* Safety Notice */}
        <View style={styles.noticeCard}>
          <Text style={styles.noticeTitle}>🛡️ 안전 주의사항</Text>
          <Text style={styles.noticeText}>
            • VR 사용 중 어지러움 느낄 시 즉시 중단{'\n'}
            • 주변 장애물 제거{'\n'}
            • 15분마다 휴식 권장
          </Text>
        </View>

        {/* Bottom spacing for button */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Start Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity 
          style={styles.startButton}
          onPress={handleStartVR}
        >
          <Text style={styles.startText}>🥽 VR 시작하기</Text>
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
  headerSpacer: {
    width: 24,
  },
  scrollView: {
    flex: 1,
  },
  heroCard: {
    backgroundColor: '#1884FF',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 32,
    borderRadius: 20,
    alignItems: 'center',
  },
  heroIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 12,
  },
  description: {
    fontSize: 15,
    color: '#1A1F2E',
    lineHeight: 24,
  },
  requirementCard: {
    backgroundColor: '#FFF7ED',
    borderWidth: 1.5,
    borderColor: '#F59E0B',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 24,
  },
  requirementTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1F2E',
    marginBottom: 12,
  },
  requirementText: {
    fontSize: 14,
    color: '#78350F',
    lineHeight: 22,
  },
  scoreCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 20,
    marginTop: 24,
    alignItems: 'center',
  },
  scoreTitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  scoreBig: {
    fontSize: 40,
    fontWeight: '700',
    color: '#10B981',
  },
  scoreDate: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
  noticeCard: {
    backgroundColor: '#F0F7FF',
    borderWidth: 1.5,
    borderColor: '#1884FF',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 24,
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1F2E',
    marginBottom: 12,
  },
  noticeText: {
    fontSize: 14,
    color: '#1E40AF',
    lineHeight: 22,
  },
  bottomSpacing: {
    height: 20,
  },
  bottomContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  startButton: {
    backgroundColor: '#1884FF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  startText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default VRScenarioScreen;
