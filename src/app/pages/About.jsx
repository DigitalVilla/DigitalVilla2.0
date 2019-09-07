import React, { useState } from 'react'
import CN from 'classnames'
import NeoText from '../components/NeoText.jsx'
import '../scss/pages/About.scss'
// import logger from '../utils/logger';
// let log = logger(`<About/>:`);

export default function About(props) {
	const [play, setPlay] = useState(false);
	const [animate, setAnimate] = useState(true);

	const handleClick1 = () => {
		setPlay(true)
	}
	const handleClick2 = () => {
		setAnimate(!animate)
	}

	const isVisible = () => {
		return props.api ? props.api.getActiveSection().anchor === props.page : false;
	}

	const neoOptions = {
		className: 'title',
		//Controls
		loop: true,
		lapses: 8,
		reset : true,
		autoPlay: false,
		speed: 'slow',
		initialText: 'Select this text',
		phrases: [
			'1) Hello there!',
			'2) My name is Omar',
			"3) I have something",
			"4) important to tell you",
			'5) lets have a chat'
		]
	}

	return (
		<div className={CN("container-fluid " + props.page, { "animate": isVisible() })}>
			<h2 className="title">About Us</h2>
			<NeoText options={neoOptions} play={play} animate={isVisible()} setAnimate={setAnimate} setPlay={setPlay} />
			<button onClick={handleClick1}>Play</button>
			<button onClick={handleClick2}>Skip</button>
		</div>
	)

}
