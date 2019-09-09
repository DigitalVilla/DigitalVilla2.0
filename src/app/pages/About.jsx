import React, { useState } from 'react'
import CN from 'classnames'
import NeoText from '../components/NeoText.jsx'
import '../scss/pages/About.scss'
// import logger from '../utils/logger';
// let log = logger(`<About/>:`);

export default function About(props) {
	const [play, setPlay] = useState(false);
	// const [animate, setAnimate] = useState(true);

	const isVisible = () => {
		return props.api ? props.api.getActiveSection().anchor === props.page : false;
	}

	const neoOptions = {
		className: 'scrambled-text title',
		//Controls
		loop: true,
		delay:500,
		loopDelay:4000,
		lapses: 8,
		reset : true,
		autoPlay: true,
		speed: 'medium',
		initialText: 'A bit about us',
		phrases: [
			'Hello there!',
			'We are a Calgary-based',
			'Web & Mobile Workshop',
			"In other words...",
			'we make amazing apps.',
			'and wear cowboy hats!',
			'Lets make your idea',
			'a living design!',
		]
	}

	return (
		<div className={CN("container-fluid " + props.page, { "animate": isVisible() })}>
		<div className="scrambled-container">
			<NeoText options={neoOptions}  animate={isVisible()} />
		</div>
		</div>
	)

}
