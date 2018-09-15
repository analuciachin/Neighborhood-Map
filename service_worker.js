var cache_name = 'map-app';
var urlsToCache = [
  '/',
  '/public/index.html',
  '/public/favicon.ico',
  '/src/App.css',
  '/src/App.js',
  '/src/index.css',
  '/src/index.js',
  '/src/ListLocations.js',
  '/src/MapComponent.js',
  '/src/MapHeader.js',
  '/src/SearchLocationsHeader.js'
  
];

// Install the service worker
window.self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cache_name).then(function(cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate
window.self.addEventListener('activate', function(event){
  console.log('Activated');
});


// Cache and return requests

window.self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response){
      if(response) { 
        return response;
      }
      return fetch(event.request);
    })
  );
});


