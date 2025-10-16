# AlertSection Component

A redesigned unified alert card component for displaying medication-related alerts with improved visual hierarchy and consistent interactions.

## Features

### 🎨 Visual Design
- **Unified Container**: Single card with light amber background instead of multiple separate cards
- **Priority Indicators**: Color-coded left borders and dots (red for high, yellow for medium, blue for low)
- **Clean Layout**: Removed heavy borders, added subtle shadows for depth
- **Category Badges**: Contextual badges for medication categories (고위험 약물, 5 Rights, etc.)

### 🎭 Animations
- **Fade-in Sequence**: Items appear with 50ms stagger for smooth loading
- **Pulse Animation**: High-priority items have subtle pulsing dots
- **Button Feedback**: Scale animation (0.98) on button press for tactile feedback

### 📱 Responsive Layout
- **Consistent Actions**: All items use the same 2-button layout (primary + secondary)
- **Flexible Buttons**: Buttons adapt to content with proper spacing
- **Score Prominence**: Larger, color-coded scores for quick assessment

## Usage

```typescript
import { AlertSection } from './AlertSection';

const alertItems = [
  {
    id: 'insulin',
    name: '인슐린',
    nameEn: 'Insulin',
    score: 78,
    priority: 'high',
    lastPractice: '3일 전',
    category: '고위험 약물',
    actions: [
      {
        label: '용량 계산 퀴즈',
        type: 'primary',
        onPress: () => console.log('Quiz pressed'),
      },
      {
        label: '학습 가이드',
        type: 'secondary',
        onPress: () => console.log('Guide pressed'),
      },
    ],
  },
];

<AlertSection items={alertItems} />
```

## Props

### AlertSectionProps
- `items: AlertItem[]` - Array of alert items to display

### AlertItem
- `id: string` - Unique identifier
- `name: string` - Korean name
- `nameEn: string` - English name
- `score: number` - Score (0-100)
- `priority: 'high' | 'medium' | 'low'` - Priority level
- `lastPractice: string` - Last practice time text
- `category: string` - Category for badge display
- `actions: Action[]` - Array of action buttons

### Action
- `label: string` - Button text
- `type: 'primary' | 'secondary'` - Button style
- `onPress: () => void` - Press handler

## Color System

### Priority Colors
- **High Priority** (Red): `#EF4444` - Scores 75-79%
- **Medium Priority** (Yellow): `#F59E0B` - Scores 80-84%
- **Low Priority** (Blue): `#3B82F6` - Scores 85-89%
- **Good** (Green): `#10B981` - Scores 90%+

### Score Colors
- **Excellent** (90+): Green `#10B981`
- **Good** (80-89): Yellow `#F59E0B`
- **Needs Attention** (<80): Red `#EF4444`

### Category Badges
- **고위험 약물**: Red background `#FEE2E2`, Red text `#991B1B`
- **5 Rights**: Yellow background `#FEF3C7`, Yellow text `#92400E`
- **Default**: Gray background `#F3F4F6`, Gray text `#374151`

## Design Improvements

### Before vs After
- ❌ **Before**: Two separate cards with inconsistent layouts
- ✅ **After**: Single unified container with nested priority cards

- ❌ **Before**: Heavy borders taking up space
- ✅ **After**: Clean left accent borders with subtle shadows

- ❌ **Before**: Inconsistent button layouts (1 vs 2 buttons)
- ✅ **After**: Consistent 2-button layout for all items

- ❌ **Before**: Unclear color coding
- ✅ **After**: Clear priority system with score-based colors

- ❌ **Before**: Last practice timing not prominent
- ✅ **After**: Prominent timing with category context

## Accessibility

- **Color Contrast**: All text meets WCAG AA standards
- **Touch Targets**: Buttons are minimum 44px height
- **Screen Readers**: Proper semantic structure with meaningful labels
- **Focus Management**: Clear visual feedback for interactions

## Performance

- **Native Driver**: All animations use native driver for 60fps performance
- **Optimized Renders**: Minimal re-renders with proper key props
- **Memory Efficient**: Animation refs are properly managed and cleaned up
