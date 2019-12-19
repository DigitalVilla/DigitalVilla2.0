import React, { useEffect, useState } from "react";
import Fullpage from "./Fulllpage";
import IE from './IE';

export default function Index() {
  const [toLoad, setToLoad] = useState(false);
  let ua = window.navigator.userAgent;
  let msie = ua.indexOf("MSIE ");
  let isIE = msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./) // eslint-disable-line no-useless-escape
  useEffect(() => {
    console.log("WARPED");
    setTimeout(() => {
      if (!toLoad) {
        document.body.removeChild(document.getElementById("loader"));
        let fp = document.getElementsByClassName("fp-completely")[0]
        fp && fp.classList.add("active");
      }
      setToLoad(true);
    }, 100);
  });

  return isIE ? <IE display={toLoad} /> : <Fullpage display={toLoad} />;
}
