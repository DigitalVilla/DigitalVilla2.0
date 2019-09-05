const media = {
	// Small mobile
	_xs: 360,
	// Large mobile
	_sm: 576,
	// Small Tablet
	_md: 768,
	// Large Tablet
	_lg: 992,
	// Small  screen
	_xl: 1200,
	// Desktop
	_xxl: 1600,
	// 4k
	_4k: 3800
}

export default function isMedia(screen) {
	const width =  window.innerWidth;
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
			return mobile && width >= media._sm && height >= media._sm;
		case 'tablet':
			return mobile && width >= media._md && height >= media._md;
		case 'phone':
			return mobile && ((width < media._sm && !landscape) || (height < media._sm && landscape));
		case 'xsUp':
			return width >= media._sm;
		case 'smUp':
			return width >= media._sm;
		case 'mdUp':
			return width >= media._md;
		case 'lgUp':
			return width >= media._lg;
		case 'xlUp':
			return width >= media._xl;
		case 'xxlUp':
			return width >= media._xxl;
		case '4kUp':
			return width >= media._4k;
		case 'xsDn':
			return width < media._sm;
		case 'smDn':
			return width < media._sm;
		case 'mdDn':
			return width < media._md;
		case 'lgDn':
			return width < media._lg;
		case 'xlDn':
			return width < media._xl;
		case 'xxlDn':
			return width < media._xxl;
		case '4kDn':
			return width < media._4k;
			default:
			//nothing
			break;
	}
}