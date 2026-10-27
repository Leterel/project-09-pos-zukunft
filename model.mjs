export function parseEuro(value){
 if(typeof value!=='string'||!/^\d{1,4}(?:[,.]\d{1,2})?$/.test(value.trim()))throw Error('Betrag: 0,01 bis 9.999,99 €, höchstens zwei Nachkommastellen.');
 const [whole,fraction='']=value.trim().replace(',','.').split('.');const cents=Number(whole)*100+Number(fraction.padEnd(2,'0'));
 if(cents<1||cents>999999)throw Error('Betrag: 0,01 bis 9.999,99 €.');return cents;
}
const title=value=>typeof value==='string'&&value.trim().length>0&&value.trim().length<=60&&!/[\u0000-\u001f]/.test(value);
const identifier=value=>typeof value==='string'&&/^[a-zA-Z0-9-]{1,80}$/.test(value);
function requireThat(ok,message='Ungültige Demodaten.'){if(!ok)throw Error(message);}
export function initial(){return {version:1,name:'Deine Werkstatt',products:[{id:'service',name:'Service · 15 Minuten',cents:1800},{id:'kabel',name:'USB-Kabel',cents:900},{id:'diagnose',name:'Geräte-Check',cents:2500}],cart:[],cartId:'start',events:[]};}
export function total(lines){return lines.reduce((sum,line)=>sum+line.cents*line.quantity,0);}
function validLines(lines,empty=false){return Array.isArray(lines)&&(empty||lines.length>0)&&lines.length<=40&&lines.every(line=>identifier(line.id)&&title(line.name)&&Number.isSafeInteger(line.cents)&&line.cents>0&&line.cents<=999999&&Number.isSafeInteger(line.quantity)&&line.quantity>=1&&line.quantity<=99)&&total(lines)<=99999999;}
export function validate(state){
 requireThat(state&&state.version===1&&title(state.name)&&identifier(state.cartId)&&validLines(state.cart,true));
 requireThat(Array.isArray(state.products)&&state.products.length<=20&&new Set(state.products.map(p=>p.id)).size===state.products.length&&state.products.every(p=>identifier(p.id)&&title(p.name)&&Number.isSafeInteger(p.cents)&&p.cents>0&&p.cents<=999999));
 requireThat(Array.isArray(state.events)&&state.events.length<=500);const ids=new Set(),sales=new Map(),reversed=new Set();
 for(const event of state.events){
  requireThat(identifier(event.id)&&!ids.has(event.id)&&typeof event.at==='string'&&Number.isFinite(Date.parse(event.at)));ids.add(event.id);
  if(event.type==='sale'){requireThat(validLines(event.lines)&&['cash-demo','card-demo'].includes(event.method)&&title(event.name));sales.set(event.id,event);}
  else if(event.type==='reversal'){requireThat(sales.has(event.saleId)&&!reversed.has(event.saleId));reversed.add(event.saleId);}
  else requireThat(event.type==='close');
 }
 return state;
}
export function overview(events){
 const sales=new Map();let sold=0,reversed=0,count=0,stornos=0;
 for(const event of events){if(event.type==='sale'){sales.set(event.id,event);sold+=total(event.lines);count++;}else if(event.type==='reversal'){const sale=sales.get(event.saleId);if(sale){reversed+=total(sale.lines);stornos++;}}}
 return {sold,reversed,net:sold-reversed,count,stornos};
}
export function reduce(previous,action){
 validate(previous);const state=structuredClone(previous);
 if(action.type==='add'){
  const product=action.product??state.products.find(p=>p.id===action.productId);requireThat(product&&identifier(product.id)&&title(product.name)&&Number.isSafeInteger(product.cents)&&product.cents>0&&product.cents<=999999,'Artikel oder Betrag ungültig.');
  const existing=state.cart.find(line=>line.id===product.id&&line.cents===product.cents&&line.name===product.name);
  if(existing){requireThat(existing.quantity<99,'Höchstens 99 Stück je Zeile.');existing.quantity++;}else state.cart.push({...product,quantity:1});
  state.cartId=action.nextCartId;
 } else if(action.type==='remove'){requireThat(action.cartId===state.cartId,'Warenkorb wurde in einem anderen Tab geändert. Bitte neu laden.');requireThat(Number.isInteger(action.index)&&action.index>=0&&action.index<state.cart.length);state.cart.splice(action.index,1);state.cartId=action.nextCartId;}
 else if(action.type==='sale'){
  requireThat(action.cartId===state.cartId&&state.cart.length>0,'Dieser Warenkorb ist leer oder wurde bereits abgeschlossen.');
  state.events.push({type:'sale',id:action.id,at:action.at,method:action.method,name:state.name,lines:structuredClone(state.cart)});state.cart=[];state.cartId=action.nextCartId;
 } else if(action.type==='reversal')state.events.push({type:'reversal',id:action.id,at:action.at,saleId:action.saleId});
 else if(action.type==='close')state.events.push({type:'close',id:action.id,at:action.at});
 else if(action.type==='configure'){
  requireThat(title(action.name),'Kassenname: 1 bis 60 Zeichen.');state.name=action.name.trim();
 } else if(action.type==='product'){
  requireThat(state.products.length<20,'Maximal 20 Demoartikel.');requireThat(title(action.name),'Artikelname: 1 bis 60 Zeichen.');state.products.push({id:action.id,name:action.name.trim(),cents:action.cents});
 } else if(action.type==='deleteProduct')state.products=state.products.filter(product=>product.id!==action.id);
 else throw Error('Unbekannte Demoaktion.');
 return validate(state);
}
