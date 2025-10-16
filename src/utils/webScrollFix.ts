import { Platform } from 'react-native';

/**
 * 웹에서 스크롤 문제를 해결하기 위한 유틸리티 함수들
 */

export const enableWebScroll = () => {
  if (Platform.OS === 'web' && typeof document !== 'undefined') {
    // 전역 스크롤 활성화
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    
    // 모든 스크롤 컨테이너에 스크롤 활성화
    const scrollContainers = document.querySelectorAll('[data-scroll="true"]');
    scrollContainers.forEach((container: any) => {
      container.style.overflow = 'auto';
      container.style.overflowX = 'auto';
      container.style.overflowY = 'auto';
    });
  }
};

export const addScrollListeners = (element: any) => {
  if (Platform.OS === 'web' && element && element._component) {
    const domElement = element._component;
    
    // 마우스 휠 이벤트
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (domElement.scrollWidth > domElement.clientWidth) {
        domElement.scrollLeft += e.deltaY;
      }
    };
    
    // 터치 이벤트
    let startX = 0;
    let scrollLeft = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      scrollLeft = domElement.scrollLeft;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const x = e.touches[0].clientX;
      const walk = (startX - x) * 2;
      domElement.scrollLeft = scrollLeft + walk;
    };
    
    // 이벤트 리스너 추가
    domElement.addEventListener('wheel', handleWheel, { passive: false });
    domElement.addEventListener('touchstart', handleTouchStart, { passive: true });
    domElement.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    // 정리 함수 반환
    return () => {
      domElement.removeEventListener('wheel', handleWheel);
      domElement.removeEventListener('touchstart', handleTouchStart);
      domElement.removeEventListener('touchmove', handleTouchMove);
    };
  }
  return () => {};
};

export const forceScrollable = (element: any) => {
  if (Platform.OS === 'web' && element && element._component) {
    const domElement = element._component;
    
    // 강제로 스크롤 가능하도록 설정
    domElement.style.overflow = 'auto';
    domElement.style.overflowX = 'auto';
    domElement.style.overflowY = 'hidden';
    domElement.style.whiteSpace = 'nowrap';
    domElement.style.display = 'block';
    domElement.style.width = '100%';
    
    // 스크롤바 강제 표시
    domElement.style.scrollbarWidth = 'thin';
    domElement.style.scrollbarColor = 'rgba(0,0,0,0.3) transparent';
    
    // 터치 액션 설정
    domElement.style.touchAction = 'pan-x';
    
    return true;
  }
  return false;
};
