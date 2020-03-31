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
			title: 'KIT is moving online!',
			image: kit,
			dek: [
				<p>I am currently developing their hot e-comm</p>,
				<p>and fixing all the layout and navigation bugs</p>,
				<span className="break"></span>,
				<p>the original developer left in the live site.</p>,
				<p>It is a shame that there are developers</p>,
				<p>damaging businesses with their mediocrity.</p>,
				<span className="break button"></span>,
				<p><a className="btn noSelect" href="https://tlc.previewurl.ca/quoting-tool/pricing.php">View Demo</a></p>,
			]
		},
		{
			title: 'TLC Pricing Tool',
			image: tlc,
			dek: [
				<p>TLC was looking for an innovative way</p>,
				<p>to showcase their high-end services.</p>,
				<span className="break"></span>,
				<p>I was assigned to build them a web app.</p>,
				<p>TLC loved it so much that Arcane has</p>,
				<p>earned their trust to build them a real website.</p>,
				<span className="break button"></span>,
				<p><a className="btn noSelect" href="https://tlc.previewurl.ca/quoting-tool/pricing.php">View Demo</a></p>,
			]
		},
		{
			title: 'Winsight',
			image: winsight,
			dek: [
				<p>After redesigning each of Winsight's</p>,
				<p>brands we upgraded its main website.</p>,
				<span className="break"></span>,
				<p>They wanted to emphasize a people</p>,
				<p>centred company comes before being</p>,
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
				<p>Research new beers, and connect with the locals.</p>,
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
				<p>all of Winsight's family tasks.</p>,
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
						<figure className="noSelect">
							<img data-src={slide.image} alt={slide.title} />
						</figure>
					</div>
				</div>
			)}
		</>
	)
}
