import React from 'react';
import { StatusBar, View, Platform } from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import { globalWebStyles } from './src/styles/webStyles';
import { enableWebScroll } from './src/utils/webScrollFix';
import AdvancediPhoneFrame from './src/components/common/AdvancediPhoneFrame';

export default function App() {
  // 웹에서 전역 스타일 및 스크롤 활성화
  React.useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      // 전역 스타일 적용
      if (globalWebStyles) {
        const styleElement = document.createElement('style');
        styleElement.textContent = globalWebStyles;
        document.head.appendChild(styleElement);
        
        // 전역 스크롤 활성화
        enableWebScroll();
        
        return () => {
          if (document.head.contains(styleElement)) {
            document.head.removeChild(styleElement);
          }
        };
      }
    }
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      {Platform.OS === 'web' ? (
        <AdvancediPhoneFrame>
          <RootNavigator />
        </AdvancediPhoneFrame>
      ) : (
        <RootNavigator />
      )}
    </>
  );
}
