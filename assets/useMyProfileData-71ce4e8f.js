import{a as p}from"./axios-21b846bc.js";import{r as s}from"./index-c362957b.js";import{e as d}from"./urlsUsers-ca1c08d1.js";function l(){var o,r;const[e,n]=s.useState({});async function c(){try{const t=window.localStorage.getItem("token"),f=await p.get(d,{headers:{Authorization:`Token ${t}`}});n(f.data)}catch(t){console.log(t)}}s.useEffect(()=>{c()},[]);const a=(o=e==null?void 0:e.user)==null?void 0:o.username,i=(r=e==null?void 0:e.user)==null?void 0:r.id,u=e==null?void 0:e.descripcion;return{myUserData:e,myUsername:a,myUserId:i,myUserDescription:u}}export{l as u};
