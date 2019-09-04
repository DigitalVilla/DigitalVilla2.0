import React from 'react'
import Icon from '../components/Icons'
import isMedia from '../components/isMedia'
import source from '../assets/nebula.mp4'
import img_sm from '../assets/nebula-sm.jpg'
import img_md from '../assets/nebula-md.jpg'
import img_lg from '../assets/nebula-lg.jpg'
import img_4k from '../assets/nebula.jpg'
import logo_DV from '../assets/logo_DV.png'
import logo_D from '../assets/logo_D.png'
import logo_V from '../assets/logo_V.png'

export default function Home(props) {
	let tabletUp = isMedia('mdUp');
	let poster = !tabletUp ? img_sm
		: !isMedia('xxlUp') ? img_md
			: !isMedia('4kUp') ? img_lg : img_4k;

	let icon = isMedia('mobile') ? 'chevronCircleDn' : 'mouse';
	let dataset = tabletUp ? { 'data-autoplay': "true" } : {};

	const handlePageDown = () => {
		props.api.moveTo(2);
	}

	return (
		<div id="Home" className="page container-fluid">
			<div className="header noSelect">
				<img className="main-logo" src={logo_DV} alt="DV" />
				<div className="title row is-sm">
					<span className="col col-sm-6"><img src={logo_D} alt="D" />igital</span>
					<span className="col col-sm-6"><img src={logo_V} alt="V" />illa </span>
				</div>
				<h2>Transforming Ideas Into living designs</h2>
			</div>

			<div className="video-container">
				<video id="video" {...dataset} loop muted preload="true" poster={poster}>
					<source src={tabletUp ? source : ''} type='video/mp4' />
				</video>
			</div>

			<Icon className="scroll-icon svg-md" icon={icon} action={handlePageDown} />
		</div>
	)
}
