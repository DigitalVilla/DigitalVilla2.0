import React, {
  useEffect,
  useState
} from "react"
import Fullpage from './Fulllpage'

export default function Index() {

const [toLoad, setToLoad ] = useState(false);
  useEffect(() => {
    console.log('WARPED');
    setTimeout(() => {
      !toLoad && document.body.removeChild(document.getElementById('loader'));
      setToLoad(true);
    }, 2000);

  })

  if (toLoad) {
    return ( <Fullpage /> )
  }
  else {
    return ( <></> )
  }
}