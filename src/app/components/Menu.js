import React from 'react'
import logo from './../assets/logo_DV.png'
import resume from '../assets/Resume2020.pdf'
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
			'link': resume,
			'icon': 'resume'
		}
	];

	return (
		<>
			<div id="menu" className="controller">
				<button className="menu-button noSelect" onClick={props.toggleMenu}>
					<img src={logo} alt="logo" />
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