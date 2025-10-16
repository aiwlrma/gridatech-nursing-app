import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// 웹에서는 react-native-share를 import하지 않음
let Share: any = null;
if (Platform.OS !== 'web') {
  try {
    Share = require('react-native-share').default;
  } catch (error) {
    console.warn('react-native-share not available:', error);
  }
}
import AsyncStorage from '@react-native-async-storage/async-storage';

import { RootStackParamList } from '../../navigation/RootNavigator';
import PDFViewer from '../../components/common/PDFViewer';
import ActionButton from '../../components/common/ActionButton';
import NotesModal from '../../components/common/NotesModal';
import SearchModal from '../../components/common/SearchModal';

type DocumentDetailScreenRouteProp = RouteProp<RootStackParamList, 'DocumentDetail'>;
type DocumentDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'DocumentDetail'>;

interface DocumentDetailScreenProps {
  route: DocumentDetailScreenRouteProp;
  navigation: DocumentDetailScreenNavigationProp;
}

const DocumentDetailScreen: React.FC<DocumentDetailScreenProps> = ({ route, navigation }) => {
  const { documentId, title, documentUri } = route.params;
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [note, setNote] = useState('');
  const pdfRef = useRef<any>(null);

  // Load bookmark status and note on component mount
  React.useEffect(() => {
    loadBookmarkStatus();
    loadNote();
  }, [documentId]);

  const loadBookmarkStatus = async () => {
    try {
      const bookmarks = await AsyncStorage.getItem('bookmarks');
      if (bookmarks) {
        const bookmarkList = JSON.parse(bookmarks);
        setIsBookmarked(bookmarkList.includes(documentId));
      }
    } catch (error) {
      console.error('Error loading bookmark status:', error);
    }
  };

  const loadNote = async () => {
    try {
      const savedNote = await AsyncStorage.getItem(`note_${documentId}`);
      if (savedNote) {
        setNote(savedNote);
      }
    } catch (error) {
      console.error('Error loading note:', error);
    }
  };

  const handleBookmark = async () => {
    try {
      const bookmarks = await AsyncStorage.getItem('bookmarks');
      let bookmarkList = bookmarks ? JSON.parse(bookmarks) : [];

      if (isBookmarked) {
        bookmarkList = bookmarkList.filter((id: string) => id !== documentId);
        Alert.alert('북마크 제거', '북마크가 제거되었습니다.');
      } else {
        bookmarkList.push(documentId);
        Alert.alert('북마크 추가', '북마크가 추가되었습니다.');
      }

      await AsyncStorage.setItem('bookmarks', JSON.stringify(bookmarkList));
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error('Error handling bookmark:', error);
      Alert.alert('오류', '북마크 처리 중 오류가 발생했습니다.');
    }
  };

  const handleShare = async () => {
    try {
      if (Platform.OS === 'web') {
        // 웹에서는 URL 복사 기능 사용
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(documentUri);
          Alert.alert('공유', '링크가 클립보드에 복사되었습니다.');
        } else {
          // 클립보드 API가 없는 경우 fallback
          const textArea = document.createElement('textarea');
          textArea.value = documentUri;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          Alert.alert('공유', '링크가 클립보드에 복사되었습니다.');
        }
      } else if (Share) {
        // 네이티브에서는 react-native-share 사용
        await Share.open({
          title: title,
          message: '간호 학습 자료',
          url: documentUri,
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      Alert.alert('오류', '공유 중 오류가 발생했습니다.');
    }
  };

  const openNotes = () => {
    setShowNotesModal(true);
  };

  const openSearch = () => {
    setShowSearchModal(true);
  };

  const saveNote = async () => {
    try {
      await AsyncStorage.setItem(`note_${documentId}`, note);
      setShowNotesModal(false);
      Alert.alert('저장 완료', '메모가 저장되었습니다.');
    } catch (error) {
      console.error('Error saving note:', error);
      Alert.alert('오류', '메모 저장 중 오류가 발생했습니다.');
    }
  };

  const onPDFLoadComplete = (numberOfPages: number) => {
    setTotalPages(numberOfPages);
  };

  const onPageChanged = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {title}
        </Text>
        <TouchableOpacity onPress={handleBookmark} style={styles.headerButton}>
          <Text style={[styles.bookmarkIcon, isBookmarked && styles.bookmarkActive]}>
            {isBookmarked ? '🔖' : '📖'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Page Counter */}
      {totalPages > 0 && (
        <View style={styles.pageCounter}>
          <Text style={styles.pageText}>
            {currentPage} / {totalPages}
          </Text>
        </View>
      )}

      {/* Document Viewer */}
      <View style={styles.documentViewer}>
        <PDFViewer
          ref={pdfRef}
          uri={documentUri}
          onLoadComplete={onPDFLoadComplete}
          onPageChanged={onPageChanged}
        />
      </View>

      {/* Bottom Actions */}
      <View style={styles.bottomBar}>
        <ActionButton
          icon="📝"
          label="메모"
          onPress={openNotes}
        />
        <ActionButton
          icon="🔍"
          label="검색"
          onPress={openSearch}
        />
        <ActionButton
          icon="📤"
          label="공유"
          onPress={handleShare}
        />
        <ActionButton
          icon={isBookmarked ? "⭐" : "☆"}
          label="북마크"
          onPress={handleBookmark}
        />
      </View>

      {/* Notes Modal */}
      <NotesModal
        visible={showNotesModal}
        onClose={() => setShowNotesModal(false)}
        onSave={saveNote}
        note={note}
        setNote={setNote}
      />

      {/* Search Modal */}
      <SearchModal
        visible={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        pdfRef={pdfRef}
      />
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1F2E',
    textAlign: 'center',
    marginHorizontal: 16,
  },
  backIcon: {
    fontSize: 24,
    color: '#1A1F2E',
  },
  bookmarkIcon: {
    fontSize: 24,
  },
  bookmarkActive: {
    opacity: 1,
  },
  pageCounter: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  pageText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    fontWeight: '600',
  },
  documentViewer: {
    flex: 1,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
});

export default DocumentDetailScreen;
