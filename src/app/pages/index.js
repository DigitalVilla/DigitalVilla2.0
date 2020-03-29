import React, { useEffect } from "react";
import Fullpage from "./Fulllpage";
import IE from './IE_error';

export default function Index() {
  let ua = window.navigator.userAgent;
  let msie = ua.indexOf("MSIE ");
  let isIE = msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./) // eslint-disable-line no-useless-escape
  
  useEffect(() => {
    setTimeout(() => {
        document.body.removeChild(document.getElementById("loader"));
        let fp = document.getElementsByClassName("fp-completely")[0]
        fp && fp.classList.add("active");
    }, 800);
  },[]);

  if (isIE) {
    return <IE/>
  }

  return <Fullpage/>
}
