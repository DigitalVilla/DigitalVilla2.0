import React from 'react'
import Slide from '../components/Slide.js'

export default React.memo(function Private(props) {
  // console.log("** Page: Private **");
  const slides = [
    {
      image: 'https://assets.digitalvilla.ca/pages/old-games.jpg',
      title: 'Personal Work',
      dek: {
        top: [
          'My most recent personal projects',
          'built to test advanced concepts',
        ],
        bottom: [
          'AWS, React, Redux, Lambdas,',
          'PWA, DynamoDB, Express, NodeJS',
          // "PS. This site works without WiFi"
        ],
      },
    },
    {
      image: 'https://assets.digitalvilla.ca/projects/digitalvilla.jpg',
      title: 'Digital Villa',
      link: 'https://staging.digitalvilla.ca',
      dek: {
        top: [
          'More than a website, this is my personal',
          'sandbox to play with modern technologies.',
        ],
        bottom: [
          'Currently working on server-less LAMDA functions',
          'to manage forms and email services.',
        ],
      },
    },
    {
      image: 'https://assets.digitalvilla.ca/projects/imatch.png',
      title: 'Match.io',
      link: 'https://match-io.netlify.com',

      dek: {
        top: [
          'An amusing memory game ',
          'implementing modern css animations',
          'and advanced sortinyarng algorithms.',
        ],
      },
    },
    {
      image: 'https://assets.digitalvilla.ca/projects/wow.png',
      title: 'WOW',
      LINK: 'https://wordsofwow.netlify.com',
      dek: {
        top: [
          'Words of Wonder is an',
          'inspiring word puzzle',
          'built to test the latest React,',
          'Context API and React Hooks.',
        ],
      },
    },
    {
      image: 'https://assets.digitalvilla.ca/projects/eyedentify.png',
      title: 'Eyedentify',
      link: 'https://eyedntify.herokuapp.com',
      dek: {
        top: [
          'The app for wildlife enthusiasts!',
          "A TEST to imitate instagram's main flux",
          'in a REST-full | JavaScript environment.',
        ],
        bottom: ['Create a Fake account and explore!'],
      },
    },
    {
      image: 'https://assets.digitalvilla.ca/projects/libro.jpg',
      title: 'Libro',
      link: 'https://mylibro.netlify.app/',
      dek: {
        top: [
          'Quick React prototype to test',
          'new techniques in an inventory',
        ],
        bottom: ['Fast search algorithm', 'Responsive deck design'],
      },
    },
  ]

  return (
    <>
      {slides.map((slide, i) => (
        <Slide key={`${slide.title}-${i}`} imageFirst slide={slide} index={i} />
      ))}
    </>
  )
})
