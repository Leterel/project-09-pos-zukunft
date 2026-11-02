import {initial,validate,overview} from './model.mjs';
export const MAX_BACKUP_BYTES=2*1024*1024;
const line=l=>({id:l.id,name:l.name,cents:l.cents,quantity:l.quantity});
// Select only documented fields. Imported objects never become application objects directly.
function canonical(value){
 validate(value);
 return {version:1,name:value.name,products:value.products.map(p=>({id:p.id,name:p.name,cents:p.cents})),cart:value.cart.map(line),cartId:value.cartId,events:value.events.map(e=>e.type==='sale'?{type:e.type,id:e.id,at:e.at,method:e.method,name:e.name,lines:e.lines.map(line)}:e.type==='reversal'?{type:e.type,id:e.id,at:e.at,saleId:e.saleId}:{type:e.type,id:e.id,at:e.at})};
}
export function decodeBackup(text){
 if(typeof text!=='string'||new TextEncoder().encode(text).length>MAX_BACKUP_BYTES)throw Error('Demoexport darf höchstens 2 MiB groß sein.');
 try{
  const envelope=JSON.parse(text);
  if(envelope?.format!=='pos-zukunft-demo'||envelope.version!==1)throw Error();
  return canonical(envelope.state);
 }catch{throw Error('Kein gültiger POS-Zukunft-Demoexport (Version 1). Aktueller Stand bleibt erhalten.');}
}
export function encodeBackup(state){const text=JSON.stringify({format:'pos-zukunft-demo',version:1,state:canonical(state)},null,2);if(new TextEncoder().encode(text).length>MAX_BACKUP_BYTES)throw Error('Demoexport überschreitet das 2-MiB-Limit. Aktueller Stand bleibt erhalten.');return text;}
export function pristine(state){return JSON.stringify(canonical(state))===JSON.stringify(initial());}
export function restoreIntoEmpty(previous,backup,nextCartId){
 if(!pristine(previous))throw Error('Wiederherstellung nur in einer unbenutzten leeren Demo. Vorhandene Daten bleiben erhalten.');
 const restored=canonical(backup);restored.cartId=nextCartId;return validate(restored);
}
export function describeBackup(state){const value=canonical(state);return {name:value.name,products:value.products.length,cartLines:value.cart.length,events:value.events.length,...overview(value.events)};}
