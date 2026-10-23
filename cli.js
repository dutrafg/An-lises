#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),{analyze}=require('./index.js');
try{const input=JSON.parse(process.argv[2]?fs.readFileSync(process.argv[2],'utf8'):fs.readFileSync(0,'utf8'));const result=analyze(input);console.log(JSON.stringify(result,null,2));process.exitCode=result.ok?0:2}catch(e){console.error(JSON.stringify({ok:false,error:e.message}));process.exitCode=1}
