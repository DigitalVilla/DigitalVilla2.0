"use strict";

const APP_NAME = 'DigitalVilla';
const VERSION = '1.5.0';
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
		print(`${APP_NAME} (${VERSION}) is ${isOnline? 'Online': 'Offline'}.`,true);
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
		print(filesToCache);
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
		// are we making an API request?
		if (/^\/api\/.+$/.test(reqURL)) {
			let res;

			if (isOnline) { // Fetch online first API and update cached file
				try {
					let fetchOptions = {
						method: req.method,
						headers: req.headers,
						credentials: "same-origin",
						cache: "no-store",
					};
					res = await fetch(req.url, fetchOptions);

					if (res && res.ok) {
						if (req.method == "GET") {
							await cache.put(reqURL, res.clone());
						}
						return res;
					}
				}
				catch (err) { }
			}

			// Use the chached file 
			res = await cache.match(reqURL);
			if (res) {
				return res;
			}

			return notFoundResponse();
		}
		// are we requesting an HTML page?
		else if (req.headers.get("Accept").includes("text/html")) {
			// login-aware requests?
			if (/^\/(?:login|logout|add-post)$/.test(reqURL)) {
				// TODO
			}
			// otherwise, just use "network-and-cache"
			else {
				let res;

				if (isOnline) {
					try {
						let fetchOptions = {
							method: req.method,
							headers: req.headers,
							cache: "no-store",
						};
						res = await fetch(req.url, fetchOptions);
						if (res && res.ok) {
							await cache.put(reqURL, res.clone());
							return res;
						}
					}
					catch (err) { }
				}

				// fetch failed, so try the cache
				res = await cache.match(reqURL);

				if (res) {
					return res;
				}

				// otherwise, return an offline-friendly page
				return cache.match("/offline");
			}
		}
		// all other files use "cache-first"
		else {
			let res = await cache.match(reqURL);
			if (res) {
				return res;
			}
			else {
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
					catch (err) { }
				}

				// otherwise, force a network-level 404 response
				return notFoundResponse();
			}
		}
	}
}

function notFoundResponse() {
	return new Response("", {
		status: 404,
		statusText: "Not Found"
	});
}

async function getAassetManifest () {
	let assets = ['/favicon.ico'];
	const res = await fetch('/asset-manifest.json', {
		mode: 'no-cors'
	})
	.then(res => res.json())
	.catch(error => print(error));

	for (const key in res.files) {
		if (res.files.hasOwnProperty(key)) {
			const url = res.files[key];
			
			if (!url.includes('LICENSE')) { 
				assets.push(url);
			}
		}
	}
 
	return assets;
}

function print(log, forced) {
	if (forced || debug) {
		console.log(log)
	}
}