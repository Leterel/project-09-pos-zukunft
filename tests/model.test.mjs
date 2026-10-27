import test from 'node:test';
import assert from 'node:assert/strict';
import {initial,parseEuro,total,reduce,validate,overview} from '../model.mjs';
const at='2026-10-27T10:00:00.000Z';
const add=state=>reduce(state,{type:'add',productId:'kabel',nextCartId:'cart-1'});
const sale=state=>reduce(state,{type:'sale',cartId:state.cartId,id:'sale-1',nextCartId:'cart-2',at,method:'cash-demo'});
test('decimal parsing uses integer cents and rejects ambiguous or oversized money',()=>{
 for(const [input,expected] of [['0,01',1],['12,5',1250],['9999.99',999999],[' 1 ',100]])assert.equal(parseEuro(input),expected);
 for(const input of ['0','-1','1,234','1e3','10 000','1.000,00','10000','Infinity','NaN',''])assert.throws(()=>parseEuro(input));
});
test('cart, commit token and bounded totals preserve the previous state on errors',()=>{
 const before=initial(),one=add(before);assert.equal(total(one.cart),900);assert.equal(before.cart.length,0);
 const sold=sale(one);assert.equal(sold.cart.length,0);assert.equal(overview(sold.events).net,900);
 assert.throws(()=>reduce(sold,{type:'sale',cartId:'cart-1',id:'sale-2',nextCartId:'cart-3',at,method:'cash-demo'}));
 assert.throws(()=>reduce(one,{type:'remove',index:0,cartId:'stale',nextCartId:'cart-2'}));
 let full=one;for(let i=1;i<99;i++)full=reduce(full,{type:'add',productId:'kabel',nextCartId:'cart-'+i});assert.throws(()=>add(full));assert.equal(full.cart[0].quantity,99);
});
test('storno is append-only and cannot refer to unknown or already cancelled sales',()=>{
 const sold=sale(add(initial())),reversed=reduce(sold,{type:'reversal',id:'reversal-1',saleId:'sale-1',at});
 assert.deepEqual(overview(reversed.events),{sold:900,reversed:900,net:0,count:1,stornos:1});assert.equal(sold.events.length,1);
 assert.throws(()=>reduce(reversed,{type:'reversal',id:'reversal-2',saleId:'sale-1',at}));assert.throws(()=>reduce(sold,{type:'reversal',id:'reversal-2',saleId:'missing',at}));
});
test('configuration never changes historical prices and close snapshots use prior events',()=>{
 const one=add(initial()),configured=reduce(one,{type:'configure',name:'Eigene Kasse'}),sold=sale(configured),closed=reduce(sold,{type:'close',id:'close-1',at});
 const later=reduce(closed,{type:'reversal',id:'reversal-1',saleId:'sale-1',at});assert.equal(overview(later.events.slice(0,1)).net,900);assert.equal(overview(later.events).net,0);
 assert.equal(sold.events[0].name,'Eigene Kasse');assert.equal(sold.events[0].lines[0].cents,900);
 assert.throws(()=>validate({...sold,events:[...sold.events,sold.events[0]]}));assert.throws(()=>reduce(initial(),{type:'product',id:'broken',name:'',cents:123}));
});
