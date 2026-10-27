import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import {resolve} from 'node:path';
const files=new Map([['/',['index.html','text/html; charset=utf-8']],['/app.mjs',['app.mjs','text/javascript']],['/model.mjs',['model.mjs','text/javascript']],['/store.mjs',['store.mjs','text/javascript']],['/style.css',['style.css','text/css']]]);
export function createLocalServer(){return createServer(async(req,res)=>{
 const host=req.headers.host||'';
 if(!/^(127\.0\.0\.1|localhost)(:\d+)?$/.test(host)){res.writeHead(403);return res.end('Nur lokaler Testzugriff.');}
 const file=files.get(req.url);
 if(req.method!=='GET'||!file){res.writeHead(404);return res.end('Nicht gefunden');}
 try{const bytes=await readFile(new URL(file[0],import.meta.url));res.writeHead(200,{'Content-Type':file[1],'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self'; connect-src 'none'; img-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'"});res.end(bytes);}catch{res.writeHead(500);res.end('Datei fehlt.');}
});}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 const server=createLocalServer();server.on('error',error=>{console.error('Lokaler Start fehlgeschlagen: '+error.code);process.exitCode=1;});server.listen(8852,'127.0.0.1',()=>console.log('POS-Demo lokal: http://127.0.0.1:8852 — Strg+C beendet den Server.'));
}
