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
			<div className="head-container">
				<SplitImage image={ego} className='split-about' />
				<NeoText options={neoOptions} animate={isVisible()} />
			</div>
			<div className="body-container">
				<p className="p1">If you need a mobile application or a new logo I can help. However, I do more than just web development.
					I can give your current brand a boost to improve customer acquisition, improve your online brand strategy to disrupt a greater market.
					In other words whether a subcontractor or a fulltime developer, I am here to help you or your team to excel in the digital world.</p>
				<br />
				<p className="md-show">I am currently a fulltime developer for <a href="https://mobilityquotient.com/">Mobility Quotient</a>. Therefore, I am not available to take on any extra projects at the moment, however, I can always refer you to other great developers in the city!</p>
			</div>
		</>
	)
}

export default About
