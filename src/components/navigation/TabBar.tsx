import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { colors, typography, spacing, shadowLevels, gradientPresets } from '../../theme';
import { webScrollStyles, webTouchProps, webScrollClasses } from '../../styles/webStyles';
import { addScrollListeners, forceScrollable } from '../../utils/webScrollFix';

const { width } = Dimensions.get('window');

interface TabBarProps {
  tabs: string[];
  activeTab: number;
  onTabPress: (index: number) => void;
  progress?: { completed: number; total: number };
}

const TabBar: React.FC<TabBarProps> = ({ 
  tabs, 
  activeTab, 
  onTabPress, 
  progress 
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  
  // 마우스 드래그 스크롤을 위한 상태
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStartX, setScrollStartX] = useState(0);
  
  const progressPercentage = progress 
    ? Math.round((progress.completed / progress.total) * 100)
    : 0;

  const handleTabPress = (index: number) => {
    onTabPress(index);
    
    // Scroll to active tab
    if (scrollViewRef.current) {
      const tabWidth = 120; // Approximate tab width
      const scrollPosition = Math.max(0, (index * tabWidth) - (width / 2) + (tabWidth / 2));
      scrollViewRef.current.scrollTo({
        x: scrollPosition,
        animated: true,
      });
    }
  };

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

  // 웹에서 스크롤 활성화
  React.useEffect(() => {
    if (Platform.OS === 'web' && scrollViewRef.current) {
      // 스크롤 강제 활성화
      forceScrollable(scrollViewRef.current);
      
      // 스크롤 리스너 추가
      const cleanup = addScrollListeners(scrollViewRef.current);
      
      return cleanup;
    }
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={Platform.OS === 'web'}
        contentContainerStyle={styles.tabsContainer}
        style={[
          styles.scrollView,
          webScrollStyles.horizontalScroll,
          isDragging && styles.dragging
        ]}
        // 웹에서 CSS 클래스 추가
        {...(Platform.OS === 'web' && {
          className: `${webScrollClasses.horizontal} no-select`,
        })}
        // 웹에서 스크롤 데이터 속성 추가
        {...(Platform.OS === 'web' && {
          'data-scroll': 'true',
        })}
        // 마우스 드래그 스크롤 이벤트
        {...(Platform.OS === 'web' && {
          onMouseDown: handleMouseDown,
          onMouseMove: handleMouseMove,
          onMouseUp: handleMouseUp,
          onMouseLeave: handleMouseLeave,
          onWheel: handleWheel,
        })}
      >
        {tabs.map((tab, index) => {
          const isActive = activeTab === index;
          const pressed = useSharedValue(false);

          const animatedStyle = useAnimatedStyle(() => ({
            transform: [{ scale: withSpring(pressed.value ? 0.95 : 1) }],
          }));

          return (
            <TouchableOpacity
              key={index}
              onPressIn={() => pressed.value = true}
              onPressOut={() => pressed.value = false}
              onPress={() => handleTabPress(index)}
            >
              <Animated.View style={animatedStyle}>
                {isActive ? (
                  <LinearGradient
                    colors={gradientPresets.button.primary.colors}
                    start={gradientPresets.button.primary.start}
                    end={gradientPresets.button.primary.end}
                    style={[styles.tab, styles.activeTab, shadowLevels.tab]}
                  >
                    <Text style={styles.activeTabText}>
                      {tab}
                    </Text>
                  </LinearGradient>
                ) : (
                  <View style={styles.tab}>
                    <Text style={styles.tabText}>
                      {tab}
                    </Text>
                  </View>
                )}
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundTertiary,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  scrollView: {
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
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    // 웹에서 수평 스크롤을 위한 최소 너비 설정
    ...(Platform.OS === 'web' && {
      minWidth: '100%',
      flexWrap: 'nowrap',
    }),
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginRight: 8,
    alignItems: 'center',
    minWidth: 100,
  },
  activeTab: {
    // Gradient applied via LinearGradient component
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  activeTabText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 14,
  },
});

export default TabBar;
