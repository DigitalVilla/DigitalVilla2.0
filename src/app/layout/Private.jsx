import React from "react"
import main from "../assets/old-games.jpg"
import imatch from "../assets/imatch.png"
import wow from "../assets/wow.png"
import eyedentify from "../assets/eyedentify.png"

export default function Private(props) {
	const content = [
		{
			label: 'slide1',
			title: 'Personal Work',
			image: main,
			dek: [
				<p>Most recent personal projects</p>,
				<p>built to test advanced concepts.</p>,
				<br />,
				<p>Applied technologies:</p>,
				<p>JavaScript, React, Redux, SASS,</p>,
				<p>AJAX, PWA, MongoDB, Express, Node.js</p>
			]
		},
		{
			label: 'slide2',
			title: 'Match.io',
			image: imatch,
			dek: [
				<p>An amusing memory game </p>,
				<p>implementing modern css animations</p>,
				<p>and advanced sorting algorithms.</p>,
				<br />,
				<br />,
				<p><a class="btn" href="https://match-io.netlify.com">View Live</a></p>,
			]
		},
		{
			label: 'slide3',
			title: 'WOW',
			image: wow,
			dek: [
				<p>Words of Wonder is an</p>,
				<p>inspiring word puzzle</p>,
				<p>built to test the latest React,</p>,
				<p>Context API and React Hooks.</p>,
				<br />,
				<br />,
				<p><a class="btn" href="https://wordsofwow.netlify.com">View Live</a></p>,
			]
		},
		{
			label: 'slide4',
			title: 'Eyedentify',
			image: eyedentify,
			dek: [
				<p>The app for wildlife enthusiasts!</p>,
				<p>A TEST to imitate instagram's main flux</p>,
				<p>in a REST-full - JavaScript environment.</p>,
				<p>Create a <q>mock</q> account and explore!</p>,
				<br />,
				<br />,
				<p><a class="btn" href="https://eyedntify.herokuapp.com">View Live</a></p>,
			]
		},
	];

	return (
		<>
			{
				content.map((slide, i) => {
					return (<div key={i} className="slide" data-anchor={slide.label}>
						<div className={"content " + slide.label}>
							<figure>
								<img data-src={slide.image} alt='Logo' />
							</figure>
							<div className="leyend">
								<h2>{slide.title}</h2>
								<div className="dek">
									{slide.dek}
								</div>
							</div>
						</div>
					</div>)
				})
			}
		</>
	)
}
