import React from 'react'
import CN from 'classnames'
import '../scss/pages/About.scss'

export default function About(props) {
 	const isVisible = () => {
		return props.api ? props.api.getActiveSection().anchor === props.page : false;
	}

	return (
		 <div className={CN("container-fluid "+props.page, { "animate": isVisible() })}>
      <h2 className="title">About Us</h2>
    </div>
  )

}
