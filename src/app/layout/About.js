import React from "react"
import SplitImage from "../components/SplitImage"

export default React.memo(function About(props) {
	return (
		<>
			<div className="content">
				<SplitImage image="https://assets.digitalvilla.ca/images/ego_insta.jpg" className='split-about noSelect' />
				<div className="dek">
					<h2 className="neo-text">Business Solutions</h2>
					<p className="first">I solve business problems with innovating solutions.
					I take my craft seriously and do my best to enhance your brand online, so you can focus on keep doing what you do best.</p>
					<p className="last">Whether as a subcontractor or an in-house developer, I can help you develop full-stack websites; implement advanced JS animations;
					make mobile applications; optimize existing sites; create and consume APIs,
						and even transition a slow WordPress site to a blazing fast architecture.</p>
				</div>
			</div>
			<figure className="background noSelect">
				<img data-src="https://assets.digitalvilla.ca/pages/lens.jpg" alt='Logo' />
			</figure>
		</>
	)
})