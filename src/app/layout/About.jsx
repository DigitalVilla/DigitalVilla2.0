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

				<p>Hi there! I am Omar Villa, a software developer from Calgary Canada. For the last 5 years I have helped startups and local businesses with styled logos, business cards and web designs.</p>
				<p>My real forte is web programming with PHP, Java, and Javascript. Even though most of my skills are self-taught, I hold an honours diploma from <a className="link" href="https://www.sait.ca/programs-and-courses/full-time-studies/diplomas/information-technology">SAIT's software developer program</a> just to show it off to friends and family</p>
				<p>I am currently a fulltime front-end developer for <a className="link" href="https://mobilityquotient.com/">Mobility Quotient</a> a top media agency in downtown Calgary.</p>
				<p>Whenever I am not programming the next big app, I am living the dream with my beautiful wife and 3 children who still believe I am their superhero.</p>
				<br/>
				<p>PD: At the moment, I am not available to take on extra work, remember, I've got a superhero duty to fulfill!</p>
				<button className="black-btn" href="#">View More</button>
			</div>
		</>
	)
}

export default About
