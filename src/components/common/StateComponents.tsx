import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import AppIcon from './AppIcon';

// Loading State Component
interface LoadingStateProps {
  message?: string;
  size?: 'small' | 'large';
}

export const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = '로딩 중...', 
  size = 'large' 
}) => (
  <View style={styles.centerContainer}>
    <ActivityIndicator size={size} color="#3B82F6" />
    <Text style={styles.loadingText}>{message}</Text>
  </View>
);

// Skeleton Loader Component
export const SkeletonLoader: React.FC = () => (
  <View style={styles.skeletonContainer}>
    <View style={styles.skeletonCard}>
      <View style={styles.skeletonLine} />
      <View style={[styles.skeletonLine, { width: '70%' }]} />
      <View style={[styles.skeletonLine, { width: '50%' }]} />
    </View>
    <View style={styles.skeletonCard}>
      <View style={styles.skeletonLine} />
      <View style={[styles.skeletonLine, { width: '80%' }]} />
      <View style={[styles.skeletonLine, { width: '60%' }]} />
    </View>
  </View>
);

// Empty State Component
interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: {
    label: string;
    onPress: () => void;
  };
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  icon = 'empty',
  title, 
  description, 
  action 
}) => (
  <View style={styles.centerContainer}>
    <AppIcon name={icon} size={64} color="#9CA3AF" />
    <Text style={styles.emptyTitle}>{title}</Text>
    {description && (
      <Text style={styles.emptyDescription}>{description}</Text>
    )}
    {action && (
      <TouchableOpacity style={styles.actionButton} onPress={action.onPress}>
        <Text style={styles.actionButtonText}>{action.label}</Text>
      </TouchableOpacity>
    )}
  </View>
);

// Error State Component
interface ErrorStateProps {
  error?: Error | string;
  onRetry?: () => void;
  title?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ 
  error, 
  onRetry, 
  title = '문제가 발생했습니다' 
}) => {
  const errorMessage = typeof error === 'string' ? error : error?.message || '알 수 없는 오류가 발생했습니다';
  
  return (
    <View style={styles.centerContainer}>
      <AppIcon name="error" size={64} color="#EF4444" />
      <Text style={styles.errorTitle}>{title}</Text>
      <Text style={styles.errorMessage}>{errorMessage}</Text>
      {onRetry && (
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <AppIcon name="refresh" size={20} color="#FFFFFF" />
          <Text style={styles.retryButtonText}>다시 시도</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// Toast Notification Component
interface ToastProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  visible: boolean;
  onDismiss?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ 
  type, 
  message, 
  visible, 
  onDismiss 
}) => {
  if (!visible) return null;

  const typeConfig = {
    success: { icon: 'success', color: '#10B981', bgColor: '#F0FDF4' },
    error: { icon: 'error', color: '#EF4444', bgColor: '#FEF2F2' },
    warning: { icon: 'warning', color: '#F59E0B', bgColor: '#FFFBEB' },
    info: { icon: 'info', color: '#3B82F6', bgColor: '#EFF6FF' },
  };

  const config = typeConfig[type];

  return (
    <View style={[styles.toast, { backgroundColor: config.bgColor }]}>
      <AppIcon name={config.icon} size={20} color={config.color} />
      <Text style={[styles.toastText, { color: config.color }]}>{message}</Text>
      {onDismiss && (
        <TouchableOpacity onPress={onDismiss} style={styles.toastClose}>
          <AppIcon name="close" size={16} color={config.color} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  skeletonContainer: {
    padding: 16,
  },
  skeletonCard: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  skeletonLine: {
    height: 16,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 8,
    width: '100%',
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  actionButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EF4444',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    margin: 16,
    gap: 12,
  },
  toastText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  toastClose: {
    padding: 4,
  },
});
