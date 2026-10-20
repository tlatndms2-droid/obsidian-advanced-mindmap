export const settingKeys=['mode','width','height','gap','resizeStep','swapTolerance','autoResize','panDuration','followCaret','editMinZoom'] as const;
export function settingsOnly(source:any){return Object.fromEntries(settingKeys.map(k=>[k,structuredClone(source[k])]))}
export function parseBackup(text:string){
 const file=JSON.parse(text),s=file?.settings;
 if(file?.format!=='canvas-mindmap-settings'||file.version!==1||!s||typeof s!=='object'||Array.isArray(s)||Object.keys(s).length!==settingKeys.length||settingKeys.some(k=>!Object.prototype.hasOwnProperty.call(s,k)))throw Error('지원하지 않는 백업 형식입니다.');
 if(!['create','connect'].includes(s.mode)||typeof s.autoResize!=='boolean'||typeof s.followCaret!=='boolean')throw Error('설정값이 올바르지 않습니다.');
 for(const k of ['width','height','gap','resizeStep','swapTolerance','panDuration','editMinZoom']){const v=s[k];if((k==='width'||k==='height')&&v===null)continue;if(typeof v!=='number'||!Number.isFinite(v)||((k==='width'||k==='height'||k==='resizeStep')?v<=0:v<0))throw Error('숫자 설정값이 올바르지 않습니다.');}
 if(s.editMinZoom<6.25||s.editMinZoom>200)throw Error('확대율이 올바르지 않습니다.');
 return settingsOnly(s);
}
export function makeBackup(settings:any){const text=JSON.stringify({format:'canvas-mindmap-settings',version:1,settings:settingsOnly(settings)},null,2);parseBackup(text);return text;}
