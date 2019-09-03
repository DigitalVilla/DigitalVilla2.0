import React from 'react'
import Icon from '../components/Icons'
import source from '../assets/nebula.mp4'
import poster from '../assets/nebula.jpg'
import logo_DV from '../assets/logo_DV.png'
import logo_D from '../assets/logo_D.png'
import logo_V from '../assets/logo_V.png'

export default function Home(props) {

  let isMobile = ((navigator.userAgent).indexOf("Mobile") > 0);
  let vid = window.innerWidth > 767 ? source : '';
  let icon = isMobile ? 'chevronCircleDn' : 'mouse';

  const handlePageDown = () => {
    props.api.moveTo(2);
  }

  return (
    <div id="Home" className="page container-fluid">
      <div className="header">
        <img className="main-logo visible-md" src={logo_DV} alt="DV" />
        <div className="title row">
          <span><img src={logo_D} alt="D" />igital</span>
          <span><img src={logo_V} alt="V" />illa </span>
        </div>
        <h2>Transforming Ideas Into living designs</h2>
      </div>

      <div className="video-container">
        <video id="video" data-autoplay="true" loop muted preload="true" poster={poster}>
          <source data-src={vid} type='video/mp4' />
        </video>
      </div>

      <Icon className="scroll-icon svg-md" icon={icon} action={handlePageDown} />
    </div>
  )
}
