import {applyCreation} from './creation-transaction';
import {mediaExtensions} from './media-previews';
import { FileInsertMenu } from './file-insert';
import { insertFile,canInsertFile } from './file-insert-data';
import { SettingsTransfer } from './settings-transfer';
import { settingsOnly } from './settings-backup';
import { arrangeConnected } from './arrange';
import { CanvasPanels } from './panels';
import { Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { createLayout, sources, type CanvasData, type Direction } from './layout';
import { EditorCamera } from './editor-camera';
import { SelectionHistory } from './selection-history';
import { SizeController } from './size';
import { NavigationController, nearestCard } from './navigation';
type Canvas = any;
interface Settings { mode: 'create'|'connect'; width: number|null; height:number|null; gap:number; origins:Record<string,string>;resizeStep:number;swapTolerance:number;autoResize:boolean;panDuration:number;followCaret:boolean;editMinZoom:number;customColors:string[];managerSize:{width:number;height:number}|null }
interface Hold { key:string; timer:number; canvas:Canvas; anchor:string; consumed:boolean }
interface MenuState { el:HTMLElement; values:string[]; index:number; kind:'mode'|'source'; canvas:Canvas; anchor:string }
export default class CanvasMindmap extends Plugin {
 readonly implementationStage = 4;
 settings:Settings={mode:'create',width:null,height:null,gap:100,origins:{},resizeStep:20,swapTolerance:40,autoResize:false,panDuration:250,followCaret:true,editMinZoom:100,customColors:[],managerSize:null};
 private panels!:CanvasPanels;
 private fileInsert!:FileInsertMenu;
 private sizes!:SizeController;
 private navigation!:NavigationController;
 private selections!:SelectionHistory;
 private editorCamera!:EditorCamera;
 private altTap:{down:number;last:number;clean:boolean;c:any}|null=null;
 private connectHeld:Canvas|null=null;
 private connectHint:HTMLElement|null=null;
 private linkTimer:number|null=null;
 private linkMenu:{el:HTMLElement;c:Canvas;anchor:string;ids:string[];index:number}|null=null;
 private hold:Hold|null=null;
 private menu:MenuState|null=null;
 private docs=new WeakSet<Document>();
 private canvasInputs=new WeakSet<object>();
 private colorCommands=new Set<string>();
 private saveChain=Promise.resolve();
 async onload() {
  const saved=await this.loadData();this.settings={...this.settings,...saved,origins:saved?.origins||{}};
  this.sizes=new SizeController(this);
  this.navigation=new NavigationController(this);
  this.panels=new CanvasPanels(this,this.navigation);
  this.fileInsert=new FileInsertMenu(this.app,(c,id,file)=>this.convertFile(c,id,file.path),()=>this.current(),cb=>this.register(cb));
  this.addCommand({id:'insert-file-card',name:'카드에 파일 넣기 / 교체',hotkeys:[{modifiers:['Alt'],key:'i'}],checkCallback:checking=>{const c=this.current(),n=c&&this.selected(c);if(!n||c.readonly||!canInsertFile(n.getData())||[...c.nodes.values()].some((v:any)=>v.isEditing)||document.activeElement?.closest('input,textarea,[contenteditable="true"],.modal-container'))return false;if(!checking){this.reset();this.clearConnectHint();this.panels.close(false);this.fileInsert.toggle(c,n)}return true;}});
  for(const [id,name,key,kind] of [['waypoint-manager','Waypoint 관리창 열기/닫기','w','manager'],['color-palette','색상 팔레트 열기/닫기','c','palette']] as const)this.addCommand({id,name,hotkeys:[{modifiers:kind==='palette'?['Ctrl','Shift']:['Alt'],key}],checkCallback:checking=>{const c=this.current(),active=document.activeElement;if(active?.closest('input,textarea,[contenteditable="true"]')&&!active.closest('.canvas-node'))return false;if(!c||c.readonly||(kind==='manager'&&[...c.nodes.values()].some((n:any)=>n.isEditing)))return false;if(!checking){this.reset();if(kind==='manager')this.panels.toggleManager(c);else this.panels.togglePalette(c);}return true;}});
  for(let i=1;i<=6;i++)this.addCommand({id:`apply-color-${i}`,name:`기본 색상 ${i} 적용`,checkCallback:checking=>{const c=this.current();if(!c||c.readonly||!c.selection.size||[...c.nodes.values()].some((n:any)=>n.isEditing))return false;if(!checking)this.panels.applyColor(c,String(i));return true;}});
  this.addCommand({id:'disconnect-selected-cards',name:'선택한 카드의 연결 모두 해제',hotkeys:[{modifiers:['Ctrl','Shift'],key:'d'}],checkCallback:checking=>{
   const c=this.current(),active=document.activeElement;
   if(!c||c.readonly||active?.closest('input,textarea,[contenteditable="true"]')||[...c.nodes.values()].some((n:any)=>n.isEditing))return false;
   const ids=new Set([...c.selection].filter((n:any)=>c.nodes.has(n.id)).map((n:any)=>n.id));if(!ids.size)return false;
   if(!checking)this.disconnect(c,ids);return true;
  }});
  this.addCommand({id:'connect-direction',name:'방향키로 가까운 카드 연결 (누른 채 사용)',hotkeys:[{modifiers:['Ctrl','Shift'],key:'a'}],checkCallback:checking=>{
   const c=this.current();
   if(!c||c.readonly||!this.selected(c)||document.activeElement?.closest('input,textarea,[contenteditable="true"],.modal-container')||[...c.nodes.values()].some((n:any)=>n.isEditing))return false;
   if(!checking){this.reset();this.sizes.finish();this.connectHeld=c;this.showConnectHint();}return true;
  }});
  this.addCommand({id:'reverse-connection',name:'선택 카드의 연결 방향 전환',hotkeys:[{modifiers:['Ctrl','Shift'],key:'s'}],checkCallback:checking=>{const c=this.current();if(!c||c.readonly||!this.selected(c)||[...c.nodes.values()].some((n:any)=>n.isEditing)||document.activeElement?.closest('input,textarea,[contenteditable="true"],.modal-container'))return false;if(!checking)this.openReverse(c);return true;}});
  this.addCommand({id:'arrange-connected',name:'연결된 카드 정렬 (시험)',hotkeys:[{modifiers:['Ctrl','Shift'],key:'l'}],checkCallback:checking=>{const c=this.current();if(!c||c.readonly||!this.selected(c)||[...c.nodes.values()].some((n:any)=>n.isEditing)||document.activeElement?.closest('input,textarea,[contenteditable="true"],.modal-container'))return false;if(!checking)this.arrange(c);return true;}});
  this.syncColorCommands();
  this.editorCamera=new EditorCamera(this);
  this.selections=new SelectionHistory(cb=>this.register(cb));
  this.addCommand({id:'toggle-auto-resize',name:'Toggle Auto Resize',hotkeys:[{modifiers:['Ctrl','Shift'],key:'r'}],callback:()=>{this.settings.autoResize=!this.settings.autoResize;void this.persist();new Notice(`Auto Resize: ${this.settings.autoResize?'ON':'OFF'}`);}});
  this.addSettingTab(new CreationSettings(this));this.attach(document);
  const frames=new WeakSet<HTMLIFrameElement>();
  const watch=(frame:HTMLIFrameElement)=>{if(frames.has(frame))return;frames.add(frame);const attach=()=>{try{if(frame.contentDocument)this.attach(frame.contentDocument);}catch{}};this.registerDomEvent(frame,'load',attach);attach();};
  for(const frame of document.querySelectorAll('iframe'))watch(frame);
  const observer=new MutationObserver(records=>{for(const record of records)for(const node of record.addedNodes)if(node instanceof HTMLElement){if(node instanceof HTMLIFrameElement)watch(node);for(const frame of node.querySelectorAll('iframe'))watch(frame);}});
  observer.observe(document.body,{childList:true,subtree:true});this.register(()=>observer.disconnect());
  this.registerInterval(window.setInterval(()=>{
   const c=this.current();if(c){this.initializeDimensions(c);this.patchCanvasInput(c);this.navigation.observe(c);this.sizes.observe(c);this.selections.observe(c);this.editorCamera.observe(c);}this.navigation.badges(c);this.panels.observe(c);
   this.fileInsert.observe();
   if(this.menu)this.positionMenu();
   if(this.connectHint)this.positionConnectHint();
   if(this.linkMenu)this.positionLinkMenu();
  },100));
  this.registerEvent(this.app.workspace.on('active-leaf-change',()=>{this.clearConnectHint();this.panels.close(false);this.sizes.finish();this.reset();this.altTap=null;this.editorCamera.stop();this.navigation.badges(this.current());}));this.register(()=>{this.reset();this.clearConnectHint();});
 }
 private convertFile(c:Canvas,id:string,path:string){
  if(this.current()!==c||c.readonly||c.nodes.get(id)?.isEditing||!this.app.vault.getFileByPath(path)){new Notice('파일 또는 대상 카드를 찾을 수 없습니다.');return;}
  const before:CanvasData=c.getData();let after:CanvasData;try{after=insertFile(before,id,path,mediaExtensions.video.has(path.split('.').pop()!.toLowerCase())?(this.settings.width??c.config.defaultTextNodeDimensions.width):undefined)}catch{new Notice('빈 카드 또는 파일 카드 하나를 선택하세요.');return;}
  this.sizes.finish();this.selections.observe(c);this.selections.capture(c);c.requestPushHistory.cancel?.();c.pushHistory(before);const history={data:[...c.history.data],current:c.history.current};
  try{c.setData(after);c.selectOnly(c.nodes.get(id));this.selections.capture(c);c.requestSave(false);}catch(error){c.importData(before,true);c.data=before;c.history.data=history.data;c.history.current=history.current;c.updateHistoryUI();c.requestSave(false);new Notice('파일을 넣지 못했습니다. 기존 카드를 유지합니다.');console.error(error);}
 }
 private arrange(c:Canvas){this.reset();this.clearConnectHint();this.sizes.finish();const n=this.selected(c);if(!n)return;const before:CanvasData=c.getData(),after=arrangeConnected(before,n.id,this.settings.gap);if(JSON.stringify(before)===JSON.stringify(after))return;this.selections.observe(c);this.selections.capture(c);c.requestPushHistory.cancel?.();c.pushHistory(before);const history={data:[...c.history.data],current:c.history.current};try{c.setData(after);this.selections.capture(c);c.requestSave(false);}catch(error){c.importData(before,true);c.data=before;c.history.data=history.data;c.history.current=history.current;c.updateHistoryUI();c.requestSave(false);new Notice('정렬하지 못했습니다. 원래 배치를 복원했습니다.');console.error(error);}}
 private disconnect(c:Canvas,ids:Set<string>){
  this.reset();this.sizes.finish();this.selections.observe(c);this.selections.capture(c);
  const before:CanvasData=c.getData(),edges=before.edges.filter(e=>!ids.has(e.fromNode)&&!ids.has(e.toNode));if(edges.length===before.edges.length)return;
  c.requestPushHistory.cancel?.();c.pushHistory(before);const history={data:[...c.history.data],current:c.history.current};
  try{c.setData({...before,edges});this.selections.capture(c);c.requestSave(false);}
  catch(error){c.importData(before,true);c.data=before;c.history.data=history.data;c.history.current=history.current;c.updateHistoryUI();c.requestSave(false);new Notice('연결을 해제하지 못했습니다. 기존 연결을 복원했습니다.');console.error('Canvas Mindmap disconnect failed',error);}
 }
 private clearLinkMenu(){this.linkMenu?.el.remove();this.linkMenu=null;}
 private showLinkMenu(c:Canvas,anchor:string,ids:string[]){
  this.clearLinkMenu();const el=document.body.createDiv({cls:'canvas-mindmap-menu canvas-mindmap-link-menu'});el.setAttribute('role','listbox');
  const data:CanvasData=c.getData();const labels=ids.length?ids.map(id=>{const edge=data.edges.find(e=>e.id===id)!;const other=data.nodes.find(n=>n.id===(edge.fromNode===anchor?edge.toNode:edge.fromNode));return (edge.fromNode===anchor?'→ ':'← ')+String(other?.text||other?.file||'Untitled').split('\n')[0]+(edge.label?' · '+edge.label:'');}):['A · Connect','D · Disconnect all','S · Reverse direction'];
  labels.forEach((text,i)=>{const row=el.createDiv({cls:'canvas-mindmap-option',text});row.title=text;row.classList.toggle('is-selected',ids.length>0&&i===0);});this.linkMenu={el,c,anchor,ids,index:0};this.positionLinkMenu();
 }
 private positionLinkMenu(){const m=this.linkMenu;if(!m)return;const n=this.selected(m.c);if(this.current()!==m.c||!n||n.id!==m.anchor||n.isEditing){this.clearLinkMenu();return;}const r=n.nodeEl.getBoundingClientRect();m.el.style.left=Math.max(8,Math.min(innerWidth-m.el.offsetWidth-8,r.right-m.el.offsetWidth))+'px';m.el.style.top=Math.max(8,r.top-m.el.offsetHeight-8)+'px';}
 private linkMenuKey(e:KeyboardEvent,c:Canvas){const m=this.linkMenu;if(!m||m.c!==c||!m.ids.length)return false;if(e.key==='Escape'){this.stop(e);this.clearLinkMenu();return true;}if(e.key==='ArrowUp'||e.key==='ArrowDown'){this.stop(e);m.index=(m.index+(e.key==='ArrowDown'?1:-1)+m.ids.length)%m.ids.length;[...m.el.children].forEach((el,i)=>el.classList.toggle('is-selected',i===m.index));return true;}if(e.key==='Enter'){this.stop(e);if(!e.repeat)this.reverseEdge(c,m.ids[m.index]);return true;}return false;}
 private openReverse(c:Canvas){this.reset();this.clearConnectHint();this.sizes.finish();const n=this.selected(c);if(!n)return;const ids=c.getData().edges.filter((e:any)=>e.fromNode===n.id||e.toNode===n.id).map((e:any)=>e.id);if(ids.length===1)this.reverseEdge(c,ids[0]);else if(ids.length)this.showLinkMenu(c,n.id,ids);}
 private reverseEdge(c:Canvas,id:string){this.clearLinkMenu();const before:CanvasData=c.getData();if(!before.edges.some(e=>e.id===id))return;const after={...before,edges:before.edges.map(e=>e.id===id?{...e,fromNode:e.toNode,toNode:e.fromNode,fromSide:e.toSide,toSide:e.fromSide}:e)};this.selections.observe(c);this.selections.capture(c);c.requestPushHistory.cancel?.();c.pushHistory(before);const history={data:[...c.history.data],current:c.history.current};try{c.setData(after);this.selections.capture(c);c.requestSave(false);}catch(error){c.importData(before,true);c.data=before;c.history.data=history.data;c.history.current=history.current;c.updateHistoryUI();c.requestSave(false);new Notice('연결 방향을 바꾸지 못했습니다. 기존 연결을 복원했습니다.');console.error(error);}}
 private clearConnectHint(){this.connectHeld=null;this.connectHint?.remove();this.connectHint=null;}
 private showConnectHint(){
  if(!this.connectHint){this.connectHint=document.body.createDiv({cls:'canvas-mindmap-menu canvas-mindmap-connect-hint'});this.connectHint.setAttribute('role','status');this.connectHint.createDiv({cls:'canvas-mindmap-option',text:'Press an arrow key'});}
  this.positionConnectHint();
 }
 private positionConnectHint(){
  const c=this.connectHeld,n=c&&this.selected(c),el=this.connectHint;
  if(!el)return;
  if(!c||this.current()!==c||!n||n.isEditing){this.clearConnectHint();return;}
  const r=n.nodeEl.getBoundingClientRect();
  el.style.left=Math.max(8,Math.min(innerWidth-el.offsetWidth-8,r.right-el.offsetWidth))+'px';
  el.style.top=Math.max(8,r.top-el.offsetHeight-8)+'px';
 }
 private connectionKey(e:KeyboardEvent,c:Canvas){
  if(this.connectHeld!==c||!e.ctrlKey||!e.shiftKey||e.altKey||e.metaKey||!e.key.startsWith('Arrow'))return false;
  this.stop(e);
  const n=this.selected(c);
  if(e.repeat||!n||c.readonly||[...c.nodes.values()].some((node:any)=>node.isEditing)||(e.target as HTMLElement)?.closest?.('input,textarea,[contenteditable="true"],.modal-container'))return true;
  const direction=e.key.slice(5).toLowerCase() as Direction,before:CanvasData=c.getData(),target=nearestCard(before,n.id,direction);
  if(!target||before.edges.some(edge=>(edge.fromNode===n.id&&edge.toNode===target.id)||(edge.toNode===n.id&&edge.fromNode===target.id)))return true;
  this.selections.observe(c);this.selections.capture(c);
  const side={up:'top',down:'bottom',left:'left',right:'right'},opposite={up:'bottom',down:'top',left:'right',right:'left'};
  const after={...before,edges:[...before.edges,{id:crypto.randomUUID().replace(/-/g,'').slice(0,16),fromNode:n.id,toNode:target.id,fromSide:side[direction],toSide:opposite[direction]}]};
  c.requestPushHistory.cancel?.();c.pushHistory(before);const history={data:[...c.history.data],current:c.history.current};
  try{c.setData(after);this.selections.capture(c);c.requestSave(false);}
  catch(error){c.importData(before,true);c.data=before;c.history.data=history.data;c.history.current=history.current;c.updateHistoryUI();c.requestSave(false);new Notice('카드를 연결하지 못했습니다. 기존 상태를 복원했습니다.');console.error('Canvas Mindmap connect failed',error);}
  return true;
 }
 syncColorCommands(){for(const id of this.colorCommands)this.removeCommand(id);this.colorCommands.clear();for(const color of this.settings.customColors){const id='apply-custom-'+color.slice(1);this.colorCommands.add(id);this.addCommand({id,name:`사용자 색상 ${color} 적용`,checkCallback:checking=>{const c=this.current();if(!c||c.readonly||!c.selection.size||[...c.nodes.values()].some((n:any)=>n.isEditing))return false;if(!checking)this.panels.applyColor(c,color);return true;}});}}
 async restoreSettings(values:any){await this.saveChain;const next={...this.settings,...settingsOnly(values)};await this.saveData(next);this.settings=next;this.reset();this.panels.close(false);}
 persist(){this.saveChain=this.saveChain.then(()=>this.saveData(this.settings)).catch(()=>{new Notice('Canvas Mindmap 설정을 저장하지 못했습니다.');});return this.saveChain;}
 private attach(doc:Document){
  if(this.docs.has(doc))return;this.docs.add(doc);
  const down=(e:KeyboardEvent)=>this.keydown(e),up=(e:KeyboardEvent)=>this.keyup(e),blur=()=>{this.clearConnectHint();this.altTap=null;this.sizes.finish();this.reset();};
  const keyboardTarget=doc.defaultView||doc;
  const pause=()=>this.editorCamera.pause(),resume=()=>this.editorCamera.resume();
  const pointer=(e:PointerEvent)=>{this.panels.outside(e.target);if(e.button===1||e.button===2)this.editorCamera.pause();else this.editorCamera.resume();};
  doc.addEventListener('wheel',pause,{capture:true,passive:true});doc.addEventListener('input',resume,true);doc.addEventListener('pointerdown',pointer,true);
  this.register(()=>{doc.removeEventListener('wheel',pause,true);doc.removeEventListener('input',resume,true);doc.removeEventListener('pointerdown',pointer,true);});
  keyboardTarget.addEventListener('keydown',down as EventListener,true);keyboardTarget.addEventListener('keyup',up as EventListener,true);doc.defaultView?.addEventListener('blur',blur);
  this.register(()=>{keyboardTarget.removeEventListener('keydown',down as EventListener,true);keyboardTarget.removeEventListener('keyup',up as EventListener,true);doc.defaultView?.removeEventListener('blur',blur);});
 }
 private current():Canvas|null {const view=this.app.workspace.getActiveViewOfType(Object as any) as any;return view?.getViewType?.()==='canvas'?view.canvas:null;}
 private selected(c:Canvas){const s=[...c.selection] as any[];return s.length===1&&c.nodes.has(s[0].id)&&s[0].getData().type!=='group'?s[0]:null;}
 private initializeDimensions(c:Canvas){const d=c.config?.defaultTextNodeDimensions;if(d&&Number.isFinite(d.width)&&Number.isFinite(d.height)&&(this.settings.width===null||this.settings.height===null)){this.settings.width??=d.width;this.settings.height??=d.height;void this.persist();}}
 private stop(e:KeyboardEvent){e.preventDefault();e.stopImmediatePropagation();}
 private patchCanvasInput(c:Canvas){
  if(this.canvasInputs.has(c))return;this.canvasInputs.add(c);
  // Native import reuses a node by ID even when its type changes. Recreate only
  // text/file replacements so conversion and native Undo use the proper view.
  const originalImport=c.importData;
  const importWithTypes=function(this:any,data:CanvasData,...args:any[]){
   for(const item of data?.nodes||[]){const node=this.nodes.get(item.id),type=node?.getData().type;
    if(node&&type!==item.type&&['text','file'].includes(type)&&['text','file'].includes(item.type))this.removeNode(node);
   }
   return originalImport.call(this,data,...args);
  };
  c.importData=importWithTypes;this.register(()=>{if(c.importData===importWithTypes)c.importData=originalImport;});
  for(const binding of c.view.scope?.keys||[]){
   if(!binding.key?.startsWith('Arrow')&&binding.key!=='Enter')continue;
   const original=binding.func;
   const wrapper=(e:KeyboardEvent,...args:any[])=>{
    if(this.fileInsert.key(e))return false;
    if(this.panels.capturesCanvasKeys(c)&&this.panels.key(e))return false;
    if(this.linkMenuKey(e,c)||this.connectionKey(e,c))return false;
    if(binding.modifiers!=='Shift')return original(e,...args);
    const editing=[...c.nodes.values()].some((n:any)=>n.isEditing);
    const input=(e.target as HTMLElement)?.closest?.('input,textarea,[contenteditable="true"],.modal-container');
    if(!editing&&!input&&!c.readonly)return;
    return original(e,...args);
   };
   binding.func=wrapper;this.register(()=>{if(binding.func===wrapper)binding.func=original;});
  }
 }
 private keydown(e:KeyboardEvent){
  if(this.fileInsert.key(e))return;
  if(this.panels.key(e))return;
  if(e.key!=='Alt'&&this.altTap){this.altTap.clean=false;this.altTap.last=0;}
  const c=this.current();if(!c||c.readonly||e.isComposing)return;const n=this.selected(c);
  const target=e.target as HTMLElement;
  const editing=[...c.nodes.values()].some((node:any)=>node.isEditing);
  const input=target?.closest?.('input,textarea,[contenteditable="true"],.modal-container');
  const frame=target?.ownerDocument?.defaultView?.frameElement;
  const insideCard=[...c.nodes.values()].some((node:any)=>node.isEditing&&(node.nodeEl.contains(target)||(frame&&node.nodeEl.contains(frame))));
  if(input&&!insideCard)return;
  if(!editing&&!input&&!this.menu&&!this.linkMenu&&!e.ctrlKey&&!e.shiftKey&&!e.altKey&&!e.metaKey&&(e.code==='KeyX'||e.key.toLowerCase()==='x')){
   const cards=[...c.selection].filter((item:any)=>c.nodes.has(item.id));if(!cards.length)return;
   this.stop(e);if(e.repeat)return;this.reset();this.clearConnectHint();this.sizes.finish();this.selections.observe(c);this.selections.capture(c);
   c.requestPushHistory.cancel?.();c.pushHistory(c.getData());for(const card of cards)c.removeNode(card);c.deselectAll();c.pushHistory(c.getData());c.requestSave(false);return;
  }
  if(!editing&&n&&e.ctrlKey&&e.shiftKey&&!e.altKey&&!e.metaKey&&e.code==='KeyL'){this.stop(e);if(!e.repeat)this.arrange(c);return;}
  this.sizes.observe(c);this.selections.observe(c);this.editorCamera.observe(c);
  if(this.linkMenuKey(e,c)||this.connectionKey(e,c))return;
  if(!editing&&n&&e.ctrlKey&&e.shiftKey&&!e.altKey&&!e.metaKey&&(e.key==='Control'||e.key==='Shift')){if(!e.repeat){this.reset();this.linkTimer=window.setTimeout(()=>{this.linkTimer=null;if(this.current()===c&&this.selected(c)?.id===n.id&&!n.isEditing)this.showLinkMenu(c,n.id,[]);},500);}return;}
  if(e.key!=='Control'&&e.key!=='Shift'&&this.linkTimer!==null){window.clearTimeout(this.linkTimer);this.linkTimer=null;}
  if(editing&&!e.ctrlKey&&!e.altKey&&!e.metaKey)this.editorCamera.resume();
  if(!editing&&!e.ctrlKey&&!e.altKey&&!e.metaKey&&((e.shiftKey&&e.key.startsWith('Arrow'))||(!e.shiftKey&&['BracketLeft','BracketRight'].includes(e.code)))){this.stop(e);this.reset();this.navigation.cameraKey(c,e.code);return;}
  if(!editing&&e.key==='Alt'&&!e.ctrlKey&&!e.shiftKey&&!e.metaKey){this.stop(e);if(!e.repeat){const last=this.altTap&&this.altTap.c===c?this.altTap.last:0;this.altTap={down:performance.now(),last,clean:true,c};if(c.selection.size===0)this.navigation.selectNearest(c);}return;}
  if(!editing&&!(e.ctrlKey&&e.code==='KeyZ'))this.selections.capture(c);
  const number=/^Numpad([1-9])$/.exec(e.code)?.[1];
  if(number&&!e.altKey&&!editing&&!target?.closest?.('input,textarea,[contenteditable="true"],.modal-container')){
   if(e.shiftKey&&!e.ctrlKey)return;this.stop(e);this.reset();if(e.repeat)return;this.navigation.observe(c);
   if(e.ctrlKey){if(e.shiftKey)this.navigation.register(c,number);else if(n)this.navigation.register(c,number,n);}else this.navigation.call(c,number);return;
  }
  if(!n)return;
  if(e.ctrlKey&&!e.altKey&&!e.shiftKey&&e.code==='Space'){
   this.stop(e);this.reset();if(e.repeat)return;this.sizes.observe(c);
   if(n.isEditing){n.child?.showPreview?.(true);n.setIsEditing(false);c.wrapperEl.focus();this.navigation.cancel();this.editorCamera.exit(c,n);}
   else {this.navigation.cancel();n.attach();n.render();n.startEditing();}return;
  }
  if(e.ctrlKey&&e.shiftKey&&!e.altKey&&!e.metaKey&&e.key.startsWith('Arrow')){this.stop(e);this.reset();this.sizes.resize(c,n,e.key);return;}
  if(n.isEditing||target?.closest?.('input,textarea,[contenteditable="true"],.modal-container'))return;
  if(this.menu){this.stop(e);if(e.key==='ArrowUp'||e.key==='ArrowDown'){const m=this.menu;m.index=(m.index+(e.key==='ArrowDown'?1:-1)+m.values.length)%m.values.length;this.paintMenu();}return;}
  if(e.altKey&&!e.ctrlKey&&!e.shiftKey&&e.key.startsWith('Arrow')){this.stop(e);this.reset();if(!e.repeat)this.navigation.navigate(c,n,e.key.slice(5).toLowerCase() as Direction);return;}
  if(e.ctrlKey&&e.shiftKey&&!e.altKey&&e.key.startsWith('Arrow')){this.stop(e);this.reset();this.sizes.resize(c,n,e.key);return;}
  if(e.ctrlKey&&e.altKey&&!e.shiftKey&&(e.key==='ArrowUp'||e.key==='ArrowDown')){this.stop(e);this.reset();if(!e.repeat)this.sizes.swap(c,n,e.key==='ArrowDown');return;}
  // Repeated Control keydowns must not fall through to chord cancellation.
  if(e.key==='Control'&&!e.altKey&&!e.shiftKey){if(!e.repeat)this.begin('Control',c,n.id);return;}
  if(e.ctrlKey&&!e.altKey&&!e.shiftKey&&e.key.startsWith('Arrow')){
   this.stop(e);this.clearTimer();if(this.hold)this.hold.consumed=true;
   if(!e.repeat)this.create(c,n.id,e.key.slice(5).toLowerCase() as Direction,false);return;
  }
  if(e.key==='Tab'&&!e.ctrlKey&&!e.altKey&&!e.shiftKey){this.stop(e);if(!e.repeat)this.begin('Tab',c,n.id);return;}
  if(this.hold?.key==='Control'){this.clearTimer();this.hold.consumed=true;}
 }
 private begin(key:string,canvas:Canvas,anchor:string){
  this.reset();const hold:Hold={key,canvas,anchor,consumed:false,timer:0};this.hold=hold;
  hold.timer=window.setTimeout(()=>{if(this.hold!==hold||this.current()!==canvas||this.selected(canvas)?.id!==anchor)return;hold.consumed=true;this.openMenu(key==='Control'?'mode':'source',canvas,anchor);},500);
 }
 private keyup(e:KeyboardEvent){
  if(e.code==='KeyA'||e.key==='Control'||e.key==='Shift')this.clearConnectHint();
  if(e.key==='Control'||e.key==='Shift'){if(this.linkTimer!==null)window.clearTimeout(this.linkTimer);this.linkTimer=null;if(this.linkMenu&&!this.linkMenu.ids.length)this.clearLinkMenu();}
  if(e.key==='Alt'&&this.altTap){const a=this.altTap,now=performance.now();if(a.clean&&now-a.down<=300&&this.current()===a.c){this.stop(e);if(a.last&&now-a.last<=300){this.navigation.selectNearest(a.c);a.last=0;}else a.last=now;}else a.last=0;a.clean=false;}
  this.sizes.keyup(e.key);
  const hold=this.hold;if(!hold||e.key!==hold.key)return;if(e.key==='Tab')this.stop(e);this.clearTimer();
  if(this.menu){const m=this.menu,choice=m.values[m.index];if(m.kind==='mode')this.settings.mode=choice as Settings['mode'];else this.settings.origins[m.canvas.view.file.path]=choice;void this.persist();}
  else if(hold.key==='Tab'&&!hold.consumed&&this.current()===hold.canvas&&this.selected(hold.canvas)?.id===hold.anchor)this.create(hold.canvas,hold.anchor,'down',true);
  this.reset();
 }
 private clearTimer(){if(this.hold)window.clearTimeout(this.hold.timer);}
 private reset(){if(this.linkTimer!==null)window.clearTimeout(this.linkTimer);this.linkTimer=null;this.clearLinkMenu();this.clearTimer();this.hold=null;this.menu?.el.remove();this.menu=null;}
 private openMenu(kind:'mode'|'source',c:Canvas,anchor:string){
  const candidates=sources(c.getData(),anchor);if(kind==='source'&&(this.settings.mode!=='connect'||!candidates.length))return;
  const values=kind==='mode'?['create','connect']:candidates.map(n=>n.id),current=kind==='mode'?this.settings.mode:this.settings.origins[c.view.file.path];
  const el=document.body.createDiv({cls:'canvas-mindmap-menu'});el.setAttribute('role','listbox');el.setAttribute('aria-label',kind==='mode'?'Creation mode':'Connection source');
  values.forEach((value,index)=>{const label=kind==='mode'?(value==='create'?'Create':'Create & Connect'):(candidates[index].text||String(candidates[index].file||'Untitled')).split('\n')[0];const row=el.createDiv({cls:'canvas-mindmap-option',text:label});row.setAttribute('role','option');row.title=label;});
  this.menu={el,values,index:Math.max(0,values.indexOf(current)),kind,canvas:c,anchor};this.paintMenu();this.positionMenu();
 }
 private paintMenu(){if(!this.menu)return;[...this.menu.el.children].forEach((el,i)=>{el.classList.toggle('is-selected',i===this.menu!.index);el.setAttribute('aria-selected',String(i===this.menu!.index));});}
 private positionMenu(){const m=this.menu;if(!m)return;const n=m.canvas.nodes.get(m.anchor);if(!n){this.reset();return;}const r=n.nodeEl.getBoundingClientRect(),h=m.el.offsetHeight,w=m.el.offsetWidth;m.el.style.left=`${Math.max(8,Math.min(innerWidth-w-8,r.right-w))}px`;m.el.style.top=`${Math.max(8,r.top-h-8)}px`;}
 private create(c:Canvas,anchor:string,direction:Direction,tab:boolean){
  const before:CanvasData=c.getData(),selection=[...c.selection].map((n:any)=>n.id);
  try{
   const defaults=c.config.defaultTextNodeDimensions;if(!defaults||!Number.isFinite(defaults.width)||!Number.isFinite(defaults.height))throw Error('Native card dimensions unavailable.');
   if(this.settings.width===null||this.settings.height===null){this.settings.width??=defaults.width;this.settings.height??=defaults.height;void this.persist();}
   const path=c.view.file.path;let source=this.settings.origins[path];if(!source||!c.nodes.has(source))source=sources(before,anchor)[0]?.id;
   const id=crypto.randomUUID().replace(/-/g,'').slice(0,16);
   const after=createLayout(before,{anchor,id,direction,tab,width:this.settings.width!,height:this.settings.height!,gap:this.settings.gap,connected:this.settings.mode==='connect',source});
   c.requestPushHistory.cancel?.();c.pushHistory(before);const history={data:[...c.history.data],current:c.history.current};
   try{applyCreation(c,before,after);c.selectOnly(c.nodes.get(id));this.selections.capture(c);this.navigation.focus(c,c.nodes.get(id));c.requestSave();}
   catch(error){c.setData(before);c.history.data=history.data;c.history.current=history.current;c.updateHistoryUI();if(selection[0]&&c.nodes.has(selection[0]))c.selectOnly(c.nodes.get(selection[0]));c.requestSave();throw error;}
  }catch(error){console.error('Canvas Mindmap creation failed',error);new Notice('카드를 생성하지 못했습니다. 기존 카드와 연결을 복원했습니다.');}
 }
}
class CreationSettings extends PluginSettingTab {
 constructor(private plugin:CanvasMindmap){super(plugin.app,plugin);}
 display(){this.containerEl.empty();this.containerEl.createEl('h2',{text:'Canvas Mindmap'});this.containerEl.createEl('h3',{text:'카드 생성'});
  new Setting(this.containerEl).setName('생성 모드').setDesc('모든 캔버스에 적용하며 마지막 선택을 저장합니다.').addDropdown(d=>d.addOption('create','일반 생성').addOption('connect','연결 생성').setValue(this.plugin.settings.mode).onChange(async value=>{this.plugin.settings.mode=value as Settings['mode'];await this.plugin.persist();}));
  for(const [key,label] of [['width','새 카드 기본 너비'],['height','새 카드 기본 높이'],['gap','카드 사이 간격']] as const)new Setting(this.containerEl).setName(label).setDesc('캔버스 기준 픽셀(px)').addText(text=>text.setPlaceholder('Obsidian 기본값').setValue(String(this.plugin.settings[key]??'')).onChange(async value=>{const number=Number(value);if(!value.trim()||!Number.isFinite(number)||(key==='gap'?number<0:number<=0))return;this.plugin.settings[key]=number;await this.plugin.persist();}));
  this.containerEl.createEl('h3',{text:'크기 및 화면 이동'});
  for(const [key,label] of [['resizeStep','크기 조절 단위'],['swapTolerance','위치 교환 시 가로 정렬 허용 오차']] as const)new Setting(this.containerEl).setName(label).setDesc('캔버스 기준 픽셀(px)').addText(text=>text.setValue(String(this.plugin.settings[key])).onChange(async value=>{const number=Number(value);if(!value.trim()||!Number.isFinite(number)||(key==='resizeStep'?number<=0:number<0))return;this.plugin.settings[key]=number;await this.plugin.persist();}));
  new Setting(this.containerEl).setName('내용에 맞춰 크기 자동 조절').setDesc('편집을 마치면 짧은 글은 너비를 줄이고, 긴 글은 현재 너비 안에서 줄바꿈하며 높이를 내용에 맞춥니다.').addToggle(toggle=>toggle.setValue(this.plugin.settings.autoResize).onChange(async value=>{this.plugin.settings.autoResize=value;await this.plugin.persist();}));
  new Setting(this.containerEl).setName('편집 시 최소 확대율').setDesc('편집 시 최소 확대율 (%). 기본 100%. 이미 더 확대되어 있으면 유지합니다. 캔버스 지원 범위: 6.25–200%.').addText(text=>text.setValue(String(this.plugin.settings.editMinZoom)).onChange(async value=>{const number=Number(value);if(!value.trim()||!Number.isFinite(number)||number<6.25||number>200){text.inputEl.setCustomValidity('6.25–200% 사이의 숫자를 입력하세요.');text.inputEl.reportValidity();return;}text.inputEl.setCustomValidity('');this.plugin.settings.editMinZoom=number;await this.plugin.persist();}));
  new Setting(this.containerEl).setName('입력 줄 따라가기').setDesc('편집 중 줄바꿈 시 입력 줄을 화면 중앙으로 이동합니다. 가로 위치는 따라가지 않습니다.').addToggle(toggle=>toggle.setValue(this.plugin.settings.followCaret).onChange(async value=>{this.plugin.settings.followCaret=value;await this.plugin.persist();}));
  new Setting(this.containerEl).setName('화면 이동 시간').setDesc('밀리초(ms). 값이 클수록 천천히 이동합니다.').addText(text=>text.setValue(String(this.plugin.settings.panDuration)).onChange(async value=>{const number=Number(value);if(!value.trim()||!Number.isFinite(number)||number<0)return;this.plugin.settings.panDuration=number;await this.plugin.persist();}));
  this.containerEl.createEl('h3',{text:'단축키'});
  new Setting(this.containerEl).setName('Obsidian 단축키 설정').setDesc('명령으로 등록된 단축키를 확인하거나 변경합니다.').addButton(b=>b.setButtonText('단축키 설정 열기').onClick(()=>{const settings=(this.app as any).setting;settings.openTabById('hotkeys');const tab=settings.activeTab;tab?.searchComponent?.setValue('Canvas Mindmap');tab?.updateHotkeyVisibility?.();}));
  this.containerEl.createEl('h3',{text:'설정 백업 및 복원'});
  const transfer=new SettingsTransfer(this.plugin,()=>this.display());
  new Setting(this.containerEl).setName('설정만 백업·복원').setDesc('이 설정창의 설정값만 포함합니다. 관리창 크기, Waypoint, 사용자 색상, 연결 출발점, 캔버스·노트·Undo 기록은 제외합니다.').addButton(b=>b.setButtonText('설정 백업').onClick(()=>void transfer.backup())).addButton(b=>b.setButtonText('설정 복원').onClick(()=>void transfer.restore()));


 }
}
