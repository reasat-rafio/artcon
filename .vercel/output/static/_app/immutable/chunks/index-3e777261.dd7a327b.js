import{s as q,B as M,r as o,u as Fe,f as pe,j as t,b as De,c as ke,d as he,e as Ne,A as Be,W as $e,S as Qe,C as fe,g as te,h as We,i as Ye,k as qe,l as Ue,P as Ve,_ as ze,m as He,n as Ge,o as Ke,p as Xe,q as Je,t as Ze,F as Q,v as et,T as W,w as K,x as ye,H as tt,y as nt,z as st,E as rt,G as at,I as ot,J as it,K as ct,L as ge,M as lt,N as se,O as X,Q as ut,R as Se,U as dt,V as xe,X as J,Y,Z as mt,$ as pt,a0 as ht,a1 as re,a2 as ft,a3 as yt,a4 as gt,a5 as St,a6 as xt,a7 as It,a8 as jt,a9 as bt,aa as vt,ab as Tt,ac as Lt,ad as Rt,ae as Et}from"./4.0538efa9.js";import{useDeskToolSetting as ae}from"./index-0de920bc.5ab2b5c3.js";import{P as _t}from"./PaneItem-51d63fac.041cda05.js";var oe,ie,ce,le,ue;function B(r,e){return e||(e=r.slice(0)),Object.freeze(Object.defineProperties(r,{raw:{value:Object.freeze(e)}}))}const de=100,Z=2e3,Ie={by:[{field:"_updatedAt",direction:"desc"}]},wt={};function Ct(r){return xt(r).map(e=>({...e.draft||e.published,hasPublished:!!e.published,hasDraft:!!e.draft}))}const Pt=/\b_type\s*==\s*(['"].*?['"]|\$.*?(?:\s|$))|\B(['"].*?['"]|\$.*?(?:\s|$))\s*==\s*_type\b/;function je(r){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const s=r.match(Pt);if(!s)return null;const n=(s[1]||s[2]).trim().replace(/^["']|["']$/g,"");if(n[0]==="$"){const a=n.slice(1),d=e[a];return typeof d=="string"?d:null}return n}function At(r){return/^_type\s*==\s*['"$]\w+['"]?\s*$/.test(r.trim())}function Ot(r,e){const s=r.by.map(n=>{if(n.mapWith)return n;const a=Mt(e,n.field);return a?Dt(a,"datetime")?{...n,mapWith:"dateTime"}:a.jsonType==="string"?{...n,mapWith:"lower"}:n:n});return s.every((n,a)=>n===r.by[a])?r:{...r,by:s}}function Mt(r,e){const s=He(e);let n=r;for(const a of s){if(!n)return;if(typeof a=="string"){n=Ft(n,a);continue}if(!(Ge(a)||Ke(a))||n.jsonType!=="array")return;const[c,u]=n.of||[];if(u||!c)return;if(!Xe(c)){n=c;continue}const[l,p]=c.to||[];if(p||!l)return;n=l}return n}function Ft(r,e){if(!("fields"in r))return;const s=r.fields.find(n=>n.name===e);return s?s.type:void 0}function Dt(r,e){let s=r.type;for(;s;){if(s.name===e||!s.type&&s.jsonType===e)return!0;s=s.type}return!1}const kt=q(M)(oe||(oe=B([`
  position: relative;
`]))),Nt=q(M)(ie||(ie=B([`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`]))),Bt=[...Array(30).keys()];function $t(r){const{layout:e}=r;return t.jsx(ye,{padding:2,space:1,children:Bt.map(s=>t.jsx(fe,{padding:2,children:t.jsx(It,{isPlaceholder:!0,layout:e})},s))})}function Qt(r){const{childItemId:e,error:s,filterIsSimpleTypeConstraint:n,hasMaxItems:a,hasSearchQuery:d,isActive:c,isLazyLoading:u,isLoading:l,items:p,layout:g,loadingVariant:f,onListChange:S,onRetry:T,paneTitle:m,searchInputElement:y,showIcons:L}=r,R=te(),{collapsed:h}=Je(),{collapsed:x,index:b}=pe(),[v,w]=o.useState(!1),F=o.useCallback(()=>{l||u||!v||S()},[u,l,S,v]);o.useEffect(()=>{if(x)return;const i=setTimeout(()=>{w(!0)},0);return()=>{clearTimeout(i)}},[x,p]);const E=o.useCallback((i,C)=>{let{activeIndex:P}=C;const A=Ze(i._id),I=e===A,j=!c&&I,U=c&&I,O=P===p.length-1,V=O&&u,z=O&&a;return t.jsxs(t.Fragment,{children:[t.jsx(_t,{icon:L===!1?!1:void 0,id:A,layout:g,marginBottom:1,pressed:j,schemaType:R.get(i._type),selected:U,value:i}),V&&t.jsx(Q,{align:"center",justify:"center",padding:4,children:t.jsx(et,{muted:!0})}),z&&t.jsx(M,{marginY:1,paddingX:3,paddingY:4,children:t.jsxs(W,{align:"center",muted:!0,size:1,children:["Displaying a maximum of ",Z," documents"]})})]})},[e,c,p.length,g,R,L,a,u]),D=o.useMemo(()=>d?t.jsx(Q,{align:"center",direction:"column",height:"fill",justify:"center",children:t.jsx(K,{width:1,children:t.jsx(M,{paddingX:4,paddingY:5,children:t.jsx(W,{align:"center",muted:!0,children:"No results found"})})})}):t.jsx(Q,{align:"center",direction:"column",height:"fill",justify:"center",children:t.jsx(K,{width:1,children:t.jsx(M,{paddingX:4,paddingY:5,children:t.jsx(W,{align:"center",muted:!0,children:n?"No documents of this type":"No matching documents"})})})}),[n,d]),_=o.useMemo(()=>{if(!v)return null;if(s)return t.jsx(Q,{align:"center",direction:"column",height:"fill",justify:"center",children:t.jsx(K,{width:1,children:t.jsxs(ye,{paddingX:4,paddingY:5,space:4,children:[t.jsx(tt,{as:"h3",children:"Could not fetch list items"}),t.jsxs(W,{as:"p",children:["Error: ",t.jsx("code",{children:s.message})]}),T&&t.jsx(M,{children:t.jsx(he,{icon:nt,onClick:T,text:"Retry",tone:"primary"})})]})})});if(!l&&p.length===0)return D;if(f==="initial"&&l)return t.jsx(st,{ms:300,children:t.jsx($t,{layout:g})});if(f==="spinner"&&l)return null;const i="".concat(b,"-").concat(x);return t.jsx(kt,{overflow:"hidden",height:"fill",children:t.jsx(Nt,{children:t.jsx(rt,{activeItemDataAttr:"data-hovered",ariaLabel:m,canReceiveFocus:!0,focusRingOffset:-3,inputElement:y,itemHeight:51,items:p,onEndReached:F,onlyShowSelectionWhenActive:!0,overscan:10,padding:2,paddingBottom:1,renderItem:E,wrapAround:!1},i)})})},[x,s,F,b,l,p,g,f,T,E,y,v]);return t.jsx(at,{overflow:h||f==="initial"?"hidden":"auto",children:_})}const be=o.memo(r=>{let{contentAfter:e,index:s,initialValueTemplates:n=[],menuItemGroups:a=[],menuItems:d=[],setLayout:c,setSortOrder:u,title:l}=r;const{features:p}=Fe(),{collapsed:g,isLast:f}=pe(),S=f&&!g?-1:0,T=o.useMemo(()=>({setLayout:m=>{let{layout:y}=m;c(y)},setSortOrder:m=>{u(m)}}),[c,u]);return t.jsx(De,{actions:t.jsx(ke,{initialValueTemplateItems:n,actionHandlers:T,menuItemGroups:a,menuItems:d}),backButton:p.backButton&&s>0&&t.jsx(he,{as:Ne,"data-as":"a",icon:Be,mode:"bleed"}),contentAfter:e,tabIndex:S,title:l})});be.displayName="DocumentListPaneHeader";function Wt(r){const{client:e,schema:s,sort:n,limit:a,params:d,filter:c,searchQuery:u,staticTypeNames:l}=r,p=n.by,g=n==null?void 0:n.extendedProjection,f=jt(()=>e.listen("*[".concat(c,"]"),d,{events:["welcome","mutation","reconnect"],includeResult:!1,visibility:"query"})).pipe(J((m,y)=>y===0&&m.type!=="welcome"?X(()=>new Error(m.type==="reconnect"?"Could not establish EventSource connection":'Received unexpected type of first event "'.concat(m.type,'"'))):Y(m)),bt()),[S,T]=vt(f,m=>m.type==="welcome");return Se(S.pipe(xe(1)),T.pipe(Tt(1e3,Rt,{leading:!0,trailing:!0}))).pipe(Lt(()=>(l?Y(l):e.observable.fetch("array::unique(*[".concat(c,"][]._type)"),d)).pipe(J(y=>{const L=y.flatMap(v=>s.get(v)||[]),R={filter:c,query:u||"",types:L},h={__unstable_extendedProjection:g,comments:["findability-source: ".concat(u?"list-query":"list")],limit:a,params:d,sort:p},{query:x,params:b}=Et(R,h);return e.observable.fetch(x,b)}))))}const Yt=[],me={error:null,onRetry:void 0,result:null},qt={result:null,error:null};function Ut(r){const{filter:e,params:s,sortOrder:n,searchQuery:a}=r,d=ot(it),c=te(),[u,l]=o.useState(me),{onRetry:p,error:g,result:f}=u,S=f==null?void 0:f.documents,T=o.useMemo(()=>S?Ct(S):Yt,[S]),[m,y]=o.useState(!1),[L,R]=o.useState(!1),[h,x]=o.useState(!1),b=o.useMemo(()=>je(e,s),[e,s]),v=f===null&&!g,w=(S==null?void 0:S.length)===Z,F=o.useCallback(()=>{v||L||h||x(!0)},[v,L,h]),E=o.useCallback(i=>{var C,P;if(i.error){l(i);return}const A=((P=(C=i.result)==null?void 0:C.documents)==null?void 0:P.length)||0;if(!i.error&&(i==null?void 0:i.result)===null&&h){y(!0);return}if(A<de&&A!==0&&!h&&R(!0),(i==null?void 0:i.result)===null){l(j=>({...j.error?i:j}));return}y(!1),l(i)},[h]),D=o.useMemo(()=>{const i=new ct,C=()=>i.next();return Wt({client:d,filter:e,limit:h?Z:de,params:s,schema:c,searchQuery:a||"",sort:n||Ie,staticTypeNames:b?[b]:void 0}).pipe(ge(I=>({result:{documents:I},error:null})),lt(qt),se(I=>I instanceof ProgressEvent?X(()=>new Error("Request error")):X(()=>I)),se((I,j)=>ut(Y({result:null,error:I}),Se(dt(window,"online"),i).pipe(xe(1),J(()=>j)))),mt((I,j)=>({...I,...j,onRetry:C})))},[d,e,s,c,a,h,n,b]);o.useEffect(()=>{const i=D.subscribe(E);return()=>{i.unsubscribe()}},[E,D]);const _=o.useCallback(()=>{R(!1),y(!1),l(me),x(!1)},[]);return o.useEffect(()=>{_()},[_,e,s,n,a]),{error:g,hasMaxItems:w,isLazyLoading:m,isLoading:v,isSearchReady:!g,items:T,onListChange:F,onRetry:p}}const ee=[],Vt=$e(ce||(ce=B([`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`]))),zt=q(Qe)(le||(le=B([`
  animation: `,` 500ms linear infinite;
`])),Vt),Ht=q(fe)(ue||(ue=B([`
  [data-ui='TextInput'] {
    border-radius: inherit;
  }
`])));function Gt(r){const e=o.useRef(r);return pt(e.current,r)||(e.current=r),e.current}const Kt=r=>{const{menuItems:e,sortOrderRaw:s,layout:n}=r;return e==null?void 0:e.map(a=>{var d,c,u,l;return(d=a.params)!=null&&d.layout?{...a,selected:n===((c=a.params)==null?void 0:c.layout)}:(u=a==null?void 0:a.params)!=null&&u.by?{...a,selected:ht(s==null?void 0:s.by,((l=a==null?void 0:a.params)==null?void 0:l.by)||ee)}:{...a,selected:!1}})},en=o.memo(function(e){const{childItemId:s,index:n,isActive:a,isSelected:d,pane:c,paneKey:u}=e,l=te(),{name:p}=We(),{defaultLayout:g="default",displayOptions:f,initialValueTemplates:S=ee,menuItemGroups:T,menuItems:m,options:y,title:L}=c,{apiVersion:R,defaultOrdering:h=ee,filter:x}=y,b=Gt(y.params||wt),v=c.source,w=o.useMemo(()=>je(x,b),[x,b]),F=(f==null?void 0:f.showIcons)!==!1,[E,D]=ae(w,"layout",g),[_,i]=o.useState(""),[C,P]=o.useState(""),[A,I]=o.useState(null),j=o.useRef(!1),U=o.useMemo(()=>(h==null?void 0:h.length)>0?{by:h}:Ie,[h]),[O,V]=ae(w,"sortOrder",U),z=w&&O?Ot(O,l.get(w)):O,ve=Ye(z),Te=At(x),{error:Le,hasMaxItems:Re,isLazyLoading:Ee,isLoading:k,isSearchReady:_e,items:H,onListChange:we,onRetry:Ce}=Ut({apiVersion:R,filter:x,params:b,searchQuery:_==null?void 0:_.trim(),sortOrder:ve}),Pe=o.useMemo(()=>Kt({menuItems:m,sortOrderRaw:O,layout:E}),[E,m,O]),Ae=qe($=>$.pipe(ge(G=>G.target.value),re(P),ft(G=>G===""?Y(""):yt(300)),re(i)),[]),N=o.useCallback(()=>{i(""),P("")},[]),Oe=o.useCallback($=>{$.key==="Escape"&&N()},[N]);o.useEffect(()=>(j.current===!1&&!k&&(j.current=!0),()=>{j.current=!1}),[k]),o.useEffect(()=>{N(),j.current=!1},[u,N]);const ne=o.useMemo(()=>k&&H.length===0&&j.current?"spinner":"initial",[k,H.length]),Me=t.jsx(M,{paddingX:2,paddingBottom:2,children:t.jsx(Ht,{radius:4,tone:"transparent",children:t.jsx(gt,{"aria-label":"Search list",autoComplete:"off",border:!1,clearButton:!!_,disabled:!_e,fontSize:[2,2,1],icon:ne==="spinner"?zt:St,onChange:Ae,onClear:N,onKeyDown:Oe,placeholder:"Search list",radius:2,ref:I,spellCheck:!1,value:C})})});return t.jsx(Ue,{name:v||p,children:t.jsxs(Ve,{currentMaxWidth:350,"data-ui":"DocumentListPane",id:u,maxWidth:640,minWidth:320,selected:d,children:[ze,t.jsx(be,{contentAfter:Me,index:n,initialValueTemplates:S,menuItemGroups:T,menuItems:Pe,setLayout:D,setSortOrder:V,title:L}),t.jsx(Qt,{childItemId:s,error:Le,filterIsSimpleTypeConstraint:Te,hasMaxItems:Re,hasSearchQuery:!!_,isActive:a,isLazyLoading:Ee,isLoading:k,items:H,layout:E,loadingVariant:ne,onListChange:we,onRetry:Ce,paneTitle:L,searchInputElement:A,showIcons:F},u)]})})});export{en as default};
