# Vercel 배포 가이드

## 🚨 현재 상황

React Native 앱을 Vercel에 배포하기 위해 시도했지만, 다음과 같은 문제들이 발생했습니다:

### 주요 문제점

1. **네이티브 모듈 호환성**
   - `@expo/vector-icons` - 웹에서 폰트 파일 로딩 문제
   - `expo-linear-gradient` - JSX 파싱 오류
   - `react-native-reanimated` - TypeScript 타입 오류
   - `react-native-safe-area-context` - 네이티브 컴포넌트 오류

2. **빌드 설정 문제**
   - Next.js와 React Native Web 간의 호환성 문제
   - Babel 설정 충돌
   - Webpack 로더 설정 복잡성

3. **의존성 충돌**
   - React Native 0.76.9와 Next.js 14 간의 버전 충돌
   - Expo SDK 52와 웹 빌드 도구 간의 호환성 문제

## 💡 해결 방안

### 옵션 1: Expo Web 빌드 사용 (권장)

```bash
# 1. Expo CLI로 웹 빌드
npx expo export --platform web

# 2. Vercel에서 정적 사이트로 배포
# vercel.json 설정:
{
  "version": 2,
  "builds": [
    {
      "src": "dist/**/*",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### 옵션 2: React Native Web 전용 빌드

```bash
# 1. 웹 전용 의존성 설치
npm install react-native-web react-dom

# 2. 웹 전용 엔트리 포인트 생성
# web/index.js
import { AppRegistry } from 'react-native';
import App from '../App';

AppRegistry.registerComponent('SmartNursingFeedback', () => App);
AppRegistry.runApplication('SmartNursingFeedback', {
  rootTag: document.getElementById('root'),
});
```

### 옵션 3: 모바일 앱만 배포

```bash
# 1. Expo EAS Build 사용
npx eas build --platform all

# 2. App Store / Google Play Store 배포
# 3. 웹 버전은 별도로 간단한 랜딩 페이지만 제작
```

## 🔧 현재 프로젝트 상태

### ✅ 완료된 작업
- GitHub 저장소 업로드 완료
- 기본 프로젝트 구조 설정
- Vercel 설정 파일 생성
- 웹 호환성 스타일 추가

### ⚠️ 해결 필요한 문제
- 네이티브 모듈 웹 호환성
- 빌드 설정 최적화
- 의존성 충돌 해결

## 📋 권장 사항

### 즉시 실행 가능한 방법

1. **Expo Web 빌드 사용**
   ```bash
   # static rendering 비활성화
   EXPO_NO_STATIC_RENDERING=1 npx expo export --platform web
   ```

2. **Vercel 정적 배포**
   - `dist` 폴더를 Vercel에 업로드
   - SPA 라우팅 설정

3. **모바일 우선 전략**
   - 모바일 앱은 Expo EAS Build로 배포
   - 웹은 간단한 랜딩 페이지만 제작

### 장기적 해결책

1. **웹 전용 컴포넌트 분리**
   - 네이티브 모듈을 웹 호환 컴포넌트로 대체
   - 플랫폼별 조건부 렌더링

2. **모노레포 구조**
   - 웹 앱과 모바일 앱을 별도 패키지로 분리
   - 공통 컴포넌트는 별도 패키지로 관리

## 🚀 다음 단계

1. **Expo Web 빌드 재시도**
   ```bash
   # static rendering 완전 비활성화
   npx expo export --platform web --dev
   ```

2. **Vercel 배포 테스트**
   - 로컬에서 빌드 성공 확인
   - Vercel CLI로 배포 테스트

3. **대안 검토**
   - Netlify, GitHub Pages 등 다른 플랫폼 고려
   - 모바일 앱 우선 배포 전략 수립

## 📞 지원 필요사항

현재 상황에서 Vercel 배포를 완료하려면:

1. **Expo Web 빌드 문제 해결** - static rendering 오류 수정
2. **네이티브 모듈 대체** - 웹 호환 라이브러리로 교체
3. **빌드 파이프라인 최적화** - 웹 전용 빌드 설정

가장 빠른 해결책은 **Expo Web 빌드**를 사용하여 정적 사이트로 배포하는 것입니다.
