import React from 'react'
import Icon from '../components/Icons'
import poster from '../constants/poster'
import Video from '../components/Video'
import isMedia from '../utils/isMedia'

export default React.memo(function Home(props) {
  let icon = isMedia('mobile') ? 'chevronCircleDn' : 'mouse'
  const handlePageDown = () => {
    props.api.moveTo(2)
  }

  return (
    <>
      <div className="header noSelect">
        <img
          className="main-logo"
          src="https://assets.digitalvilla.ca/images/logo_DV.png"
          alt="DV"
        />
        <h1>
          Full-Stack Serverless Solutions | Solving problems, adding value and
          innovating the world
        </h1>
        <div className="title">
          <span>Digital </span>
          <span className="break"></span>
          <span>Villa</span>
        </div>
        <h2>
          Full-Stack Web & <span className="break"></span>Mobile Development
        </h2>
        {props.children}
      </div>

      <Video
        media="https://assets.digitalvilla.ca/media/nebula.mp4"
        poster={poster}
      />

      <div className="scroll">
        <Icon
          className="scroll-icon svg-md"
          action={handlePageDown}
          icon={icon}
        />
      </div>
    </>
  )
})
