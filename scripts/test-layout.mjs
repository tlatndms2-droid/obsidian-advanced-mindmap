import {build} from 'esbuild';
import assert from 'node:assert/strict';
const compiled=await build({entryPoints:['src/layout.ts'],bundle:true,write:false,format:'esm',platform:'node'});
const {createLayout,sources}=await import('data:text/javascript;base64,'+Buffer.from(compiled.outputFiles[0].text).toString('base64'));
const card=(id,x,y,width=200,height=100)=>({id,type:'text',text:id,x,y,width,height});
const edge=(a,b)=>({id:a+b,fromNode:a,toNode:b});
const base={anchor:'a',id:'new',direction:'right',tab:false,width:200,height:100,gap:100,connected:true};
const tests=[];
function test(name,fn){fn();tests.push(name);}
test('right centered; original immutable; plain vs connected placement identical',()=>{
 const data={nodes:[card('a',0,0,200,400)],edges:[]};const copy=structuredClone(data);
 const linked=createLayout(data,base),plain=createLayout(data,{...base,connected:false});assert.deepEqual(data,copy);assert.deepEqual(linked.nodes,plain.nodes);assert.equal(linked.nodes[1].y,150);assert.equal(linked.edges.length,1);assert.equal(plain.edges.length,0);
});
test('four directions retain anchor and configured gap',()=>{
 for(const [direction,x,y] of [['right',300,0],['left',-300,0],['up',0,-200],['down',0,200]]){const r=createLayout({nodes:[card('a',0,0)],edges:[]},{...base,direction});assert.deepEqual([r.nodes[1].x,r.nodes[1].y],[x,y]);assert.deepEqual(r.nodes[0],card('a',0,0));}
});
test('creation leaves every existing card fixed even on collision',()=>{
 const data={nodes:[card('a',0,0),card('b',300,0),card('c',600,0),card('d',300,250),card('fixed',0,500)],edges:[edge('a','b'),edge('b','d'),edge('d','b'),edge('a','fixed'),edge('b','fixed')]};
 const r=createLayout(data,base);assert.deepEqual(r.nodes.slice(0,data.nodes.length),data.nodes);assert.equal(r.nodes.find(n=>n.id==='fixed').x,0);assert.equal(r.nodes[0].x,0);
});
test('Tab sufficient space moves nothing',()=>{
 const data={nodes:[card('a',0,0),card('b',0,500)],edges:[]};const r=createLayout(data,{...base,tab:true});assert.deepEqual(r.nodes.slice(0,2),data.nodes);
});
test('Tab overlap allowed; existing positions unchanged',()=>{
 const data={nodes:[card('a',0,0),card('b',0,260),card('c',0,800)],edges:[]};const r=createLayout(data,{...base,tab:true});assert.equal(r.nodes[1].y,260);assert.equal(r.nodes[2].y,800);assert.equal(r.nodes[3].x,0);
});
test('source ordering and single origin',()=>{
 const data={nodes:[card('a',0,0),card('left',-600,400),card('upper',-600,0),card('right',-300,0)],edges:[edge('left','a'),edge('upper','a'),edge('right','a')]};assert.deepEqual(sources(data,'a').map(n=>n.id),['upper','left','right']);const r=createLayout(data,{...base,tab:true,source:'left'});assert.equal(r.edges.length,4);assert.equal(r.edges[3].fromNode,'left');
});
test('unknown Canvas attributes preserved and invalid transaction rejected',()=>{
 const data={nodes:[{...card('a',0,0),color:'3',custom:'keep'}],edges:[],metadata:{keep:true}};const r=createLayout(data,base);assert.deepEqual(r.metadata,data.metadata);assert.equal(r.nodes[0].custom,'keep');assert.throws(()=>createLayout(data,{...base,width:0}));assert.equal(data.nodes.length,1);
});
console.log(JSON.stringify({passed:tests.length,tests},null,2));
test('Tab includes either arrow direction, excludes groups and duplicate peers',()=>{
 const input={nodes:[card('a',0,0),card('left',-500,0),card('right',500,0),{...card('g',0,-500),type:'group'}],edges:[edge('left','a'),edge('a','right'),edge('right','a'),edge('a','g')]};
 assert.deepEqual(sources(input,'a').map(n=>n.id),['left','right']);
 for(const [source,fromSide,toSide] of [['left','right','left'],['right','left','right']]){
  const result=createLayout(input,{...base,tab:true,source});assert.deepEqual(result.edges.slice(0,input.edges.length),input.edges);assert.equal(result.edges.at(-1).fromSide,fromSide);assert.equal(result.edges.at(-1).toSide,toSide);assert.deepEqual([result.nodes.at(-1).x,result.nodes.at(-1).y],[0,200]);
 }
});
console.log('PASS Tab bidirectional candidates and facing sides');
