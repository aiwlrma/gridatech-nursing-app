import React from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';

interface NotesModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
  note: string;
  setNote: (note: string) => void;
}

const NotesModal: React.FC<NotesModalProps> = ({
  visible,
  onClose,
  onSave,
  note,
  setNote,
}) => {
  const handleSave = () => {
    if (note.trim().length === 0) {
      Alert.alert('알림', '메모를 입력해주세요.');
      return;
    }
    onSave();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={onClose} style={styles.headerButton}>
            <Text style={styles.closeButton}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>메모</Text>
          <TouchableOpacity onPress={handleSave} style={styles.headerButton}>
            <Text style={styles.saveButton}>저장</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <TextInput
            style={styles.noteInput}
            multiline
            placeholder="메모를 입력하세요..."
            placeholderTextColor="#9CA3AF"
            value={note}
            onChangeText={setNote}
            textAlignVertical="top"
            maxLength={1000}
          />
          
          <View style={styles.characterCount}>
            <Text style={styles.characterCountText}>
              {note.length}/1000
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerButton: {
    padding: 8,
    minWidth: 44,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1F2E',
  },
  closeButton: {
    fontSize: 24,
    color: '#6B7280',
    textAlign: 'center',
  },
  saveButton: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1884FF',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  noteInput: {
    flex: 1,
    fontSize: 15,
    color: '#1A1F2E',
    textAlignVertical: 'top',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  characterCount: {
    alignItems: 'flex-end',
    marginTop: 8,
  },
  characterCountText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});

export default NotesModal;
