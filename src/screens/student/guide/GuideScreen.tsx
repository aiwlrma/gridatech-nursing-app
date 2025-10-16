import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';
import { colors, typography, spacing } from '../../../theme';
import ScreenGradient from '../../../components/common/ScreenGradient';
// BottomTabBar removed - now handled by BottomTabNavigator
import { SearchBar, BookmarkCard, CategoryCard, RecentItem } from '../../../components/guide';

interface GuideScreenProps {
  navigation: any;
}

interface CategoryItem {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
}

interface BookmarkItem {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
}

interface RecentItem {
  id: string;
  icon: string;
  title: string;
  time: string;
}

const GuideScreen: React.FC<GuideScreenProps> = ({ navigation }) => {
  console.log('GuideScreen rendered');
  const [searchQuery, setSearchQuery] = useState('');
  
  // 마우스 드래그 스크롤을 위한 ref와 상태
  const bookmarkScrollRef = useRef<ScrollView>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStartX, setScrollStartX] = useState(0);

  const categories: CategoryItem[] = [
    { id: '1', icon: '💊', title: '투약 5R 원칙', subtitle: 'Right Patient, Medication...' },
    { id: '2', icon: '💉', title: '주사 부위 선정', subtitle: 'IM, SC, IV 주사 가이드' },
    { id: '3', icon: '🚨', title: '응급처치', subtitle: 'CPR, 하임리히, 쇼크' },
    { id: '4', icon: '💊', title: '약물 정보', subtitle: '항생제, 진통제, 인슐린' },
    { id: '5', icon: '🩺', title: '간호 술기', subtitle: 'IM Injection, IV 삽입' },
    { id: '6', icon: '💬', title: '의사소통', subtitle: '치료적 의사소통 스크립트' },
  ];

  const bookmarks: BookmarkItem[] = [
    { id: 'b1', icon: '💊', title: '투약 5R 원칙', subtitle: '자주 확인함' },
    { id: 'b2', icon: '🚨', title: 'CPR 프로토콜', subtitle: '최근 업데이트' },
    { id: 'b3', icon: '💉', title: 'IM 주사 부위', subtitle: '실습 전 필수' },
  ];

  const recentViews: RecentItem[] = [
    { id: 'r1', icon: '💊', title: '인슐린 투약 가이드', time: '2시간 전' },
    { id: 'r2', icon: '🩺', title: 'IV 삽입 술기', time: '어제' },
    { id: 'r3', icon: '💬', title: '환자 설명 스크립트', time: '3일 전' },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // TODO: Implement search functionality
  };

  const handleCategoryPress = (category: CategoryItem) => {
    if (category.id === '5') {
      // Navigate to IV insertion guide detail
      navigation.navigate('IVGuideDetail', {
        guideId: 'iv-insertion-guide',
        title: 'IV 삽입 술기',
      });
    } else {
      // TODO: Navigate to other category details
      console.log('Category pressed:', category.title);
    }
  };

  const handleBookmarkPress = (bookmark: BookmarkItem) => {
    // TODO: Navigate to bookmark content
    console.log('Bookmark pressed:', bookmark.title);
  };

  const handleRecentPress = (recent: RecentItem) => {
    if (recent.id === 'r1') {
      // Navigate to insulin guide detail
      navigation.navigate('GuideDetail', {
        guideId: 'insulin-guide',
        title: recent.title,
      });
    } else if (recent.id === 'r2') {
      // Navigate to IV insertion guide detail
      navigation.navigate('IVGuideDetail', {
        guideId: 'iv-insertion-guide',
        title: recent.title,
      });
    } else if (recent.id === 'r3') {
      // Navigate to explanation script
      navigation.navigate('ExplanationScript', {
        scriptId: 'patient-explanation',
        title: recent.title,
      });
    } else {
      // TODO: Navigate to other recent content
      console.log('Recent pressed:', recent.title);
    }
  };

  // Bottom tab navigation removed - now handled by BottomTabNavigator

  // 마우스 드래그 스크롤 핸들러들
  const handleMouseDown = useCallback((event: any) => {
    if (Platform.OS === 'web') {
      setIsDragging(true);
      setStartX(event.clientX);
      setScrollStartX(event.currentTarget.scrollLeft);
      event.preventDefault();
    }
  }, []);

  const handleMouseMove = useCallback((event: any) => {
    if (Platform.OS === 'web' && isDragging) {
      const deltaX = startX - event.clientX;
      const newScrollX = scrollStartX + deltaX;
      event.currentTarget.scrollLeft = newScrollX;
      event.preventDefault();
    }
  }, [isDragging, startX, scrollStartX]);

  const handleMouseUp = useCallback(() => {
    if (Platform.OS === 'web') {
      setIsDragging(false);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (Platform.OS === 'web') {
      setIsDragging(false);
    }
  }, []);

  const handleWheel = useCallback((event: any) => {
    if (Platform.OS === 'web') {
      event.preventDefault();
      const scrollAmount = event.deltaY > 0 ? 100 : -100;
      event.currentTarget.scrollLeft += scrollAmount;
    }
  }, []);

  return (
    <ScreenGradient variant="primary">
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>가이드</Text>
          </View>

          {/* Search Bar */}
          <SearchBar onSearch={handleSearch} />

          {/* Bookmarks Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>⭐ 자주 보는 자료</Text>
            <ScrollView 
              ref={bookmarkScrollRef}
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.bookmarkScroll}
              style={[styles.bookmarkScrollView, isDragging && styles.dragging]}
              {...(Platform.OS === 'web' && {
                onMouseDown: handleMouseDown,
                onMouseMove: handleMouseMove,
                onMouseUp: handleMouseUp,
                onMouseLeave: handleMouseLeave,
                onWheel: handleWheel,
              })}
            >
              {bookmarks.map((item) => (
                <BookmarkCard 
                  key={item.id} 
                  {...item} 
                  onPress={() => handleBookmarkPress(item)} 
                />
              ))}
            </ScrollView>
          </View>

          {/* Categories Grid */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📌 카테고리</Text>
            <View style={styles.grid}>
              {categories.map((item) => (
                <CategoryCard 
                  key={item.id} 
                  {...item} 
                  onPress={() => handleCategoryPress(item)} 
                />
              ))}
            </View>
          </View>

          {/* Recent Views */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📚 최근 본 자료</Text>
            {recentViews.map((item) => (
              <RecentItem 
                key={item.id} 
                {...item} 
                onPress={() => handleRecentPress(item)} 
              />
            ))}
          </View>

          {/* Bottom spacing for tab bar - reduced for BottomTabNavigator */}
          <View style={styles.bottomSpacing} />
        </ScrollView>

        {/* Bottom Tab Bar removed - now handled by BottomTabNavigator */}
      </SafeAreaView>
    </ScreenGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    paddingTop: 50, // Status bar height
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text.primary,
    fontFamily: 'Pretendard-Bold',
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.lg,
    fontFamily: 'Pretendard-Bold',
  },
  bookmarkScroll: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  bookmarkScrollView: {
    ...(Platform.OS === 'web' && {
      cursor: 'grab',
      userSelect: 'none',
    }),
  },
  dragging: {
    ...(Platform.OS === 'web' && {
      cursor: 'grabbing',
    }),
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.lg,
    justifyContent: 'space-between',
  },
  bottomSpacing: {
    height: 60, // Reduced for BottomTabNavigator
  },
});

export default GuideScreen;
