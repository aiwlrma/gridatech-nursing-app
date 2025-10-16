import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { View, StyleSheet, Alert, Platform, Text } from 'react-native';

interface PDFViewerProps {
  uri: string;
  onLoadComplete?: (numberOfPages: number) => void;
  onPageChanged?: (page: number, numberOfPages: number) => void;
  onError?: (error: any) => void;
}

export interface PDFViewerRef {
  setPage: (page: number) => void;
  getCurrentPage: () => number;
  getTotalPages: () => number;
}

const PDFViewer = forwardRef<PDFViewerRef, PDFViewerProps>(
  ({ uri, onLoadComplete, onPageChanged, onError }, ref) => {
    const currentPageRef = useRef(1);
    const totalPagesRef = useRef(0);

    useImperativeHandle(ref, () => ({
      setPage: (page: number) => {
        if (page >= 1 && page <= totalPagesRef.current) {
          currentPageRef.current = page;
          onPageChanged?.(page, totalPagesRef.current);
        }
      },
      getCurrentPage: () => currentPageRef.current,
      getTotalPages: () => totalPagesRef.current,
    }));

    const handleLoadComplete = (numberOfPages: number) => {
      totalPagesRef.current = numberOfPages;
      onLoadComplete?.(numberOfPages);
    };

    const handlePageChanged = (page: number, numberOfPages: number) => {
      currentPageRef.current = page;
      onPageChanged?.(page, numberOfPages);
    };

    const handleError = (error: any) => {
      console.error('PDF Error:', error);
      Alert.alert('PDF 오류', 'PDF 파일을 불러올 수 없습니다.');
      onError?.(error);
    };

    // 웹에서는 iframe을 사용하여 PDF 표시
    if (Platform.OS === 'web') {
      return (
        <View style={styles.container}>
          <iframe
            src={uri}
            style={styles.webPdf}
            title="PDF Viewer"
            onLoad={() => handleLoadComplete(1)}
            onError={handleError}
          />
        </View>
      );
    }

    // 네이티브에서는 대체 UI 표시
    return (
      <View style={styles.container}>
        <View style={styles.fallbackContainer}>
          <Text style={styles.fallbackText}>PDF 뷰어</Text>
          <Text style={styles.fallbackSubtext}>PDF 파일: {uri}</Text>
          <Text style={styles.fallbackNote}>
            네이티브 앱에서는 PDF 뷰어를 사용할 수 있습니다.
          </Text>
        </View>
      </View>
    );
  }
);

PDFViewer.displayName = 'PDFViewer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  webPdf: {
    width: '100%',
    height: '100%',
    border: 'none',
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  fallbackText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  fallbackSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginBottom: 10,
  },
  fallbackNote: {
    fontSize: 12,
    color: '#ccc',
    textAlign: 'center',
  },
});

export default PDFViewer;