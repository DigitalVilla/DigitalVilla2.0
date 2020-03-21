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
					<p className="first">If you need a trending app or a new website I can do the job, however, I am not interested in doing that. </p>

					<p className="first">I am in the business of solving problems by offering innovating solutions. The work that I do for my clients truly impacts their businesses.
					Therefore, I take my craft seriously and make sure that if we create a partnership I will do everything within my reach to grow your online presence so you can relax and keep doing what you do best!</p>
					<p className="last">Whether as a subcontractor or an in-house developer, I can help you or your team develop full-stack websites; make mobile applications; optimize existing sites as PWAs; create and consume GraphQL APIs,
						and even transition a slow monolithic site to a blazing fast Server-less architecture.</p>
				</div>
			</div>
			<figure className="background">
				<img data-src={main} alt='Logo' />
			</figure>
		</>
	)
}

export default About
