import { Platform } from 'react-native';

/**
 * 웹 전용 스타일 유틸리티
 * React Native Web에서 스크롤 및 터치 이벤트 개선을 위한 스타일
 */

export const webScrollStyles = {
  // 수평 스크롤 (TabBar 등)
  horizontalScroll: Platform.OS === 'web' ? {
    overflowX: 'auto' as const,
    overflowY: 'hidden' as const,
    WebkitOverflowScrolling: 'touch' as const,
    touchAction: 'pan-x' as const,
    cursor: 'grab' as const,
    userSelect: 'none' as const,
    // 스크롤바 항상 표시
    scrollbarWidth: 'thin' as const,
    scrollbarColor: 'rgba(0,0,0,0.3) transparent' as const,
    // 강제로 스크롤 가능하도록
    whiteSpace: 'nowrap' as const,
    display: 'block' as const,
    // 마우스 이벤트 허용
    pointerEvents: 'auto' as const,
  } : {},

  // 수직 스크롤 (일반적인 ScrollView)
  verticalScroll: Platform.OS === 'web' ? {
    overflowY: 'auto' as const,
    overflowX: 'hidden' as const,
    WebkitOverflowScrolling: 'touch' as const,
    touchAction: 'pan-y' as const,
  } : {},

  // 양방향 스크롤
  bothScroll: Platform.OS === 'web' ? {
    overflow: 'auto' as const,
    WebkitOverflowScrolling: 'touch' as const,
    touchAction: 'pan-x pan-y' as const,
  } : {},
};

export const webTouchProps = Platform.OS === 'web' ? {
  // 웹에서 터치 이벤트를 비활성화하여 네이티브 스크롤 동작 사용
  onTouchStart: undefined,
  onTouchMove: undefined,
  onTouchEnd: undefined,
} : {};

/**
 * 웹에서 스크롤 성능을 개선하기 위한 전역 CSS 스타일
 */
export const globalWebStyles = Platform.OS === 'web' ? `
  /* 스크롤 성능 최적화 */
  * {
    -webkit-overflow-scrolling: touch;
  }
  
  /* 스크롤바 스타일링 - 항상 표시 */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.5);
  }
  
  ::-webkit-scrollbar-thumb:active {
    background: rgba(0, 0, 0, 0.7);
  }
  
  /* 수평 스크롤바 특별 스타일 */
  .horizontal-scroll::-webkit-scrollbar {
    height: 10px;
  }
  
  .horizontal-scroll::-webkit-scrollbar-thumb {
    background: rgba(24, 132, 255, 0.6);
    border-radius: 5px;
  }
  
  .horizontal-scroll::-webkit-scrollbar-thumb:hover {
    background: rgba(24, 132, 255, 0.8);
  }
  
  /* 터치 액션 최적화 */
  .scroll-container {
    touch-action: pan-x pan-y;
  }
  
  .horizontal-scroll {
    touch-action: pan-x;
    cursor: grab;
  }
  
  .horizontal-scroll:active {
    cursor: grabbing;
  }
  
  .vertical-scroll {
    touch-action: pan-y;
  }
  
  /* 드래그 방지 */
  .no-select {
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }
  
  /* iPhone 프레임 스타일 */
  .iphone-frame {
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
    border-radius: 40px;
    background: linear-gradient(145deg, #2c2c2e, #1c1c1e);
    padding: 8px;
  }
  
  .iphone-screen {
    border-radius: 32px;
    overflow: hidden;
    background: #000;
  }
  
  .iphone-notch {
    background: #000;
    border-radius: 0 0 20px 20px;
  }
  
  .iphone-home-indicator {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2.5px;
  }
  
  /* 반응형 iPhone 프레임 */
  @media (max-width: 768px) {
    .iphone-frame {
      width: 100vw !important;
      height: 100vh !important;
      border-radius: 0;
      padding: 0;
    }
    
    .iphone-screen {
      border-radius: 0;
    }
  }
` : '';

/**
 * 웹에서 스크롤 컨테이너에 적용할 클래스명
 */
export const webScrollClasses = {
  horizontal: 'horizontal-scroll',
  vertical: 'vertical-scroll',
  both: 'scroll-container',
};
