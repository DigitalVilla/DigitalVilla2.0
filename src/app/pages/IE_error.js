import React from "react";
import logo from "../assets/logo_DV.png";
import "../scss/main.scss"

const IE = (props) => {
  return props.display ? (
    <section className="section">
      <div className="Error container-fluid">
        <div className="header noSelect"><img className="main-logo" src={logo} alt="D V Logo" />
            <h1>Digital Villa | Media Agency, Web Design, Software Development, Graphic design, Website</h1>
            <div className="title"><span>Digital Villa</span></div>
            <h2>You have landed In a black hole!<div className="breaks">&nbsp;</div> Get back in Orbit with a real Browser:</h2>
            <a className="ie-btn" href="https://www.mozilla.org/firefox/new/">Firefox</a>
            <a className="ie-btn" href="https://www.google.com/chrome/">Chrome</a>
            <h4>Don't miss out! your browser  is not longer supported by <a className="link" href="https://www.microsoft.com/en-us/microsoft-365/windows/end-of-ie-support">Microsoft</a> </h4>
        </div>
      </div>
    </section>
  ) : <></>;
};

export default IE;
