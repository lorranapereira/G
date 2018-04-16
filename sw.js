var log = console.log.bind(console);//bind our console to a variable
var version = "0.0.2";
var cacheName = "sw-demo";
var cache = cacheName + "-" + version;
var filesToCache = [
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
                    'camisetas',
                    'cadastro2.html',
                    'cadastro3.html','another.jpg',
                    'aven1.jpg',	
                    'aven2.jpg',	
                    'aven3.jpg',	
                    'aven4.jpg',	
                    'aven5.jpg',	
                    'aven6.jpg',	
                    'cavalo.jpg',	
                    'db.jpg',	
                    'edu1.jpg',	
                    'edu2.jpg',	
                    'edu3.jpg',	
                    'edu4.jpg',	
                    'edu5.jpg',	
                    'edu6.jpg',	
                    'fan1.jpg',	
                    'fan2.jpg',	
                    'fan3.jpg',	
                    'fan4.jpg',	
                    'fan5.jpg',	
                    'fan6.jpg',	
                    'fan6.png',	
                    'fic1.jpg',	
                    'fic2.jpg',	
                    'fic3.jpg',	
                    'fic4.jpg',	
                    'fic5.jpg',	
                    'fic6.jpg',	
                    'heroi1.jpg',	
                    'heroi2.jpg',	
                    'heroi3.jpg',	
                    'heroi4.jpg',	
                    'heroi5.jpg',	
                    'heroi6.jpg',	
                    'infan1.jpg',	
                    'infan2.jpg',	
                    'infan3.jpg',	
                    'infan4.jpg',	
                    'infan5.jpg',	
                    'infan6.jpg',	
                    'itachi.jpg',	
                    'josei1.jpg',	
                    'josei2.jpg',	
                    'josei3.jpg',	
                    'josei4.jpg',	
                    'josei5.jpg',	
                    'josei6.jpg',	
                    'logo.ico',	
                    'luluzinha.jpg',	
                    'manga1.jpg',	
                    'manga2.jpg',	
                    'manga3.jpg',	
                    'manga4.jpg',	
                    'manga5.jpg',	
                    'manga6.png',	
                    'morty.png',	
                    'naruto.jpg',	
                    'shounen1.jpg',	
                    'shounen1.png',	
                    'shounen2.jpg',	
                    'shounen3.jpg',	
                    'shounen4.jpg',	
                    'shounen5.jpg',	
                    'shounen6.jpg',	
                    'stranger.jpg',
                    "/"
                 ];

//Add event listener for install
self.addEventListener("install", function(event) {
    log('[ServiceWorker] Installing....');
    event.waitUntil(caches
                        .open(cache)//open this cache from caches and it will return a Promise
                        .then(function(cache) { //catch that promise
                            log('[ServiceWorker] Caching files');
                            cache.addAll(filesToCache);//add all required files to cache it also returns a Promise
                        })
                    ); 
});

//Add event listener for fetch
self.addEventListener("fetch", function(event) {
    //note that event.request.url gives URL of the request so you could also intercept the request and send a response based on your URL
    //e.g. you make want to send gif if anything in jpeg form is requested.
    event.respondWith(//it either takes a Response object as a parameter or a promise that resolves to a Response object
                        caches.match(event.request)//If there is a match in the cache of this request object
                            .then(function(response) {
                                if(response) {
                                    log("Fulfilling "+event.request.url+" from cache.");
                                    //returning response object
                                    return response;
                                } else {
                                    log(event.request.url+" not found in cache fetching from network.");
                                    //return promise that resolves to Response object
                                    return fetch(event.request);
                                }
                            })
                    );
});

self.addEventListener('activate', function(event) {
  log('[ServiceWorker] Activate');
  event.waitUntil(
                    caches.keys()//it will return all the keys in the cache as an array
                    .then(function(keyList) {
                            //run everything in parallel using Promise.all()
                            Promise.all(keyList.map(function(key) {
                                    if (key !== cacheName) {
                                        log('[ServiceWorker] Removing old cache ', key);
                                        //if key doesn`t matches with present key
                                        return caches.delete(key);
                                    }
                                })
                            );
                        })
                );
});

 
  

     
