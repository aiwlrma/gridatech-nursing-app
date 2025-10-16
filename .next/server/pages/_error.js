(()=>{var e={};e.id=820,e.ids=[820,888,660],e.modules={9880:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return d}});let n=r(167),o=r(997),i=n._(r(6689)),a=n._(r(9903)),l={400:"Bad Request",404:"This page could not be found",405:"Method Not Allowed",500:"Internal Server Error"};function s(e){let{res:t,err:r}=e;return{statusCode:t&&t.statusCode?t.statusCode:r?r.statusCode:404}}let c={error:{fontFamily:'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',height:"100vh",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},desc:{lineHeight:"48px"},h1:{display:"inline-block",margin:"0 20px 0 0",paddingRight:23,fontSize:24,fontWeight:500,verticalAlign:"top"},h2:{fontSize:14,fontWeight:400,lineHeight:"28px"},wrap:{display:"inline-block"}};class d extends i.default.Component{render(){let{statusCode:e,withDarkMode:t=!0}=this.props,r=this.props.title||l[e]||"An unexpected error has occurred";return(0,o.jsxs)("div",{style:c.error,children:[(0,o.jsx)(a.default,{children:(0,o.jsx)("title",{children:e?e+": "+r:"Application error: a client-side exception has occurred"})}),(0,o.jsxs)("div",{style:c.desc,children:[(0,o.jsx)("style",{dangerouslySetInnerHTML:{__html:"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}"+(t?"@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}":"")}}),e?(0,o.jsx)("h1",{className:"next-error-h1",style:c.h1,children:e}):null,(0,o.jsx)("div",{style:c.wrap,children:(0,o.jsxs)("h2",{style:c.h2,children:[this.props.title||e?r:(0,o.jsx)(o.Fragment,{children:"Application error: a client-side exception has occurred (see the browser console for more information)"}),"."]})})]})]})}}d.displayName="ErrorPage",d.getInitialProps=s,d.origGetInitialProps=s,("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},8911:(e,t)=>{"use strict";function r(e){let{ampFirst:t=!1,hybrid:r=!1,hasQuery:n=!1}=void 0===e?{}:e;return t||r&&n}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"isInAmpMode",{enumerable:!0,get:function(){return r}})},9903:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{default:function(){return h},defaultHead:function(){return u}});let n=r(167),o=r(8760),i=r(997),a=o._(r(6689)),l=n._(r(3367)),s=r(8039),c=r(1988),d=r(8911);function u(e){void 0===e&&(e=!1);let t=[(0,i.jsx)("meta",{charSet:"utf-8"})];return e||t.push((0,i.jsx)("meta",{name:"viewport",content:"width=device-width"})),t}function p(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===a.default.Fragment?e.concat(a.default.Children.toArray(t.props.children).reduce((e,t)=>"string"==typeof t||"number"==typeof t?e:e.concat(t),[])):e.concat(t)}r(7668);let f=["name","httpEquiv","charSet","itemProp"];function b(e,t){let{inAmpMode:r}=t;return e.reduce(p,[]).reverse().concat(u(r).reverse()).filter(function(){let e=new Set,t=new Set,r=new Set,n={};return o=>{let i=!0,a=!1;if(o.key&&"number"!=typeof o.key&&o.key.indexOf("$")>0){a=!0;let t=o.key.slice(o.key.indexOf("$")+1);e.has(t)?i=!1:e.add(t)}switch(o.type){case"title":case"base":t.has(o.type)?i=!1:t.add(o.type);break;case"meta":for(let e=0,t=f.length;e<t;e++){let t=f[e];if(o.props.hasOwnProperty(t)){if("charSet"===t)r.has(t)?i=!1:r.add(t);else{let e=o.props[t],r=n[t]||new Set;("name"!==t||!a)&&r.has(e)?i=!1:(r.add(e),n[t]=r)}}}}return i}}()).reverse().map((e,t)=>{let n=e.key||t;if(!r&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some(t=>e.props.href.startsWith(t))){let t=Object.assign({},e.props||{});return t["data-href"]=t.href,t.href=void 0,t["data-optimized-fonts"]=!0,a.default.cloneElement(e,t)}return a.default.cloneElement(e,{key:n})})}let h=function(e){let{children:t}=e,r=(0,a.useContext)(s.AmpStateContext),n=(0,a.useContext)(c.HeadManagerContext);return(0,i.jsx)(l.default,{reduceComponentsToState:b,headManager:n,inAmpMode:(0,d.isInAmpMode)(r),children:t})};("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},3367:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return a}});let n=r(6689),o=()=>{},i=()=>{};function a(e){var t;let{headManager:r,reduceComponentsToState:a}=e;function l(){if(r&&r.mountedInstances){let t=n.Children.toArray(Array.from(r.mountedInstances).filter(Boolean));r.updateHead(a(t,e))}}return null==r||null==(t=r.mountedInstances)||t.add(e.children),l(),o(()=>{var t;return null==r||null==(t=r.mountedInstances)||t.add(e.children),()=>{var t;null==r||null==(t=r.mountedInstances)||t.delete(e.children)}}),o(()=>(r&&(r._pendingUpdate=l),()=>{r&&(r._pendingUpdate=l)})),i(()=>(r&&r._pendingUpdate&&(r._pendingUpdate(),r._pendingUpdate=null),()=>{r&&r._pendingUpdate&&(r._pendingUpdate(),r._pendingUpdate=null)})),null}},7668:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"warnOnce",{enumerable:!0,get:function(){return r}});let r=e=>{}},8071:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>i}),r(6689),r(2086);var n=r(997);let o=`
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
`;function i({Component:e,pageProps:t}){return(0,n.jsxs)(n.Fragment,{children:[n.jsx("style",{dangerouslySetInnerHTML:{__html:o}}),n.jsx("div",{className:"rn-web-container",children:n.jsx(e,Object.assign({},t))})]})}},2086:(e,t,r)=>{"use strict";r.d(t,{FL:()=>n,Ok:()=>a,VS:()=>i,gY:()=>o}),r(6454);let n={horizontalScroll:{overflowX:"auto",overflowY:"hidden",WebkitOverflowScrolling:"touch",touchAction:"pan-x",cursor:"grab",userSelect:"none",scrollbarWidth:"thin",scrollbarColor:"rgba(0,0,0,0.3) transparent",whiteSpace:"nowrap",display:"block",pointerEvents:"auto"},verticalScroll:{overflowY:"auto",overflowX:"hidden",WebkitOverflowScrolling:"touch",touchAction:"pan-y"},bothScroll:{overflow:"auto",WebkitOverflowScrolling:"touch",touchAction:"pan-x pan-y"}},o={onTouchStart:void 0,onTouchMove:void 0,onTouchEnd:void 0},i=`
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
`,a={horizontal:"horizontal-scroll",vertical:"vertical-scroll",both:"scroll-container"}},1323:(e,t)=>{"use strict";Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,r){return r in t?t[r]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,r)):"function"==typeof t&&"default"===r?t:void 0}}})},4258:(e,t,r)=>{"use strict";r.r(t),r.d(t,{config:()=>b,default:()=>d,getServerSideProps:()=>f,getStaticPaths:()=>p,getStaticProps:()=>u,reportWebVitals:()=>h,routeModule:()=>_,unstable_getServerProps:()=>v,unstable_getServerSideProps:()=>y,unstable_getStaticParams:()=>x,unstable_getStaticPaths:()=>m,unstable_getStaticProps:()=>g});var n=r(7093),o=r(5244),i=r(1323),a=r(8367),l=r.n(a),s=r(8071),c=r(9880);let d=(0,i.l)(c,"default"),u=(0,i.l)(c,"getStaticProps"),p=(0,i.l)(c,"getStaticPaths"),f=(0,i.l)(c,"getServerSideProps"),b=(0,i.l)(c,"config"),h=(0,i.l)(c,"reportWebVitals"),g=(0,i.l)(c,"unstable_getStaticProps"),m=(0,i.l)(c,"unstable_getStaticPaths"),x=(0,i.l)(c,"unstable_getStaticParams"),v=(0,i.l)(c,"unstable_getServerProps"),y=(0,i.l)(c,"unstable_getServerSideProps"),_=new n.PagesRouteModule({definition:{kind:o.x.PAGES,page:"/_error",pathname:"/_error",bundlePath:"",filename:""},components:{App:s.default,Document:l()},userland:c})},5244:(e,t)=>{"use strict";var r;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return r}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(r||(r={}))},8039:(e,t,r)=>{"use strict";e.exports=r(7093).vendored.contexts.AmpContext},1988:(e,t,r)=>{"use strict";e.exports=r(7093).vendored.contexts.HeadManagerContext},2785:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},6689:e=>{"use strict";e.exports=require("react")},6454:e=>{"use strict";e.exports=require("react-native-web/dist/exports/Platform")},997:e=>{"use strict";e.exports=require("react/jsx-runtime")},5315:e=>{"use strict";e.exports=require("path")},8760:(e,t)=>{"use strict";function r(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,n=new WeakMap;return(r=function(e){return e?n:t})(e)}t._=t._interop_require_wildcard=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var n=r(t);if(n&&n.has(e))return n.get(e);var o={__proto__:null},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in e)if("default"!==a&&Object.prototype.hasOwnProperty.call(e,a)){var l=i?Object.getOwnPropertyDescriptor(e,a):null;l&&(l.get||l.set)?Object.defineProperty(o,a,l):o[a]=e[a]}return o.default=e,n&&n.set(e,o),o}}};var t=require("../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),n=t.X(0,[367],()=>r(4258));module.exports=n})();