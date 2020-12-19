import React from 'react'
import Slide from '../components/Slide.js'

export default React.memo(function Public(props) {
  // console.log("** Page: Public **");
  const slides = [
    {
      image: 'https://assets.digitalvilla.ca/pages/mac-rainbow.jpg',
      title: 'Professional Work',
      dek: {
        top: [
          'Latest projects developed',
          <>
            for <a href="https://quantifi.ca">Quantifi</a>,{' '}
            <a href="https://thearcane.com">The Arcane</a>
          </>,
          <>
            and <a href="https://mobilityquotient.com">Mobility Quotient</a>
          </>,
        ],
        bottom: [
          'Applied Technologies:',
          'AWS, NodeJS, Ruby, React,',
          'Angular, PHP, & WordPress',
        ],
      },
    },
    {
      image: 'https://assets.digitalvilla.ca/projects/quantifi.jpg',
      title: 'Quantifi',
      link: 'https://quantifi.ca',
      dek: {
        top: [
          'Calgary based tech-company',
          'Helping customers to better assess',
          'and manage consumer credit risk',
        ],
        bottom: ['AWS ecosystem development', 'Serverless Lambda development'],
      },
    },
    {
      image: 'https://assets.digitalvilla.ca/projects/greyeagle.png',
      title: 'Grey Eagle',
      link: 'https://greyeagleresortandcasino.ca/',
      dek: {
        top: [
          "Calgary's most famous Casino has",
          'a new modern and attractive website',
        ],
        bottom: [
          'Web performance and accesibility',
          'Carousels and map integration',
          'COVID popup implementation',
        ],
      },
    },
    {
      image: 'https://assets.digitalvilla.ca/projects/kit.jpg',
      title: 'KIT is moving online!',
      link: 'http://kitinteriorobjects.previewurl.ca/',
      dek: {
        top: ['I am currently developing their hot e-comm...'],
        bottom: [
          '...and fixing all the layout and navigation bugs',
          'the original developer left in the live site.',
          'It is a shame that there are developers',
          'damaging businesses with their mediocrity.',
        ],
      },
    },
    {
      image: 'https://assets.digitalvilla.ca/projects/tlc.jpg',
      title: 'TLC Pricing Tool',
      link: 'https://tlc.previewurl.ca/quoting-tool/pricing.php',
      dek: {
        top: [
          'TLC was looking for an innovative way',
          'to showcase their high-end services.',
        ],
        bottom: [
          'I was assigned to build them a web app.',
          'TLC loved it so much that Arcane has earned',
          'their trust to build them a real website.',
        ],
      },
    },
    {
      image: 'https://assets.digitalvilla.ca/projects/winsight.jpg',
      title: 'Winsight',
      link: 'https://winsightmedia.com/',
      dek: {
        top: [
          "After redesigning each of Winsight's",
          'brands we upgraded its main website.',
        ],
        bottom: [
          'They wanted to emphasize a people',
          'centred company comes before being',
          'a multimillion-dollar food industry.',
        ],
      },
    },
    {
      image: 'https://assets.digitalvilla.ca/projects/justbeer.jpg',
      title: 'JustBeer',
      link: 'https://justbeerapp.com/guides',
      dek: {
        top: [
          'The app for beer lovers around the world.',
          'Research new beers, and connect with the locals.',
        ],
        bottom: [
          'Data personalization based on location.',
          'Advanced SEO and accessibility practices.',
          'Google ads and JSON-ld compatibility.',
        ],
      },
    },
  ]

  return (
    <>
      {slides.map((slide, i) => (
        <Slide key={`${slide.title}-${i}`} slide={slide} index={i} />
      ))}
    </>
  )
})
