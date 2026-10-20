export interface Card { id: string; type: string; x: number; y: number; width: number; height: number; text?: string; [key: string]: unknown }
export interface Edge { id: string; fromNode: string; toNode: string; fromSide?: string; toSide?: string; [key: string]: unknown }
export interface CanvasData { nodes: Card[]; edges: Edge[]; [key: string]: unknown }
export type Direction = 'left' | 'right' | 'up' | 'down';
export interface Creation { anchor: string; id: string; direction: Direction; tab: boolean; width: number; height: number; gap: number; connected: boolean; source?: string }
export function sources(data: CanvasData, id: string): Card[] {
  const ids = new Set(data.edges.filter(e => e.toNode === id).map(e => e.fromNode));
  return data.nodes.filter(n => ids.has(n.id) && n.type !== 'group').sort((a,b) => a.x-b.x || a.y-b.y || a.id.localeCompare(b.id));
}
/** Compute the entire change before touching the live Canvas. */
export function createLayout(input: CanvasData, op: Creation): CanvasData {
  const data: CanvasData = JSON.parse(JSON.stringify(input));
  const anchor = data.nodes.find(n => n.id === op.anchor);
  if (!anchor || anchor.type === 'group') throw Error('Select one card.');
  if (data.nodes.some(n => n.id === op.id)) throw Error('Duplicate card id');
  const {width,height,gap} = op;
  if (![width,height].every(n=>Number.isFinite(n)&&n>0) || !Number.isFinite(gap)||gap<0) throw Error('Invalid card size or spacing.');
  const dir = op.tab ? 'down' : op.direction;
  const node: Card = {id:op.id,type:'text',text:'',x:anchor.x,y:anchor.y,width,height};
  if (dir==='right') {node.x=anchor.x+anchor.width+gap;node.y=anchor.y+(anchor.height-height)/2;}
  if (dir==='left') node.x=anchor.x-width-gap;
  if (dir==='up') node.y=anchor.y-height-gap;
  if (dir==='down') node.y=anchor.y+anchor.height+gap;
  data.nodes.push(node);
  const source = op.tab ? op.source : anchor.id;
  if(op.connected&&source&&data.nodes.some(n=>n.id===source))data.edges.push({id:`e${op.id}`,fromNode:source,toNode:node.id,fromSide:op.tab?'right':dir==='up'?'top':dir==='down'?'bottom':dir,toSide:op.tab?'left':dir==='up'?'bottom':dir==='down'?'top':dir==='right'?'left':'right'});
  return data;
}
