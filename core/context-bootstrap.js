/* Adaptador sem interface, sem armazenamento e sem rede. */
'use strict';
window.EFU=Object.freeze({
 num(v) {if(v===null||v===undefined||typeof v==='boolean'||typeof v==='object'||String(v).trim()==='')return null;const n=typeof v==='number'?v:Number(String(v).trim().replace(',','.'));return Number.isFinite(n)?n:null;},
 norm(v){return String(v??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();}
});
window.EFIdentity=Object.freeze({key:r=>r&&typeof r==='object'?String(r.cliente_id||''):String(r||'')});
window.EFMeasures=Object.freeze({lean(r){return window.EFU.num(r?.dobras_resultado?.massaMagra)},muscle(r){return window.EFU.num(r?.bioimpedancia?.mme)}});
