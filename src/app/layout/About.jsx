import React from "react"
import ego from "../images/ego.png"
import NeoText from "../components/NeoText"
import SplitImage from "../components/SplitImage"

// import logger from '../utils/logger';
// let log = logger(`<About/>:`);

const About = props => {
	const isVisible = () => {
		return props.api ? props.api.getActiveSection().anchor === "About" : false
	}
	const neoOptions = {
		className: "scrambled-text title",
		//Controls
		loop: true,
		delay: 500,
		loopDelay: 2000,
		lapses: 8,
		reset: true,
		autoPlay: true,
		speed: "medium",
		initialText: "Digital Villa",
		phrases: ["Husband", "Father", "Developer", "Designer", "Entrepreneur"],
	}

	return (
		<>
			<div className="scrambled-container">
				<NeoText options={neoOptions} animate={isVisible()} />
			</div>
			<SplitImage image={ego} className='split-about' />
			<div className="article">

				<p>I started my career in the digital world as a freelancer helping startups and local businesses grow their brands.</p>
				<p>Weather it was creating styled logos, original business cards, or captivating websites. I've taken each task as if it were my own brand.</p>
				<p>I am currently one of the top front-end developers for <a href="https://mobilityquotient.com/">Mobility Quotient</a> a mayor media agency in downtown Calgary.</p>
				<p>Whenever I am not programming the next big app, I am living the dream with my beautiful wife and 3 children who still believe I am their superhero.</p>
				<br/>
				<p>PD: At the moment, I am not available to take on extra work, remember, I've got a superhero duty to fulfill!</p>
				<button className="black-btn" href="#">View More</button>
			</div>
		</>
	)
}

export default About
