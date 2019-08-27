import React from 'react'

export default function Home(props) {

  const handlePageDown = () => {
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
