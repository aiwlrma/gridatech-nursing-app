import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';

interface VoicePracticeModalProps {
  visible: boolean;
  onClose: () => void;
  script: string;
}

const VoicePracticeModal: React.FC<VoicePracticeModalProps> = ({ 
  visible, 
  onClose, 
  script 
}) => {
  const [recording, setRecording] = useState(false);
  const [audio, setAudio] = useState<string | null>(null);

  const handleStartRecording = () => {
    setRecording(true);
    // Mock recording start
    Alert.alert('녹음 시작', '음성 녹음을 시작합니다.');
  };

  const handleStopRecording = () => {
    setRecording(false);
    setAudio('mock-audio-path');
    Alert.alert('녹음 완료', '음성 녹음이 완료되었습니다.');
  };

  const handlePlayAudio = () => {
    if (audio) {
      Alert.alert('재생', '녹음된 음성을 재생합니다.');
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButton}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>음성 연습</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.scriptPreview}>
          <Text style={styles.previewLabel}>📝 연습할 스크립트</Text>
          <Text style={styles.previewText}>{script}</Text>
        </View>

        <View style={styles.recordControls}>
          {!recording ? (
            <TouchableOpacity 
              style={styles.recordButton}
              onPress={handleStartRecording}
            >
              <Text style={styles.recordIcon}>🎤</Text>
              <Text style={styles.recordText}>녹음 시작</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              style={styles.stopButton}
              onPress={handleStopRecording}
            >
              <Text style={styles.stopText}>⬛ 녹음 중지</Text>
            </TouchableOpacity>
          )}
        </View>

        {audio && (
          <View style={styles.playbackSection}>
            <TouchableOpacity 
              style={styles.playButton}
              onPress={handlePlayAudio}
            >
              <Text style={styles.playText}>▶ 재생하기</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.retryButton}
              onPress={() => setAudio(null)}
            >
              <Text style={styles.retryText}>🔄 다시 녹음</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>💡 연습 팁</Text>
          <Text style={styles.tipsText}>
            • 명확하고 천천히 말하기{'\n'}
            • 환자 입장에서 생각하며 말하기{'\n'}
            • 자연스러운 톤으로 연습하기
          </Text>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  closeButton: {
    fontSize: 24,
    fontWeight: '700',
    color: '#6B7280',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1F2E',
  },
  headerSpacer: {
    width: 24,
  },
  scriptPreview: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 20,
    margin: 20,
  },
  previewLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 12,
  },
  previewText: {
    fontSize: 16,
    color: '#1A1F2E',
    lineHeight: 24,
  },
  recordControls: {
    alignItems: 'center',
    marginVertical: 20,
  },
  recordButton: {
    backgroundColor: '#10B981',
    borderRadius: 16,
    paddingHorizontal: 32,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  recordIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  recordText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  stopButton: {
    backgroundColor: '#EF4444',
    borderRadius: 16,
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  stopText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  playbackSection: {
    alignItems: 'center',
    marginVertical: 20,
    gap: 12,
  },
  playButton: {
    backgroundColor: '#1884FF',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  playText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  retryButton: {
    backgroundColor: '#6B7280',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  retryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  tipsSection: {
    backgroundColor: '#F0F7FF',
    borderWidth: 1.5,
    borderColor: '#1884FF',
    borderRadius: 16,
    padding: 20,
    margin: 20,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1F2E',
    marginBottom: 12,
  },
  tipsText: {
    fontSize: 14,
    color: '#1E40AF',
    lineHeight: 22,
  },
});

export default VoicePracticeModal;
