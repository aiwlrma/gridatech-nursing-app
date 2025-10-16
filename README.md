# Smart Nursing Feedback App

React Native 기반 간호학생 피드백 및 학습 관리 앱

## 📱 프로젝트 개요

간호학생들의 실습 피드백과 학습 관리를 위한 종합적인 모바일 애플리케이션입니다. VR 시나리오, 학습 가이드, 환자 안전 관리 등 다양한 기능을 제공합니다.

## ✨ 주요 기능

### 🎯 핵심 기능
- **IV 삽입 술기 가이드** - 단계별 학습 가이드와 체크리스트
- **VR 시나리오 목록** - 난이도별 VR 시뮬레이션 학습
- **환자 안전 관리** - 안전 프로토콜 및 사고 예방 시스템
- **학습 가이드** - 인슐린 투약, 응급처치 등 전문 가이드
- **피드백 시스템** - 실시간 평가 및 개선 제안

### 📊 학습 관리
- **진행률 추적** - 학습 진도 및 성취도 모니터링
- **점수 시스템** - 카테고리별 성과 평가
- **추천 시스템** - 개인화된 학습 콘텐츠 추천
- **문서 관리** - 학습 자료 및 가이드 문서

### 🎮 인터랙티브 요소
- **퀴즈 시스템** - 학습 내용 확인을 위한 퀴즈
- **체크리스트** - 실습 전후 확인사항
- **진행률 바** - 시각적 학습 진행 상황
- **상태 관리** - 완료/진행중/잠김/신규 상태 표시

## 🛠 기술 스택

- **Frontend**: React Native, TypeScript
- **Navigation**: React Navigation
- **Styling**: StyleSheet, 커스텀 디자인 시스템
- **Platform**: iOS, Android, Web
- **State Management**: React Hooks
- **Icons**: 커스텀 아이콘 시스템

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── cards/          # 카드 컴포넌트들
│   ├── charts/         # 차트 및 그래프
│   ├── common/         # 공통 UI 컴포넌트
│   ├── emergency/      # 응급처치 관련
│   ├── guide/          # 학습 가이드
│   ├── icons/          # 아이콘 시스템
│   ├── learning/       # 학습 관련
│   ├── medication/     # 투약 관리
│   ├── safety/         # 환자 안전
│   └── vr/            # VR 시나리오
├── navigation/         # 네비게이션 설정
├── screens/           # 화면 컴포넌트
│   ├── auth/          # 인증 화면
│   ├── student/       # 학생 화면
│   └── settings/      # 설정 화면
├── theme/             # 디자인 시스템
└── utils/             # 유틸리티 함수
```

## 🚀 설치 및 실행

### 필수 요구사항
- Node.js (v16 이상)
- React Native CLI
- iOS: Xcode (macOS)
- Android: Android Studio

### 설치
```bash
# 저장소 클론
git clone https://github.com/aiwlrma/gridatech-nursing-app.git
cd gridatech-nursing-app

# 의존성 설치
npm install

# iOS 의존성 설치 (macOS만)
cd ios && pod install && cd ..
```

### 실행
```bash
# 개발 서버 시작
npm start

# iOS 실행
npm run ios

# Android 실행
npm run android

# Web 실행
npm run web
```

## 📱 주요 화면

### 🏠 홈 화면
- 전체 성과 대시보드
- 최근 활동 및 추천
- 빠른 액세스 메뉴

### 📚 학습 화면
- VR 시나리오 목록
- 학습 가이드
- 동영상 강의
- 학습 자료

### 🩺 환자 안전
- 안전 점수 및 트렌드
- 프로토콜 준수 현황
- 사고 보고 교육
- 최근 실습 기록

### 💉 투약 관리
- 5R 원칙 체크리스트
- 투약 계산 도구
- 최근 실습 기록
- 알림 및 경고

## 🎨 디자인 시스템

### 색상 팔레트
- **Primary**: #1884FF (파란색)
- **Success**: #10B981 (녹색)
- **Warning**: #F59E0B (주황색)
- **Error**: #EF4444 (빨간색)
- **Background**: #F9FAFB (연한 회색)

### 타이포그래피
- **Font Family**: Pretendard
- **Weights**: Regular, Medium, SemiBold, Bold
- **Sizes**: 12px ~ 64px

### 컴포넌트
- **Border Radius**: 8px, 12px, 16px
- **Shadows**: 카드 및 버튼 그림자
- **Spacing**: 4px 단위 시스템

## 📋 주요 컴포넌트

### VRScenarioCard
```typescript
interface VRScenarioCardProps {
  icon: string;
  title: string;
  difficulty: '기초' | '중급' | '고급';
  duration: string;
  score?: number;
  status: 'completed' | 'in-progress' | 'locked' | 'new';
  progress?: number;
  lockReason?: string;
}
```

### GuideSection
```typescript
interface GuideSectionProps {
  title: string;
  content: string;
  imageUrl?: string;
}
```

## 🔧 개발 가이드

### 새로운 화면 추가
1. `src/screens/` 디렉토리에 화면 컴포넌트 생성
2. `src/navigation/RootNavigator.tsx`에 라우트 추가
3. 타입 정의를 `RootStackParamList`에 추가

### 새로운 컴포넌트 추가
1. `src/components/` 하위 적절한 디렉토리에 생성
2. `index.ts` 파일에 export 추가
3. TypeScript 인터페이스 정의

### 스타일링 가이드
- `src/theme/` 디렉토리의 색상, 타이포그래피, 스페이싱 사용
- 일관된 디자인을 위해 기존 컴포넌트 참조
- 반응형 디자인 고려

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 👥 기여자

- **aiwlrma** (ozsn7824@knou.ac.kr) - 프로젝트 개발 및 관리

## 📞 연락처

프로젝트에 대한 문의사항이나 제안사항이 있으시면 이슈를 생성해 주세요.

---

**Smart Nursing Feedback App** - 간호학생을 위한 스마트한 학습 도구