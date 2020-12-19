import React from 'react'
import SplitImage from '../components/SplitImage'

export default React.memo(function About(props) {
  return (
    <>
      <div className="content">
        <SplitImage
          image="https://assets.digitalvilla.ca/images/ego_insta.jpg"
          className="split-about noSelect"
        />
        <div className="dek">
          <h2 className="neo-text">Business Solutions</h2>
          <p className="first">
            DigitalVilla is a full Service Software Shop with a special focus on
            Serverless Web and Mobile Development. Our main focus is to enhance
            your tech stack so you can keep growing just by doing what you do
            best and without distractions!.
          </p>
          <p className="last">
            Whether as a subcontractor or an in-house developer, DigitalVilla
            can help you develop full-stack applications, Utilize AWS services
            to optimize existing sites or even transition a slow WordPress site
            to a blazing fast Serverless architecture.
          </p>
        </div>
      </div>
      <figure className="background noSelect">
        <img
          data-src="https://assets.digitalvilla.ca/pages/lens.jpg"
          alt="Logo"
        />
      </figure>
    </>
  )
})
