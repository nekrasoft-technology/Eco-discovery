//определяем название кэша и файлы которые хотим кэшировать
const APP_CACHE_NAME = 'app-cache-v1';

//определяем файлы для кэширования
const ASSETS_URLS = [
  'index.html',
  '/js/controls.js',
  '/css/adaptive.css',
  '/css/style.css',
];

//добавляем событие при установке приложения
self.addEventListener('install', (evt) => {
  //ждем пока все файлы кэшируются
  evt.waitUntil(handleInstall());
});

const handleInstall = async () => {
  const cache = await caches.open(APP_CACHE_NAME);
  //кэшируем контент при установке
  await cache.addAll(ASSETS_URLS);
};

//добавляем событие на каждый запрос
self.addEventListener('fetch', (evt) => {
  evt.respondWith(handleRequest(event));
});

const handleRequest = async (evt) => {
  const r = await caches.match(evt.request);

  //проверяем есть ли в кэше то что запрашивается
  if (r) {
    return r;
  }

  //запрашиваем то что нам нужно, если этого нету в кэше
  const response = await fetch(evt.request);

  return response;
};