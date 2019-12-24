import React from "react"
import main from "../assets/mac-rainbow.jpg"
import winsight from "../assets/winsight.png"
import justbeer from "../assets/justbeer.png"
import portal from "../assets/portal.png"

export default function Public(props) {
	const content = [
		{
			label: 'slide1',
			title: 'Professional Work',
			image: main,
			dek: [
				<p>Best projects developed</p>,
				<p> under <a href="https://www.mobilityquotient.com">Mobility Quotient</a></p>,
				<span className="break"></span>,
				<p>Applied Technologies:</p>,
				<p>JS, Angular, React, PHP, Symphony</p>,
				<p>AJAX, SASS, Bootstrap & WordPress</p>
			]
		},
		{
			label: 'slide2',
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
				<p><a class="btn" href="https://www.winsightmedia.com/">View Live</a></p>,
			]
		},
		{
			label: 'slide3',
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
				<p><a class="btn" href="https://justbeerapp.com/guides">View Live</a></p>,
			]
		},
		{
			label: 'slide4',
			title: 'My Winsight',
			image: portal,
			dek: [
				<p>In 2019 MQ created one of the</p>,
				<p>most ambitious projects in</p>,
				<p>the software industry.</p>,
				<span className="break"></span>,
				<p>An online application to unify</p>,
				<p>all of Winsight's family tasks</p>,
				<p>into a centralized cloud platform.</p>,
				<span className="break button"></span>,
				<p><a class="btn" href="JavaScript:void(0);">Not Public</a></p>
			]
		},
	];

	return (
		<>
			{
				content.map((slide, i) => {
					return (<div key={i} className="slide" data-anchor={slide.label}>
						<div className={"content " + slide.label}>
							<div className="leyend">
								<h2>{slide.title}</h2>
								<div className="dek">
									{slide.dek}
								</div>
							</div>
							<figure>
								<img data-src={slide.image} alt='Logo' />
							</figure>

						</div>
					</div>)
				})
			}
		</>
	)
}
