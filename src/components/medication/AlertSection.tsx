import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import AppIcon from '../common/AppIcon';
import { EmptyState, LoadingState, ErrorState } from '../common/StateComponents';

// TypeScript interfaces
interface AlertItem {
  id: string;
  name: string;
  nameEn: string;
  score: number;
  priority: 'high' | 'medium' | 'low';
  lastPractice: string;
  category: string;
  actions: Array<{
    label: string;
    type: 'primary' | 'secondary';
    onPress: () => void;
  }>;
}

interface AlertSectionProps {
  items: AlertItem[];
  loading?: boolean;
  error?: Error | string;
  onRetry?: () => void;
}

// Helper functions - 간소화됨

export const AlertSection: React.FC<AlertSectionProps> = ({ 
  items = [], 
  loading = false, 
  error, 
  onRetry 
}) => {
  // Handle loading state
  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.titleRow}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>주의가 필요한 약물</Text>
                <Text style={styles.subtitle}>개선이 필요한 항목들을 확인하세요</Text>
              </View>
            </View>
          </View>
        </View>
        <LoadingState message="알림 데이터를 불러오는 중..." />
      </View>
    );
  }

  // Handle error state
  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.titleRow}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>주의가 필요한 약물</Text>
                <Text style={styles.subtitle}>개선이 필요한 항목들을 확인하세요</Text>
              </View>
            </View>
          </View>
        </View>
        <ErrorState error={error} onRetry={onRetry} />
      </View>
    );
  }

  // Handle empty state
  if (!items || items.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.titleRow}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>모든 약물이 안전합니다</Text>
                <Text style={styles.subtitle}>개선이 필요한 항목이 없습니다</Text>
              </View>
            </View>
          </View>
        </View>
        <EmptyState
          icon="success"
          title="훌륭합니다!"
          description="현재 모든 약물 투약이 안전한 수준입니다. 계속해서 좋은 실습을 유지해주세요."
        />
      </View>
    );
  }
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const itemAnimations = useRef(
    items.map(() => new Animated.Value(0))
  ).current;
  const buttonAnimations = useRef(
    items.map((item) => 
      item.actions.map(() => new Animated.Value(1))
    )
  ).current;

  useEffect(() => {
    // Container fade in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Items fade in sequentially
    const itemAnimationsSequence = itemAnimations.map((anim, index) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 250,
        delay: index * 50,
        useNativeDriver: true,
      })
    );

    Animated.stagger(50, itemAnimationsSequence).start();
  }, []);

  const handleButtonPress = (onPress: () => void, buttonRef: React.RefObject<Animated.Value>) => {
    // Button press feedback with scale animation
    if (buttonRef.current) {
      Animated.sequence([
        Animated.timing(buttonRef.current, {
          toValue: 0.98,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(buttonRef.current, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
    
    onPress();
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {/* Enhanced Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.titleRow}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>주의가 필요한 약물</Text>
              <Text style={styles.subtitle}>개선이 필요한 항목들을 확인하세요</Text>
            </View>
          </View>
          <View style={styles.headerActions}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{items.length}건</Text>
            </View>
            <TouchableOpacity style={styles.moreButton}>
              <AppIcon name="more" size={16} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Alert Items */}
      {items.map((item, index) => {
        const isLowScore = item.score < 80;
        
        return (
          <Animated.View
            key={item.id}
            style={[
              styles.alertItem,
              { opacity: itemAnimations[index] }
            ]}
          >
            {/* Content */}
            <View style={styles.itemContent}>
              {/* Header Row */}
              <View style={styles.itemHeader}>
                <View style={styles.itemTitleRow}>
                  {/* 단순한 점 */}
                  <View style={[styles.priorityDot, { 
                    backgroundColor: isLowScore ? '#EF4444' : '#F59E0B' 
                  }]} />
                  <Text style={styles.itemName}>{item.name}</Text>
                  {isLowScore && <Text style={styles.warningIcon}>!</Text>}
                </View>
                
                {/* 점수 */}
                <Text style={[styles.score, { 
                  color: isLowScore ? '#EF4444' : '#F59E0B' 
                }]}>
                  {item.score}점
                </Text>
              </View>

              {/* Progress Bar */}
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill,
                      { 
                        width: `${item.score}%`,
                        backgroundColor: isLowScore ? '#EF4444' : '#F59E0B'
                      }
                    ]} 
                  />
                </View>
                <Text style={styles.progressText}>{item.score}%</Text>
              </View>

              {/* Meta Information */}
              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <AppIcon name="clock" size={14} color="#6B7280" />
                  <Text style={styles.metaText}>{item.lastPractice}</Text>
                </View>
              </View>

              {/* Action Buttons */}
              <View style={styles.actions}>
                {item.actions.map((action, actionIndex) => (
                  <Animated.View
                    key={actionIndex}
                    style={{
                      flex: 1,
                      transform: [{ scale: buttonAnimations[index][actionIndex] }]
                    }}
                  >
                    <TouchableOpacity
                      style={[
                        styles.actionButton,
                        actionIndex === 0
                          ? styles.primaryButton
                          : styles.secondaryButton
                      ]}
                      onPress={() => handleButtonPress(action.onPress, { current: buttonAnimations[index][actionIndex] })}
                      activeOpacity={0.8}
                    >
                      <Text
                        style={[
                          styles.buttonText,
                          actionIndex === 0
                            ? styles.primaryButtonText
                            : styles.secondaryButtonText
                        ]}
                      >
                        {actionIndex === 0 ? action.label : '가이드 →'}
                      </Text>
                    </TouchableOpacity>
                  </Animated.View>
                ))}
              </View>
            </View>
          </Animated.View>
        );
      })}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    padding: 16,
    paddingBottom: 12,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    color: '#374151',
    fontSize: 12,
    fontWeight: '600',
  },
  moreButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertItem: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  highPriority: {
    // 좌측 컬러 바 제거
  },
  mediumPriority: {
    // 좌측 컬러 바 제거
  },
  priorityIndicator: {
    // 제거됨
  },
  itemContent: {
    padding: 16,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  priorityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  itemTitleContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  itemNameEn: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 1,
  },
  warningIcon: {
    fontSize: 16,
    marginLeft: 4,
  },
  scoreContainer: {
    alignItems: 'center',
  },
  score: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  scoreLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#F3F4F6',
    borderRadius: 2,
    marginRight: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    minWidth: 28,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 13,
    color: '#6B7280',
  },
  categoryBadge: {
    // 배지 최소화 - 제거
  },
  categoryText: {
    // 배지 최소화 - 제거
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 6,
  },
  primaryButton: {
    backgroundColor: '#F3F4F6',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  primaryButtonText: {
    color: '#374151',
  },
  secondaryButtonText: {
    color: '#6B7280',
  },
});

export default AlertSection;