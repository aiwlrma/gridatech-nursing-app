# SVG Icon System

A comprehensive, Toss-style SVG icon system for React Native with clean, professional icons that scale perfectly at any size.

## Features

- ✅ **Scalable SVG icons** - Perfect at any size
- ✅ **Toss design language** - Minimal, clean, professional
- ✅ **Cross-platform** - Works consistently on iOS and Android
- ✅ **Custom colors** - Full color customization support
- ✅ **Lightweight** - Optimized for performance
- ✅ **TypeScript** - Full type safety
- ✅ **Icon variants** - Pre-built TossIcon variants

## Quick Start

```typescript
import { Icon, TossIcon, TossIconVariants } from '../components/icons';

// Basic usage
<Icon name="check" size={24} color="#10B981" />

// With TossIcon wrapper (background)
<TossIcon 
  name="success" 
  size={20} 
  color="#10B981" 
  backgroundColor="#ECFDF5" 
  rounded={true} 
/>

// Using predefined variants
{TossIconVariants.success('check', 20)}
{TossIconVariants.warning('alert', 20)}
{TossIconVariants.error('close', 20)}
```

## Available Icons

### Common Icons
- `check` - Checkmark
- `close` - X/Close
- `arrowRight` - Right arrow
- `alert` - Alert triangle
- `info` - Information circle
- `search` - Search magnifying glass
- `bell` - Notification bell
- `more` - Three dots menu

### Medical Icons
- `pill` - Medication pill
- `syringe` - Injection syringe
- `stethoscope` - Medical stethoscope
- `bandage` - Medical bandage
- `firstAid` - First aid kit
- `heartRate` - Heart with pulse

### Navigation Icons
- `home` - Home house
- `clipboard` - Clipboard
- `book` - Book
- `settings` - Settings gear

### Status Icons
- `success` - Success checkmark
- `warning` - Warning triangle
- `error` - Error X
- `pending` - Clock/pending
- `shield` - Security shield

## Icon Sizes

```typescript
import { iconSizes } from '../components/icons/types';

// Predefined sizes
iconSizes.tiny    // 12px - Small indicators
iconSizes.small   // 16px - List items, inline text
iconSizes.medium  // 20px - Buttons, cards
iconSizes.large   // 24px - Headers, main actions
iconSizes.xlarge  // 32px - Feature highlights
iconSizes.huge    // 48px - Hero sections
```

## Icon Colors

```typescript
import { iconColors } from '../components/icons/types';

// Predefined colors
iconColors.primary      // #3182F6 - Primary blue
iconColors.secondary    // #8B95A1 - Secondary gray
iconColors.tertiary     // #C9CDD2 - Tertiary gray
iconColors.success      // #10B981 - Success green
iconColors.error        // #F04452 - Error red
iconColors.warning      // #F59E0B - Warning orange
iconColors.text         // #191F28 - Text black
iconColors.textSecondary // #6B7684 - Secondary text
iconColors.disabled     // #B0B8C1 - Disabled gray
```

## Usage Examples

### Basic Icon
```typescript
<Icon name="check" size={24} color="#10B981" />
```

### In a Button
```typescript
<TouchableOpacity style={styles.button}>
  <Icon name="arrowRight" size={16} color="#FFFFFF" />
  <Text style={styles.buttonText}>다음</Text>
</TouchableOpacity>
```

### In a List Item
```typescript
<View style={styles.listItem}>
  <Icon name="pill" size={20} color="#3182F6" />
  <Text style={styles.listText}>인슐린 투여</Text>
</View>
```

### Status Indicator
```typescript
{isComplete ? (
  <Icon name="check" size={16} color="#10B981" />
) : (
  <Icon name="pending" size={16} color="#8B95A1" />
)}
```

### With TossIcon Background
```typescript
<TossIcon 
  name="success" 
  size={20} 
  color="#10B981" 
  backgroundColor="#ECFDF5" 
  rounded={true} 
/>
```

### Using Predefined Variants
```typescript
// Success variant
{TossIconVariants.success('check', 20)}

// Warning variant
{TossIconVariants.warning('alert', 20)}

// Error variant
{TossIconVariants.error('close', 20)}

// Info variant
{TossIconVariants.info('info', 20)}

// Neutral variant
{TossIconVariants.neutral('more', 20)}

// Square variant
{TossIconVariants.square('settings', 20)}
```

### Bottom Tab Navigation
```typescript
const TabItem = ({ icon, label, active }) => {
  return (
    <View style={styles.tabItem}>
      <Icon 
        name={icon} 
        size={20} 
        color={active ? '#3182F6' : '#8B95A1'} 
      />
      <Text style={[styles.tabLabel, { color: active ? '#3182F6' : '#8B95A1' }]}>
        {label}
      </Text>
    </View>
  );
};
```

### Alert Section with Icons
```typescript
const AlertSection = () => {
  return (
    <View style={styles.alertSection}>
      <View style={styles.alertHeader}>
        <TossIconVariants.warning('alert', 20) />
        <Text style={styles.alertTitle}>주의가 필요해요</Text>
      </View>
      
      <View style={styles.alertItem}>
        <Icon name="pill" size={16} color="#3182F6" />
        <Text style={styles.alertText}>인슐린 투여</Text>
        <Text style={styles.alertSubtext}>마지막 실습 3일 전</Text>
        <Text style={styles.alertScore}>78점</Text>
      </View>
    </View>
  );
};
```

## Migration from Emojis

### Before (Emojis)
```typescript
<Text style={styles.icon}>🔔</Text>
<Text style={styles.icon}>→</Text>
<Text style={styles.icon}>⚠️</Text>
<Text style={styles.icon}>✓</Text>
```

### After (SVG Icons)
```typescript
<Icon name="bell" size={20} color="#191F28" />
<Icon name="arrowRight" size={18} color="#C9CDD2" />
<Icon name="alert" size={20} color="#F04452" />
<Icon name="check" size={16} color="#10B981" />
```

## Performance Tips

1. **Use consistent sizes** - Stick to predefined sizes for better performance
2. **Cache icons** - Icons are automatically optimized by React Native SVG
3. **Avoid frequent color changes** - Use predefined colors when possible
4. **Use TossIcon variants** - Pre-built variants are optimized

## Adding New Icons

1. Create the SVG icon component in the appropriate folder
2. Add it to the `Icons` registry in `index.tsx`
3. Export it from the main index file
4. Update the `IconName` type

```typescript
// 1. Create icon component
export const NewIcon: React.FC<IconProps> = ({ size = 24, color = '#191F28' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* SVG content */}
    </Svg>
  );
};

// 2. Add to registry
export const Icons = {
  // ... existing icons
  newIcon: NewIcon,
} as const;

// 3. Export
export { NewIcon };
```

## Best Practices

1. **Consistent sizing** - Use predefined sizes from `iconSizes`
2. **Semantic colors** - Use predefined colors from `iconColors`
3. **Accessibility** - Ensure sufficient color contrast
4. **Performance** - Use `TossIcon` variants for common patterns
5. **Type safety** - Always use the `IconName` type for icon names