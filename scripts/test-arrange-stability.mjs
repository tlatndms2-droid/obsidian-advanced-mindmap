import {build} from 'esbuild';import assert from 'node:assert/strict';
const out=await build({entryPoints:['src/arrange.ts'],bundle:true,write:false,format:'esm',platform:'node'});
const {arrangeSelection}=await import('data:text/javascript;base64,'+Buffer.from(out.outputFiles[0].text).toString('base64'));
export const card=(id,x,y)=>({id,type:'text',text:id,x,y,width:200,height:100});
export const edge=(a,b)=>({id:a+'-'+b,fromNode:a,toNode:b,fromSide:'right',toSide:'left'});
export function makeGraph(count,kind='tree'){
 const nodes=[],edges=[];for(let i=0;i<count;i++){nodes.push(card('n'+i,kind==='star'?(i?350:0):Math.floor(Math.log2(i+1))*350,kind==='star'?i*120:(i%32)*130+(i%3)*10));if(i)edges.push(edge('n'+(kind==='star'?0:Math.floor((i-1)/2)),'n'+i));}return {nodes,edges};
}
const overlap=(a,b)=>a.x<b.x+b.width-1e-6&&a.x+a.width>b.x+1e-6&&a.y<b.y+b.height-1e-6&&a.y+a.height>b.y+1e-6;
function verify(input,selected=['n0'],depth=10,range=5){
 const before=structuredClone(input),a=arrangeSelection(input,selected,100,depth,range);
 assert.deepEqual(input,before);assert.deepEqual(a.edges,input.edges);assert.deepEqual(a.nodes[0],input.nodes[0]);
 assert.deepEqual(a.nodes.map(({x,y,...n})=>n),input.nodes.map(({x,y,...n})=>n));
 assert.deepEqual(arrangeSelection(a,selected,100,depth,range),a,'repeated arrangement must be stable');
 for(let i=0;i<a.nodes.length;i++)for(let j=i+1;j<a.nodes.length;j++)assert(!overlap(a.nodes[i],a.nodes[j]),`overlap ${a.nodes[i].id}/${a.nodes[j].id}`);
 return a;
}
for(const kind of ['tree','star'])for(const count of [100,500,1000])verify(makeGraph(count,kind));
for(let seed=1;seed<=20;seed++){
 const g=makeGraph(30);g.edges.push(edge('n12','n3'),edge('n18','n5'),edge('n29','n0'),{...edge('n0','n1'),id:'parallel',label:'parallel'});
 if(seed%2)g.edges=g.edges.map(e=>({...e,fromNode:e.toNode,toNode:e.fromNode,fromSide:e.toSide,toSide:e.fromSide}));
 g.nodes.forEach((n,i)=>{n.y+=(i*seed%7)*15;});verify(g,['n0','n5'],10,1+seed%5);
}
console.log('PASS shared parents, cycles, parallel/reverse edges, multiple roots, 100/500/1000 cards, no overlap, stable repeat and immutable data');
