import{_ as r,d as i,r as d,o as a,c as _,a as m,b as s,w as n,e as c}from"./index.c0e525d3.js";const f=e=>{const o=document.getElementById("vueAdminBoxTabCloseSelf");e&&(o==null||o.setAttribute("nextpath",e)),o==null||o.click(),e&&setTimeout(()=>{o==null||o.removeAttribute("nextpath")},100)},C=()=>{const e=document.getElementById("vueAdminBoxTabCloseOther");e==null||e.click()},p=()=>{const e=document.getElementById("vueAdminBoxTabCloseAll");e==null||e.click()},h=()=>{const e=document.getElementById("vueAdminBoxTabRefresh");e==null||e.click()},B=i({setup(){return{closeCurrent:()=>{f()},closeOther:()=>{C()},closeAll:()=>{p()},refresh:()=>{h()}}}}),k={class:"layout-container"},A={style:{"text-align":"left",padding:"15px"}},E=c("\u91CD\u65B0\u52A0\u8F7D"),T=c("\u5173\u95ED\u5F53\u524D\u6807\u7B7E"),v=c("\u5173\u95ED\u5176\u4ED6\u6807\u7B7E"),y=c("\u5173\u95ED\u6240\u6709\u6807\u7B7E");function x(e,o,l,u,D,g){const t=d("el-button");return a(),_("div",k,[m("div",A,[s(t,{onClick:e.refresh},{default:n(()=>[E]),_:1},8,["onClick"]),s(t,{onClick:e.closeCurrent},{default:n(()=>[T]),_:1},8,["onClick"]),s(t,{type:"primary",onClick:e.closeOther},{default:n(()=>[v]),_:1},8,["onClick"]),s(t,{type:"success",onClick:e.closeAll},{default:n(()=>[y]),_:1},8,["onClick"])])])}var O=r(B,[["render",x]]);export{O as default};
