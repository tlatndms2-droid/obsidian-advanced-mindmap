import fs from 'node:fs/promises';import vm from 'node:vm';import assert from 'node:assert/strict';import {build} from 'esbuild';
class El{
 children=[];isConnected=true;attrs={};style={setProperty(){}};textContent='';
 constructor(tag='div',opts={}){this.tag=tag;this.textContent=opts.text||'';this.attrs=opts.attr||{};}
 createEl(tag,opts){const e=new El(tag,opts);this.children.push(e);return e;}createDiv(opts){return this.createEl('div',opts);}createSpan(opts){return this.createEl('span',opts);}addClass(){}addEventListener(){}removeEventListener(){}setText(s){this.textContent=s;}empty(){this.children=[];}querySelector(){return null;}querySelectorAll(){return [];}setAttribute(k,v){this.attrs[k]=v;}removeAttribute(k){delete this.attrs[k];}play(){this.played=true;return Promise.resolve();}pause(){this.paused=true;}load(){this.unloaded=true;}focus(){this.focused=true;}
}
class Modal{constructor(app){this.app=app;this.contentEl=new El();this.modalEl=new El();this.scope={keys:[],register(modifiers,key,func){this.keys.push({modifiers,key,func});}};this.buttons=[];}setTitle(t){this.title=t;}open(){this.onOpen();}close(){this.onClose();}}
let buttons=[];
class Setting{constructor(){}addButton(cb){const b={setButtonText(t){this.text=t;return this;},setCta(){return this;},onClick(f){this.click=f;return this;}};cb(b);buttons.push(b);return this;}}
const stub={Modal,FuzzySuggestModal:Modal,Setting,loadPdfJs:async()=>{throw Error('unused')}};
const compiled=await build({stdin:{contents:await fs.readFile('src/file-insert.ts','utf8')+'\nexport {MediaPicker,MediaPreview,PdfPreviews};',resolveDir:process.cwd()+'/src',loader:'ts'},bundle:true,write:false,format:'cjs',platform:'node',external:['obsidian']});
const context={module:{exports:{}},exports:{},require:()=>stub,console,requestAnimationFrame:()=>1,cancelAnimationFrame:()=>{},document:{createElement:t=>new El(t)}};vm.runInNewContext(compiled.outputFiles[0].text,context);const {MediaPreview,MediaPicker,PdfPreviews}=context.module.exports;
const app={vault:{getResourcePath:f=>'app:///'+f.path}};const file={name:'sample.mp3',path:'sample.mp3'};
let closed=0;
for(const kind of ['image','audio','video']){
 buttons=[];const p=new MediaPreview(app,kind,file,()=>closed++);p.open();const player=p.player;assert.equal(buttons.length,0);
 const toggle=p.scope.keys.find(k=>k.key==='Enter'&&k.modifiers[0]==='Ctrl');assert.ok(toggle);toggle.func({isComposing:false,repeat:false,preventDefault(){},stopPropagation(){}});if(player){assert.equal(player.paused,true);assert.equal(player.unloaded,true);}
}assert.equal(closed,3);
let commits=0;const picker=new MediaPicker(app,'audio',()=>commits++,()=>{});picker.list=new El();picker.list.isConnected=false;picker.openPreview(file);assert.equal(commits,0);const player=picker.preview.player;picker.onClose();assert.equal(commits,0);assert.equal(player.paused,true);
const pure=await build({entryPoints:['src/file-insert-data.ts'],bundle:true,write:false,format:'esm',platform:'node'});const {insertFile}=await import('data:text/javascript;base64,'+Buffer.from(pure.outputFiles[0].text).toString('base64'));
const data={nodes:[{id:'card',type:'text',text:'',x:12,y:34,width:100,height:150,color:'2'}],edges:[{id:'e',fromNode:'card',toNode:'other'}],canvasMindmap:{waypoints:[{node:'card'}]}};
for(const path of ['sample.pdf','sample.mp4','sample.mp3']){const after=insertFile(data,'card',path);assert.equal(after.nodes[0].id,'card');assert.equal(after.nodes[0].file,path);assert.deepEqual(after.edges,data.edges);assert.deepEqual(after.canvasMindmap,data.canvasMindmap);assert.equal(data.nodes[0].type,'text');}
console.log('Media preview tests passed: explicit insertion, cancel, playback cleanup, parent-close cleanup, PDF/video/audio card data preservation. Mocked UI only.');

// Queue and lifecycle checks with a fake PDF decoder, not the actual renderer.
let active=0,peak=0,destroyed=0;const gates=[];
stub.loadPdfJs=async()=>({getDocument(){active++;peak=Math.max(peak,active);let finish;const promise=new Promise(resolve=>finish=()=>resolve({getPage:async()=>({getViewport:()=>({width:100,height:100}),render:()=>({promise:Promise.resolve()})})}));gates.push(finish);let done=false;return {promise,destroy:async()=>{if(!done){done=true;active--;destroyed++;finish();}}};}});
const pdf=new PdfPreviews({vault:{readBinary:async()=>new ArrayBuffer(8)}});const hosts=Array.from({length:5},()=>new El());for(const host of hosts)pdf.render(file,host,320);
await new Promise(r=>setTimeout(r,0));assert.equal(peak,2);pdf.dispose();await new Promise(r=>setTimeout(r,0));assert.equal(active,0);assert.equal(destroyed,2);assert.equal(gates.length,2);console.log('PDF queue limit and close cancellation passed (mock decoder).');

for(const oldPath of ['old.md','old.canvas','old.png','old.pdf','old.mp4','old.mp3']){
 for(const newPath of ['new.md','new.canvas','new.png','new.pdf','new.mp4','new.mp3']){
  const before={...structuredClone(data),nodes:[{...data.nodes[0],type:'file',file:oldPath,subpath:'#page=3'}]};delete before.nodes[0].text;
  const after=insertFile(before,'card',newPath);assert.deepEqual(after.nodes[0],{id:'card',type:'file',file:newPath,x:12,y:34,width:100,height:150,color:'2'});assert.deepEqual(after.edges,before.edges);assert.deepEqual(after.canvasMindmap,before.canvasMindmap);assert.equal(before.nodes[0].file,oldPath);
 }
}
for(const node of [{...data.nodes[0],text:'Preserve my text'},{...data.nodes[0],type:'group'},{...data.nodes[0],type:'link'}])assert.throws(()=>insertFile({...data,nodes:[node]},'card','new.pdf'));
console.log('36 cross-format replacements preserve card layout/edges/metadata, clear old subpath, reject nonempty text/group/link.');

let direct=0;const keyboardPicker=new MediaPicker(app,'audio',()=>direct++,()=>{});keyboardPicker.list=new El();keyboardPicker.matches=[file];const plain=keyboardPicker.scope.keys.find(k=>k.key==='Enter'&&k.modifiers.length===0),previewKey=keyboardPicker.scope.keys.find(k=>k.key==='Enter'&&k.modifiers[0]==='Ctrl');const event={isComposing:false,repeat:false,target:{closest:()=>null},preventDefault(){}};
previewKey.func(event);assert.equal(direct,0);assert.ok(keyboardPicker.preview);assert.equal(keyboardPicker.preview.player.played,true);keyboardPicker.preview.scope.keys.find(k=>k.key==='Enter'&&k.modifiers[0]==='Ctrl').func({...event,stopPropagation(){}});assert.equal(direct,0);assert.equal(keyboardPicker.preview,null);plain.func(event);assert.equal(direct,1);assert.equal(keyboardPicker.preview,null);console.log('Enter inserts directly; Ctrl+Enter opens preview without inserting.');

for(const kind of ['audio','video']){
 const preview=new MediaPreview(app,kind,file,()=>{});preview.open();const player=preview.player;Object.assign(player,{paused:true,ended:false,currentTime:2,duration:12,volume:.5,muted:false});let consumed=0;
 const press=(key,extra={})=>preview.playbackKey({key,code:'',isComposing:false,preventDefault(){consumed++;},stopImmediatePropagation(){},...extra});
 press(' ');assert.equal(player.played,true);player.paused=false;press(' ');assert.equal(player.paused,true);
 press('ArrowLeft');assert.equal(player.currentTime,0);press('ArrowRight');assert.equal(player.currentTime,5);press('ArrowRight');press('ArrowRight');assert.equal(player.currentTime,12);
 press('ArrowUp');assert.equal(player.volume,.55);press('ArrowDown');assert.equal(player.volume,.5);player.volume=1;press('ArrowUp');assert.equal(player.volume,1);player.volume=0;press('ArrowDown');assert.equal(player.volume,0);
 press('m');assert.equal(player.muted,true);press('m',{repeat:true});assert.equal(player.muted,true);press('m');assert.equal(player.muted,false);
 const before=consumed;press('ArrowRight',{ctrlKey:true});press('m',{isComposing:true});assert.equal(consumed,before);player.currentTime=4;player.duration=NaN;press('ArrowRight');assert.equal(player.currentTime,4);preview.close();
}console.log('Audio/video playback keys, repeat protection, seek/volume bounds and modifier guards passed (mock player).');

for(const kind of ['audio','video']){const preview=new MediaPreview(app,kind,file,()=>{});preview.open();assert.equal(preview.modalEl.focused,true);assert.equal(preview.modalEl.tabIndex,-1);const player=preview.player;Object.assign(player,{volume:.5,currentTime:0,duration:20});const arrow=preview.scope.keys.find(k=>k.key==='ArrowRight'&&k.modifiers.length===0);assert.ok(arrow);assert.equal(arrow.func({key:'ArrowRight',code:'ArrowRight',preventDefault(){},stopImmediatePropagation(){}}),false);assert.equal(player.currentTime,5);preview.close();assert.equal(preview.focusFrame,null);}console.log('Preview immediately focuses and handles keys through its active modal scope without clicking.');

const audioCard={...data.nodes[0],type:'file',file:'old.mp3',width:369,height:42};const audioData={...data,nodes:[audioCard]};const videoData=insertFile(audioData,'card','new.mp4',500);
assert.equal(videoData.nodes[0].width,500);assert.equal(videoData.nodes[0].height,282);assert.deepEqual(videoData.edges,audioData.edges);assert.deepEqual(videoData.canvasMindmap,audioData.canvasMindmap);assert.equal(audioCard.height,42);assert.equal(videoData.nodes[0].x,audioCard.x);assert.equal(videoData.nodes[0].y,audioCard.y);
const large=insertFile({...data,nodes:[{...audioCard,width:900,height:700}]},'card','new.mp4',500);assert.equal(large.nodes[0].width,900);assert.equal(large.nodes[0].height,700);
const other=insertFile(audioData,'card','new.pdf');assert.equal(other.nodes[0].height,42);console.log('Collapsed audio-to-video size regression passed; larger cards and non-video dimensions preserved.');
