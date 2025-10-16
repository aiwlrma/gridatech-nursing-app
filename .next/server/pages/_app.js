"use strict";(()=>{var r={};r.id=888,r.ids=[888],r.modules={8071:(r,o,e)=>{e.r(o),e.d(o,{default:()=>i}),e(6689),e(2086);var t=e(997);let a=`
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
`;function i({Component:r,pageProps:o}){return(0,t.jsxs)(t.Fragment,{children:[t.jsx("style",{dangerouslySetInnerHTML:{__html:a}}),t.jsx("div",{className:"rn-web-container",children:t.jsx(r,Object.assign({},o))})]})}},2086:(r,o,e)=>{e.d(o,{FL:()=>t,Ok:()=>n,VS:()=>i,gY:()=>a}),e(6454);let t={horizontalScroll:{overflowX:"auto",overflowY:"hidden",WebkitOverflowScrolling:"touch",touchAction:"pan-x",cursor:"grab",userSelect:"none",scrollbarWidth:"thin",scrollbarColor:"rgba(0,0,0,0.3) transparent",whiteSpace:"nowrap",display:"block",pointerEvents:"auto"},verticalScroll:{overflowY:"auto",overflowX:"hidden",WebkitOverflowScrolling:"touch",touchAction:"pan-y"},bothScroll:{overflow:"auto",WebkitOverflowScrolling:"touch",touchAction:"pan-x pan-y"}},a={onTouchStart:void 0,onTouchMove:void 0,onTouchEnd:void 0},i=`
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
`,n={horizontal:"horizontal-scroll",vertical:"vertical-scroll",both:"scroll-container"}},6689:r=>{r.exports=require("react")},6454:r=>{r.exports=require("react-native-web/dist/exports/Platform")},997:r=>{r.exports=require("react/jsx-runtime")}};var o=require("../webpack-runtime.js");o.C(r);var e=o(o.s=8071);module.exports=e})();