const CACHE = 'krishna-cache-v2'
const toCache = ['/manifest.json']

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE).then((cache) => cache.addAll(toCache))
    )
    self.skipWaiting()
})

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(keys.map((key) => {
                if (key !== CACHE) return caches.delete(key)
            }))
        })
    )
})

self.addEventListener('fetch', (e) => {
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    )
})

