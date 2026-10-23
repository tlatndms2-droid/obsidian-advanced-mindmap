import {build} from 'esbuild';import assert from 'node:assert/strict';
const out=await build({entryPoints:['src/settings-backup.ts'],bundle:true,write:false,format:'esm',platform:'node'});const {makeBackup,parseBackup,settingsOnly,settingKeys}=await import('data:text/javascript;base64,'+Buffer.from(out.outputFiles[0].text).toString('base64'));
const source={mode:'connect',width:500,height:100,gap:100,resizeStep:20,swapTolerance:40,autoResize:true,panDuration:250,panStep:60,zoomStepPercent:(2**0.1-1)*100,followCaret:true,editMinZoom:125,origins:{a:'b'},customColors:['#ff0000'],managerSize:{width:500,height:400},canvas:{nodes:[{id:'keep'}]}};
assert.deepEqual(Object.keys(JSON.parse(makeBackup(source)).settings),[...settingKeys]);const before=structuredClone(source);assert.deepEqual(parseBackup(makeBackup(source)),settingsOnly(source));assert.deepEqual(source,before);
for(const key of ['origins','customColors','managerSize','canvas'])assert(!Object.hasOwn(parseBackup(makeBackup(source)),key));
let rejected=0;for(const transform of [f=>{f.version=2},f=>{delete f.settings.gap},f=>{f.settings.managerSize={}},f=>{f.settings.width=-1},f=>{f.settings.height=0},f=>{f.settings.resizeStep=0},f=>{f.settings.mode='bad'},f=>{f.settings.autoResize=1},f=>{f.settings.followCaret='true'},f=>{f.settings.editMinZoom=201},f=>{f.settings.panDuration='250'},f=>{f.settings.gap=null},f=>{f.settings=[]}]){const file=JSON.parse(makeBackup(source));transform(file);assert.throws(()=>parseBackup(JSON.stringify(file)));rejected++;}assert.throws(()=>parseBackup('{broken'));rejected++;
assert.deepEqual(parseBackup(makeBackup({...source,width:null,height:null})),settingsOnly({...source,width:null,height:null}));assert.deepEqual(source,before);
console.log('PASS settings whitelist/roundtrip/default dimensions and '+rejected+' invalid backups rejected before applying. Native dialogs/storage are not exercised.');

const legacy=JSON.parse(makeBackup(source));legacy.settings.autoResize=true;assert.deepEqual(parseBackup(JSON.stringify(legacy)),settingsOnly(source));assert(!Object.hasOwn(settingsOnly(source),"autoResize"));

const old=JSON.parse(makeBackup(source));delete old.settings.panStep;delete old.settings.zoomStepPercent;assert.deepEqual(parseBackup(JSON.stringify(old)),settingsOnly(source));
for(const bad of [0,-1,'20',null]){const f=JSON.parse(makeBackup(source));f.settings.panStep=bad;assert.throws(()=>parseBackup(JSON.stringify(f)));}
const custom={...source,panStep:120,zoomStepPercent:15};assert.deepEqual(parseBackup(makeBackup(custom)),settingsOnly(custom));
const legacyDepth=JSON.parse(makeBackup(source));delete legacyDepth.settings.arrangeDepth;assert.equal(parseBackup(JSON.stringify(legacyDepth)).arrangeDepth,1);
assert.equal(parseBackup(makeBackup({...source,arrangeDepth:2})).arrangeDepth,2);
for(const depth of [0,11,1.5,'2',null]){const file=JSON.parse(makeBackup(source));file.settings.arrangeDepth=depth;assert.throws(()=>parseBackup(JSON.stringify(file)));}
const legacyRange=JSON.parse(makeBackup(source));delete legacyRange.settings.arrangeRange;assert.equal(parseBackup(JSON.stringify(legacyRange)).arrangeRange,3);
for(const range of [1,2,3,4,5])assert.equal(parseBackup(makeBackup({...source,arrangeRange:range})).arrangeRange,range);
for(const range of [0,6,2.5,'3',null]){const file=JSON.parse(makeBackup(source));file.settings.arrangeRange=range;assert.throws(()=>parseBackup(JSON.stringify(file)));}
