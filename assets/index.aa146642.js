import{r as g,p as l,i as u,a as f,o as a,b,h as d,d as E,s as x,c as S,e as m,f as D,g as p,w as L,S as P,n as j,u as h,j as c,k as C,l as O}from"./vendor.cf152695.js";const $=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerpolicy&&(r.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?r.credentials="include":t.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}};$();const I="modulepreload",y={},R="/",v=function(e,o){return!o||o.length===0?e():Promise.all(o.map(n=>{if(n=`${R}${n}`,n in y)return;y[n]=!0;const t=n.endsWith(".css"),r=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${n}"]${r}`))return;const i=document.createElement("link");if(i.rel=t?"stylesheet":I,t||(i.as="script",i.crossOrigin=""),i.href=n,document.head.appendChild(i),t)return new Promise((k,A)=>{i.addEventListener("load",k),i.addEventListener("error",A)})})).then(()=>e())},_="useRoute",N=s=>{const e=g();return e.value=s,l(_,e.value),e.value},H=s=>`${u(_)}-${s}`,w="useAim",V={type:"",component:"",visibile:!1,isAimStatus:!1,setVisibile(s){this.visibile=s},setIsAimStatus(s){this.isAimStatus=s},openDrawer(){this.component="",this.type="",this.setVisibile(!0)},closeDrawer(){this.component="",this.type="",this.setVisibile(!1),this.setIsAimStatus(!1)}},q=()=>{const s=f(V),e=o=>{switch(o.key){case"Escape":return s.setIsAimStatus(!1),null;default:return null}};return a(()=>{window.addEventListener("keydown",e,!1)}),b(()=>{window.removeEventListener("keydown",e,!1)}),l(w,f(s)),s},K=()=>u(w),z=s=>(a(()=>{Object.entries(s).forEach(([,e])=>{e.keys.forEach(o=>{d(o.join("+"),e.callback)})})}),{unbind(){Object.entries(s).forEach(([e,o])=>{d.unbind(o.keys.join("+"),e)})}}),B="http://localhost:10078/web-devtools",M=s=>fetch(`${B}/${s}`).then(e=>e.json());const T=E({setup(s){const e=q(),o=N("vd"),n=x(S("span",{}));return z({toggle_drawer:{keys:[["command","shift","z"],["ctrl","shift","z"]],callback(){e.visibile?e.closeDrawer():e.openDrawer()}},toggle_aim:{keys:[["command","shift","x"],["ctrl","shift","x"]],callback(){e.setIsAimStatus(!e.isAimStatus)}}}),a(async()=>{if(window.isDemo){n.value=m(()=>v(()=>import("./AimMode.cd3c7a39.js"),["assets/AimMode.cd3c7a39.js","assets/AimMode.6a847ef2.css","assets/vendor.cf152695.js"]));return}const{mode:t}=await M("getConfig");t==="aim"&&(n.value=m(()=>v(()=>import("./AimMode.cd3c7a39.js"),["assets/AimMode.cd3c7a39.js","assets/AimMode.6a847ef2.css","assets/vendor.cf152695.js"])))}),(t,r)=>(c(),D("div",{class:j(`${h(o)}-pos`)},[(c(),p(P,null,{default:L(()=>[(c(),p(C(h(n))))]),_:1}))],2))}});O(T).mount("#dev-tools");export{K as a,H as u};