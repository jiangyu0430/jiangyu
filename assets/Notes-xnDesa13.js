import{r as s,R as v,j as a,A as k,m as p,L as g}from"./index-KMV390xj.js";import{F as f}from"./FadeInWhenVisible-Cumh9kwU.js";import{n as j}from"./notes-DOqCNNZk.js";/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),N=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,n,o)=>o?o.toUpperCase():n.toLowerCase()),x=e=>{const t=N(e);return t.charAt(0).toUpperCase()+t.slice(1)},y=(...e)=>e.filter((t,n,o)=>!!t&&t.trim()!==""&&o.indexOf(t)===n).join(" ").trim(),L=e=>{for(const t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0};/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var E={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=s.forwardRef(({color:e="currentColor",size:t=24,strokeWidth:n=2,absoluteStrokeWidth:o,className:l="",children:i,iconNode:r,...d},u)=>s.createElement("svg",{ref:u,...E,width:t,height:t,stroke:e,strokeWidth:o?Number(n)*24/Number(t):n,className:y("lucide",l),...!i&&!L(d)&&{"aria-hidden":"true"},...d},[...r.map(([h,m])=>s.createElement(h,m)),...Array.isArray(i)?i:[i]]));/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=(e,t)=>{const n=s.forwardRef(({className:o,...l},i)=>s.createElement(A,{ref:i,iconNode:t,className:y(`lucide-${C(x(e))}`,`lucide-${e}`,o),...l}));return n.displayName=x(e),n};/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],b=I("x",R),P={"from-center":{initial:{scale:.9,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.9,opacity:0}}};function D(e,t){const n=s.useRef(null),o=s.useCallback((...l)=>{n.current&&clearTimeout(n.current),n.current=setTimeout(()=>{e(...l)},t)},[e,t]);return s.useEffect(()=>()=>{n.current&&clearTimeout(n.current)},[]),o}function S({imageSrc:e,thumbnailSrc:t,thumbnailAlt:n="Image thumbnail",animationStyle:o="from-center",className:l,isOpen:i,onClose:r}){const d=P[o],u=D(()=>{r&&r()},100),h=s.useCallback(c=>{c.currentTarget.contains(c.target)&&(c.stopPropagation(),u())},[u]),m="lock-scroll";return s.useEffect(()=>{const c=w=>{w.key==="Escape"&&r&&r()};return document.addEventListener("keydown",c),i?document.body.classList.add(m):document.body.classList.remove(m),()=>{document.removeEventListener("keydown",c),document.body.classList.remove(m)}},[i,r]),v.createPortal(a.jsx(k,{mode:"wait",children:i&&a.jsx(p.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:h,className:"fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center",children:a.jsxs(p.div,{...d,transition:{type:"spring",damping:30,stiffness:300},className:`relative inline-block px-4 sm:px-0 ${l||""}`,onClick:c=>c.stopPropagation(),children:[a.jsx(p.button,{onClick:c=>{c.stopPropagation(),r&&r()},"aria-label":"Close dialog",className:`
                absolute
                -top-14 right-3
                md:hidden
                 p-2 bg-white/20 hover:bg-white/30 text-white rounded
                transition
              `,children:a.jsx(b,{className:"w-5 h-5"})}),a.jsx(p.button,{onClick:c=>{c.stopPropagation(),r&&r()},"aria-label":"Close dialog",className:`
                hidden
                md:block
                absolute
                top-0
                right-[-56px]
                p-2 bg-white/20 hover:bg-white/30 text-white rounded
                transition
              `,children:a.jsx(b,{className:"w-5 h-5"})}),a.jsx("div",{className:"relative inline-block overflow-hidden rounded-lg  bg-background",children:a.jsx(g,{src:e,alt:n,className:"w-full object-contain",style:{maxHeight:"calc(100vh - 80px)",height:"auto"}})})]})})}),document.body)}function $({imageSrc:e,alt:t,onClick:n,className:o}){return a.jsx("div",{className:`overflow-hidden rounded-xl ${o||""}`,children:a.jsx(g,{src:typeof e=="string"?e:e?.src||e?.default,alt:t||"Image thumbnail",className:"block cursor-pointer select-none transition-transform duration-300 ease-in-out hover:scale-110",onClick:n,loading:"lazy",draggable:!1})})}function T(){const[e,t]=s.useState(!1),[n,o]=s.useState(null),l=s.useRef(null);s.useEffect(()=>{document.body.style.overflow="",document.documentElement.style.overflow="",requestAnimationFrame(()=>{window.dispatchEvent(new Event("resize"))})},[]);const i=d=>{o(d),t(!0)},r=()=>{t(!1),o(null)};return a.jsx("div",{ref:l,className:"overflow-y-auto min-h-screen",children:a.jsxs("div",{className:"max-w-screen-xl mx-auto px-4 py-12",children:[a.jsx(f,{delay:.1,once:!0,children:a.jsx("div",{className:"w-[1280px] text-5xl font-bold text-gray-900 dark:text-white mb-10",children:"生活片段"})}),a.jsx(f,{delay:.2,y:60,once:!0,children:a.jsx("div",{className:"columns-2 md:columns-3",style:{columnGap:"16px"},children:j.map((d,u)=>a.jsx("div",{style:{marginBottom:"16px"},className:"break-inside-avoid",children:a.jsx($,{imageSrc:d.image,onClick:()=>i(d.image)},u)},u))})}),a.jsx(S,{imageSrc:n,thumbnailSrc:n,isOpen:e,onClose:r})]})})}export{T as default};
