import React from 'react'
import CN from 'classnames'

export default function Contact(props) {
 	const isVisible = () => {
		return props.api ? props.api.getActiveSection().anchor === props.page : false;
	}

	return (
		 <div className={CN("container-fluid "+props.page, { "animate": isVisible() })}>
      <h1>Contact Me</h1>
    </div>
  )
}
