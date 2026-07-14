// 버전 이름을 변경해야 브라우저가 '업데이트'로 인식합니다.
const CACHE_NAME = 'Samanico1'; 

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './IMG_0012.png' // 여기에 아이콘 파일명을 정확히 적어주세요 (icon-512.png가 아닌 icon.png로 변경하신다면!)
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// 이전 버전의 캐시를 삭제하는 코드
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log('기존 캐시 삭제:', name);
            return caches.delete(name);
          }
        })
      );
    })
  );
});

// 네트워크 우선 전략이 아닌 캐시 우선 전략을 사용할 때의 기본 코드
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      // 캐시가 있으면 반환, 없으면 네트워크에서 가져옴
      return response || fetch(e.request);
    })
  );
});
