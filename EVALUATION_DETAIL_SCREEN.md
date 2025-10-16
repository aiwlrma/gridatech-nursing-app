# 평가 세부 내용 상세 페이지 (EvaluationDetailScreen)

## 📋 개요
평가 항목별 상세 분석을 보여주는 페이지입니다. 각 평가 항목의 체크리스트, 점수, 피드백을 포함하여 종합적인 평가 결과를 제공합니다.

## 🎯 주요 기능

### ✅ 구현된 기능
- **종합 점수 표시**: 큰 숫자로 총점과 날짜 표시
- **체크리스트**: 카테고리별 평가 항목과 체크 상태
- **점수 시스템**: 획득/감점 표시 (+20, -15)
- **피드백**: 실패한 항목에 대한 개선 제안
- **AI 피드백**: 종합적인 개선 제안 카드
- **재시도 버튼**: 다시 도전하기 기능
- **네비게이션**: 뒤로가기 헤더

## 🏗️ 컴포넌트 구조

### EvaluationDetailScreen
메인 화면 컴포넌트로 다음 요소들을 포함합니다:
- Header (뒤로가기 버튼 + 제목)
- 종합 점수 카드
- 카테고리별 체크리스트 섹션
- AI 피드백 카드
- 재시도 버튼

### ChecklistItem
개별 체크리스트 항목을 표시하는 컴포넌트:
```typescript
interface ChecklistItemProps {
  text: string;        // 항목 텍스트
  checked: boolean;    // 체크 상태
  points: number;      // 점수
  feedback?: string;   // 피드백 (선택사항)
}
```

### Section
체크리스트를 카테고리별로 그룹화하는 컴포넌트:
```typescript
interface SectionProps {
  title: string;       // 섹션 제목
  children: ReactNode; // 체크리스트 항목들
}
```

## 🎨 디자인 시스템

### 색상
- **Primary Blue**: `#1884FF` (점수, 버튼)
- **Success Green**: `#10B981` (성공한 항목)
- **Error Red**: `#EF4444` (실패한 항목)
- **Warning Orange**: `#F59E0B` (피드백)
- **Border Gray**: `#E5E7EB` (테두리)
- **Background**: `#F9FAFB` (배경)

### 스타일 특징
- **Border Radius**: 12px (카드), 16px (메인 카드)
- **Border Width**: 1.5px
- **Padding**: 16px (일반), 20px (메인 카드)
- **Typography**: Pretendard 폰트 사용

## 🚀 사용 방법

### 1. 네비게이션 설정
RootNavigator에 이미 추가되어 있습니다:
```typescript
<Stack.Screen name="EvaluationDetail" component={EvaluationDetailScreen} />
```

### 2. 화면 이동
```typescript
import { useNavigation } from '@react-navigation/native';

const navigation = useNavigation();
navigation.navigate('EvaluationDetail', { evaluationId: 'your-evaluation-id' });
```

### 3. 버튼 컴포넌트 사용
```typescript
import { EvaluationDetailButton } from '../components/common/EvaluationDetailButton';

<EvaluationDetailButton 
  evaluationId="injection-001" 
  style={{ marginTop: 16 }}
/>
```

## 📱 화면 구성

### 1. Header
- 뒤로가기 버튼 (←)
- "평가 세부 내용" 제목

### 2. 종합 점수 카드
- 큰 숫자로 총점 표시 (87점)
- 평가 날짜 (2025.10.15)
- 파란색 강조

### 3. 체크리스트 섹션
각 카테고리별로 그룹화:
- **주사 부위 선정**
  - 환자 식별 확인 ✓ +20
  - 부위 소독 완료 ✓ +20
  - 적절한 각도 유지 ✗ -15 (피드백: "45도 각도 권장")

- **약물 투약**
  - 5R 확인 ✓ +25
  - 용량 정확 ✓ +20

- **안전 관리**
  - 손 소독 ✓ +15
  - 소독 시간 준수 ✗ -10 (피드백: "30초 이상 소독하세요")

### 4. AI 피드백 카드
- 주황색 배경의 개선 제안 카드
- 구체적인 개선 방안 제시

### 5. 재시도 버튼
- 파란색 배경의 "다시 도전하기" 버튼

## 🔧 커스터마이징

### 데이터 구조 변경
현재는 하드코딩된 데이터를 사용하고 있습니다. 실제 사용 시에는 다음과 같이 수정할 수 있습니다:

```typescript
// API에서 받아온 평가 데이터
const evaluationData = {
  id: evaluationId,
  totalScore: 87,
  date: '2025.10.15',
  categories: [
    {
      title: '주사 부위 선정',
      items: [
        { text: '환자 식별 확인', checked: true, points: 20 },
        { text: '부위 소독 완료', checked: true, points: 20 },
        { text: '적절한 각도 유지', checked: false, points: 15, feedback: '45도 각도 권장' }
      ]
    }
  ],
  aiFeedback: '• 주사 각도를 45도로 유지하면...'
};
```

### 스타일 커스터마이징
`styles` 객체에서 색상, 크기, 간격 등을 조정할 수 있습니다.

## 📂 파일 위치
- **메인 화면**: `src/screens/student/EvaluationDetailScreen.tsx`
- **버튼 컴포넌트**: `src/components/common/EvaluationDetailButton.tsx`
- **예시 컴포넌트**: `src/components/examples/EvaluationDetailExample.tsx`
- **네비게이션**: `src/navigation/RootNavigator.tsx`

## 🎯 다음 단계
1. **API 연동**: 실제 평가 데이터를 서버에서 가져오기
2. **재시도 기능**: 버튼 클릭 시 실제 재평가 화면으로 이동
3. **애니메이션**: 체크리스트 항목에 애니메이션 효과 추가
4. **공유 기능**: 평가 결과 공유 기능 추가
5. **히스토리**: 이전 평가 결과 히스토리 보기

## ✅ 완료된 요구사항
- ✅ Header with back button
- ✅ Score card with big number
- ✅ Checklist items (checked/unchecked)
- ✅ Points display (+/-)
- ✅ Feedback hints for failed items
- ✅ AI improvement suggestions
- ✅ Retry button
- ✅ #E5E7EB borders, 16px radius
- ✅ 네비게이션 설정 완료
- ✅ 컴포넌트 분리 및 재사용성
