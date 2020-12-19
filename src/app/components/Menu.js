import React from 'react'
import Icon from './Icons'

const Menu = (props) => {
	// console.log("** Menu **");
		

	const handleLink = (a) => {
		window.location.href = a;
	}

	let buttons = [
		{
			'link': 'https://www.linkedin.com/in/digitalvilla/',
			'icon': 'linkedin'
		},
		{
			'link': 'https://github.com/DigitalVilla',
			'icon': 'github'
		},
		{
			'link': 'https://codepen.io/DigitalVilla',
			'icon': 'codepen'
		},
		{
			'link': 'https://assets.digitalvilla.ca/files/Resume2020.pdf',
			'icon': 'resume'
		}
	];

	return (
		<>
			<div id="menu" className="controller">
				<button className="menu-button noSelect" onClick={props.toggleMenu}>
					<img src="https://assets.digitalvilla.ca/images/logo_DV.png" alt="logo" />
				</button>

				<nav className={`menu-nav${props.isOpen ? " active" : ''}`}>
					<ul>
						{buttons.map((el, i, arr) => {
							let defaultClass = `hide-${arr.length - i} show-${i + 1}`;
							return (
								<li key={'menu-item' + i} className={`${defaultClass}${props.isOpen ? " active" : ''}`}>
									<Icon icon={el.icon} action={() => handleLink(el.link)} />
								</li>
							)
						})}
					</ul>
				</nav>
			</div>
		</>
	)
}

export default Menu