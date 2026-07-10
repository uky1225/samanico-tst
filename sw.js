const CACHE_NAME = 'desert-odyssey-v100'; // 버전 올리면 업데이트 강제 실행됨
const ASSETS = ['./', './index.html', './manifest.json'];

self.addEventListener('install', (e) => e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS))));

self.addEventListener('fetch', (e) => {
  // 1. 데이터 통신(kvdb, 구글시트)은 절대 캐시 안 함 (실시간 데이터 저장 보장)
  if (e.request.url.includes('kvdb.io') || e.request.url.includes('script.google.com')) {
    return;
  }
  // 2. 나머지는 캐시에서 가져오되, 업데이트가 있으면 즉시 반영
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
