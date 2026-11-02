import test from 'node:test';
import assert from 'node:assert/strict';
import {initial,reduce} from '../model.mjs';
import {MAX_BACKUP_BYTES,decodeBackup,encodeBackup,restoreIntoEmpty,pristine,describeBackup} from '../backup.mjs';
const at='2026-11-02T12:00:00.000Z';
function fixture(){let state=reduce(initial(),{type:'add',productId:'kabel',nextCartId:'cart-1'});state=reduce(state,{type:'sale',cartId:state.cartId,id:'sale-1',nextCartId:'cart-2',at,method:'cash-demo'});state=reduce(state,{type:'close',id:'close-1',at});state=reduce(state,{type:'reversal',id:'rev-1',saleId:'sale-1',at});return reduce(state,{type:'add',productId:'service',nextCartId:'cart-3'});}
test('round trip keeps historical prices, reversals, close markers and active cart',()=>{
 const state=fixture(),decoded=decodeBackup(encodeBackup(state));assert.deepEqual(decoded,state);
 assert.deepEqual(describeBackup(decoded),{name:'Deine Werkstatt',products:3,cartLines:1,events:3,sold:900,reversed:900,net:0,count:1,stornos:1});
 const restored=restoreIntoEmpty(initial(),decoded,'new-cart');assert.equal(restored.cartId,'new-cart');assert.deepEqual(restored.events,state.events);assert.deepEqual(restored.cart,state.cart);
 restored.events[0].lines[0].cents=999;assert.equal(decoded.events[0].lines[0].cents,900);
});
test('existing events, configuration and cart may never be replaced',()=>{
 const pristineState=initial();assert.equal(pristine(pristineState),true);
 for(const state of [fixture(),reduce(initial(),{type:'configure',name:'Andere Kasse'}),reduce(initial(),{type:'product',id:'test',name:'Test',cents:100}),reduce(initial(),{type:'add',productId:'kabel',nextCartId:'cart-x'})]){
  const before=structuredClone(state);assert.equal(pristine(state),false);assert.throws(()=>restoreIntoEmpty(state,initial(),'new-cart'),/unbenutzten/);assert.deepEqual(state,before);
 }
 assert.throws(()=>restoreIntoEmpty(initial(),initial(),''));
});
test('malformed, unsupported, inconsistent and oversized imports fail without modifying destination',()=>{
 const destination=initial(),invalid=fixture();invalid.events[2].saleId='missing-sale';
 const cases=['','{broken','null','[]',JSON.stringify({format:'another',version:1,state:initial()}),JSON.stringify({format:'pos-zukunft-demo',version:2,state:initial()}),JSON.stringify({format:'pos-zukunft-demo',version:1,state:invalid}),JSON.stringify({format:'pos-zukunft-demo',version:1,state:{...initial(),products:[null]}})];
 for(const text of cases)assert.throws(()=>decodeBackup(text),/gültiger/);
 assert.throws(()=>decodeBackup('x'.repeat(MAX_BACKUP_BYTES+1)),/2 MiB/);
 assert.throws(()=>decodeBackup('ä'.repeat(MAX_BACKUP_BYTES/2+1)),/2 MiB/);
 assert.deepEqual(destination,initial());
});
test('unknown object fields and prototype-looking keys are never promoted into restored state',()=>{
 const envelope=JSON.parse(encodeBackup(fixture()));envelope.state.extra={secret:'ignored'};
 Object.defineProperty(envelope.state,'__proto__',{enumerable:true,value:{polluted:true}});envelope.state.products[0].unexpected='ignored';
 const parsed=decodeBackup(JSON.stringify(envelope));assert.equal(Object.hasOwn(parsed,'extra'),false);assert.equal(Object.hasOwn(parsed,'__proto__'),false);assert.equal(Object.hasOwn(parsed.products[0],'unexpected'),false);assert.equal({}.polluted,undefined);assert.deepEqual(parsed,fixture());
});
