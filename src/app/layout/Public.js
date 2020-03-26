import React from "react"
import main from "../assets/mac-rainbow.jpg"
import tlc from "../assets/projects/tlc.jpg"
import kit from "../assets/projects/kit.png"
import winsight from "../assets/projects/winsight.jpg"
import justbeer from "../assets/projects/justbeer.png"
import portal from "../assets/projects/portal.png"

export default function Public(props) {
	const content = [
		{
			title: 'Professional Work',
			image: main,
			dek: [
				<p>Best projects developed</p>,
				<p> under <a href="https://www.thearcane.com">Arcane</a> and <a href="https://www.mobilityquotient.com">Mobility Quotient</a></p>,
				<span className="break"></span>,
				<p>Applied Technologies:</p>,
				<p>JS, Angular, React, PHP, Symphony</p>,
				<p>AJAX, SASS, Bootstrap & WordPress</p>
			]
		},
		{
			title: 'Kit e-comm',
			image: kit,
			dek: [
				<p>Kit is moving online!</p>,
				<p>I am currently developing an</p>,
				<p>e-comm to create online sales.</p>,
				<p>I went beyond and also fixed bugs,</p>,
				<span className="break"></span>,
				<p>and responsive issues in their live site.</p>,
				<p>It is a shame that there are developers</p>,
				<p>damaging small businesses with mediocrity.</p>,
				<span className="break button"></span>,
				<p><a className="btn noSelect" href="https://tlc.previewurl.ca/quoting-tool/pricing.php">View Demo</a></p>,
			]
		},
		{
			title: 'TLC Pricing Tool',
			image: tlc,
			dek: [
				<p>TLC came to Arcane looking</p>,
				<p>for an innovative way to showcase</p>,
				<p>their high end services.</p>,
				<span className="break"></span>,
				<p>I was asigned to build this JS app.</p>,
				<p>TLC loved it so much that Arcane has</p>,
				<p>earned their trust to rebuild their website.</p>,
				<span className="break button"></span>,
				<p><a className="btn noSelect" href="https://tlc.previewurl.ca/quoting-tool/pricing.php">View Demo</a></p>,
			]
		},
		{
			title: 'Winsight',
			image: winsight,
			dek: [
				<p>After a systematic redesign of</p>,
				<p>each of Winsight's brands</p>,
				<p>we upgraded its main website.</p>,
				<span className="break"></span>,
				<p>They wanted to emphasize a people </p>,
				<p> centred company comes before being</p>,
				<p>a multimillion-dollar food industry.</p>,
				<span className="break button"></span>,
				<p><a className="btn noSelect" href="https://www.winsightmedia.com/">View Live</a></p>,
			]
		},
		{
			title: 'JustBeer',
			image: justbeer,
			dek: [
				<p>The app for beer lovers around the world.</p>,
				<p>Research new beers, find local breweries,</p>,
				<p> and connect with the local community.</p>,
				<span className="break"></span>,
				<p>Data personalization based on location.</p>,
				<p>Advanced SEO and accessibility practices.</p>,
				<p>Google ads and JSON-ld compatibility.</p>,
				<span className="break button"></span>,
				<p><a className="btn noSelect" href="https://justbeerapp.com/guides">View Live</a></p>,
			]
		},
		{
			title: 'My Winsight',
			image: portal,
			dek: [
				<p>In 2019 MQ created one of the</p>,
				<p>most ambitious projects in</p>,
				<p>the food industry.</p>,
				<span className="break"></span>,
				<p>An online application to unify</p>,
				<p>all of Winsight's family tasks</p>,
				<p>into a centralized cloud platform.</p>,
				<p>This is a private project*</p>,
			]
		},
	];

	return (
		<>
			{ content.map((slide, i) =>
				<div key={'public-slide-' + i} className="slide" data-anchor={'slide' + i}>
					<div className={"content slide" + i}>
						<div className="leyend">
							<h2>{slide.title}</h2>
							<div className="dek">
								{slide.dek}
							</div>
						</div>
						<figure>
							<img data-src={slide.image} alt={slide.title} />
						</figure>
					</div>
				</div>
			)}
		</>
	)
}
