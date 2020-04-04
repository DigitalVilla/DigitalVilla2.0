import React from 'react'
import Icon from './Icons'

export default React.memo(function OflineIcon(props) {
	return (
		<div id="online-status" className="controller online-status">
			<Icon icon={'offline'} />
		</div>
	)
})