/** Análises 0.1.0: oito motores EFIA sem qualquer interface gráfica. */
'use strict';
const vm=require('node:vm'),fs=require('node:fs'),path=require('node:path');
const scripts=['context-bootstrap.js','ef68.js','ef70.js','efia-safety.js','efia-lab-evidence.js','efia-local.js','efia-anthropometry.js','efia-host.js'];
const code=new Map(scripts.map(name=>[name,fs.readFileSync(path.join(__dirname,'core',name),'utf8')]));
const calculators=require('./core/ef77.js');
const VERSION='0.1.0';
function analyze({records,profileKey,selectedIds,includeEvidence=false}={}){
 if(!Array.isArray(records))throw new TypeError('records deve ser um array');
 if(records.length>500)throw new RangeError('Máximo de 500 registros por execução');
 if(!profileKey||typeof profileKey!=='string')throw new TypeError('profileKey deve ser uma string não vazia');
 if(!Array.isArray(selectedIds))throw new TypeError('selectedIds deve ser um array de IDs');
 const input=structuredClone(records);
 const state={version:1,getAvaliacoes:()=>input,touch:()=>{}};
 const ctx={console:{warn(){},log(){},error(){}},structuredClone,__EF63_STATE__:state,avaliacoes:input};
 ctx.window=ctx;ctx.globalThis=ctx;ctx.EF77=Object.freeze({version:'8.7',calc:calculators});
 const sandbox=vm.createContext(ctx,{name:'analises-headless'});
 for(const [name,source] of code)vm.runInContext(source,sandbox,{filename:name,timeout:5000});
 const result=sandbox.EFIAHost.analyze({host:sandbox,profileKey,selectedIds});
 if(!result||result.error)return {version:VERSION,ok:false,eligible:false,reason:result?.reason||'Erro de execução',warnings:[],engines:{}};
 const publicResult={version:VERSION,ok:result.ok===true,eligible:result.eligible===true,reason:result.reason||'',warnings:result.warnings||[],summary:result.summary||'',selectedCount:selectedIds.length,engines:result.engines||{}};
 if(includeEvidence)publicResult.evidence={dates:result.dates,spanDays:result.spanDays};
 return JSON.parse(JSON.stringify(publicResult,(k,v)=>typeof v==='number'&&!Number.isFinite(v)?null:v));
}
module.exports=Object.freeze({VERSION,analyze,EF77:calculators});
