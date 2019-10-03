import React from 'react'
import CN from 'classnames'
import ego from '../assets/ego.png'
import '../scss/pages/About.scss'
import NeoText from '../components/NeoText'
// import logger from '../utils/logger';
// let log = logger(`<About/>:`);


export default function About(props) {
	const isVisible = () => {
		return props.api ? props.api.getActiveSection().anchor === props.page : false;
	}



	const neoOptions = {
		className: 'scrambled-text title',
		//Controls
		loop: true,
		delay: 500,
		loopDelay: 4000,
		lapses: 8,
		reset: true,
		autoPlay: true,
		speed: 'medium',
		initialText:'Digital Villa',
		phrases: [
			'Husband',
			'Father',
			'Developer',
			'UX Designer',
		]
	}

	return (
		<div className={CN("container-fluid " + props.page, { "animate": isVisible() })}>
			<div className="scrambled-container">
			<h2 className='title'>I am</h2>
				<NeoText options={neoOptions} animate={isVisible()} />
			</div>
			<img className="left" src={ego} alt="Profile Left" />
			<img className="right" className="right" src={ego} alt="Profile Right" />
		</div>
	)

}
