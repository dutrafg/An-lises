/** Execução em segundo plano via Worker Threads. */
'use strict';
const {parentPort,isMainThread}=require('node:worker_threads');
if(isMainThread)throw new Error('worker.js deve ser iniciado via new Worker(...)');
const {analyze}=require('./index.js');
parentPort.on('message',({jobId,request}={})=>{try{parentPort.postMessage({jobId,success:true,result:analyze(request)})}catch(e){parentPort.postMessage({jobId,success:false,error:{name:e.name,message:e.message}})}});
