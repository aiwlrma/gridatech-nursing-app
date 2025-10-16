# Premium Design System with #1884FF

## Overview

The Smart Nursing Feedback app has been enhanced with a comprehensive premium design system featuring #1884FF as the primary brand color. This system provides sophisticated visual refinements including subtle gradients, glass morphism effects, smooth animations, and harmonized color palettes.

## 🎨 Color System

### Primary Brand Colors
```typescript
const brandColors = {
  primary: {
    base: '#1884FF',        // Main brand blue
    light: '#4DA3FF',       // Lighter variant (hover, active states)
    dark: '#0066E6',        // Darker variant (pressed state)
  },
}
```

### Background Layers
```typescript
const backgrounds = {
  primary: '#FAFBFD',      // Main background (cool tint)
  secondary: '#F5F8FC',    // Secondary background
  tertiary: '#FFFFFF',     // Card background
  blue: '#F0F7FF',         // Light blue accent background
}
```

### Text Colors
```typescript
const textColors = {
  primary: '#1A1F2E',      // Main text (slightly blue-tinted black)
  secondary: '#4E5D78',    // Secondary text
  tertiary: '#8B95A8',     // Tertiary text
  disabled: '#C9CDD8',     // Disabled text
  blue: '#1884FF',         // Brand blue for emphasis
}
```

### Status Colors
```typescript
const statusColors = {
  success: {
    base: '#10B981',
    light: '#34D399',
    background: 'rgba(16, 185, 129, 0.08)',
    gradient: ['#10B981', '#059669'],
  },
  warning: {
    base: '#F59E0B',
    light: '#FBBF24',
    background: 'rgba(245, 158, 11, 0.08)',
    gradient: ['#F59E0B', '#D97706'],
  },
  error: {
    base: '#EF4444',
    light: '#F87171',
    background: 'rgba(239, 68, 68, 0.08)',
    gradient: ['#EF4444', '#DC2626'],
  },
  info: {
    base: '#1884FF',
    light: '#4DA3FF',
    background: 'rgba(24, 132, 255, 0.08)',
    gradient: ['#1884FF', '#4DA3FF'],
  },
}
```

## 🎨 Gradient System

### Screen Backgrounds
```typescript
const screenGradients = {
  primary: {
    colors: ['#FAFBFD', '#F5F8FC', '#F0F7FF'],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
  secondary: {
    colors: ['#F8FBFF', '#F0F7FF'],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
}
```

### Card Gradients
```typescript
const cardGradients = {
  hero: {
    colors: ['#FFFFFF', '#F8FBFF', '#FFFFFF'],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
    locations: [0, 0.5, 1],
  },
  glass: {
    colors: [
      'rgba(255, 255, 255, 0.9)',
      'rgba(240, 247, 255, 0.8)',
    ],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
}
```

### Button Gradients
```typescript
const buttonGradients = {
  primary: {
    colors: ['#1884FF', '#0066E6'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  secondary: {
    colors: ['#F0F7FF', '#E6F2FF'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
}
```

## 🎨 Shadow System

### Blue-Tinted Shadows
```typescript
const shadowLevels = {
  card: {
    shadowColor: '#1884FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  floating: {
    shadowColor: '#1884FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  hero: {
    shadowColor: '#1884FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 10,
  },
  button: {
    shadowColor: '#1884FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 12,
    elevation: 4,
  },
}
```

## 📦 Premium Components

### 1. Enhanced ScoreCard
```typescript
<ScoreCard
  score={85}
  label="Overall Performance"
  trend={+5}
  comparison="전체 평균 대비 우수"
  animated={true}
/>
```

**Features:**
- Animated score counting
- Blue gradient background
- Trend indicators with color coding
- Blue glow effects
- Accent bar at bottom

### 2. Premium Button
```typescript
<PremiumButton
  label="Primary Action"
  variant="primary" // 'primary' | 'secondary' | 'ghost'
  onPress={() => {}}
  size="medium" // 'small' | 'medium' | 'large'
  fullWidth={false}
/>
```

**Features:**
- Gradient backgrounds
- Smooth press animations
- Blue-tinted shadows
- Multiple variants and sizes

### 3. Premium List Item
```typescript
<PremiumListItem
  title="IM Injection Practice"
  subtitle="근육주사 실습 완료"
  score={88}
  icon={<Icon name="injection" size={24} color="#1884FF" />}
  status="success" // 'normal' | 'warning' | 'success' | 'error'
  onPress={() => {}}
/>
```

**Features:**
- Blue gradient icon backgrounds
- Status-based color coding
- Smooth press animations
- Blue-tinted shadows

### 4. Progress Bar
```typescript
<ProgressBar
  value={75}
  max={100}
  label="Learning Progress"
  showPercentage={true}
  animated={true}
  color="#1884FF" // Optional custom color
/>
```

**Features:**
- Animated progress filling
- Gradient progress bars
- Customizable colors
- Label and percentage display

### 5. Glass Card
```typescript
<GlassCard
  padding={20}
  borderRadius={20}
  style={customStyles}
>
  <Text>Glass morphism content</Text>
</GlassCard>
```

**Features:**
- Blue-tinted glass effect
- Subtle transparency
- Blue-tinted borders
- Floating shadow

### 6. Screen Gradient
```typescript
<ScreenGradient variant="primary">
  <YourContent />
</ScreenGradient>
```

**Features:**
- Subtle blue-tinted background gradients
- Multiple variants
- Full-screen coverage

## 🎯 Usage Guidelines

### Primary Actions
- **Buttons**: Use #1884FF → #0066E6 gradient
- **Links**: Use #1884FF
- **Active states**: Use #4DA3FF

### Backgrounds
- **Hero cards**: White → #F8FBFF → White gradient
- **Icon containers**: #E6F2FF → #D6EBFF gradient
- **Screen**: #FAFBFD → #F0F7FF gradient

### Shadows
- **Hero elements**: #1884FF with 0.12 opacity
- **Cards**: #1884FF with 0.06 opacity
- **Buttons**: #1884FF with 0.16 opacity

### Borders
- **Subtle**: rgba(24, 132, 255, 0.08)
- **Medium**: rgba(24, 132, 255, 0.12)
- **Strong**: rgba(24, 132, 255, 0.16)

## 🚀 Implementation

### 1. Import Components
```typescript
import { colors, shadowLevels, gradientPresets } from '../theme';
import ScreenGradient from '../components/common/ScreenGradient';
import ScoreCard from '../components/cards/ScoreCard';
import PremiumButton from '../components/common/PremiumButton';
import PremiumListItem from '../components/common/PremiumListItem';
import ProgressBar from '../components/common/ProgressBar';
import GlassCard from '../components/common/GlassCard';
```

### 2. Use Screen Gradient
```typescript
const MyScreen = () => {
  return (
    <ScreenGradient variant="primary">
      <View style={styles.container}>
        {/* Your content */}
      </View>
    </ScreenGradient>
  );
};
```

### 3. Apply Premium Styling
```typescript
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundTertiary,
    borderColor: colors.borderLight,
    ...shadowLevels.card,
  },
  text: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
});
```

## 🎨 Design Principles

1. **Consistency**: All components use the same #1884FF color system
2. **Depth**: Blue-tinted shadows create visual hierarchy
3. **Smoothness**: All interactions have smooth animations
4. **Accessibility**: High contrast ratios maintained
5. **Premium Feel**: Glass effects and gradients add sophistication

## 📱 Platform Support

- ✅ iOS: Full support with native performance
- ✅ Android: Full support with elevation shadows
- ✅ Web: Full support with CSS shadows

## 🔧 Customization

All components accept custom styles and can be easily customized:

```typescript
<PremiumButton
  label="Custom Button"
  style={{ marginTop: 20 }}
  onPress={() => {}}
/>
```

## 📊 Performance

- Optimized animations using React Native Reanimated
- Efficient gradient rendering
- Minimal re-renders with proper memoization
- Smooth 60fps animations on all platforms

---

**Result**: A cohesive, premium design system with #1884FF brand identity that enhances the user experience while maintaining excellent performance and accessibility.
