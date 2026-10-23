import {build} from 'esbuild';import assert from 'node:assert/strict';
const compiled=await build({entryPoints:['src/arrange.ts'],bundle:true,write:false,format:'esm',platform:'node'});
const {arrangeSelection,arrangeConnected}=await import('data:text/javascript;base64,'+Buffer.from(compiled.outputFiles[0].text).toString('base64'));
const node=(id,x,y)=>({id,type:'text',text:id,x,y,width:200,height:100});
const edge=(a,b)=>({id:a+b,fromNode:a,toNode:b,fromSide:'right',toSide:'left'});
const data={nodes:[node('a',0,0),node('b',350,30),node('c',700,60),node('d',1050,90),node('e',0,800),node('f',350,840),node('unrelated',3000,0)],edges:[edge('a','b'),edge('b','c'),edge('c','d'),edge('e','f')]};
const before=structuredClone(data);
assert.deepEqual(arrangeSelection(data,['a'],100,1),arrangeConnected(data,'a',100));
for(const depth of [1,2,3]){const r=arrangeSelection(data,['a','e'],100,depth);assert.deepEqual(r.edges,data.edges);assert.equal(r.nodes.find(n=>n.id==='b').y,0);assert.equal(r.nodes.find(n=>n.id==='f').y,800);assert.equal(r.nodes.find(n=>n.id==='c').y,depth>=2?0:60);assert.equal(r.nodes.find(n=>n.id==='d').y,depth>=3?0:90);assert.deepEqual(r.nodes.at(-1),data.nodes.at(-1));}
assert.deepEqual(data,before);
const reverse={...data,edges:data.edges.map(e=>({...e,fromNode:e.toNode,toNode:e.fromNode,fromSide:e.toSide,toSide:e.fromSide}))};assert.deepEqual(arrangeSelection(reverse,['a','e'],100,2).nodes,arrangeSelection(data,['a','e'],100,2).nodes);
const cycle={...data,edges:[...data.edges,edge('c','a')]};const r=arrangeSelection(cycle,['a','b','a'],100,2);assert.deepEqual(r.edges,cycle.edges);assert.equal(r.nodes.length,data.nodes.length);assert(r.nodes.every(n=>Number.isFinite(n.x)&&Number.isFinite(n.y)));
assert.deepEqual(arrangeSelection(data,[],100,2),data);
// Selecting one leaf must not omit that leaf from its siblings' occupied slots.
const fan={nodes:[node('parent',700,60),node('selected',1050,60),...Array.from({length:5},(_,i)=>({...node('s'+i,1050,260+i*200),width:500})),node('outside',3000,200)],edges:[edge('parent','selected'),...Array.from({length:5},(_,i)=>edge('parent','s'+i))]};
const overlaps=(a,b)=>a.x<b.x+b.width&&a.x+a.width>b.x&&a.y<b.y+b.height&&a.y+a.height>b.y;
for(const transform of [n=>n,n=>({...n,x:n.y,y:n.x,width:n.height,height:n.width})]){
 const vertical=transform!==undefined&&transform(fan.nodes[0]).x!==fan.nodes[0].x;
 const f={nodes:fan.nodes.map(transform),edges:fan.edges.map(e=>vertical?{...e,fromSide:'bottom',toSide:'top'}:e)};
 for(const selected of [['selected'],['selected','s1']]){
  const result=arrangeSelection(f,selected,100,2),siblings=result.nodes.filter(n=>n.id!=='parent'&&n.id!=='outside');
  assert.deepEqual(result.edges,f.edges);assert.deepEqual(result.nodes[1],f.nodes[1]);assert.deepEqual(result.nodes.at(-1),f.nodes.at(-1));
  assert(siblings.every(n=>vertical?n.y===f.nodes[1].y:n.x===f.nodes[1].x),'siblings keep the same lane');
  for(let i=0;i<siblings.length;i++)for(let j=i+1;j<siblings.length;j++)assert(!overlaps(siblings[i],siblings[j]));
  assert.deepEqual(arrangeSelection(result,selected,100,2),result,'repeat arrangement is stable');
 }
}
const obstacle={...fan,nodes:[...fan.nodes,{...node('obstacle',1050,260),width:600}]};
const clear=arrangeSelection(obstacle,['selected'],100,2);
for(const n of clear.nodes.filter(n=>n.id.startsWith('s')&&n.id!=='selected')){assert.equal(n.x,1050);assert(!overlaps(n,clear.nodes.at(-1)));}
console.log('PASS multi-selection depth 1/2/3, reverse arrows, overlap/cycles, scope, edge preservation and single-node parity');
// Each range level expands the locality threshold; level 3 preserves the old default.
const locality={nodes:[node('root',0,0),node('near',350,0),node('far',350,550)],edges:[edge('root','near'),edge('root','far')]};
assert.deepEqual(arrangeSelection(locality,['root'],100,1,3),arrangeSelection(locality,['root'],100,1));
for(const [index,factor] of [0.5,0.75,1,1.5,2].entries()){
 const threshold=400*factor;
 const inside={...locality,nodes:[node('root',0,0),node('near',350,0),node('far',350,100+threshold-1)]};
 const outside={...inside,nodes:[...inside.nodes.slice(0,2),node('far',350,100+threshold+1)]};
 const a=arrangeSelection(inside,['root'],100,1,index+1),b=arrangeSelection(outside,['root'],100,1,index+1);
 assert.notEqual(a.nodes[2].y,inside.nodes[2].y);assert.equal(b.nodes[2].y,outside.nodes[2].y);assert.deepEqual(a.edges,inside.edges);
}
assert.notDeepEqual(arrangeSelection(locality,['root'],100,1,1),arrangeSelection(locality,['root'],100,1,5));
console.log('PASS five locality thresholds and default level 3 compatibility');
