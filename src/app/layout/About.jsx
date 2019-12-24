import React from "react"
import ego from "../assets/ego.png"
import main from "../assets/lens.jpg"
import NeoText from "../components/NeoText"
import SplitImage from "../components/SplitImage"

const About = props => {
	const isVisible = () => {
		return props.api ? props.api.getActiveSection().anchor === "About" : false
	}
	const neoOptions = {
		className: "neo-text",
		//Controls
		loop: true,
		delay: 3000,
		loopDelay: 5000,
		lapses: 8,
		reset: true,
		autoPlay: true,
		speed: "medium",
		initialText: "Digital Villa",
		phrases: ["Developer", "Designer", "Entrepreneur"],
	}

	return (
		<>
			<div className="content">
				<SplitImage image={ego} className='split-about' />
				<div className="dek">
					<NeoText options={neoOptions} animate={isVisible()} />
					<p className="first">If you need a trending app or a new website I can do the job! However, I do more than just web and app development.
						I can give your current brand a boost to improve customer acquisition, improve your online brand strategy to disrupt a greater market.
					Whether as a subcontractor or an in-house developer, I am here to help you or your team excel in the digital world.</p>
					<p className="last">I am currently a fulltime developer for <a href="https://mobilityquotient.com/">Mobility Quotient</a>. Therefore, I am not available to take on any extra projects at the moment, however, I can always refer you to other great developers in the city!</p>
				</div>
			</div>
			<figure className="background">
				<img data-src={main} alt='Logo' />
			</figure>
		</>
	)
}

export default About
