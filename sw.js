var CACHE_NAME = 'WELFORDIAN-CACHE-V2';
var urlsToCache = [
                    'css/style.css',
                    'imagens/fundo.jpg',
                    'index.html',
                    'imagens/logo.ico',
                    'imagens/fundo1.png',
                    'imagens/fundo2.jpg',
                    'imagens/fundo3.png',
                    'imagens/icon1.png',
                    'imagens/icon2.png',
                    'imagens/icon3.png',
                    'imagens/icon4.jpg',
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
                    'imagens/stranger.jpg',
                    '/'
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
  var reqURL = new URL(event.request.url);
  if (/lst.fm/.test(reqURL)) {
    event.respondWith(lastFMImageResponse(event.request));
  } else {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        if (response) {
          return response;
        }

        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      }).catch(function(err) {
        return err;
      })
    );
  }
});

function lastFMImageResponse(request) {
  return caches.match(request).then(function(response) {
    if (response) {
      return response;
    }
    return fetch(request).then(function(response) {
      caches.open('lfm-images').then(function(cache) {
        cache.put(request, response);
      });

      return response.clone();
    });
  });
}
