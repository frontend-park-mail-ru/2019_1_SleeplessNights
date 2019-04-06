const KEY = 'sl-nights';
const pages = ['play', 'about', 'leaders', 'profile', 'login', 'signup'];

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
                .catch(err => console.dir(err))
        );
    }
});

self.addEventListener('fetch',   (event) => {
    const request = event.request;
    event.respondWith(
        caches.match(request)
            .then(async (cachedResponse) => {

                if (cachedResponse) {
                    return cachedResponse;
                }

                if (navigator.onLine) {
                    return fetch(request)
                        .then(res => {
                            const resClone = res.clone();
                            caches.open(KEY).then((cache) => cache.put(request, resClone));
                        })
                        .catch(err => console.error(err));
                }

                const url = new URL(event.request.url);
                const path = url.pathname.replace('/', '');

                if (pages.includes(path)) {
                    console.log('43');
                    const baseUrl = url.toString().replace(path, '');
                    try {
                        const cache = await caches.open(KEY);
                        const keys = await cache.keys();
                        const request = keys.find(key => key.url.toString() === baseUrl);
                        return await caches.match(request);
                    } catch (e) {
                        console.dir(e);
                    }
                } else {
                    console.log('54');
                    const init = {
                        status: 418,
                        statusText: 'Offline Mode'
                    };

                    const data = {message: `Content is not available in offline mode`};
                    const blob = new Blob([JSON.stringify(data, null, 2)], {type : 'application/json'});
                    return new Response(blob, init);
                }
            })
            .catch((err) => {
                console.log(err.stack || err);
            })
    );
});
