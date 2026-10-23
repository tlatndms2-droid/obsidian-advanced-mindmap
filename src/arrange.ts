import type {CanvasData,Card} from './layout';

/** Multi-source distance determines scope; a stable forest moves each node at most once. */
export function arrangeSelection(input:CanvasData,selected:string[],gap:number,depth=1,range=3):CanvasData{
 const valid=new Set(input.nodes.filter(n=>n.type!=='group').map(n=>n.id));
 const roots=[...new Set(selected)].filter(id=>valid.has(id));
 const steps=Math.max(1,Math.min(10,Math.floor(depth)||1));
 const adjacency=new Map<string,Set<string>>();
 for(const edge of input.edges){if(!valid.has(edge.fromNode)||!valid.has(edge.toNode)||edge.fromNode===edge.toNode)continue;for(const [a,b] of [[edge.fromNode,edge.toNode],[edge.toNode,edge.fromNode]]){if(!adjacency.has(a))adjacency.set(a,new Set());adjacency.get(a)!.add(b);}}
 const distance=new Map(roots.map(id=>[id,0]));const queue=[...roots];
 for(let i=0;i<queue.length;i++){const id=queue[i],d=distance.get(id)!;if(d>=steps)continue;for(const next of adjacency.get(id)||[]){if(distance.has(next))continue;distance.set(next,d+1);queue.push(next);}}
 let result=structuredClone(input);const visited=new Set<string>();
 for(const root of roots){if(visited.has(root))continue;visited.add(root);const parents=[root];
  for(let i=0;i<parents.length;i++){const parent=parents[i],children=new Set<string>();
   for(const next of adjacency.get(parent)||[]){if(!distance.has(next)||visited.has(next))continue;visited.add(next);children.add(next);parents.push(next);}
   if(!children.size)continue;
   // Already placed neighbours still occupy a slot in their sibling row/column.
   // Omitting them made a sibling land on the selected root, then get pushed sideways.
   const edges=result.edges.filter(e=>(e.fromNode===parent&&distance.has(e.toNode))||(e.toNode===parent&&distance.has(e.fromNode)));
   const arranged=arrangeConnected({...result,edges},parent,gap,children,range);result={...result,nodes:arranged.nodes};
  }
 }
 return result;
}

/** Align near the existing cluster, then resolve collisions per card. */
export function arrangeConnected(input:CanvasData,id:string,gap:number,allowed?:ReadonlySet<string>,range=3):CanvasData{
 const data:CanvasData=structuredClone(input),anchor=data.nodes.find(n=>n.id===id);
 if(!anchor||!Number.isFinite(gap)||gap<0)return data;
 const ids=new Set(input.edges.flatMap(e=>e.fromNode===id?[e.toNode]:e.toNode===id?[e.fromNode]:[]));ids.delete(id);
 const overlap=(a:Card,b:Card)=>a.x<b.x+b.width&&a.x+a.width>b.x&&a.y<b.y+b.height&&a.y+a.height>b.y;
 const faces=new Map<string,Set<string>>();
 for(const e of input.edges){const other=e.fromNode===id?e.toNode:e.toNode===id?e.fromNode:null,side=e.fromNode===id?e.fromSide:e.toSide;if(other&&['left','right','top','bottom'].includes(String(side))){const set=faces.get(other)||new Set<string>();set.add(String(side));faces.set(other,set);}}
 const neighbours=data.nodes.filter(n=>ids.has(n.id)&&n.type!=='group');
 const groups:Card[][]=[[],[],[],[]];
 const movable=new Set<string>(),directions=new Map<string,number>();
 for(const n of neighbours){
  const sides=faces.get(n.id)||new Set<string>();
  // Conflicting attachment faces cannot be assigned to one row without changing the user's layout.
  if(sides.size>1)continue;
  const dx=n.x+n.width/2-anchor.x-anchor.width/2,dy=n.y+n.height/2-anchor.y-anchor.height/2;
  const side=[...sides][0],index=side?['left','right','top','bottom'].indexOf(String(side)):Math.abs(dx)>=Math.abs(dy)?dx<0?0:1:dy<0?2:3;
  groups[index].push(n);directions.set(n.id,index);if(!allowed||allowed.has(n.id))movable.add(n.id);
 }
 const distance=(a:Card,b:Card)=>Math.hypot(Math.max(0,a.x-b.x-b.width,b.x-a.x-a.width),Math.max(0,a.y-b.y-b.height,b.y-a.y-a.height));
 groups.forEach((directionCards,index)=>{
  if(!directionCards.length)return;
  // Determine locality from ordinary card sizes, not from a far outlier's position.
  const sizes=directionCards.map(n=>Math.max(n.width,n.height)).sort((a,b)=>a-b);
  const level=Number.isFinite(range)?Math.max(1,Math.min(5,Math.round(range))):3;
  const threshold=2*[0.5,0.75,1,1.5,2][level-1]*Math.max(gap,sizes[Math.floor((sizes.length-1)/2)]);
  const pending=new Set(directionCards);
  while(pending.size){
   const first=pending.values().next().value!;pending.delete(first);const cards=[first];
   for(let i=0;i<cards.length;i++)for(const n of [...pending])if(distance(cards[i],n)<=threshold){pending.delete(n);cards.push(n);}
   if(!cards.some(n=>movable.has(n.id)))continue;
   const horizontal=index<2;
   if(cards.length===1){const n=cards[0];if(distance(anchor,n)<=threshold){if(horizontal)n.y=anchor.y+(anchor.height-n.height)/2;else n.x=anchor.x+(anchor.width-n.width)/2;}continue;}
   cards.sort((a,b)=>(horizontal?a.y+a.height/2-b.y-b.height/2:a.x+a.width/2-b.x-b.width/2)||a.id.localeCompare(b.id));
   const axis=cards.reduce((sum,n)=>sum+(horizontal?n.x+(index===0?n.width:0):n.y+(index===2?n.height:0)),0)/cards.length;
   let offset=0;const offsets=cards.map(n=>{const value=offset;offset+=(horizontal?n.height:n.width)+gap;return value;});
   const nearAnchor=cards.some(n=>distance(anchor,n)<=threshold);
   const start=nearAnchor
    ? (horizontal?anchor.y+anchor.height/2:anchor.x+anchor.width/2)-(offset-gap)/2
    : cards.reduce((sum,n,i)=>sum+(horizontal?n.y:n.x)-offsets[i],0)/cards.length;
   const fixedIndex=cards.findIndex(n=>!movable.has(n.id)),fixed=cards[fixedIndex];
   const alignedAxis=fixed?(horizontal?fixed.x+(index===0?fixed.width:0):fixed.y+(index===2?fixed.height:0)):axis;
   const alignedStart=fixed?(horizontal?fixed.y:fixed.x)-offsets[fixedIndex]:start;
   cards.forEach((n,i)=>{if(!movable.has(n.id))return;if(horizontal){n.x=alignedAxis-(index===0?n.width:0);n.y=alignedStart+offsets[i];}else{n.y=alignedAxis-(index===2?n.height:0);n.x=alignedStart+offsets[i];}});
  }
 });
 for(const n of data.nodes.filter(n=>movable.has(n.id))){
  const obstacles=data.nodes.filter(o=>o.id!==n.id&&o.type!=='group');
  if(!obstacles.some(o=>overlap(n,o)))continue;
  const x=n.x,y=n.y;
  const horizontal=directions.get(n.id)!<2;
  const xs=new Set([x]),ys=new Set([y]);
  // Resolve overlap along the sibling lane, never into a false child column.
  for(const o of obstacles){if(horizontal){ys.add(o.y-n.height-gap);ys.add(o.y+o.height+gap);}else{xs.add(o.x-n.width-gap);xs.add(o.x+o.width+gap);}}
  let best:{x:number;y:number;distance:number}|null=null;
  for(const cx of xs)for(const cy of ys){
   const distance=(cx-x)**2+(cy-y)**2;if(best&&distance>=best.distance)continue;
   const candidate={...n,x:cx,y:cy};if(obstacles.some(o=>overlap(candidate,o)))continue;
   best={x:cx,y:cy,distance};
  }
  if(best){n.x=best.x;n.y=best.y;}
 }
 // Preserve every edge exactly, including its attachment faces.
 return data;
}
