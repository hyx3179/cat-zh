(function(){const m=["hm.baidu.com","p.qlogo.cn","q2.qlogo.cn","kittensgame.com","www.google-analytics.com"],g=location.host,k=["https://hyx3179.github.io/%%/","https://cat-zh-hyx3179.netlify.app/%%/"],n=a=>{a=new URL(a);let c=[];if(a.host!==g)a=new Request(a.href,{mode:"cors"}),c.push(a);else{let d=a.pathname.split("/").filter(e=>0<e.length);for(var b in k){let e=[...d],f=k[b].replace(/%%/,e.shift()),h=-1==f.indexOf(g)?"cors":"no-cors";c.push(new Request(f+e.join("/")+a.search,{mode:h}))}1<d.length&&
-1==d.indexOf("ks.version.json")&&(b="https://cdn.jsdelivr.net/gh/hyx3179/%%@%Revision%/".replace(/%%/,d.shift()),b=1<b.indexOf("scientists")?b.replace(/%Revision%/,"0."+a.search.split("=")[1]):b.replace(/%Revision%/,"0.7"),c.push(new Request(b+d.join("/")+a.search,{mode:"cors"})))}return c},p=a=>{let c=[];for(let b in a)c.push(fetch(a[b],{cache:"no-store"}).then(d=>d.ok?d:new Promise(function(e){setTimeout(e,5E3,d)})));return c};addEventListener("install",a=>{a.waitUntil(caches.open("cat-7").then(c=>
c.add("/cat-zh/")))});addEventListener("activate",a=>{a.waitUntil(Promise.all([clients.claim(),caches.keys().then(c=>Promise.all(c.filter(b=>{b=b.split("-");return 2==b.length&&"cat"===b[0]&&b[1]!==(7).toString()}).map(b=>caches.delete(b))))]))});addEventListener("fetch",a=>{const c=new URL(a.request.url);if(!(-1<m.indexOf(c.host))){var b=c.host!==g?"catStaticRes":"cat-7",d=n(c.href);a.respondWith(caches.match(d[0]).then(e=>e&&e.ok?e:Promise.race(p(d)).then(f=>{const h=f.clone();Promise.all([h,caches.open(b)]).then(([q,
l])=>{-1==d[0].url.indexOf("fonts.g")&&l.delete(d[0],{ignoreSearch:!0});l.put(d[0],q)});return f})))}})})();