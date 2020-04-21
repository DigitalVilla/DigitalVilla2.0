import React from "react"
import main from "../assets/mac-rainbow.jpg"
import tlc from "../assets/projects/tlc.jpg"
import kit from "../assets/projects/kit.png"
import winsight from "../assets/projects/winsight.jpg"
import justbeer from "../assets/projects/justbeer.png"
import portal from "../assets/projects/portal.png"
import greyeagle from '../assets/projects/greyeagle.png'
import Slide from "../components/Slide.js"

export default React.memo(function Public(props) {
	// console.log("** Page: Public **");
	const slides = [
		{
			image: main,
			title: 'Professional Work',
			dek: {
				top: [
					"Best projects developed",
					<>under <a href='https://www.thearcane.com'>Arcane</a> and <a href='https://www.mobilityquotient.com'>Mobility Quotient</a></>,
				],
				bottom: [
					"Applied Technologies:",
					"JS, Angular, React, PHP, Symphony",
					"AJAX, SASS, Bootstrap & WordPress"
				],
			}
		},
		{
			image: greyeagle,
			title: 'Grey Eagle',
			link: "https://www.greyeagleresortandcasino.ca/",
			dek: {
				top: [
					"Calgary's most famous Casino has",
					"a new modern and attractive website"
				],
				bottom: [
					"Web performance and accesibility",
					"Carousels and map integration",
					"COVID popup implementation"
				],

			}
		},
		{
			image: kit,
			title: 'KIT is moving online!',
			link: "http://kitinteriorobjects.previewurl.ca/",
			dek: {
				top: [
					"I am currently developing their hot e-comm...",
				],
				bottom: [
					"...and fixing all the layout and navigation bugs",
					"the original developer left in the live site.",
					"It is a shame that there are developers",
					"damaging businesses with their mediocrity.",
				],

			}
		},
		{
			image: tlc,
			title: 'TLC Pricing Tool',
			link: "https://tlc.previewurl.ca/quoting-tool/pricing.php",
			dek: {
				top: [
					"TLC was looking for an innovative way",
					"to showcase their high-end services.",
				],
				bottom: [
					"I was assigned to build them a web app.",
					"TLC loved it so much that Arcane has earned",
					"their trust to build them a real website.",
				],

			}
		},
		{
			image: winsight,
			title: 'Winsight',
			link: "https://www.winsightmedia.com/",
			dek: {
				top: [
					"After redesigning each of Winsight's",
					"brands we upgraded its main website.",
				],
				bottom: [
					"They wanted to emphasize a people",
					"centred company comes before being",
					"a multimillion-dollar food industry.",
				],

			}
		},
		{
			image: justbeer,
			title: 'JustBeer',
			link: "https://justbeerapp.com/guides",
			dek: {
				top: [
					"The app for beer lovers around the world.",
					"Research new beers, and connect with the locals.",
				],
				bottom: [
					"Data personalization based on location.",
					"Advanced SEO and accessibility practices.",
					"Google ads and JSON-ld compatibility.",
				],

			}
		},
		{
			image: portal,
			title: 'My Winsight',
			dek: {
				top: [
					"In 2019 MQ created one of the",
					"most ambitious projects in",
					"the food industry.",
				],
				bottom: [
					"An online application to unify",
					"all of Winsight's family tasks.",
					"** PRIVATE **",
				],
			}
		}
	];

	return (
		<>
			{slides.map((slide, i) => <Slide key={`${slide.title}-${i}`} slide={slide} index={i} />)}
		</>
	)
})
