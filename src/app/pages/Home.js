import React from 'react'
import ReactFullpage from '@fullpage/react-fullpage';

export default function Home(props) {
  const handlePageDown = () => {
    // fullpageApi.moveSectionDown();
     props.api.moveTo(2);
  }

  return (
    <div>
      <h1>Home</h1>
      <button onClick={handlePageDown}>
        Click me to move down
            </button>
    </div>
  )
}
