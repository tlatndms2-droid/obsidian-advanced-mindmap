import {build} from 'esbuild';import assert from 'node:assert/strict';
const result=await build({entryPoints:['src/runtime-cleanup.ts'],bundle:true,write:false,format:'esm'});
const {registerRuntimeCleanup}=await import('data:text/javascript;base64,'+Buffer.from(result.outputFiles[0].text).toString('base64'));
const hooks=[],host={register:cb=>hooks.push(cb)},live={},calls=[];
registerRuntimeCleanup(host,live,()=>calls.push('first'));registerRuntimeCleanup(host,live,()=>calls.push('second'));
assert.equal(hooks.length,1);
let removed={payload:Array(10000).fill('removed')};const ref=new WeakRef(removed);
{const captured=removed;registerRuntimeCleanup(host,removed,()=>calls.push(captured.payload.length));}removed=null;
for(let i=0;i<10;i++){await new Promise(r=>setTimeout(r,0));global.gc();}
assert.equal(ref.deref(),undefined,'cleanup closure must not retain the removed target');
hooks[0]();assert.deepEqual(calls,['second','first']);console.log('PASS removed objects collected; live hooks restored in reverse order using one host hook');
