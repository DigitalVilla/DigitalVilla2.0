const media = {
	// Small mobile
	xs: 360,
	// Large mobile
	sm: 576,
	// Small Tablet
	md: 768,
	// Large Tablet
	lg: 992,
	// Small  screen
	xl: 1200,
	// Desktop
	xxl: 1600,
	// 2k
	_2k: 2048,
	// 4k
	_4k: 3800
}

export default function isMedia(screen) {
	const width = window.innerWidth;
	const height = window.innerHeight;
	const userAgent = navigator.userAgent;
	const orientation = window.orientation;

	let landscape = Math.abs(orientation) === 90;
	let mobile = (/Mobi/i.test(userAgent) ||
		/Android/i.test(userAgent) ||
		(userAgent).indexOf("Mobile") > 0 ||
		typeof orientation !== "undefined") ||
		(userAgent.indexOf('IEMobile') !== -1);

	switch (screen) {
		case 'mobile':
			return mobile;
		case 'landscape':
			return landscape;
		case 'tablet-sm':
			return mobile && width >= media.sm && height >= media.sm;
		case 'tablet':
			return mobile && width >= media.md && height >= media.md;
		case 'phone':
			return mobile && ((width < media.sm && !landscape) || (height < media.sm && landscape));
		case 'xsUp':
			return width >= media.sm;
		case 'smUp':
			return width >= media.sm;
		case 'mdUp':
			return width >= media.md;
		case 'lgUp':
			return width >= media.lg;
		case 'xlUp':
			return width >= media.xl;
		case 'xxlUp':
			return width >= media.xxl;
		case '2kUp':
			return width >= media._2k;
		case '4kUp':
			return width >= media._4k;
		case 'xsDn':
			return width < media.sm;
		case 'smDn':
			return width < media.sm;
		case 'mdDn':
			return width < media.md;
		case 'lgDn':
			return width < media.lg;
		case 'xlDn':
			return width < media.xl;
		case 'xxlDn':
			return width < media.xxl;
		case '2kDn':
			return width < media._2k;
		case '4kDn':
			return width < media._4k;
		default:
			//nothing
			break;
	}
}

// setViewSize();
// Multiply it by 1% to get a value for a vh unitz
export function setViewSize() {
	const fp = document.getElementById('fullpage');
	const sections = Array.from(document.getElementsByClassName('fp-section'));
	console.log("setViewSize init");


	
	const seView = () => {
		setTimeout(() => {
			console.log("setViewSize closure");
			let vh = window.innerHeight * 0.01;
			fp.style.height = sections.length * 100 * vh + 'px';
			fp.style.bottom = 0;
			document.body.style.bottom = 0;
			document.documentElement.style.bottom = 0;

			document.documentElement.style.setProperty('--vh', `${vh}px`);
			sections.forEach((sec) => {
				sec.style.height = 100 * vh + 'px'
			});
		
		}, 200)
	};
	return seView; 
}
