'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{Worker}=require('node:worker_threads');
const {analyze,EF77}=require('../index.js'),base=JSON.parse(fs.readFileSync(path.join(__dirname,'../examples/historico.json')));
const clone=x=>structuredClone(x);let count=0;
function test(name,fn){try{fn();console.log('PASS',name);count++}catch(e){console.error('FAIL',name,e.message);process.exitCode=1}}
test('Oito motores reais',()=>{const x=analyze(base);assert(x.eligible);assert.deepEqual(Object.keys(x.engines).sort(),['EF68','EF70','EF77','EF78','EF79','EF80','EF81','EF82'].sort());assert.equal(x.engines.EF79.results.peso.change,-2.4)});
test('Entrada imutável',()=>{const x=clone(base),raw=JSON.stringify(x);analyze(x);assert.equal(JSON.stringify(x),raw)});
test('Reprodutível',()=>assert.deepEqual(analyze(base),analyze(base)));
test('Troca de método bloqueia composição',()=>{const x=clone(base);delete x.records[2].dobras_resultado;const y=analyze(x);assert.equal(y.engines.EF79.results.gordura.change,null);assert.equal(y.engines.EF79.results.massaMagra.change,null)});
test('Identidade diferente bloqueada',()=>{const x=clone(base);x.records[1].cliente_id='outro';assert(!analyze(x).eligible)});
test('Datas duplicadas bloqueadas',()=>{const x=clone(base);x.records[1].data_avaliacao=x.records[0].data_avaliacao;assert(!analyze(x).eligible)});
test('Menos de 3 registros bloqueia',()=>{const x=clone(base);x.records=x.records.slice(0,2);x.selectedIds=x.selectedIds.slice(0,2);assert(!analyze(x).eligible)});
test('Intervalo curto bloqueia',()=>{const x=clone(base);x.records.forEach((r,i)=>r.data_avaliacao='2026-01-0'+(i+1));assert(!analyze(x).eligible)});
test('Número malformado bloqueia',()=>{const x=clone(base);x.records[1].peso='80kg';assert(!analyze(x).eligible)});
test('Massa impossível bloqueia composição',()=>{const x=clone(base);x.records[3].dobras_resultado.massaMagra=x.records[3].peso+20;const r=analyze(x);assert.equal(r.engines.EF79.results.gordura.change,null);assert.equal(r.engines.EF79.results.massaMagra.change,null)});
test('Sem DOM ou interface',()=>{const core=fs.readdirSync(path.join(__dirname,'../core')).map(n=>fs.readFileSync(path.join(__dirname,'../core',n),'utf8')).join('\n');assert(!core.includes('document.createElement'));assert(!core.includes('innerHTML='))});
test('EF77 preservado',()=>assert(Math.abs(EF77.whtr(175,88)-88/175)<1e-9));
(async()=>{try{const w=new Worker(path.join(__dirname,'../worker.js'));const x=await new Promise((resolve,reject)=>{w.once('message',resolve);w.once('error',reject);w.postMessage({jobId:'test',request:base})});assert(x.success&&x.result.eligible&&x.jobId==='test');await w.terminate();count++;console.log('PASS worker_threads')}catch(e){process.exitCode=1;console.error('FAIL Worker',e.message)}console.log('Total de testes aprovados:',count)})();
