import React from 'react'
import CN from 'classnames'
import Icon from '../components/Icons.jsx'
import isMedia from '../utils/isMedia'
import vid from '../assets/nebula.mp4'
import img_sm from '../assets/nebula-sm.jpg'
import img_md from '../assets/nebula-md.jpg'
import img_lg from '../assets/nebula-lg.jpg'
import img_4k from '../assets/nebula.jpg'
import logo_DV from '../assets/logo_DV.png'
import logo_D from '../assets/logo_D.png'
import logo_V from '../assets/logo_V.png'
import '../scss/pages/Home.scss'

let poster = img_sm;

export default function Home(props) {
	let isMobile = isMedia('mobile');
	let isPhone = isMedia('phone')

	let source = isPhone ? '' : vid;
	let icon = isMobile ? 'chevronCircleDn' : 'mouse';
	let dataset = isPhone ? {} : { 'data-autoplay': "true" };

	const handlePageDown = () => {
		props.api.moveTo(2);
	}

	const isVisible = () => {
		return props.api ? props.api.getActiveSection().anchor === props.page : false;
	}

	return (
		<div className={CN("container-fluid " + props.page, { "animate": isVisible() })}>
			<div className="header noSelect">
				<img className="main-logo" src={logo_DV} alt="DV" />
				<h1>Digital Villa | Media Agency</h1>
				<div className="title">
					<span><img src={logo_D} alt="D logo" />igital</span>
					<span className="break"></span>
					<span><img src={logo_V} alt="V logo" />illa</span>
				</div>
				<h2>Transforming Ideas<span className="break"></span> Into living designs</h2>
			</div>
			<div className="video-container">
				<video id="video" {...dataset} loop muted preload="true" poster={poster}>
					<source data-src={source} type='video/mp4' />
				</video>
			</div>
			<div className="scroll">
				<Icon className="scroll-icon svg-md" icon={icon} action={handlePageDown} />
			</div>
		</div>
	)
}

(function root() {
	let root = document.getElementsByClassName('page-bg')[0];
	poster = isMedia('phone') ? img_sm : isMedia('tablet') ? img_md
		: isMedia('2kUp') ? img_4k : img_lg;
	root.style.backgroundImage = 'url(' + poster + ')';
})();
