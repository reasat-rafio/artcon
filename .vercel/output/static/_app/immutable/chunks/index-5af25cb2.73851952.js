import{s as b,j as n,P as j,_ as P,u as g,f as L,b as _,c as k,d as B,e as w,A,q as C,r as x,B as O,G as T,E as D}from"./4.0538efa9.js";import{P as S}from"./PaneItem-51d63fac.041cda05.js";var v;function E(o,t){return t||(t=o.slice(0)),Object.freeze(Object.defineProperties(o,{raw:{value:Object.freeze(t)}}))}const G=o=>{let{index:t,menuItems:a,menuItemGroups:i,title:c}=o;const{features:r}=g(),{collapsed:l,isLast:p}=L(),u=p&&!l?-1:0;return n.jsx(_,{actions:n.jsx(k,{menuItems:a,menuItemGroups:i}),backButton:r.backButton&&t>0&&n.jsx(B,{as:w,"data-as":"a",icon:A,mode:"bleed"}),tabIndex:u,title:c})},H=b.hr(v||(v=E([`
  background-color: var(--card-border-color);
  height: 1px;
  margin: 0;
  border: none;
`])));function W(o){const{childItemId:t,items:a,isActive:i,layout:c,showIcons:r,title:l}=o,{collapsed:p}=C(),u=x.useCallback(e=>{var s;return((s=a==null?void 0:a.find((d,h)=>h===e))==null?void 0:s.type)==="divider"},[a]),m=x.useCallback(e=>{var s;const d=(s=e.displayOptions)==null?void 0:s.showIcon;return typeof d<"u"?d!==!1:r!==!1},[r]),f=x.useCallback((e,s)=>{const{virtualIndex:d}=s;if(e.type==="divider")return n.jsx(O,{marginTop:1,marginBottom:2,children:n.jsx(H,{})},"divider-".concat(d));const h=!i&&t===e.id,I=i&&t===e.id,y=e._id&&e.schemaType?{_id:e._id,_type:e.schemaType.name,title:e.title}:void 0;return n.jsx(S,{icon:m(e)?e.icon:!1,id:e.id,layout:c,marginBottom:1,pressed:h,schemaType:e.schemaType,selected:I,title:e.title,value:y},e.id)},[t,i,c,m]);return n.jsx(T,{overflow:p?"hidden":"auto",children:a&&a.length>0&&n.jsx(D,{activeItemDataAttr:"data-hovered",ariaLabel:"List of ".concat(l),canReceiveFocus:!0,focusRingOffset:-3,getItemDisabled:u,itemHeight:51,items:a,onlyShowSelectionWhenActive:!0,padding:2,paddingBottom:1,renderItem:f,wrapAround:!1})})}function F(o){const{childItemId:t,index:a,isActive:i,isSelected:c,pane:r,paneKey:l}=o,{defaultLayout:p,displayOptions:u,items:m,menuItems:f,menuItemGroups:e,title:s}=r,d=(u==null?void 0:u.showIcons)!==!1;return n.jsxs(j,{currentMaxWidth:350,"data-testid":"desk-tool-list-pane","data-ui":"ListPane",id:l,maxWidth:640,minWidth:320,selected:c,children:[P,n.jsx(G,{index:a,menuItems:f,menuItemGroups:e,title:s}),n.jsx(W,{childItemId:t,isActive:i,items:m,layout:p,showIcons:d,title:s},l)]})}export{F as default};
