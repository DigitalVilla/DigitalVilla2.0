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
		phrases: ["Development", "UX Design", "Optimization", "SEO"],
	}

	return (
		<>
			<div className="content">
				<SplitImage image={ego} className='split-about noSelect' />
				<div className="dek">
					<NeoText options={neoOptions} animate={isVisible()} />
					<p className="first">I solve business problems with innovating solutions.
					I take my craft seriously and do my best to enhance your brand online, so you can focus on keep doing what you do best.</p>
					<p className="last">Whether as a subcontractor or an in-house developer, I can help you develop full-stack websites; implement advanced JS animations;
					make mobile applications; optimize existing sites; create and consume APIs,
						and even transition a slow WordPress site to a blazing fast architecture.</p>
				</div>
			</div>
			<figure className="background noSelect">
				<img data-src={main} alt='Logo' />
			</figure>
		</>
	)
}

export default About