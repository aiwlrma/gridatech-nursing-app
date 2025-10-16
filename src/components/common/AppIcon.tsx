import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { HomeIcon, ClipboardIcon, BookIcon, SettingsIcon } from '../icons/navigation';
import { InfoIcon } from '../icons/common/InfoIcon';

interface AppIconProps {
  name: string;
  size?: number;
  color?: string;
  style?: any;
}

const AppIcon: React.FC<AppIconProps> = ({ 
  name, 
  size = 24, 
  color, 
  style 
}) => {
  // Navigation icons with SVG components
  if (name === 'home') {
    try {
      return <HomeIcon size={size} color={color || '#6B7280'} style={style} />;
    } catch (error) {
      return <Text style={[styles.icon, { fontSize: size * 0.8, color: color || '#6B7280' }]}>🏠</Text>;
    }
  }
  if (name === 'clipboard') {
    try {
      return <ClipboardIcon size={size} color={color || '#6B7280'} style={style} />;
    } catch (error) {
      return <Text style={[styles.icon, { fontSize: size * 0.8, color: color || '#6B7280' }]}>📋</Text>;
    }
  }
  if (name === 'book') {
    try {
      return <BookIcon size={size} color={color || '#6B7280'} style={style} />;
    } catch (error) {
      return <Text style={[styles.icon, { fontSize: size * 0.8, color: color || '#6B7280' }]}>📚</Text>;
    }
  }
  if (name === 'settings') {
    try {
      return <SettingsIcon size={size} color={color || '#6B7280'} style={style} />;
    } catch (error) {
      return <Text style={[styles.icon, { fontSize: size * 0.8, color: color || '#6B7280' }]}>⚙️</Text>;
    }
  }
  if (name === 'info') {
    try {
      return <InfoIcon size={size} color={color || '#6B7280'} style={style} />;
    } catch (error) {
      return <Text style={[styles.icon, { fontSize: size * 0.8, color: color || '#6B7280' }]}>i</Text>;
    }
  }

  const iconMap: Record<string, { symbol: string; defaultColor: string }> = {
    // Status icons (minimal symbols)
    success: { symbol: '✓', defaultColor: '#10B981' },
    warning: { symbol: '!', defaultColor: '#F59E0B' },
    error: { symbol: '✗', defaultColor: '#EF4444' },
    info: { symbol: 'i', defaultColor: '#3B82F6' },
    
    // Medical icons (text-based)
    pill: { symbol: '약', defaultColor: '#3B82F6' },
    syringe: { symbol: '주', defaultColor: '#EF4444' },
    shield: { symbol: '안', defaultColor: '#10B981' },
    heart: { symbol: '심', defaultColor: '#EF4444' },
    cross: { symbol: '+', defaultColor: '#3B82F6' },
    
    // Action icons (minimal symbols)
    play: { symbol: '▶', defaultColor: '#3B82F6' },
    pause: { symbol: '⏸', defaultColor: '#6B7280' },
    stop: { symbol: '⏹', defaultColor: '#EF4444' },
    refresh: { symbol: '↻', defaultColor: '#3B82F6' },
    download: { symbol: '↓', defaultColor: '#3B82F6' },
    upload: { symbol: '↑', defaultColor: '#3B82F6' },
    
    // UI icons (minimal symbols)
    chevronRight: { symbol: '›', defaultColor: '#6B7280' },
    chevronLeft: { symbol: '‹', defaultColor: '#6B7280' },
    chevronDown: { symbol: '▼', defaultColor: '#6B7280' },
    chevronUp: { symbol: '▲', defaultColor: '#6B7280' },
    more: { symbol: '⋯', defaultColor: '#6B7280' },
    close: { symbol: '✕', defaultColor: '#6B7280' },
    
    // Chart icons (minimal symbols)
    chart: { symbol: '📊', defaultColor: '#3B82F6' },
    trendUp: { symbol: '↗', defaultColor: '#10B981' },
    trendDown: { symbol: '↘', defaultColor: '#EF4444' },
    
    // Time icons (minimal symbols)
    clock: { symbol: '⏰', defaultColor: '#6B7280' },
    calendar: { symbol: '📅', defaultColor: '#6B7280' },
    
    // Communication icons (minimal symbols)
    notification: { symbol: '!', defaultColor: '#F59E0B' },
    message: { symbol: '💬', defaultColor: '#3B82F6' },
    
    // Learning icons (minimal symbols)
    star: { symbol: '★', defaultColor: '#F59E0B' },
    trophy: { symbol: '★', defaultColor: '#F59E0B' },
    target: { symbol: '●', defaultColor: '#3B82F6' },
    
    // Empty state icons (minimal symbols)
    empty: { symbol: '○', defaultColor: '#9CA3AF' },
    search: { symbol: '🔍', defaultColor: '#6B7280' },
  };

  const icon = iconMap[name] || { symbol: '•', defaultColor: '#6B7280' };
  const iconColor = color || icon.defaultColor;

  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      <Text style={[styles.icon, { fontSize: size * 0.8, color: iconColor }]}>
        {icon.symbol}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    textAlign: 'center',
    lineHeight: undefined, // Reset line height for emoji
  },
});

export default AppIcon;
