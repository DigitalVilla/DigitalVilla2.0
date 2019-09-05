import React from 'react'
import Icon from '../components/Icons.jsx'
import isMedia from '../components/isMedia'
import vid from '../assets/nebula.mp4'
import img_sm from '../assets/nebula-sm.jpg'
import img_md from '../assets/nebula-md.jpg'
import img_lg from '../assets/nebula-lg.jpg'
import img_4k from '../assets/nebula.jpg'
import logo_DV from '../assets/logo_DV.png'
import logo_D from '../assets/logo_D.png'
import logo_V from '../assets/logo_V.png'

export default function Home(props) {
	let isMobile = isMedia('mobile');
	let isTablet = isMedia('tablet');
	let isPhone = isMedia('phone')

	let source = isPhone ? '' : vid;
	let icon = isMobile ? 'chevronCircleDn' : 'mouse';
	let dataset = isPhone ? {} : { 'data-autoplay': "true" };
	let poster = isPhone ? img_sm : isTablet ? img_md
			: isMedia('4kUp') ? img_4k : img_lg;

	const handlePageDown = () => {
		props.api.moveTo(2);
	}

	return (
		<div id="Home" className="page container-fluid">
			<div className="header noSelect">
				<img className="main-logo" src={logo_DV} alt="DV" />
				<div className="title">
					<span><img src={logo_D} alt="D" />igital</span>
					<span className="break"></span>
					<span><img src={logo_V} alt="V" />illa</span>
				</div>
				<h2>Transforming Ideas<span className="break"></span> Into living designs</h2>
			</div>

			<div className="video-container">
				<video id="video" {...dataset} loop muted preload="true" poster={poster}>
					<source src={source} type='video/mp4' />
				</video>
			</div>

			<Icon className="scroll-icon svg-md" icon={icon} action={handlePageDown} />
		</div>
	)
}
