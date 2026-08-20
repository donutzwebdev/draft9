importScripts('https://donutzwebdev.github.io/scramjet/scramjet.all.js');

const { ScramjetServiceWorker } = $scramjetLoadWorker();
const sw = new ScramjetServiceWorker();

self.addEventListener('fetch', (event) => {
  // Only intercept requests that go through the scramjet prefix
  if (!event.request.url.includes('/draft9/scramjet/')) return;
  event.respondWith((async () => {
    await sw.loadConfig();
    if (sw.route(event)) {
      return sw.fetch(event);
    }
    return fetch(event.request);
  })());
});
