import React from 'react'
import logo from './../assets/logo_DV.png'
import resume from '../assets/DigitalVilla2020.pdf'
import Icon from './Icons'

const Menu = (props) => {

	const handleClick = (e) => {
		if (props.isLoaded)
			props.toggleMenu();
	}

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
		}];


	return (
		<div id="menu" className='menu'>
			<button className="menu-button" onClick={handleClick}>
				<img src={logo} alt="logo" />
			</button>

			<nav className={props.isOpen ? "menu-nav active" : "menu-nav"}>
				<ul>
					{
						buttons.map((el, i, arr) => {
							let defaultClass = `hide-${arr.length - i} show-${i + 1}`;
							return (
								<li key={i} className={props.isOpen ? defaultClass + ' active' : defaultClass}>
									<Icon icon={el.icon} action={handleLink.bind(this, el.link)} />
								</li>
							)
						})
					}
				</ul>
			</nav>
		</div>
	)
}

export default Menu