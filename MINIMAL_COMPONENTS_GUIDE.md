# Minimal Components - Usage Guide

## Quick Reference for Using the New Minimal Icon System

---

## Import Statement

```typescript
import {
  StatusDot,
  Badge,
  StatusIcon,
  PriorityIndicator,
  Achievement,
  TabIcon,
} from '../components/common/MinimalIcons';
```

---

## Component Examples

### 1. StatusDot
**Use for:** Status indicators, list items, priority markers

```typescript
// Example: Show medication status
<View style={{ flexDirection: 'row', alignItems: 'center' }}>
  <StatusDot status="success" />
  <Text>환자 확인 완료</Text>
</View>

<View style={{ flexDirection: 'row', alignItems: 'center' }}>
  <StatusDot status="warning" />
  <Text>인슐린 투여</Text>
</View>

<View style={{ flexDirection: 'row', alignItems: 'center' }}>
  <StatusDot status="error" />
  <Text>낙상 예방</Text>
</View>
```

**Props:**
- `status`: `'success' | 'warning' | 'error'`
- `size?: number` (default: 6)

---

### 2. Badge
**Use for:** Achievements, certifications, categories

```typescript
// Example: Display achievement badges
<View style={{ flexDirection: 'row', gap: 16 }}>
  <Badge type="hygiene" />
  <Badge type="idCheck" />
  <Badge type="infection" />
</View>

// Small version (without label)
<Badge type="medication" size="small" />
```

**Props:**
- `type`: `'hygiene' | 'idCheck' | 'infection' | 'medication' | 'safety'`
- `size?: 'small' | 'medium'` (default: 'medium')

**Badge Types:**
- `hygiene`: H - 손 위생 (Green)
- `idCheck`: I - 환자 확인 (Blue)
- `infection`: C - 감염 관리 (Yellow)
- `medication`: M - 약물 관리 (Red)
- `safety`: S - 안전 관리 (Blue)

---

### 3. StatusIcon
**Use for:** Checkmarks, completion status, warnings

```typescript
// Example: Task completion list
{tasks.map(task => (
  <View style={styles.taskRow}>
    <StatusIcon status={task.completed ? 'done' : 'pending'} />
    <Text>{task.name}</Text>
  </View>
))}

// Warning indicator
<View style={styles.alertRow}>
  <StatusIcon status="warning" />
  <Text>주의가 필요합니다</Text>
</View>
```

**Props:**
- `status`: `'done' | 'pending' | 'warning'`
- `size?: number` (default: 16)

**Symbols:**
- `done`: ✓ (Green)
- `pending`: ○ (Gray)
- `warning`: ! (Yellow)

---

### 4. PriorityIndicator
**Use for:** Priority levels, urgency markers

```typescript
// Example: As a dot
<View style={styles.itemHeader}>
  <PriorityIndicator priority="high" style="dot" />
  <Text>인슐린 투여 연습</Text>
</View>

// Example: As a border
<View style={styles.card}>
  <PriorityIndicator priority="high" style="border" />
  {/* Card content */}
</View>

// Example: As text
<View style={styles.alert}>
  <PriorityIndicator priority="medium" style="text" />
  <Text>주의가 필요한 항목</Text>
</View>
```

**Props:**
- `priority`: `'high' | 'medium' | 'low'`
- `style?: 'dot' | 'border' | 'text'` (default: 'dot')

**Priority Colors:**
- `high`: Red (#EF4444)
- `medium`: Yellow (#F59E0B)
- `low`: Green (#10B981)

---

### 5. Achievement
**Use for:** Stats display, accomplishments, milestones

```typescript
// Example: Achievement row
<View style={styles.achievementRow}>
  <Achievement 
    value="3주" 
    label="손 위생" 
    sublabel="95%+ 유지"
  />
  <Achievement 
    value="100%" 
    label="환자 확인" 
    sublabel="달성"
  />
  <Achievement 
    value="32회" 
    label="무사고" 
    sublabel="실습"
  />
</View>
```

**Props:**
- `value: string` - Main display value
- `label: string` - Primary label
- `sublabel?: string` - Optional secondary label

**Styling:**
```typescript
achievementRow: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  padding: 20,
  backgroundColor: '#F9FAFB',
  borderRadius: 12,
}
```

---

### 6. TabIcon
**Use for:** Navigation tabs (minimal text-based)

```typescript
// Example: Custom tab navigation
{tabs.map((tab, index) => (
  <TabIcon 
    key={index}
    label={tab} 
    isActive={activeTab === index}
  />
))}
```

**Props:**
- `label: string` - Tab label text
- `isActive: boolean` - Active state

---

## Complete Example: Alert Card

```typescript
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StatusDot, PriorityIndicator } from '../components/common/MinimalIcons';
import { colors } from '../theme';

const AlertCard = ({ item }) => {
  return (
    <View style={[
      styles.card,
      item.priority === 'high' && styles.highPriority
    ]}>
      {/* Header with dot indicator */}
      <View style={styles.header}>
        <StatusDot status="error" />
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.warning}>!</Text>
      </View>

      {/* Score display */}
      <Text style={styles.score}>{item.score}점</Text>

      {/* Progress bar */}
      <View style={styles.progressBar}>
        <View style={[
          styles.progressFill,
          { width: `${item.score}%` }
        ]} />
      </View>

      {/* Action button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>연습하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: colors.statusError,
    borderWidth: 1,
    borderColor: colors.border,
  },
  highPriority: {
    borderLeftColor: colors.statusError,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    flex: 1,
  },
  warning: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.statusError,
  },
  score: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.statusError,
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.backgroundTertiary,
    borderRadius: 2,
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.statusError,
    borderRadius: 2,
  },
  button: {
    backgroundColor: colors.backgroundTertiary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
});

export default AlertCard;
```

---

## Complete Example: Protocol List

```typescript
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { StatusDot, StatusIcon } from '../components/common/MinimalIcons';
import { colors } from '../theme';

const ProtocolList = ({ protocols }) => {
  const getStatus = (score) => {
    if (score >= 90) return 'success';
    if (score >= 80) return 'warning';
    return 'error';
  };

  return (
    <FlatList
      data={protocols}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <View style={styles.left}>
            <StatusDot status={getStatus(item.score)} />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.nameEn}>{item.nameEn}</Text>
            </View>
          </View>
          <View style={styles.right}>
            <Text style={[
              styles.score,
              { color: colors[`status${getStatus(item.score).charAt(0).toUpperCase() + getStatus(item.score).slice(1)}`] }
            ]}>
              {item.score}%
            </Text>
            {item.score < 90 && (
              <StatusIcon status="warning" size={14} />
            )}
          </View>
        </View>
      )}
      keyExtractor={item => item.id}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  nameEn: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  score: {
    fontSize: 18,
    fontWeight: '700',
  },
});

export default ProtocolList;
```

---

## Best Practices

### 1. **Consistency**
- Always use the same component for the same purpose
- Don't mix different status indication methods

### 2. **Spacing**
- Use consistent spacing: 8px, 12px, 16px, 24px
- StatusDot has built-in 8px right margin

### 3. **Colors**
- Only use the 3 status colors: Green, Yellow, Red
- Use accent color sparingly

### 4. **Typography**
- Don't add extra decoration to labels
- Keep text clean and readable

### 5. **Hierarchy**
- Use size and weight to create hierarchy
- Don't rely on color alone

---

## Migration from Old System

### Before
```typescript
<Text>🛡️ 환자 확인</Text>
<Text>⚠️ 주의 필요</Text>
<Text>🥇 Champion</Text>
```

### After
```typescript
<View style={{ flexDirection: 'row' }}>
  <StatusDot status="success" />
  <Text>환자 확인</Text>
</View>

<View style={{ flexDirection: 'row' }}>
  <StatusIcon status="warning" />
  <Text>주의 필요</Text>
</View>

<Achievement value="1위" label="손 위생" sublabel="95%+ 유지" />
```

---

## Color Reference

```typescript
// Import from theme
import { colors } from '../theme';

// Status Colors
colors.statusSuccess  // #10B981 (Green)
colors.statusWarning  // #F59E0B (Yellow)
colors.statusError    // #EF4444 (Red)

// Text Colors
colors.textPrimary    // #1F2937
colors.textSecondary  // #6B7280
colors.textTertiary   // #9CA3AF

// Backgrounds
colors.background          // #FFFFFF
colors.backgroundSecondary // #F9FAFB
colors.backgroundTertiary  // #F3F4F6

// Borders
colors.border      // #E5E7EB
colors.borderLight // #F3F4F6
```
