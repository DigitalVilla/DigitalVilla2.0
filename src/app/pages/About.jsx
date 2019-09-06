import React, { useState } from 'react'
import CN from 'classnames'
import NeoText from '../components/NeoText.jsx'
import '../scss/pages/About.scss'

export default function About(props) {

	const [play, setPlay] = useState(false);

	const handleClick = () => {
		setPlay(!play)
	}

	const isVisible = () => {
		return props.api ? props.api.getActiveSection().anchor === props.page : false;
	}

	return (
		<div className={CN("container-fluid " + props.page, { "animate": isVisible() })}>
			{/* <h2 className="title">About Us</h2> */}
			<NeoText
				uid={1}
				delay={300}
				className={'title'}
				autoPlay={isVisible()}
				loop={true}
				play={play}
				phrases={[
					'Hello there!',
					'My name is Omar',
					'Lets have a chat'
				]} />
			<button onClick={handleClick}>Restart</button>
		</div>
	)

}
