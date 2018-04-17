var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
                    '/',
                    'index.html',
                    'css/style.css',
                    'imagens/logo.ico',
                    'imagens/fundo1.png',
                    'imagens/fundo2.jpg',
                    'imagens/fundo3.png',
                    'imagens/icon1.png',
                    'imagens/icon2.png',
                    'imagens/icon3.png',
                    'imagens/icon4.jpg',
                    'imagens/fundo.jpg',
                    'cadastro.html',
                    'atendimento.html',
                    'camisetas.html',
                    'cadastro2.html',
                    'cadastro3.html',
                    'OutrosLivros.html',
                    'mangas.html',
                    'MeusPedidos.html',
                    'quadrinhos.html',
                    'imagens/another.jpg',
                    'imagens/aven1.jpg',	
                    'imagens/aven2.jpg',	
                    'imagens/aven3.jpg',	
                    'imagens/aven4.jpg',	
                    'imagens/aven5.jpg',	
                    'imagens/aven6.jpg',	
                    'imagens/cavalo.jpg',	
                    'imagens/db.jpg',	
                    'imagens/edu1.jpg',	
                    'imagens/edu2.jpg',	
                    'imagens/edu3.jpg',	
                    'imagens/edu4.jpg',	
                    'imagens/edu5.jpg',	
                    'imagens/edu6.jpg',	
                    'imagens/fan1.jpg',	
                    'imagens/fan2.jpg',	
                    'imagens/fan3.jpg',	
                    'imagens/fan4.jpg',	
                    'imagens/fan5.jpg',	
                    'imagens/fan6.jpg',	
                    'imagens/fan6.png',	
                    'imagens/fic1.jpg',	
                    'imagens/fic2.jpg',	
                    'imagens/fic3.jpg',	
                    'imagens/fic4.jpg',	
                    'imagens/fic5.jpg',	
                    'imagens/fic6.jpg',	
                    'imagens/heroi1.jpg',	
                    'imagens/heroi2.jpg',	
                    'imagens/heroi3.jpg',	
                    'imagens/heroi4.jpg',	
                    'imagens/heroi5.jpg',	
                    'imagens/heroi6.jpg',	
                    'imagens/infan1.jpg',	
                    'imagens/infan2.jpg',	
                    'imagens/infan3.jpg',	
                    'imagens/infan4.jpg',	
                    'imagens/infan5.jpg',	
                    'imagens/infan6.jpg',	
                    'imagens/itachi.jpg',	
                    'imagens/josei1.jpg',	
                    'imagens/josei2.jpg',	
                    'imagens/josei3.jpg',	
                    'imagens/josei4.jpg',	
                    'imagens/josei5.jpg',	
                    'imagens/josei6.jpg',	
                    'imagens/logo.ico',	
                    'imagens/luluzinha.jpg',	
                    'imagens/manga1.jpg',	
                    'imagens/manga2.jpg',	
                    'imagens/manga3.jpg',	
                    'imagens/manga4.jpg',	
                    'imagens/manga5.jpg',	
                    'imagens/manga6.png',	
                    'imagens/morty.png',	
                    'imagens/naruto.jpg',	
                    'imagens/shounen1.jpg',	
                    'imagens/shounen1.png',	
                    'imagens/shounen2.jpg',	
                    'imagens/shounen3.jpg',	
                    'imagens/shounen4.jpg',	
                    'imagens/shounen5.jpg',	
                    'imagens/shounen6.jpg',	
                    'imagens/stranger.jpg'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response.
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});

self.addEventListener('activate', function(event) {

  var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
 
  

     
