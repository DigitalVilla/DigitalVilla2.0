import React from 'react'
import design from "../assets/design.jpg"

export default React.memo(function Contact(props) {
	return (
		<>
			< div className="content" >
				<div className="business-card" >
					<div className="logo" style={{ backgroundImage: "url(" + design + ")" }}></div>

					<div className="content">
						<div className="top">
							<h2>OMAR <span>VILLANUEVA</span></h2>
							<h3>Full-Stack Developer</h3>
						</div>

						<div className="bottom">
							<p>digitalvilla01@gmail.com</p>
							<p>www.digitalvilla.ca</p>
							<p>1+ 587-229-3860</p>
							<p>Calgary, Alberta </p>
						</div>
					</div>
				</div>

				<div className="business-card background-card">
					<div className="logo" style={{ backgroundImage: "url(" + design + ")" }}></div>
				</div>
				<div className="business-card background-card second">
					<div className="logo" style={{ backgroundImage: "url(" + design + ")" }}></div>

					<div className="content">
						<div className="top">
							<h2>OMAR <span>VILLANUEVA</span></h2>
							<h3>Full-Stack Developer</h3>
						</div>

						<div className="bottom">
							<p>digitalvilla01@gmail.com</p>
							<p>www.digitalvilla.ca</p>
							<p>1+ 587-229-3860</p>
							<p>Calgary, Alberta </p>
						</div>
					</div>
				</div>
			</div >
		</>
	)
})