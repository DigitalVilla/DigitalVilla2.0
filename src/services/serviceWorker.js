export default (() => {
	const hiddenClass = "hidden";
	const hasServiceWorker = ("serviceWorker" in navigator)
	// let isLoggedIn = /isLoggedIn=1/.test(document.cookie.toString() || "");
	let isLoggedIn = false;
	let isOnline = ("onLine" in navigator) && navigator.onLine;
	let svcWorker,
		offlineIcon,
		swRegistration;

	// Offline UI elements 
	document.addEventListener("DOMContentLoaded", () => {
		offlineIcon = document.getElementById("online-status");

		if (!isOnline) {
			offlineIcon.classList.remove(hiddenClass);
		}

		window.addEventListener("online", () => {
			offlineIcon.classList.add(hiddenClass);
			isOnline = true;
			sendStatusUpdate();
		}, false);

		window.addEventListener("offline", () => {
			offlineIcon.classList.remove(hiddenClass);
			isOnline = false;
			sendStatusUpdate();
		}, false);
	}, false);

	// Register the service worker
	async function register() {
		if (hasServiceWorker) {
			const swUrl = `${process.env.PUBLIC_URL}/sw.js`;

			swRegistration = await navigator.serviceWorker.register(swUrl, {
				updateViaCache: "none" // 
			});

			// Check if the SW is in any of these states 
			svcWorker = swRegistration.installing || swRegistration.waiting || swRegistration.active;
			sendStatusUpdate(svcWorker);

			// Listen fora new SW to take over
			navigator.serviceWorker.addEventListener("controllerChange", () => {
				svcWorker = navigator.serviceWorker.controller; // Assing the new SW 
				sendStatusUpdate(svcWorker);
			})

			// Init comunication
			navigator.serviceWorker.addEventListener("message", (e) => {
				// console.log(e);
				const { data } = e;
				if (data.header === "statusUpdate") { // Custom field to ask fror updates
					// console.log("SW requested status update");
					sendStatusUpdate(e.ports && e.ports[0]);
				}
			}, false);
		}
	}

	function sendStatusUpdate(target) {
		sendSWMessage({ statusUpdate: { isOnline, isLoggedIn } }, target);
	}

	function sendSWMessage(msg, target) {
		if (target) { // Check if there is a valid conection to transmit directly
			target.postMessage(msg);
		} else if (svcWorker) {
			svcWorker.postMessage(msg);
		} else if (navigator.serviceWorker.controller) {
			navigator.serviceWorker.controller.postMessage(msg);
		}
	}

	function unregister() {
		if (hasServiceWorker) {
			navigator.serviceWorker.ready.then(registration => {
				registration.unregister();
			});
		}
	}

	return {
		unregister,
		register
	}
})();


