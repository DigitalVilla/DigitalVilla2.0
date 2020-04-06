"use strict";

const APP_NAME = 'DigitalVilla';
const VERSION = '2.2.10';
const CACHE_NAME = `${APP_NAME}-${VERSION}`;
const debug = false;
let isOnline = true;
let isLoggedIn = false;
let filesToCache = [];

self.addEventListener("install", async function onInstall(e) {
	self.skipWaiting(); // Force new SW to become the active SW
	print(`${APP_NAME} (${VERSION}): Installed.`);
});

self.addEventListener("activate", function onActivate(e) {
	// Prevent Browser to shutdown before handleActivation is completed
	e.waitUntil((async (params) => {
		//clear old cache
		await clearCaches(true);// Set to false when new libraries use the cache
		await cacheFiles(true); /* forceReload */
		await clients.claim(); // Take contrall of all open clients/tabs
		print(`${APP_NAME} (${VERSION}): Activated.`);
		sendMessage({ header: 'newServiceWorker' });
	})())
});

self.addEventListener("fetch", async function onFetch(e) {
	e.respondWith(router(e.request));
	// print(e.request);
	// return e;
});

self.addEventListener("message", onMessage);


/** */
(async function init() {
	print(`${APP_NAME} (${VERSION}): Starting`);
	await sendMessage({ header: 'statusUpdate' }); // send custom header
	await cacheFiles();
})().catch(console.error);

//////////////////////////
/////*** Helpers ***//////
//////////////////////////

async function clearCaches(clearAll) {
	const cacheItems = await caches.keys();
	const oldCacheItems = cacheItems.filter(function matchOldCache(cacheName) {

		if (!clearAll) { // Clear only this app's caches
			let [, cacheNameVersion] = cacheName.match(/^App-(\d.\d.\d+)$/) || [];
			return cacheNameVersion && VERSION !== cacheNameVersion;
		}
		return clearAll;
	});

	await Promise.all(
		// Map each cache to the promise of being deleted.
		oldCacheItems.map(function deleteCache(cacheName) {
			return caches.delete(cacheName);
		})
	);
}

function onMessage({ data }) {
	if ("statusUpdate" in data) {
		({ isOnline, isLoggedIn } = data.statusUpdate);
		print(`${APP_NAME} (${VERSION}) is ${isOnline ? 'Online' : 'Offline'}.`, true);
	}
}

async function sendMessage(msg) {
	const allClients = await clients.matchAll({ includeUncontrolled: true, });
	// Return a promise for each client
	return Promise.all(
		allClients.map(function sendTo(client) {
			const channel = new MessageChannel();
			channel.port1.onmessage = onMessage; // Port 1: Reciever
			return client.postMessage(msg, [channel.port2]); // Port 2: Sender
		})
	);
}

/**
 * @param {Array} filesToCache 
 * @param {Boolean} forceReload If false only new files will be cached else all files will be cached regardless
 */
async function cacheFiles(forceReload = false) {

	if (!forceReload) { // Fetch only on init
		filesToCache = await getAassetManifest();
		// print(filesToCache);
	}

	const cache = await caches.open(CACHE_NAME);

	return Promise.all(
		filesToCache.map(async function requestFile(url) {
			try {
				let res;

				if (!forceReload) { // Skip elements already cached
					res = await cache.match(url);
					if (res) {
						return;
					}
				}

				res = await fetch(url, {
					method: "GET",
					cache: "no-store",
					credentials: "omit"
				});

				if (res.ok) {  // Add element to cache: 
					// NOTE: res.clone()); If the response is going to consumed by the browser retutn a clone
					return cache.put(url, res);
				}
			}
			catch (err) {
				console.error('Cache Error: ' + err)
			}
		})
	);
}

async function router(req) {
	var url = new URL(req.url);
	var reqURL = url.pathname;
	var cache = await caches.open(CACHE_NAME);

	// request for site's own URL?
	if (url.origin == location.origin) {
		// all other files use "cache-first"
		let res = await cache.match(reqURL);
		if (res) {
			return res;
		} else {
			if (isOnline) {
				try {
					let fetchOptions = {
						method: req.method,
						headers: req.headers,
						cache: "no-store",
					};
					res = await fetch(req.url, fetchOptions);
					if (res && res.ok) {
						await cache.put(reqURL, res);
						return res.clone();
					}
				}
				catch (err) {
					console.log(err);
				}
			}
		}
		return notFoundResponse();
	}

	return req
}

function notFoundResponse() {
	return new Response("", {
		status: 404,
		statusText: "Not Found"
	});
}

function getAassetManifest() {

	return [
		"/",
		"/favicon.ico",
		// "/index.html",
		"/static/css/main.1e9bd4de.chunk.css",
		"/static/js/main.aec7274e.chunk.js",
		"/static/js/runtime-main.9a849ed7.js",
		"/static/js/2.2fdd8f06.chunk.js",
		"/static/media/Oswald-Regular.6ca57499.woff",
		"/static/media/Oswald-Light.d1473454.woff",
		// "/static/media/Resume2020.e8f7dd2e.pdf",
		"/static/media/design.d279d215.jpg",
		"/static/media/digitalvilla.8166ac43.jpg",
		"/static/media/ego.5817646d.png",
		"/static/media/eyedentify.635d1f57.png",
		"/static/media/imatch.238265bf.png",
		"/static/media/justbeer.903a5dd9.png",
		"/static/media/kit.e25ddfc5.png",
		"/static/media/lens.0232d8c5.jpg",
		"/static/media/mac-rainbow.5abf287b.jpg",
		"/static/media/nebula-lg.5cd98627.jpg",
		"/static/media/nebula-md.be5f5855.jpg",
		"/static/media/nebula-sm.6b93cfaa.jpg",
		// "/static/media/nebula.1081eb94.jpg",
		// "/static/media/nebula.3a134d72.mp4",
		"/static/media/old-games.ca742234.jpg",
		"/static/media/portal.081c5a10.png",
		"/static/media/tlc.8e92e647.jpg",
		"/static/media/winsight.d9b15e6c.jpg",
		"/static/media/wow.37b50493.png"
	]
}

function print(log, forced) {
	if (forced || debug) {
		console.log(log)
	}
}