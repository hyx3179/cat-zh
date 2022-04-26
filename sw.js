const swRevision = 0
const GHCDN = 'https://cdn.jsdelivr.net/gh/hyx3179'
const BACKUP = 'https://cat-zh-hyx3179.netlify.app'
// 这之前的行会在构建时删除 --------------------------
const cacheStorage = 'cat-' + swRevision
const HOSTNAME_BLACKLIST = [
	'hm.baidu.com',
	'p.qlogo.cn',
	'q2.qlogo.cn',
	'kittensgame.com',
	'www.google-analytics.com',
]
const NO_CACHE_LIST = [
	'/cat-zh/server.json',
	'/cat-zh/build.version.json',
	'/scientists/ks.version.json',
]

// 获取请求
const getRequest = (url) => {
	url = new URL(url)
	let reqList
	if (url.hostname !== location.hostname) {
		// 跨域添加 cors
		let newReq = new Request(url.href, { mode: 'cors' })
		reqList = [newReq]
	} else {
		// 重组 url 排除 '//+'
		var pathname = '/' + url.pathname.split('/').filter(path => path.length > 0).join('/')
		if (pathname.indexOf('/', 1) == -1) { pathname += '/' }
		url = new URL(url.origin + pathname + url.search)
		reqList = [new Request(url, { mode: 'no-cors' })]
		// 添加其他解析地址
		if (GHCDN) {
			let splitPosition = url.pathname.indexOf('/', 1)
			let repository = url.pathname.slice(0, splitPosition)
			let subFile = url.pathname.slice(splitPosition)
			if (subFile !== '/') {
				if (subFile.indexOf('.css') > -1) { subFile = subFile.slice(0, -4) + '.min.css' }
				let href = GHCDN + repository + '@gh-pages' + subFile + url.search
				let newReq = new Request(href, { mode: 'cors' })
				reqList.push(newReq)
			}
		}
		if (BACKUP) {
			let href = BACKUP + url.pathname + url.search
			let newReq = new Request(href, { mode: 'cors' })
			reqList.push(newReq)
		}
	}
	return reqList
}
// 根据请求列表返回 fetchList
const getFetch = (req) => {
	let fetchList = []
	for (let i in req) {
		fetchList.push(fetch(req[i], { cache: 'no-store' }))
	}
	return fetchList
}

// 安装：加载 index 到 cache
addEventListener('install', event => {
	event.waitUntil(caches.open(cacheStorage).then(cache => cache.add('/cat-zh/')));
});

// 激活：删除之前的 cache
addEventListener('activate', event => {
	event.waitUntil(Promise.all([
		clients.claim(),
		caches.keys().then(cacheNames =>
			Promise.all(cacheNames.filter(cacheName => {
				cacheName = cacheName.split('-')
				return cacheName.length == 2 && cacheName[0] === 'cat' && cacheName[1] !== swRevision.toString()
			}).map(cacheName => caches.delete(cacheName))))]))
})

// 请求处理
addEventListener('fetch', event => {
	const url = new URL(event.request.url)
	// 跳过无法正确处理 cors 的请求和不应缓存的请求
	if (HOSTNAME_BLACKLIST.indexOf(url.hostname) == -1) {
		let cacheName = cacheStorage
		if (url.hostname !== location.hostname) {
			cacheName = 'catStaticRes' // 跨域资源单独存放
		}

		const req = getRequest(url.href)

		if (NO_CACHE_LIST.indexOf(new URL(req[0].url).pathname) > -1) {
			// 无缓存文件优先请求网络
			event.respondWith(Promise.race(getFetch(req))
				.then(resp => {
					// 成功则拷贝一份
					const respCopy = resp.clone()
					// 删除缓存中的 cache 后提交新的 cache
					Promise.all([respCopy, caches.open(cacheName)])
						.then(([response, cache]) => {
							cache.delete(req[0], { ignoreSearch: true })
							cache.put(req[0], response)
						})
					return resp
				})
				.catch(_ => {
					// 无网络时寻找并返回 cache
					return caches.match(req[0], { ignoreSearch: true }).then(resp => resp)
				}))
		} else {
			// 其他情况优先请求 cache
			event.respondWith(caches.match(req[0])
				.then(cached => {
					if (cached !== undefined) {
						return cached
					} else {
						// 不存在 cache，则请求网络
						// 删除以前可能存在的版本并提交 cache
						// race() 返回最快的响应
						return Promise.race(getFetch(req))
							.then(resp => {
								const respCopy = resp.clone()
								Promise.all([respCopy, caches.open(cacheName)])
									.then(([response, cache]) => {
										cache.delete(req[0], { ignoreSearch: true })
										cache.put(req[0], response)
									})
								return resp
							})
					}
				}))
		}
	}
})