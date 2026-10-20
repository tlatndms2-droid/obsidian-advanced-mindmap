import type {CanvasData,Card} from './layout';

/** Align near the existing cluster, then resolve collisions per card. */
export function arrangeConnected(input:CanvasData,id:string,gap:number):CanvasData{
 const data:CanvasData=structuredClone(input),anchor=data.nodes.find(n=>n.id===id);
 if(!anchor||!Number.isFinite(gap)||gap<0)return data;
 const ids=new Set(input.edges.flatMap(e=>e.fromNode===id?[e.toNode]:e.toNode===id?[e.fromNode]:[]));ids.delete(id);
 const overlap=(a:Card,b:Card)=>a.x<b.x+b.width&&a.x+a.width>b.x&&a.y<b.y+b.height&&a.y+a.height>b.y;
 const neighbours=data.nodes.filter(n=>ids.has(n.id)&&n.type!=='group');
 const groups:Card[][]=[[],[],[],[]];
 const movable=new Set<string>();
 for(const n of neighbours){
  const sides=new Set(input.edges.filter(e=>e.fromNode===id&&e.toNode===n.id||e.toNode===id&&e.fromNode===n.id).map(e=>e.fromNode===id?e.fromSide:e.toSide).filter(s=>['left','right','top','bottom'].includes(String(s))));
  // Conflicting attachment faces cannot be assigned to one row without changing the user's layout.
  if(sides.size>1)continue;
  const dx=n.x+n.width/2-anchor.x-anchor.width/2,dy=n.y+n.height/2-anchor.y-anchor.height/2;
  const side=[...sides][0],index=side?['left','right','top','bottom'].indexOf(String(side)):Math.abs(dx)>=Math.abs(dy)?dx<0?0:1:dy<0?2:3;
  groups[index].push(n);movable.add(n.id);
 }
 const distance=(a:Card,b:Card)=>Math.hypot(Math.max(0,a.x-b.x-b.width,b.x-a.x-a.width),Math.max(0,a.y-b.y-b.height,b.y-a.y-a.height));
 groups.forEach((directionCards,index)=>{
  if(!directionCards.length)return;
  // Determine locality from ordinary card sizes, not from a far outlier's position.
  const sizes=directionCards.map(n=>Math.max(n.width,n.height)).sort((a,b)=>a-b);
  const threshold=2*Math.max(gap,sizes[Math.floor((sizes.length-1)/2)]);
  const pending=new Set(directionCards);
  while(pending.size){
   const first=pending.values().next().value!;pending.delete(first);const cards=[first];
   for(let i=0;i<cards.length;i++)for(const n of [...pending])if(distance(cards[i],n)<=threshold){pending.delete(n);cards.push(n);}
   const horizontal=index<2;
   if(cards.length===1){const n=cards[0];if(distance(anchor,n)<=threshold){if(horizontal)n.y=anchor.y+(anchor.height-n.height)/2;else n.x=anchor.x+(anchor.width-n.width)/2;}continue;}
   cards.sort((a,b)=>(horizontal?a.y+a.height/2-b.y-b.height/2:a.x+a.width/2-b.x-b.width/2)||a.id.localeCompare(b.id));
   const axis=cards.reduce((sum,n)=>sum+(horizontal?n.x+(index===0?n.width:0):n.y+(index===2?n.height:0)),0)/cards.length;
   let offset=0;const offsets=cards.map(n=>{const value=offset;offset+=(horizontal?n.height:n.width)+gap;return value;});
   const nearAnchor=cards.some(n=>distance(anchor,n)<=threshold);
   const start=nearAnchor
    ? (horizontal?anchor.y+anchor.height/2:anchor.x+anchor.width/2)-(offset-gap)/2
    : cards.reduce((sum,n,i)=>sum+(horizontal?n.y:n.x)-offsets[i],0)/cards.length;
   cards.forEach((n,i)=>{if(horizontal){n.x=axis-(index===0?n.width:0);n.y=start+offsets[i];}else{n.y=axis-(index===2?n.height:0);n.x=start+offsets[i];}});
  }
 });
 for(const n of data.nodes.filter(n=>movable.has(n.id))){
  const obstacles=data.nodes.filter(o=>o.id!==n.id&&o.type!=='group');
  if(!obstacles.some(o=>overlap(n,o)))continue;
  const x=n.x,y=n.y,dx=x+n.width/2-anchor.x-anchor.width/2,dy=y+n.height/2-anchor.y-anchor.height/2;
  const horizontal=Math.abs(dx)>=Math.abs(dy),positive=horizontal?dx>=0:dy>=0;
  const xs=new Set([x]),ys=new Set([y]);
  for(const o of obstacles){xs.add(o.x-n.width-gap);xs.add(o.x+o.width+gap);ys.add(o.y-n.height-gap);ys.add(o.y+o.height+gap);}
  let best:{x:number;y:number;distance:number}|null=null;
  for(const cx of xs)for(const cy of ys){
   const offset=horizontal?cx+n.width/2-anchor.x-anchor.width/2:cy+n.height/2-anchor.y-anchor.height/2;
   if(positive?offset<0:offset>0)continue;
   const distance=(cx-x)**2+(cy-y)**2;if(best&&distance>=best.distance)continue;
   const candidate={...n,x:cx,y:cy};if(obstacles.some(o=>overlap(candidate,o)))continue;
   best={x:cx,y:cy,distance};
  }
  if(best){n.x=best.x;n.y=best.y;}
 }
 // Preserve every edge exactly, including its attachment faces.
 return data;
}
