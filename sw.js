const CACHE_NAME = 'Samanico'; // 버전 업그레이드로 이전 캐시 강제 초기화
const ASSETS = [
  './',
  './index.html',
  './manifest.json', // 매니페스트 파일도 캐시에 추가하는 것이 안정적입니다.
  './icon2.png'      // 중복되었던 항목 하나 삭제 완료
  // 필요 시 ./style.css, ./game.js 등 추가
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

// 이전 캐시(과거 버전) 삭제를 통한 버전 관리
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      );
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
