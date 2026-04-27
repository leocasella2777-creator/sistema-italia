const CACHE = 'sistema-italia-v119';
const FILES = [
  './', './index.html', './debito.html', './prefazione.html', './fiscale.html',
  './bilancio.html', './pensioni.html', './energia.html',
  './welfare.html', './proiezioni.html', './politica.html',
  './riflessioni.html', './principi.html', './fonti.html',
  './manifest.json', './icon-192.svg', './icon-512.svg',
  './sistema_italia_v119.pdf'
];
self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));
  self.skipWaiting();
});
self.addEventListener('activate', e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e=>{
  e.respondWith(caches.open(CACHE).then(cache=>
    fetch(e.request).then(res=>{cache.put(e.request,res.clone());return res;})
    .catch(()=>caches.match(e.request))
  ));
});
