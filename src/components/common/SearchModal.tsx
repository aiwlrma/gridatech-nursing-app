import React, { useState, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';
import { PDFViewerRef } from './PDFViewer';

interface SearchModalProps {
  visible: boolean;
  onClose: () => void;
  pdfRef: React.RefObject<PDFViewerRef>;
}

interface SearchResult {
  page: number;
  text: string;
  index: number;
}

const SearchModal: React.FC<SearchModalProps> = ({ visible, onClose, pdfRef }) => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentResultIndex, setCurrentResultIndex] = useState(0);

  const handleSearch = async () => {
    if (!searchText.trim()) {
      Alert.alert('알림', '검색어를 입력해주세요.');
      return;
    }

    setIsSearching(true);
    setSearchResults([]);
    setCurrentResultIndex(0);

    try {
      // Note: react-native-pdf doesn't have built-in text search
      // This is a placeholder implementation
      // In a real app, you would need to implement text extraction and search
      const mockResults: SearchResult[] = [
        { page: 1, text: `"${searchText}" 검색 결과 1`, index: 0 },
        { page: 3, text: `"${searchText}" 검색 결과 2`, index: 1 },
        { page: 5, text: `"${searchText}" 검색 결과 3`, index: 2 },
      ];

      setSearchResults(mockResults);
      
      if (mockResults.length === 0) {
        Alert.alert('검색 결과', '검색 결과가 없습니다.');
      }
    } catch (error) {
      console.error('Search error:', error);
      Alert.alert('오류', '검색 중 오류가 발생했습니다.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleResultPress = (result: SearchResult) => {
    if (pdfRef.current) {
      pdfRef.current.setPage(result.page);
      setCurrentResultIndex(result.index);
    }
    onClose();
  };

  const clearSearch = () => {
    setSearchText('');
    setSearchResults([]);
    setCurrentResultIndex(0);
  };

  const renderSearchResult = ({ item, index }: { item: SearchResult; index: number }) => (
    <TouchableOpacity
      style={[
        styles.resultItem,
        index === currentResultIndex && styles.selectedResult,
      ]}
      onPress={() => handleResultPress(item)}
    >
      <View style={styles.resultHeader}>
        <Text style={styles.pageNumber}>페이지 {item.page}</Text>
        <Text style={styles.resultIndex}>{index + 1}/{searchResults.length}</Text>
      </View>
      <Text style={styles.resultText} numberOfLines={2}>
        {item.text}
      </Text>
    </TouchableOpacity>
  );

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
          <Text style={styles.modalTitle}>검색</Text>
          <TouchableOpacity onPress={clearSearch} style={styles.headerButton}>
            <Text style={styles.clearButton}>지우기</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="검색어를 입력하세요..."
              placeholderTextColor="#9CA3AF"
              value={searchText}
              onChangeText={setSearchText}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
              autoFocus
            />
            <TouchableOpacity
              style={[styles.searchButton, isSearching && styles.searchButtonDisabled]}
              onPress={handleSearch}
              disabled={isSearching}
            >
              <Text style={styles.searchButtonText}>
                {isSearching ? '검색중...' : '검색'}
              </Text>
            </TouchableOpacity>
          </View>

          {searchResults.length > 0 && (
            <View style={styles.resultsHeader}>
              <Text style={styles.resultsCount}>
                {searchResults.length}개의 결과
              </Text>
            </View>
          )}

          <FlatList
            data={searchResults}
            renderItem={renderSearchResult}
            keyExtractor={(item, index) => `${item.page}-${index}`}
            style={styles.resultsList}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              searchText.length > 0 && !isSearching ? (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyStateText}>
                    검색 결과가 없습니다.
                  </Text>
                </View>
              ) : null
            }
          />
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
  clearButton: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    textAlign: 'center',
  },
  searchContainer: {
    flex: 1,
    padding: 20,
  },
  searchInputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 48,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#1A1F2E',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: 12,
  },
  searchButton: {
    backgroundColor: '#1884FF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: 'center',
  },
  searchButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  resultsHeader: {
    marginBottom: 16,
  },
  resultsCount: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
  resultsList: {
    flex: 1,
  },
  resultItem: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  selectedResult: {
    backgroundColor: '#EBF4FF',
    borderColor: '#1884FF',
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  pageNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1884FF',
  },
  resultIndex: {
    fontSize: 12,
    color: '#6B7280',
  },
  resultText: {
    fontSize: 14,
    color: '#1A1F2E',
    lineHeight: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
});

export default SearchModal;
