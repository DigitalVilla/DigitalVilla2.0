export default function isMedia(screen) {
	switch (screen) {
		case 'mobile':
			return ((navigator.userAgent).indexOf("Mobile") > 0);
		case 'xsUp':
			return window.innerWidth >= 360;
		case 'smUp':
			return window.innerWidth >= 576;
		case 'mdUp':
			return window.innerWidth >= 768 && window.innerHeight > 400;
		case 'lgUp':
			return window.innerWidth >= 992;
		case 'xlUp':
			return window.innerWidth >= 1200;
		case 'xxlUp':
			return window.innerWidth >= 1600;
		case '4kUp':
			return window.innerWidth >= 3800;
		case 'xsDw':
			return window.innerWidth < 360;
		case 'smDw':
			return window.innerWidth < 576;
		case 'mdDw':
			return window.innerWidth < 768;
		case 'lgDw':
			return window.innerWidth < 992;
		case 'xlDw':
			return window.innerWidth < 1200;
		case 'xxlDw':
			return window.innerWidth < 1600;
		case '4kDw':
			return window.innerWidth < 3800;
		default:
			break;
	}
}