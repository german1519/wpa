importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);

workbox.precaching.precacheAndRoute([
  'index.html',
  'offline.html',
  'bebidas.html',
  'pedidos.html',
  'postres.html',
  'img/offline.png',
]);

workbox.routing.registerRoute(
  ({request}) => request.destination === 'image',
  new workbox.strategies.NetworkOnly()
);


workbox.routing.registerRoute(
  ({request}) => request.destination === 'document',
  new workbox.strategies.NetworkFirst()
);

//si hay una respuesta que genere error 
workbox.routing.setCatchHandler(async context=>{
  console.log(context);
  console.log(context.request);

  if (context.request.destination === 'image') {
    return workbox.precaching.matchPrecache('img/offline.png');}
    else if (context.request.destination === 'document') {
      return workbox.precaching.matchPrecache('offline.html');
    }
    return Response.error();
})
