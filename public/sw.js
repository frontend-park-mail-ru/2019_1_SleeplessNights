const KEY = 'sl-nights';

self.addEventListener('install', (event) => {
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('message', (event) => {
    if (event.data.type === 'CACHE_URLS') {
        event.waitUntil(
            caches.open(KEY)
                .then( (cache) => {
                    return cache.addAll(event.data.payload);
                })
        );
    }
});

self.addEventListener('fetch', (event) => {

    // console.log(event.request);
    // return caches.match(event.request)
    //     .then(cachedResponse => cachedResponse || networkFetch);
    //
    // event.respondWith(
    //     caches.match(event.request)
    //         .then(cachedResponse => cachedResponse || networkFetch)
    // );

    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {

                if (cachedResponse) {
                    return cachedResponse;
                }

                if (navigator.onLine) {
                    return fetch(event.request)
                        .then(res => {
                            const resClone = res.clone();
                            caches.open(KEY).then((cache) => cache.put(event.request, resClone));
                            return resClone;
                        })
                        .catch(err => console.error(err));
                    // let response;
                    // event.waitUntil(
                    //     fetch(event.request)
                    //         .then(res => {
                    //             const resClone = res.clone();
                    //             caches.open(KEY).then((cache) => cache.put(event.request, resClone));
                    //             response = resClone;
                    //         })
                    //         .catch(err => console.error(err))
                    // );
                    // return response;
                }

                return fetch(event.request);
            })
            .catch((err) => {
                console.log(err.stack || err);
            })
    );
});


