# 웹에서 iOS 목업으로 앱 실행하기

## 🚀 실행 방법

### 1. 웹 개발 서버 시작
```bash
npm run web
# 또는
expo start --web
```

### 2. 브라우저에서 확인
- 자동으로 `http://localhost:19006`에서 실행됩니다
- iPhone 프레임이 적용된 상태로 앱이 표시됩니다

## 📱 iPhone 목업 기능

### 기본 기능
- **iPhone 14 프레임**: 실제 iPhone과 유사한 디자인
- **노치 영역**: 상단 노치와 홈 인디케이터 포함
- **그림자 효과**: 실제 기기와 같은 입체감
- **반응형 디자인**: 화면 크기에 따라 자동 조정

### 고급 기능 (AdvancediPhoneFrame)
- **디바이스 선택**: iPhone 14, iPhone SE, iPhone 12 지원
- **풀스크린 모드**: 전체 화면으로 앱 테스트
- **실시간 전환**: 디바이스 타입 실시간 변경
- **컨트롤 패널**: 상단에 디바이스 선택 및 풀스크린 버튼

## 🎨 커스터마이징

### iPhone 프레임 스타일 수정
`src/styles/webStyles.ts`에서 다음 클래스들을 수정할 수 있습니다:
- `.iphone-frame`: 프레임 전체 스타일
- `.iphone-screen`: 화면 영역 스타일
- `.iphone-notch`: 노치 영역 스타일
- `.iphone-home-indicator`: 홈 인디케이터 스타일

### 디바이스 스펙 추가
`src/components/common/AdvancediPhoneFrame.tsx`의 `deviceSpecs` 객체에 새로운 디바이스 추가:

```typescript
const deviceSpecs = {
  iPhone14: { width: 390, height: 844, notchHeight: 47 },
  iPhoneSE: { width: 375, height: 667, notchHeight: 0 },
  iPhone12: { width: 390, height: 844, notchHeight: 47 },
  // 새로운 디바이스 추가
  iPhone15: { width: 393, height: 852, notchHeight: 47 },
};
```

## 🔧 문제 해결

### 스크롤 문제
- 웹에서 스크롤이 제대로 작동하지 않는 경우 `src/utils/webScrollFix.ts`의 설정을 확인하세요
- 터치 이벤트가 제대로 작동하지 않는 경우 `webTouchProps`를 확인하세요

### 스타일 문제
- iPhone 프레임이 제대로 표시되지 않는 경우 `globalWebStyles`가 제대로 적용되었는지 확인하세요
- 반응형 디자인이 작동하지 않는 경우 CSS 미디어 쿼리를 확인하세요

### TypeScript 에러
- DOM 관련 타입 에러가 발생하는 경우 `tsconfig.json`에 `"dom"` 라이브러리가 포함되어 있는지 확인하세요

## 📦 배포 옵션

### 1. 정적 호스팅
```bash
# 빌드
expo export --platform web

# dist 폴더를 Netlify, Vercel, GitHub Pages 등에 업로드
```

### 2. Vercel 배포
```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel --prod
```

### 3. Netlify 배포
```bash
# Netlify CLI 설치
npm i -g netlify-cli

# 빌드 및 배포
expo export --platform web
netlify deploy --prod --dir dist
```

## 🎯 사용 팁

1. **개발 중**: `AdvancediPhoneFrame`을 사용하여 다양한 디바이스에서 테스트
2. **프레젠테이션**: 풀스크린 모드로 실제 앱처럼 보이게 함
3. **반응형 테스트**: 브라우저 개발자 도구로 다양한 화면 크기 테스트
4. **성능 최적화**: 웹 전용 스타일과 네이티브 스타일 분리로 성능 향상

## 🔗 관련 파일

- `src/components/common/iPhoneFrame.tsx`: 기본 iPhone 프레임
- `src/components/common/AdvancediPhoneFrame.tsx`: 고급 iPhone 프레임
- `src/styles/webStyles.ts`: 웹 전용 스타일
- `src/utils/webScrollFix.ts`: 웹 스크롤 최적화
- `App.tsx`: 메인 앱 컴포넌트
