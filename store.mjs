import {initial,validate,reduce} from './model.mjs';
let connection;
function database(){return connection??=new Promise((resolve,reject)=>{
 const request=indexedDB.open('pos-zukunft-demo',1);request.onupgradeneeded=()=>request.result.createObjectStore('demo');request.onsuccess=()=>{request.result.onversionchange=()=>{request.result.close();connection=undefined;};resolve(request.result);};request.onerror=()=>{connection=undefined;reject(Error('Browserspeicher nicht verfügbar. Kein Testverkauf gespeichert.'));};request.onblocked=()=>reject(Error('Bitte andere alte Demo-Tabs schließen.'));
});}
export async function access(action){const db=await database();return new Promise((resolve,reject)=>{
 let result,failure;const tx=db.transaction('demo',action?'readwrite':'readonly',{durability:'strict'}),store=tx.objectStore('demo'),request=store.get('state');
 request.onsuccess=()=>{try{result=validate(request.result??initial());if(action){result=reduce(result,action);store.put(result,'state');}}catch(error){failure=error;tx.abort();}};
 tx.oncomplete=()=>resolve(result);tx.onerror=tx.onabort=()=>reject(failure||Error('Speichern fehlgeschlagen. Kein Erfolg bestätigt; bitte neu laden und prüfen.'));
});}
