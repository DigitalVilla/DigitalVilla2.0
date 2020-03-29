import React from "react"
import main from "../assets/old-games.jpg"
import imatch from "../assets/projects/imatch.png"
import digitalvilla from "../assets/projects/digitalvilla.jpg"
import wow from "../assets/projects/wow.png"
import eyedentify from "../assets/projects/eyedentify.png"

export default function Private(props) {
	const content = [
		{
			title: 'Personal Work',
			image: main,
			dek: [
				<p>My most recent personal projects</p>,
				<p>built to test advanced concepts.</p>,
				// <p>Try to view this site without WIFI!</p>,
				<span className="break"></span>,
				<p>Applied technologies:</p>,
				<p>JavaScript, React, Redux, SASS,</p>,
				<p>AJAX, PWA, MongoDB, Express, Node.js</p>
			]
		},
		// {
		// 	title: 'Digital Villa',
		// 	image: digitalvilla,
		// 	dek: [
		// 		<p>More than a website, this is my personal</p>,
		// 		<p>sandbox to apply hot and new technologies.</p>,
		// 		<span className="break"></span>,
		// 		<p>Currently working on server-less LAMDA functions</p>,
		// 		<p>to manage forms and email services.</p>,
		// 		<span className="break button"></span>,
		// 		<p><a className="btn" href="https://staging.digitalvilla.ca">Check it out</a></p>,
		// 	]
		// },
		{
			title: 'Match.io',
			image: imatch,
			dek: [
				<p>An amusing memory game </p>,
				<p>implementing modern css animations</p>,
				<p>and advanced sortinyarng algorithms.</p>,
				<span className="break button"></span>,
				<p><a className="btn" href="https://match-io.netlify.com">View Live</a></p>,
			]
		},
		{
			title: 'WOW',
			image: wow,
			dek: [
				<p>Words of Wonder is an</p>,
				<p>inspiring word puzzle</p>,
				<p>built to test the latest React,</p>,
				<p>Context API and React Hooks.</p>,
				<span className="break button"></span>,
				<p><a className="btn" href="https://wordsofwow.netlify.com">View Live</a></p>,
			]
		},
		{
			title: 'Eyedentify',
			image: eyedentify,
			dek: [
				<p>The app for wildlife enthusiasts!</p>,
				<p>A TEST to imitate instagram's main flux</p>,
				<p>in a REST-full | JavaScript environment.</p>,
				<span className="break"></span>,
				<p>Create a <q>mock</q> account and explore!</p>,
				<span className="break button"></span>,
				<p><a className="btn" href="https://eyedntify.herokuapp.com">View Live</a></p>,
			]
		},
	];

	return (
		<>
			{ content.map((slide, i) =>
				<div key={'private-slide-' + i} className="slide custom" data-anchor={'slide' + i}>
					<div className={"content slide" + i}>
						<figure className="noSelect">
							<img data-src={slide.image} alt={slide.title} />
						</figure>
						<div className="leyend">
							<h2>{slide.title}</h2>
							<div className="dek">
								{slide.dek}
							</div>
						</div>
					</div>
				</div>   
			)}
		</>
	)
}