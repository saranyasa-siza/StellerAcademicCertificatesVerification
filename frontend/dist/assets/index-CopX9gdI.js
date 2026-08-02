const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index.min-CKasu4ri.js","assets/react-0sh1Wu0J.js"])))=>i.map(i=>d[i]);
import{r as c,a as De,L as H,N as le,R as Oe,b as $,c as $e,B as Me}from"./react-0sh1Wu0J.js";import{s as f}from"./stellar-DfGy2Ng1.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const l of n)if(l.type==="childList")for(const r of l.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function a(n){const l={};return n.integrity&&(l.integrity=n.integrity),n.referrerPolicy&&(l.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?l.credentials="include":n.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function i(n){if(n.ep)return;n.ep=!0;const l=a(n);fetch(n.href,l)}})();var he={exports:{}},q={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Pe=c,Be=Symbol.for("react.element"),Xe=Symbol.for("react.fragment"),Fe=Object.prototype.hasOwnProperty,ze=Pe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,He={key:!0,ref:!0,__self:!0,__source:!0};function pe(e,s,a){var i,n={},l=null,r=null;a!==void 0&&(l=""+a),s.key!==void 0&&(l=""+s.key),s.ref!==void 0&&(r=s.ref);for(i in s)Fe.call(s,i)&&!He.hasOwnProperty(i)&&(n[i]=s[i]);if(e&&e.defaultProps)for(i in s=e.defaultProps,s)n[i]===void 0&&(n[i]=s[i]);return{$$typeof:Be,type:e,key:l,ref:r,props:n,_owner:ze.current}}q.Fragment=Xe;q.jsx=pe;q.jsxs=pe;he.exports=q;var t=he.exports,J={},oe=De;J.createRoot=oe.createRoot,J.hydrateRoot=oe.hydrateRoot;let Ve={data:""},qe=e=>{if(typeof window=="object"){let s=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return s.nonce=window.__nonce__,s.parentNode||(e||document.head).appendChild(s),s.firstChild}return e||Ve},Ue=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,Ye=/\/\*[^]*?\*\/|  +/g,ce=/\n+/g,S=(e,s)=>{let a="",i="",n="";for(let l in e){let r=e[l];l[0]=="@"?l[1]=="i"?a=l+" "+r+";":i+=l[1]=="f"?S(r,l):l+"{"+S(r,l[1]=="k"?"":s)+"}":typeof r=="object"?i+=S(r,s?s.replace(/([^,])+/g,o=>l.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,d=>/&/.test(d)?d.replace(/&/g,o):o?o+" "+d:d)):l):r!=null&&(l=l[1]=="-"?l:l.replace(/[A-Z]/g,"-$&").toLowerCase(),n+=S.p?S.p(l,r):l+":"+r+";")}return a+(s&&n?s+"{"+n+"}":n)+i},_={},fe=e=>{if(typeof e=="object"){let s="";for(let a in e)s+=a+fe(e[a]);return s}return e},We=(e,s,a,i,n)=>{let l=fe(e),r=_[l]||(_[l]=(d=>{let u=0,x=11;for(;u<d.length;)x=101*x+d.charCodeAt(u++)>>>0;return"go"+x})(l));if(!_[r]){let d=l!==e?e:(u=>{let x,m,h=[{}];for(;x=Ue.exec(u.replace(Ye,""));)x[4]?h.shift():x[3]?(m=x[3].replace(ce," ").trim(),h.unshift(h[0][m]=h[0][m]||{})):h[0][x[1]]=x[2].replace(ce," ").trim();return h[0]})(e);_[r]=S(n?{["@keyframes "+r]:d}:d,a?"":"."+r)}let o=a&&_.g;return a&&(_.g=_[r]),((d,u,x,m)=>{m?u.data=u.data.replace(m,d):u.data.indexOf(d)===-1&&(u.data=x?d+u.data:u.data+d)})(_[r],s,i,o),r},Ke=(e,s,a)=>e.reduce((i,n,l)=>{let r=s[l];if(r&&r.call){let o=r(a),d=o&&o.props&&o.props.className||/^go/.test(o)&&o;r=d?"."+d:o&&typeof o=="object"?o.props?"":S(o,""):o===!1?"":o}return i+n+(r??"")},"");function U(e){let s=this||{},a=e.call?e(s.p):e;return We(a.unshift?a.raw?Ke(a,[].slice.call(arguments,1),s.p):a.reduce((i,n)=>Object.assign(i,n&&n.call?n(s.p):n),{}):a,qe(s.target),s.g,s.o,s.k)}let be,Z,G;U.bind({g:1});let k=U.bind({k:1});function Je(e,s,a,i){S.p=s,be=e,Z=a,G=i}function R(e,s){let a=this||{};return function(){let i=arguments;function n(l,r){let o=Object.assign({},l),d=o.className||n.className;a.p=Object.assign({theme:Z&&Z()},o),a.o=/go\d/.test(d),o.className=U.apply(a,i)+(d?" "+d:"");let u=e;return e[0]&&(u=o.as||e,delete o.as),G&&u[0]&&G(o),be(u,o)}return n}}var Ze=e=>typeof e=="function",V=(e,s)=>Ze(e)?e(s):e,Ge=(()=>{let e=0;return()=>(++e).toString()})(),ye=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let s=matchMedia("(prefers-reduced-motion: reduce)");e=!s||s.matches}return e}})(),Qe=20,ae="default",ge=(e,s)=>{let{toastLimit:a}=e.settings;switch(s.type){case 0:return{...e,toasts:[s.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(r=>r.id===s.toast.id?{...r,...s.toast}:r)};case 2:let{toast:i}=s;return ge(e,{type:e.toasts.find(r=>r.id===i.id)?1:0,toast:i});case 3:let{toastId:n}=s;return{...e,toasts:e.toasts.map(r=>r.id===n||n===void 0?{...r,dismissed:!0,visible:!1}:r)};case 4:return s.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(r=>r.id!==s.toastId)};case 5:return{...e,pausedAt:s.time};case 6:let l=s.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(r=>({...r,pauseDuration:r.pauseDuration+l}))}}},z=[],je={toasts:[],pausedAt:void 0,settings:{toastLimit:Qe}},C={},ve=(e,s=ae)=>{C[s]=ge(C[s]||je,e),z.forEach(([a,i])=>{a===s&&i(C[s])})},Ne=e=>Object.keys(C).forEach(s=>ve(e,s)),et=e=>Object.keys(C).find(s=>C[s].toasts.some(a=>a.id===e)),Y=(e=ae)=>s=>{ve(s,e)},tt={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},st=(e={},s=ae)=>{let[a,i]=c.useState(C[s]||je),n=c.useRef(C[s]);c.useEffect(()=>(n.current!==C[s]&&i(C[s]),z.push([s,i]),()=>{let r=z.findIndex(([o])=>o===s);r>-1&&z.splice(r,1)}),[s]);let l=a.toasts.map(r=>{var o,d,u;return{...e,...e[r.type],...r,removeDelay:r.removeDelay||((o=e[r.type])==null?void 0:o.removeDelay)||(e==null?void 0:e.removeDelay),duration:r.duration||((d=e[r.type])==null?void 0:d.duration)||(e==null?void 0:e.duration)||tt[r.type],style:{...e.style,...(u=e[r.type])==null?void 0:u.style,...r.style}}});return{...a,toasts:l}},at=(e,s="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:s,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(a==null?void 0:a.id)||Ge()}),M=e=>(s,a)=>{let i=at(s,e,a);return Y(i.toasterId||et(i.id))({type:2,toast:i}),i.id},y=(e,s)=>M("blank")(e,s);y.error=M("error");y.success=M("success");y.loading=M("loading");y.custom=M("custom");y.dismiss=(e,s)=>{let a={type:3,toastId:e};s?Y(s)(a):Ne(a)};y.dismissAll=e=>y.dismiss(void 0,e);y.remove=(e,s)=>{let a={type:4,toastId:e};s?Y(s)(a):Ne(a)};y.removeAll=e=>y.remove(void 0,e);y.promise=(e,s,a)=>{let i=y.loading(s.loading,{...a,...a==null?void 0:a.loading});return typeof e=="function"&&(e=e()),e.then(n=>{let l=s.success?V(s.success,n):void 0;return l?y.success(l,{id:i,...a,...a==null?void 0:a.success}):y.dismiss(i),n}).catch(n=>{let l=s.error?V(s.error,n):void 0;l?y.error(l,{id:i,...a,...a==null?void 0:a.error}):y.dismiss(i)}),e};var nt=1e3,rt=(e,s="default")=>{let{toasts:a,pausedAt:i}=st(e,s),n=c.useRef(new Map).current,l=c.useCallback((m,h=nt)=>{if(n.has(m))return;let p=setTimeout(()=>{n.delete(m),r({type:4,toastId:m})},h);n.set(m,p)},[]);c.useEffect(()=>{if(i)return;let m=Date.now(),h=a.map(p=>{if(p.duration===1/0)return;let b=(p.duration||0)+p.pauseDuration-(m-p.createdAt);if(b<0){p.visible&&y.dismiss(p.id);return}return setTimeout(()=>y.dismiss(p.id,s),b)});return()=>{h.forEach(p=>p&&clearTimeout(p))}},[a,i,s]);let r=c.useCallback(Y(s),[s]),o=c.useCallback(()=>{r({type:5,time:Date.now()})},[r]),d=c.useCallback((m,h)=>{r({type:1,toast:{id:m,height:h}})},[r]),u=c.useCallback(()=>{i&&r({type:6,time:Date.now()})},[i,r]),x=c.useCallback((m,h)=>{let{reverseOrder:p=!1,gutter:b=8,defaultPosition:A}=h||{},L=a.filter(N=>(N.position||A)===(m.position||A)&&N.height),P=L.findIndex(N=>N.id===m.id),B=L.filter((N,w)=>w<P&&N.visible).length;return L.filter(N=>N.visible).slice(...p?[B+1]:[0,B]).reduce((N,w)=>N+(w.height||0)+b,0)},[a]);return c.useEffect(()=>{a.forEach(m=>{if(m.dismissed)l(m.id,m.removeDelay);else{let h=n.get(m.id);h&&(clearTimeout(h),n.delete(m.id))}})},[a,l]),{toasts:a,handlers:{updateHeight:d,startPause:o,endPause:u,calculateOffset:x}}},it=k`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,lt=k`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,ot=k`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,ct=R("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${it} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${lt} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${ot} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,dt=k`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,ut=R("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${dt} 1s linear infinite;
`,mt=k`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,xt=k`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,ht=R("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${mt} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${xt} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,pt=R("div")`
  position: absolute;
`,ft=R("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,bt=k`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,yt=R("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${bt} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,gt=({toast:e})=>{let{icon:s,type:a,iconTheme:i}=e;return s!==void 0?typeof s=="string"?c.createElement(yt,null,s):s:a==="blank"?null:c.createElement(ft,null,c.createElement(ut,{...i}),a!=="loading"&&c.createElement(pt,null,a==="error"?c.createElement(ct,{...i}):c.createElement(ht,{...i})))},jt=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,vt=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,Nt="0%{opacity:0;} 100%{opacity:1;}",wt="0%{opacity:1;} 100%{opacity:0;}",Ct=R("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,kt=R("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,_t=(e,s)=>{let a=e.includes("top")?1:-1,[i,n]=ye()?[Nt,wt]:[jt(a),vt(a)];return{animation:s?`${k(i)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${k(n)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},St=c.memo(({toast:e,position:s,style:a,children:i})=>{let n=e.height?_t(e.position||s||"top-center",e.visible):{opacity:0},l=c.createElement(gt,{toast:e}),r=c.createElement(kt,{...e.ariaProps},V(e.message,e));return c.createElement(Ct,{className:e.className,style:{...n,...a,...e.style}},typeof i=="function"?i({icon:l,message:r}):c.createElement(c.Fragment,null,l,r))});Je(c.createElement);var Et=({id:e,className:s,style:a,onHeightUpdate:i,children:n})=>{let l=c.useCallback(r=>{if(r){let o=()=>{let d=r.getBoundingClientRect().height;i(e,d)};o(),new MutationObserver(o).observe(r,{subtree:!0,childList:!0,characterData:!0})}},[e,i]);return c.createElement("div",{ref:l,className:s,style:a},n)},Rt=(e,s)=>{let a=e.includes("top"),i=a?{top:0}:{bottom:0},n=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:ye()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${s*(a?1:-1)}px)`,...i,...n}},At=U`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,F=16,Tt=({reverseOrder:e,position:s="top-center",toastOptions:a,gutter:i,children:n,toasterId:l,containerStyle:r,containerClassName:o})=>{let{toasts:d,handlers:u}=rt(a,l);return c.createElement("div",{"data-rht-toaster":l||"",style:{position:"fixed",zIndex:9999,top:F,left:F,right:F,bottom:F,pointerEvents:"none",...r},className:o,onMouseEnter:u.startPause,onMouseLeave:u.endPause},d.map(x=>{let m=x.position||s,h=u.calculateOffset(x,{reverseOrder:e,gutter:i,defaultPosition:s}),p=Rt(m,h);return c.createElement(Et,{id:x.id,key:x.id,onHeightUpdate:u.updateHeight,className:x.visible?At:"",style:p},x.type==="custom"?V(x.message,x):n?n(x):c.createElement(St,{toast:x,position:m}))}))},g=y;/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const It=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),we=(...e)=>e.filter((s,a,i)=>!!s&&i.indexOf(s)===a).join(" ");/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Lt={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dt=c.forwardRef(({color:e="currentColor",size:s=24,strokeWidth:a=2,absoluteStrokeWidth:i,className:n="",children:l,iconNode:r,...o},d)=>c.createElement("svg",{ref:d,...Lt,width:s,height:s,stroke:e,strokeWidth:i?Number(a)*24/Number(s):a,className:we("lucide",n),...o},[...r.map(([u,x])=>c.createElement(u,x)),...Array.isArray(l)?l:[l]]));/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=(e,s)=>{const a=c.forwardRef(({className:i,...n},l)=>c.createElement(Dt,{ref:l,iconNode:s,className:we(`lucide-${It(e)}`,i),...n}));return a.displayName=`${e}`,a};/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=v("Award",[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]]);/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ne=v("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ot=v("CircleCheckBig",[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const de=v("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ce=v("ExternalLink",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]);/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $t=v("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ke=v("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q=v("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ee=v("Send",[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]]);/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=v("ShieldCheck",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mt=v("ShieldX",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m14.5 9.5-5 5",key:"17q4r4"}],["path",{d:"m9.5 9.5 5 5",key:"18nt4w"}]]);/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pt=v("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bt=v("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),Xt="modulepreload",Ft=function(e){return"/"+e},ue={},W=function(s,a,i){let n=Promise.resolve();if(a&&a.length>0){document.getElementsByTagName("link");const r=document.querySelector("meta[property=csp-nonce]"),o=(r==null?void 0:r.nonce)||(r==null?void 0:r.getAttribute("nonce"));n=Promise.allSettled(a.map(d=>{if(d=Ft(d),d in ue)return;ue[d]=!0;const u=d.endsWith(".css"),x=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${x}`))return;const m=document.createElement("link");if(m.rel=u?"stylesheet":Xt,u||(m.as="script"),m.crossOrigin="",m.href=d,o&&m.setAttribute("nonce",o),document.head.appendChild(m),u)return new Promise((h,p)=>{m.addEventListener("load",h),m.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${d}`)))})}))}function l(r){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=r,window.dispatchEvent(o),!o.defaultPrevented)throw r}return n.then(r=>{for(const o of r||[])o.status==="rejected"&&l(o.reason);return s().catch(l)})};async function zt(){try{const{isConnected:e}=await W(async()=>{const{isConnected:a}=await import("./index.min-CKasu4ri.js").then(i=>i.i);return{isConnected:a}},__vite__mapDeps([0,1]));return(await e()).isConnected}catch{return!1}}async function Ht(){const{setAllowed:e,requestAccess:s,getAddress:a}=await W(async()=>{const{setAllowed:n,requestAccess:l,getAddress:r}=await import("./index.min-CKasu4ri.js").then(o=>o.i);return{setAllowed:n,requestAccess:l,getAddress:r}},__vite__mapDeps([0,1]));await e(),await s();const i=await a();if(i.error)throw new Error(String(i.error));return i.address}async function Vt(){try{const{isConnected:e,getAddress:s}=await W(async()=>{const{isConnected:n,getAddress:l}=await import("./index.min-CKasu4ri.js").then(r=>r.i);return{isConnected:n,getAddress:l}},__vite__mapDeps([0,1]));return(await e()).isConnected&&(await s()).address||null}catch{return null}}async function _e(e,s){const{signTransaction:a}=await W(async()=>{const{signTransaction:n}=await import("./index.min-CKasu4ri.js").then(l=>l.i);return{signTransaction:n}},__vite__mapDeps([0,1])),i=await a(e,{networkPassphrase:s});if(i.error)throw new Error(String(i.error));return i.signedTxXdr}const Se="CBZRJZYNDXYTRY2CVNLUQXG5NE2PHY6GNMBKBXBRX6HRVNXBU5D7IJXA",qt="https://soroban-testnet.stellar.org",I="Test SDF Network ; September 2015",Ut="https://horizon-testnet.stellar.org",T=new f.rpc.Server(qt,{allowHttp:!1}),te=new f.Horizon.Server(Ut);async function Yt(e){const a=(await te.loadAccount(e)).balances.find(i=>i.asset_type==="native");return a?parseFloat(a.balance).toFixed(7):"0.0000000"}async function Wt(e,s,a,i){const n=await te.loadAccount(e),l=new f.TransactionBuilder(n,{fee:f.BASE_FEE,networkPassphrase:I}).addOperation(f.Operation.payment({destination:s,asset:f.Asset.native(),amount:a}));i&&l.addMemo(f.Memo.text(i));const r=l.setTimeout(30).build(),o=await _e(r.toXDR(),I),d=f.TransactionBuilder.fromXDR(o,I);return(await te.submitTransaction(d)).hash}function j(e){return f.nativeToScVal(e,{type:"string"})}async function re(e,s){const a=new f.Contract(Se),i=await T.getAccount("GAAZI4TCR3TY5OJHCTJC2A4QSY6CJWJH5IAJTGKIN2ER7LBNVKOCCWN"),n=new f.TransactionBuilder(i,{fee:f.BASE_FEE,networkPassphrase:I}).addOperation(a.call(e,...s)).setTimeout(30).build(),l=await T.simulateTransaction(n);if(f.rpc.Api.isSimulationError(l))throw new Error(l.error);const r=l;if(!r.result)throw new Error("No result from simulation");return r.result.retval}function Kt(e){const s=f.scValToNative(e);return{id:String(s.id??""),student_name:String(s.student_name??""),course_name:String(s.course_name??""),institution_name:String(s.institution_name??""),issue_date:String(s.issue_date??""),hash:String(s.hash??""),ipfs_cid:String(s.ipfs_cid??""),issuer:String(s.issuer??""),revoked:!!(s.revoked??!1)}}async function Ee(e){const s=await re("get_certificate",[j(e)]);return Kt(s)}async function Re(e){const s=await re("certificate_exists",[j(e)]);return f.scValToNative(s)}async function Jt(e){const s=await re("get_issuer_certificates",[j(e)]),a=f.scValToNative(s);return Array.isArray(a)?a:[]}async function Ae(e,s,a){const i=new f.Contract(Se),n=await T.getAccount(a),l=new f.TransactionBuilder(n,{fee:f.BASE_FEE,networkPassphrase:I}).addOperation(i.call(e,...s)).setTimeout(30).build(),r=await T.simulateTransaction(l);if(f.rpc.Api.isSimulationError(r))throw new Error(r.error);const o=f.rpc.assembleTransaction(l,r).build(),d=await _e(o.toXDR(),I),u=f.TransactionBuilder.fromXDR(d,I),x=await T.sendTransaction(u);if(x.status==="ERROR")throw new Error(JSON.stringify(x.errorResult));let m=await T.getTransaction(x.hash);for(;m.status==="NOT_FOUND";)await new Promise(h=>setTimeout(h,1500)),m=await T.getTransaction(x.hash);if(m.status==="FAILED")throw new Error("Transaction failed on-chain");return x.hash}async function Zt(e,s){return Ae("issue_certificate",[j(e.id),j(e.student_name),j(e.course_name),j(e.institution_name),j(e.issue_date),j(e.hash),j(e.ipfs_cid),j(s)],s)}async function Gt(e,s){return Ae("revoke_certificate",[j(e),j(s)],s)}function K(){const[e,s]=c.useState(null),[a,i]=c.useState(!1),[n,l]=c.useState(!1),[r,o]=c.useState(null),d=c.useCallback(async()=>{if(e)try{const m=await Yt(e);o(m)}catch{o(null)}},[e]);c.useEffect(()=>{zt().then(m=>{l(m),m&&Vt().then(h=>{h&&s(h)})})},[]),c.useEffect(()=>{e?d():o(null)},[e,d]);const u=c.useCallback(async()=>{if(!n){g.error("Freighter wallet not found. Install it from freighter.app"),window.open("https://freighter.app","_blank");return}i(!0);try{const m=await Ht();s(m),g.success("Wallet connected!")}catch(m){g.error(m instanceof Error?m.message:"Failed to connect wallet")}finally{i(!1)}},[n]),x=c.useCallback(()=>{s(null),o(null),g("Wallet disconnected",{icon:"👋"})},[]);return{publicKey:e,connected:!!e,connecting:a,freighterInstalled:n,balance:r,refreshBalance:d,connect:u,disconnect:x}}async function Qt(e){const s=JSON.stringify(e),a=new TextEncoder().encode(s),i=await crypto.subtle.digest("SHA-256",a);return Array.from(new Uint8Array(i)).map(n=>n.toString(16).padStart(2,"0")).join("")}function se(e){return!e||e.length<10?e:`${e.slice(0,6)}…${e.slice(-4)}`}function es(e){if(!e)return"—";try{return new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})}catch{return e}}function ts(){const{publicKey:e,connected:s,connecting:a,connect:i,disconnect:n,balance:l}=K(),[r,o]=c.useState(!1),d=[{to:"/",label:"Home"},{to:"/issue",label:"Issue Certificate"},{to:"/verify",label:"Verify"},{to:"/my-certificates",label:"My Certificates"},{to:"/send",label:"Send XLM"}];return t.jsxs("nav",{className:"sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm",children:[t.jsx("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:t.jsxs("div",{className:"flex items-center justify-between h-16",children:[t.jsxs(H,{to:"/",className:"flex items-center gap-2 font-bold text-xl text-brand-700",children:[t.jsx(O,{className:"w-7 h-7 text-brand-600"}),"CertChain"]}),t.jsx("div",{className:"hidden md:flex items-center gap-1",children:d.map(u=>t.jsx(le,{to:u.to,end:u.to==="/",className:({isActive:x})=>`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${x?"bg-brand-50 text-brand-700":"text-slate-600 hover:text-brand-600 hover:bg-slate-50"}`,children:u.to==="/send"?t.jsxs("span",{className:"flex items-center gap-1",children:[t.jsx(ee,{className:"w-3.5 h-3.5"})," ",u.label]}):u.label},u.to))}),t.jsx("div",{className:"hidden md:flex items-center gap-3",children:s?t.jsxs("div",{className:"flex items-center gap-2",children:[l!==null&&t.jsxs("span",{className:"text-sm font-semibold text-brand-700 bg-brand-50 px-3 py-1.5 rounded-lg",children:[parseFloat(l).toFixed(2)," XLM"]}),t.jsxs("span",{className:"flex items-center gap-1.5 text-sm text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg",children:[t.jsx("span",{className:"w-2 h-2 rounded-full bg-green-500 inline-block"}),se(e)]}),t.jsx("button",{onClick:n,className:"text-sm text-slate-500 hover:text-red-500 transition-colors px-2 py-1",children:"Disconnect"})]}):t.jsx("button",{onClick:i,disabled:a,className:"btn-primary text-sm",children:a?"Connecting…":"Connect Wallet"})}),t.jsx("button",{className:"md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100",onClick:()=>o(u=>!u),children:r?t.jsx(Bt,{className:"w-5 h-5"}):t.jsx($t,{className:"w-5 h-5"})})]})}),r&&t.jsxs("div",{className:"md:hidden border-t border-slate-100 bg-white px-4 py-3 space-y-1",children:[d.map(u=>t.jsx(le,{to:u.to,end:u.to==="/",onClick:()=>o(!1),className:({isActive:x})=>`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${x?"bg-brand-50 text-brand-700":"text-slate-600 hover:text-brand-600 hover:bg-slate-50"}`,children:u.label},u.to)),t.jsx("div",{className:"pt-2",children:s?t.jsxs("div",{className:"space-y-2",children:[l!==null&&t.jsxs("div",{className:"px-4 py-2 bg-brand-50 rounded-lg text-sm font-semibold text-brand-700",children:["Balance: ",parseFloat(l).toFixed(2)," XLM"]}),t.jsxs("div",{className:"flex items-center justify-between px-4 py-2 bg-slate-50 rounded-lg",children:[t.jsxs("span",{className:"flex items-center gap-1.5 text-sm text-slate-600",children:[t.jsx("span",{className:"w-2 h-2 rounded-full bg-green-500 inline-block"}),se(e)]}),t.jsx("button",{onClick:()=>{n(),o(!1)},className:"text-sm text-red-500",children:"Disconnect"})]})]}):t.jsx("button",{onClick:()=>{i(),o(!1)},disabled:a,className:"btn-primary w-full justify-center text-sm",children:a?"Connecting…":"Connect Wallet"})})]})]})}const ss=[{icon:t.jsx(D,{className:"w-6 h-6 text-brand-600"}),title:"Issue Certificates",description:"Any wallet can issue tamper-proof academic or professional certificates directly on-chain. No approval needed."},{icon:t.jsx(O,{className:"w-6 h-6 text-brand-600"}),title:"Verify Instantly",description:"Anyone can verify the authenticity of a certificate in seconds using just the Certificate ID."},{icon:t.jsx(Q,{className:"w-6 h-6 text-brand-600"}),title:"Search & Explore",description:"Look up any certificate by ID. All data is permanently stored on the Stellar blockchain."},{icon:t.jsx(Pt,{className:"w-6 h-6 text-brand-600"}),title:"No Central Authority",description:"No admin. No owner. Your wallet is your identity. The protocol is open to everyone."}];function as(){return t.jsxs("div",{children:[t.jsx("section",{className:"bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 text-white",children:t.jsxs("div",{className:"max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center",children:[t.jsxs("div",{className:"inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-1.5 rounded-full text-sm font-medium mb-6",children:[t.jsx(O,{className:"w-4 h-4"}),"Powered by Stellar Soroban · Testnet"]}),t.jsxs("h1",{className:"text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6",children:["Academic Certificate",t.jsx("br",{}),"Verification on Stellar"]}),t.jsx("p",{className:"text-lg sm:text-xl text-brand-100 max-w-2xl mx-auto mb-10",children:"Issue tamper-proof academic and professional certificates on the Stellar blockchain. Anyone can issue. Anyone can verify. No centralized authority."}),t.jsxs("div",{className:"flex flex-col sm:flex-row items-center justify-center gap-4",children:[t.jsxs(H,{to:"/issue",className:"inline-flex items-center gap-2 px-8 py-3.5 bg-white text-brand-700 font-bold rounded-xl hover:bg-brand-50 transition-colors shadow-lg",children:[t.jsx(D,{className:"w-5 h-5"}),"Issue Certificate"]}),t.jsxs(H,{to:"/verify",className:"inline-flex items-center gap-2 px-8 py-3.5 bg-white/10 backdrop-blur text-white font-bold rounded-xl border border-white/30 hover:bg-white/20 transition-colors",children:[t.jsx(O,{className:"w-5 h-5"}),"Verify Certificate"]})]})]})}),t.jsxs("section",{className:"max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20",children:[t.jsx("h2",{className:"text-2xl font-bold text-center text-slate-800 mb-12",children:"A permissionless certificate protocol"}),t.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-6",children:ss.map(e=>t.jsxs("div",{className:"card flex gap-4",children:[t.jsx("div",{className:"w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center shrink-0",children:e.icon}),t.jsxs("div",{children:[t.jsx("h3",{className:"font-semibold text-slate-800 mb-1",children:e.title}),t.jsx("p",{className:"text-sm text-slate-500 leading-relaxed",children:e.description})]})]},e.title))})]}),t.jsx("section",{className:"max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20",children:t.jsxs("div",{className:"card bg-slate-50 border-slate-200 text-center",children:[t.jsx("p",{className:"text-xs font-medium text-slate-500 uppercase tracking-wide mb-2",children:"Deployed Contract"}),t.jsx("p",{className:"font-mono text-sm text-slate-700 break-all",children:"CBZRJZYNDXYTRY2CVNLUQXG5NE2PHY6GNMBKBXBRX6HRVNXBU5D7IJXA"}),t.jsx("a",{href:"https://stellar.expert/explorer/testnet/contract/CBZRJZYNDXYTRY2CVNLUQXG5NE2PHY6GNMBKBXBRX6HRVNXBU5D7IJXA",target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-1 text-xs text-brand-600 hover:text-brand-700 mt-2",children:"View on Stellar Expert ↗"})]})})]})}function Te({hash:e}){const s=`https://stellar.expert/explorer/testnet/tx/${e}`;return t.jsxs("div",{className:"flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-xl",children:[t.jsx(Ot,{className:"w-5 h-5 text-green-600 shrink-0 mt-0.5"}),t.jsxs("div",{className:"min-w-0",children:[t.jsx("p",{className:"text-sm font-semibold text-green-800",children:"Transaction confirmed"}),t.jsxs("a",{href:s,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-1 text-xs text-green-700 hover:text-green-900 font-mono break-all mt-0.5",children:[e.slice(0,16),"…",e.slice(-8),t.jsx(Ce,{className:"w-3 h-3 shrink-0"})]})]})]})}const ns={sm:"w-4 h-4",md:"w-6 h-6",lg:"w-8 h-8"};function E({size:e="md",className:s=""}){return t.jsxs("svg",{className:`animate-spin text-brand-500 ${ns[e]} ${s}`,xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[t.jsx("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),t.jsx("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"})]})}const me={id:"",student_name:"",course_name:"",institution_name:"",issue_date:"",ipfs_cid:""};function rs(){const{publicKey:e,connected:s,connect:a,connecting:i}=K(),[n,l]=c.useState(me),[r,o]=c.useState(!1),[d,u]=c.useState(null),x=h=>p=>l(b=>({...b,[h]:p.target.value})),m=async h=>{if(h.preventDefault(),!!e){if(!n.id.trim()||!n.student_name.trim()||!n.course_name.trim()||!n.institution_name.trim()||!n.issue_date){g.error("Please fill in all required fields");return}o(!0),u(null);try{if(await Re(n.id.trim())){g.error("A certificate with this ID already exists on-chain"),o(!1);return}const b=await Qt({id:n.id.trim(),studentName:n.student_name.trim(),courseName:n.course_name.trim(),institutionName:n.institution_name.trim(),issueDate:n.issue_date,issuer:e}),A=await Zt({id:n.id.trim(),student_name:n.student_name.trim(),course_name:n.course_name.trim(),institution_name:n.institution_name.trim(),issue_date:n.issue_date,hash:b,ipfs_cid:n.ipfs_cid.trim()},e);u(A),g.success("Certificate issued on-chain!"),l(me)}catch(p){const b=p instanceof Error?p.message:"Transaction failed";g.error(b)}finally{o(!1)}}};return t.jsxs("div",{className:"max-w-2xl mx-auto px-4 sm:px-6 py-12",children:[t.jsxs("div",{className:"flex items-center gap-3 mb-8",children:[t.jsx("div",{className:"w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center",children:t.jsx(D,{className:"w-5 h-5 text-brand-600"})}),t.jsxs("div",{children:[t.jsx("h1",{className:"text-2xl font-bold text-slate-800",children:"Issue Certificate"}),t.jsx("p",{className:"text-sm text-slate-500",children:"Issue a tamper-proof certificate on the Stellar blockchain"})]})]}),s?t.jsxs("form",{onSubmit:m,className:"card space-y-5",children:[d&&t.jsx(Te,{hash:d}),t.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-5",children:[t.jsxs("div",{className:"sm:col-span-2",children:[t.jsxs("label",{className:"label",children:["Certificate ID ",t.jsx("span",{className:"text-red-500",children:"*"})]}),t.jsx("input",{className:"input",placeholder:"e.g. CERT-MIT-2024-001",value:n.id,onChange:x("id"),required:!0}),t.jsx("p",{className:"text-xs text-slate-400 mt-1",children:"Must be unique on-chain"})]}),t.jsxs("div",{children:[t.jsxs("label",{className:"label",children:["Student Name ",t.jsx("span",{className:"text-red-500",children:"*"})]}),t.jsx("input",{className:"input",placeholder:"Full name",value:n.student_name,onChange:x("student_name"),required:!0})]}),t.jsxs("div",{children:[t.jsxs("label",{className:"label",children:["Course Name ",t.jsx("span",{className:"text-red-500",children:"*"})]}),t.jsx("input",{className:"input",placeholder:"e.g. Blockchain Development",value:n.course_name,onChange:x("course_name"),required:!0})]}),t.jsxs("div",{children:[t.jsxs("label",{className:"label",children:["Institution Name ",t.jsx("span",{className:"text-red-500",children:"*"})]}),t.jsx("input",{className:"input",placeholder:"e.g. MIT, Coursera, Udemy",value:n.institution_name,onChange:x("institution_name"),required:!0})]}),t.jsxs("div",{children:[t.jsxs("label",{className:"label",children:["Issue Date ",t.jsx("span",{className:"text-red-500",children:"*"})]}),t.jsx("input",{className:"input",type:"date",value:n.issue_date,onChange:x("issue_date"),required:!0})]}),t.jsxs("div",{className:"sm:col-span-2",children:[t.jsx("label",{className:"label",children:"IPFS CID (optional)"}),t.jsx("input",{className:"input",placeholder:"QmXxx… — paste your IPFS CID if you have one",value:n.ipfs_cid,onChange:x("ipfs_cid")})]})]}),t.jsxs("div",{className:"pt-2 border-t border-slate-100",children:[t.jsxs("p",{className:"text-xs text-slate-400 mb-4",children:["Issuer: ",t.jsx("span",{className:"font-mono",children:e})]}),t.jsx("button",{type:"submit",disabled:r,className:"btn-primary w-full justify-center",children:r?t.jsxs(t.Fragment,{children:[t.jsx(E,{size:"sm"}),"Submitting transaction…"]}):t.jsxs(t.Fragment,{children:[t.jsx(D,{className:"w-4 h-4"}),"Issue Certificate"]})})]})]}):t.jsxs("div",{className:"card text-center py-12",children:[t.jsx(ne,{className:"w-10 h-10 text-slate-300 mx-auto mb-3"}),t.jsx("p",{className:"text-slate-600 font-medium mb-4",children:"Connect your wallet to issue certificates"}),t.jsx("button",{onClick:a,disabled:i,className:"btn-primary",children:i?t.jsxs(t.Fragment,{children:[t.jsx(E,{size:"sm"})," Connecting…"]}):"Connect Wallet"})]})]})}function Ie({cert:e,onRevoke:s,revoking:a,showRevoke:i}){const n=(l,r)=>{navigator.clipboard.writeText(l),g.success(`${r} copied!`)};return t.jsxs("div",{className:"card space-y-4",children:[t.jsxs("div",{className:"flex items-start justify-between gap-4",children:[t.jsxs("div",{children:[t.jsx("div",{className:"flex items-center gap-2 mb-1",children:e.revoked?t.jsxs("span",{className:"inline-flex items-center gap-1 text-xs font-semibold text-red-600 bg-red-50 px-2.5 py-1 rounded-full",children:[t.jsx(Mt,{className:"w-3.5 h-3.5"})," Revoked"]}):t.jsxs("span",{className:"inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 px-2.5 py-1 rounded-full",children:[t.jsx(O,{className:"w-3.5 h-3.5"})," Active"]})}),t.jsx("h3",{className:"text-lg font-bold text-slate-800",children:e.student_name}),t.jsx("p",{className:"text-sm text-slate-500",children:e.course_name})]}),t.jsx("span",{className:"text-xs text-slate-400 font-mono bg-slate-50 px-2 py-1 rounded-lg whitespace-nowrap",children:e.id})]}),t.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm",children:[t.jsx(xe,{label:"Institution",value:e.institution_name}),t.jsx(xe,{label:"Issue Date",value:es(e.issue_date)}),t.jsxs("div",{className:"sm:col-span-2",children:[t.jsx("span",{className:"text-xs font-medium text-slate-500 uppercase tracking-wide",children:"Issuer"}),t.jsxs("div",{className:"flex items-center gap-2 mt-0.5",children:[t.jsx("span",{className:"font-mono text-xs text-slate-700 break-all",children:e.issuer}),t.jsx("button",{onClick:()=>n(e.issuer,"Issuer address"),className:"shrink-0 text-slate-400 hover:text-brand-500 transition-colors",children:t.jsx(de,{className:"w-3.5 h-3.5"})})]})]}),t.jsxs("div",{className:"sm:col-span-2",children:[t.jsx("span",{className:"text-xs font-medium text-slate-500 uppercase tracking-wide",children:"Certificate Hash"}),t.jsxs("div",{className:"flex items-center gap-2 mt-0.5",children:[t.jsx("span",{className:"font-mono text-xs text-slate-700 break-all",children:e.hash}),t.jsx("button",{onClick:()=>n(e.hash,"Hash"),className:"shrink-0 text-slate-400 hover:text-brand-500 transition-colors",children:t.jsx(de,{className:"w-3.5 h-3.5"})})]})]})]}),e.ipfs_cid&&e.ipfs_cid.length>0&&t.jsxs("a",{href:`https://ipfs.io/ipfs/${e.ipfs_cid}`,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-1.5 text-sm text-brand-600 hover:text-brand-700 font-medium",children:[t.jsx(Ce,{className:"w-4 h-4"}),"View on IPFS"]}),i&&!e.revoked&&s&&t.jsx("div",{className:"pt-2 border-t border-slate-100",children:t.jsx("button",{onClick:()=>s(e.id),disabled:a,className:"inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl border border-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",children:a?"Revoking…":"Revoke Certificate"})})]})}function xe({label:e,value:s}){return t.jsxs("div",{children:[t.jsx("span",{className:"text-xs font-medium text-slate-500 uppercase tracking-wide",children:e}),t.jsx("p",{className:"text-slate-800 font-medium mt-0.5",children:s||"—"})]})}function Le({icon:e,title:s,description:a,action:i}){return t.jsxs("div",{className:"flex flex-col items-center justify-center py-16 text-center",children:[t.jsx("div",{className:"w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-4",children:e}),t.jsx("h3",{className:"text-lg font-semibold text-slate-700 mb-1",children:s}),t.jsx("p",{className:"text-sm text-slate-500 max-w-xs mb-4",children:a}),i]})}function is(){const[e,s]=c.useState(""),[a,i]=c.useState(!1),[n,l]=c.useState(null),[r,o]=c.useState(!1),[d,u]=c.useState(!1),x=async m=>{m.preventDefault();const h=e.trim();if(h){i(!0),l(null),o(!1),u(!1);try{if(!await Re(h)){o(!0),u(!0),i(!1);return}const b=await Ee(h);l(b),u(!0)}catch(p){const b=p instanceof Error?p.message:"Lookup failed";g.error(b)}finally{i(!1)}}};return t.jsxs("div",{className:"max-w-2xl mx-auto px-4 sm:px-6 py-12",children:[t.jsxs("div",{className:"flex items-center gap-3 mb-8",children:[t.jsx("div",{className:"w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center",children:t.jsx(O,{className:"w-5 h-5 text-brand-600"})}),t.jsxs("div",{children:[t.jsx("h1",{className:"text-2xl font-bold text-slate-800",children:"Verify Certificate"}),t.jsx("p",{className:"text-sm text-slate-500",children:"Enter a Certificate ID to verify its authenticity on-chain"})]})]}),t.jsxs("form",{onSubmit:x,className:"card mb-6",children:[t.jsx("label",{className:"label",children:"Certificate ID"}),t.jsxs("div",{className:"flex gap-3",children:[t.jsx("input",{className:"input flex-1",placeholder:"e.g. CERT-MIT-2024-001",value:e,onChange:m=>s(m.target.value),required:!0}),t.jsxs("button",{type:"submit",disabled:a||!e.trim(),className:"btn-primary shrink-0",children:[a?t.jsx(E,{size:"sm"}):t.jsx(Q,{className:"w-4 h-4"}),a?"Searching…":"Verify"]})]})]}),a&&t.jsx("div",{className:"flex justify-center py-12",children:t.jsx(E,{size:"lg"})}),!a&&d&&r&&t.jsx(Le,{icon:t.jsx(Q,{className:"w-8 h-8"}),title:"Certificate not found",description:`No certificate with ID "${e.trim()}" exists on-chain.`}),!a&&n&&t.jsx(Ie,{cert:n})]})}function ls(){const{publicKey:e,connected:s,connect:a,connecting:i}=K(),[n,l]=c.useState([]),[r,o]=c.useState(!1),[d,u]=c.useState(null),x=c.useCallback(async()=>{if(e){o(!0);try{const h=await Jt(e),p=await Promise.all(h.map(b=>Ee(b)));l(p)}catch(h){const p=h instanceof Error?h.message:"Failed to load certificates";g.error(p)}finally{o(!1)}}},[e]);c.useEffect(()=>{s&&x()},[s,x]);const m=async h=>{if(e&&window.confirm(`Revoke certificate "${h}"? This cannot be undone.`)){u(h);try{await Gt(h,e),g.success("Certificate revoked"),await x()}catch(p){const b=p instanceof Error?p.message:"Revocation failed";g.error(b)}finally{u(null)}}};return t.jsxs("div",{className:"max-w-3xl mx-auto px-4 sm:px-6 py-12",children:[t.jsxs("div",{className:"flex items-center justify-between mb-8",children:[t.jsxs("div",{className:"flex items-center gap-3",children:[t.jsx("div",{className:"w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center",children:t.jsx(D,{className:"w-5 h-5 text-brand-600"})}),t.jsxs("div",{children:[t.jsx("h1",{className:"text-2xl font-bold text-slate-800",children:"My Certificates"}),t.jsx("p",{className:"text-sm text-slate-500",children:"Certificates you have issued"})]})]}),s&&t.jsxs("button",{onClick:x,disabled:r,className:"btn-secondary text-sm",children:[t.jsx(ke,{className:`w-4 h-4 ${r?"animate-spin":""}`}),"Refresh"]})]}),s?r?t.jsx("div",{className:"flex justify-center py-16",children:t.jsx(E,{size:"lg"})}):n.length===0?t.jsx(Le,{icon:t.jsx(D,{className:"w-8 h-8"}),title:"No certificates yet",description:"You haven't issued any certificates from this wallet.",action:t.jsx(H,{to:"/issue",className:"btn-primary",children:"Issue your first certificate"})}):t.jsxs("div",{className:"space-y-4",children:[t.jsxs("p",{className:"text-sm text-slate-500",children:[n.length," certificate",n.length!==1?"s":""," issued"]}),n.map(h=>t.jsx(Ie,{cert:h,showRevoke:!0,onRevoke:m,revoking:d===h.id},h.id))]}):t.jsxs("div",{className:"card text-center py-12",children:[t.jsx(ne,{className:"w-10 h-10 text-slate-300 mx-auto mb-3"}),t.jsx("p",{className:"text-slate-600 font-medium mb-4",children:"Connect your wallet to view your certificates"}),t.jsx("button",{onClick:a,disabled:i,className:"btn-primary",children:i?t.jsxs(t.Fragment,{children:[t.jsx(E,{size:"sm"})," Connecting…"]}):"Connect Wallet"})]})]})}function os(){const{publicKey:e,connected:s,connecting:a,connect:i,balance:n,refreshBalance:l}=K(),[r,o]=c.useState(""),[d,u]=c.useState(""),[x,m]=c.useState(""),[h,p]=c.useState(!1),[b,A]=c.useState(!1),[L,P]=c.useState(null),B=async()=>{A(!0),await l(),A(!1)},N=async w=>{if(w.preventDefault(),!e)return;const ie=parseFloat(d);if(!r.trim()||isNaN(ie)||ie<=0){g.error("Please enter a valid destination and amount");return}if(r.trim()===e){g.error("Cannot send XLM to yourself");return}p(!0),P(null);try{const X=await Wt(e,r.trim(),d,x.trim()||void 0);P(X),g.success("XLM sent successfully!"),o(""),u(""),m(""),await l()}catch(X){g.error(X instanceof Error?X.message:"Transaction failed")}finally{p(!1)}};return t.jsxs("div",{className:"max-w-lg mx-auto px-4 sm:px-6 py-12",children:[t.jsxs("div",{className:"flex items-center gap-3 mb-8",children:[t.jsx("div",{className:"w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center",children:t.jsx(ee,{className:"w-5 h-5 text-brand-600"})}),t.jsxs("div",{children:[t.jsx("h1",{className:"text-2xl font-bold text-slate-800",children:"Send XLM"}),t.jsx("p",{className:"text-sm text-slate-500",children:"Send XLM on Stellar Testnet"})]})]}),s?t.jsxs("div",{className:"space-y-4",children:[t.jsxs("div",{className:"card bg-gradient-to-br from-brand-600 to-brand-700 text-white",children:[t.jsxs("div",{className:"flex items-center justify-between mb-1",children:[t.jsx("span",{className:"text-sm text-brand-200",children:"Your Balance"}),t.jsx("button",{onClick:B,disabled:b,className:"text-brand-200 hover:text-white transition-colors",children:t.jsx(ke,{className:`w-4 h-4 ${b?"animate-spin":""}`})})]}),t.jsx("p",{className:"text-3xl font-bold tracking-tight",children:n!==null?`${n} XLM`:"—"}),t.jsx("p",{className:"text-xs text-brand-300 mt-2 font-mono",children:se(e)})]}),t.jsxs("form",{onSubmit:N,className:"card space-y-4",children:[L&&t.jsx(Te,{hash:L}),t.jsxs("div",{children:[t.jsxs("label",{className:"label",children:["Destination Address ",t.jsx("span",{className:"text-red-500",children:"*"})]}),t.jsx("input",{className:"input font-mono text-xs",placeholder:"G…",value:r,onChange:w=>o(w.target.value),required:!0})]}),t.jsxs("div",{children:[t.jsxs("label",{className:"label",children:["Amount (XLM) ",t.jsx("span",{className:"text-red-500",children:"*"})]}),t.jsx("input",{className:"input",type:"number",min:"0.0000001",step:"0.0000001",placeholder:"0.00",value:d,onChange:w=>u(w.target.value),required:!0})]}),t.jsxs("div",{children:[t.jsx("label",{className:"label",children:"Memo (optional)"}),t.jsx("input",{className:"input",placeholder:"Optional text memo",maxLength:28,value:x,onChange:w=>m(w.target.value)})]}),t.jsx("button",{type:"submit",disabled:h,className:"btn-primary w-full justify-center",children:h?t.jsxs(t.Fragment,{children:[t.jsx(E,{size:"sm"})," Sending…"]}):t.jsxs(t.Fragment,{children:[t.jsx(ee,{className:"w-4 h-4"})," Send XLM"]})})]})]}):t.jsxs("div",{className:"card text-center py-12",children:[t.jsx(ne,{className:"w-10 h-10 text-slate-300 mx-auto mb-3"}),t.jsx("p",{className:"text-slate-600 font-medium mb-4",children:"Connect your wallet to send XLM"}),t.jsx("button",{onClick:i,disabled:a,className:"btn-primary",children:a?t.jsxs(t.Fragment,{children:[t.jsx(E,{size:"sm"})," Connecting…"]}):"Connect Wallet"})]})]})}function cs(){return t.jsxs("div",{className:"min-h-screen flex flex-col",children:[t.jsx(ts,{}),t.jsx("main",{className:"flex-1",children:t.jsxs(Oe,{children:[t.jsx($,{path:"/",element:t.jsx(as,{})}),t.jsx($,{path:"/issue",element:t.jsx(rs,{})}),t.jsx($,{path:"/verify",element:t.jsx(is,{})}),t.jsx($,{path:"/my-certificates",element:t.jsx(ls,{})}),t.jsx($,{path:"/send",element:t.jsx(os,{})})]})}),t.jsx("footer",{className:"py-6 text-center text-sm text-slate-400 border-t border-slate-100",children:"CertChain — Powered by Stellar Soroban · Testnet"})]})}J.createRoot(document.getElementById("root")).render(t.jsx($e.StrictMode,{children:t.jsxs(Me,{children:[t.jsx(cs,{}),t.jsx(Tt,{position:"top-right",toastOptions:{duration:5e3,style:{borderRadius:"12px",fontSize:"14px"}}})]})}));
