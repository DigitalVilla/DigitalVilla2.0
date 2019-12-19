import React from "react"
import SplitImage from "../components/SplitImage"
import Nebula from "../images/logo_Nebula.png"

export default function Works(props) {
	return (
		<div>
			<div className="slide" data-anchor="slide1">
				<div className="content">
					<figure>
						<img src={Nebula} alt='Logo' />
					</figure>
					<div className="text">
						<p>Checkout my public repos from <a href="https://github.com/DigitalVilla">Github</a></p>
						<p>Or Slide to play some fun games!</p>
					</div>
				</div>
			</div>
			<div className="slide" data-anchor="slide2">
				<iframe data-src="https://match-io.netlify.com" title="Match-io"></iframe>
			</div>
			<div className="slide" data-anchor="slide">
				<iframe data-src="https://wordsofwow.netlify.com" title="Words of Wow"></iframe>
			</div>
			<div className="slide" data-anchor="slide">
				<iframe src="https://eyedntify.herokuapp.com" title="Eyedentify"></iframe>
			</div>
		</div>
	)
}
