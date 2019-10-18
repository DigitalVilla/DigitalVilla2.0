import React, { useEffect, useState } from "react";
import Fullpage from "./Fulllpage";

export default function Index() {
  const [toLoad, setToLoad] = useState(false);
  useEffect(() => {
    console.log("WARPED");
    setTimeout(() => {
      if (!toLoad) {
        document.body.removeChild(document.getElementById("loader"));
        document
          .getElementsByClassName("fp-completely")[0]
          .classList.add("active");
      }
      setToLoad(true);
    }, 2000);
  });

  return <Fullpage display={toLoad} />;
}
