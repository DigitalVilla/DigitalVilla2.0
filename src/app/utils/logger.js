const fn = (typeof console != 'undefined') && (process.env.NODE_ENV === 'development') ? console : () => {};

export default (compName, disable) => {
	return (args, mode, colorAll) => {
		if (disable) return () => {};
		let advanced = typeof args === 'object';

		switch (mode) {
			case 0: // 'default'
				mode = advanced ? 'log' : 'Black';
				break
			case 1: // 'success'
				mode = advanced ? 'log' : 'Green';
				break
			case 2: // 'warning'
				mode = advanced ? 'warn' : 'Orange';
				break;
			case 3: // 'error'
				mode = advanced ? 'error' : 'Red';
				break;
			case 4: // 'info'
				mode = advanced ? 'info' : 'Blue';
				break;
			case 5: // 'extra'
				mode = advanced ? 'log' : 'Teal';
				break;
			case 6: // 'extra'
				mode = advanced ? 'log' : 'Navy';
				break;
			case 7: // 'extra'
				mode = advanced ? 'log' : 'Purple';
				break;
			case 8: // 'extra'
				mode = advanced ? 'log' : 'Pink';
				break;
			case 9: // 'extra'
				mode = advanced ? 'log' : 'Grey';
				break;
			default:
				mode = advanced ? 'log' : 'Navy';
		}

		let logger = advanced ? fn[mode] : fn['log'];
		return logger && advanced ? logger(...[compName, ...args]) :
			logger ? logger(`%c${compName}`+`%c${args}`,`color:${mode}`, `color:${colorAll? mode : 'Black'}`) :
			() => {};
	}
};