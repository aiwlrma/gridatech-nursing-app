import React from 'react';
import { AppProps } from 'next/app';

// 전역 스타일
const globalStyles = `
  * {
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background-color: #F9FAFB;
    overflow-x: hidden;
  }
  
  #__next {
    width: 100%;
    min-height: 100vh;
  }
  
  /* React Native Web 스타일 */
  .rn-web-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
  }
  
  /* 스크롤 최적화 */
  * {
    -webkit-overflow-scrolling: touch;
  }
  
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
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.5);
  }
`;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      <div className="rn-web-container">
        <Component {...pageProps} />
      </div>
    </>
  );
}
