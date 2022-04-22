const KGVision = '706'
const HOSTNAME_WHITELIST = [
	self.location.hostname,
	'cdn.jsdelivr.net',
	'cdn.staticfile.org',
	'fonts.googleapis.com',
	'fonts.gstatic.com',
	'lf3-cdn-tos.bytecdntp.com',
	//'p.qlogo.cn',
	'www.googletagmanager.com',
	'hyx3179.github.io',
	'petercheney.gitee.io',
]
const NO_CACHE_LIST = [
	'/server.json',
	'/build.version.json',
	'/scientists/ks.version.json',
]
const KS_LIST = [
	'/scientists/kitten-scientists.user.js',
	'/scientists/ks.version.json',
]

// 安装：加载 index 到 cache
self.addEventListener('install', function (event) {
	event.waitUntil(caches.open(KGVision).then(cache => cache.add('/')));
});

// 激活：删除之前的 cache
self.addEventListener('activate', event => {
	event.waitUntil(Promise.all([
		self.clients.claim(),
		caches.keys().then(function (cacheNames) {
			return Promise.all(
				cacheNames.filter(function (cacheName) {
					return cacheName !== KGVision
				}).map(function (cacheName) {
					return caches.delete(cacheName);
				}))
		})]))
})

// 请求处理
self.addEventListener('fetch', event => {
	// 跳过一些 cross-origin （跨域）请求
	if (HOSTNAME_WHITELIST.indexOf(new URL(event.request.url).hostname) > -1) {
		// 珂学家相关单开 cache 空间方便更新
		if (KS_LIST.indexOf(new URL(event.request.url).pathname) > -1) {
			var cacheName = 'scientists'
		} else {
			var cacheName = KGVision
		}

		if (NO_CACHE_LIST.indexOf(new URL(event.request.url).pathname) > -1) {
			// 无缓存文件优先请求网络
			event.respondWith(fetch(event.request, { cache: 'no-store' })
				.then(resp => {
					// 成功则拷贝一份
					const respCopy = resp.clone()
					// 在缓存中寻找之前的 cache，删除后提交新的 cache
					Promise.all([respCopy, caches.match(event.request, { ignoreSearch: true })])
						.then(([respCopy, cacheold]) => {
							Promise.all([respCopy, cacheold, caches.open(cacheName)])
								.then(([response, cacheold, cache]) => {
									if (cacheold !== undefined) {
										cache.delete(cacheold.url, { ignoreSearch: true })
									}
									cache.put(event.request, response)
								})
						})
					return resp
				})
				.catch(_ => {
					// 无网络时寻找并返回 cache
					return caches.match(event.request, { ignoreSearch: true }).then(resp => resp)
				}))
		} else {
			// 其他情况优先请求 cache
			event.respondWith(caches.match(event.request)
				.then(cached => {
					if (cached !== undefined) {
						return cached
					} else {
						// 不存在 cache，则请求网络并提交cache
						const fetched = fetch(event.request, { cache: 'no-store' })
						const fetchedCopy = fetched.then(resp => resp.clone())
						Promise.all([fetchedCopy, caches.open(cacheName)])
							.then(([response, cache]) => cache.put(event.request, response))
						return fetched
					}
				}))
		}
	}
})