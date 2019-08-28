import React from 'react'
import Icon, { SVG } from '../components/Icons'
import source from '../assets/nebula.mp4'
import logo from '../assets/VlogoW.png'

export default function Home(props) {

  let isMobile = ((navigator.userAgent).indexOf("Mobile") > 0)

  const handlePageDown = () => {
    props.api.moveTo(2);
  }

  return (
    <div id="Home" className="container-fluid">
      <div className="header">
        <div className="">
          <h1 className="title">Digital <br /> Villa
           <img src={logo} alt="logo" />

          </h1>
          <h2>Where ideas become living designs</h2>
        </div>

      </div>

      <div className="video-container">
        <div className="overlay"></div>
        <video id="video" data-autoPlay loop muted preload>
          <source src={source} type='video/mp4' />
        </video>
      </div>

      {
        !isMobile &&
        <Icon className="scroll-icon svg-md" icon={'mouse'} action={handlePageDown} />
      }
      {
        isMobile &&
        <Icon className="scroll-icon svg-md" icon={'chevronCircleDn'} action={handlePageDown} />
      }
    </div>
  )
}
