import React, {useState, useEffect} from "react"
import ego from "../assets/ego.png"
import main from "../assets/lens.jpg"
import NeoText from "../components/NeoText"
import SplitImage from "../components/SplitImage"

const About = props => {
	const [visible, setVisible] = useState(false);

	useEffect(()=> {
		setVisible(props.api && props.api.getActiveSection().anchor === "About");
	})

	const neoOptions = {
		className: "neo-text",
		//Controls
		loop: true,
		delay: 2000,
		loopDelay: 3000,
		lapses: 6,
		reset: true,
		autoPlay: true,
		speed: "medium",
		initialText: "Digital Villa",
		phrases: ["Full-Stack", "Web & Mobile", "Development"],
	}

	return (
		<>
			<div className="content">
				<SplitImage image={ego} className='split-about noSelect' />
				<div className="dek">
					<NeoText options={neoOptions} animate={visible} />
					<p className="first">If you need a trending app or a new website I can do the job, however, I am not interested in doing just that.</p>

					<p className="last">I am in the business of solving problems by offering innovating solutions. The work that I do for my clients truly impacts their businesses.
					Therefore, I take my craft seriously and make sure that if we create a partnership I will do everything within my reach to grow your online presence so you can relax and keep doing what you do best!</p>
					<p className="last">Whether as a subcontractor or an in-house developer, I can help you or your team develop full-stack websites; make mobile applications; optimize existing sites as PWAs; create and consume GraphQL APIs,
						and even transition a slow monolithic site to a blazing fast Server-less architecture.</p>
				</div>
			</div>
			<figure className="background noSelect">
				<img data-src={main} alt='Logo' />
			</figure>
		</>
	)
}

export default About