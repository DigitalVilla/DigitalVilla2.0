import React from "react"
import main from "../assets/old-games.jpg"
import imatch from "../assets/projects/imatch.png"
// import digitalvilla from "../assets/projects/digitalvilla.jpg"
import wow from "../assets/projects/wow.png"
import eyedentify from "../assets/projects/eyedentify.png"
import Slide from "../components/Slide.js"

export default React.memo(function Private(props) {
	// console.log("** Page: Private **");
	const slides = [
		{
			image: main,
			title: 'Personal Work',
			dek: {
				top: [
					"My most recent personal projects",
					"built to test advanced concepts",
				],
				bottom: [
					"JavaScript, React, Redux, SASS,",
					"AJAX, PWA, MongoDB, Express, Node.js",
					// "PS. This site works without WiFi"
				]
			}
		},
		// {
		// 	image: digitalvilla,
		// 	title: 'Digital Villa',
		// 	link: "https://staging.digitalvilla.ca",
		// 	dek: {
		// 		top: [
		// 			"More than a website, this is my personal",
		// 			"sandbox to play with modern technologies."
		// 		],
		// 		bottom: [
		// 			"Currently working on server-less LAMDA functions",
		// 			"to manage forms and email services."
		// 		]
		// 	}
		// },
		{
			image: imatch,
			title: 'Match.io',
			link: "https://match-io.netlify.com",

			dek: {
				top: [
					"An amusing memory game ",
					"implementing modern css animations",
					"and advanced sortinyarng algorithms."
				]
			}
		},
		{
			image: wow,
			title: 'WOW',
			LINK: "https://wordsofwow.netlify.com",
			dek: {
				top: [
					"Words of Wonder is an",
					"inspiring word puzzle",
					"built to test the latest React,",
					"Context API and React Hooks."
				]
			},
		},
		{
			image: eyedentify,
			title: 'Eyedentify',
			link:"https://eyedntify.herokuapp.com",
			dek: {
				top: [
					"The app for wildlife enthusiasts!",
					"A TEST to imitate instagram's main flux",
					"in a REST-full | JavaScript environment."
				],
				bottom : [
					"Create a Fake account and explore!",
				]
			}
		},
	];

	return (
		<>
			{slides.map((slide, i) => <Slide key={`${slide.title}-${i}`} imageFirst slide={slide} index={i} />)}
		</>
	)
})