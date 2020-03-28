import React, {useState} from 'react'
import logo from './../assets/logo_DV.png'
import resume from '../assets/Resume2.0.pdf'
import Icon from './Icons'
import ContactBox from './ContactBox';

const Menu = (props) => {
	const [isContactOpen, setContactOpen] = useState(false);
	
	const toggleContact = () => {
		if (props.isLoaded) {
			setContactOpen(!isContactOpen);
			props.isMenuOpen && props.toggleMenu();
		}
	}

	const handleClick = (e) => {
		if (props.isLoaded) {
			props.toggleMenu();
		}
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
		}
	];

	return (
		<>
			<div id="menu" className='menu'>
				<button className="menu-button noSelect" onClick={handleClick}>
					<img src={logo} alt="logo" />
				</button>

				<nav className={`menu-nav${props.isMenuOpen ? " active" : ''}`}>
					<ul>
						{
							buttons.map((el, i, arr) => {
								let defaultClass = `hide-${arr.length - i} show-${i + 1}`;
								return (
									<li key={'menu-item' + i} className={`${defaultClass}${props.isMenuOpen ? " active" :''}`}>
										<Icon icon={el.icon} action={()=>handleLink(el.link)} />
									</li>
								)
							})
						}
					</ul>
				</nav>
			</div>
			
			<div className={`menu contactBox-toggle noSelect${isContactOpen ? " active" : ''}`}>
            	<Icon icon={'planeSolid'} action={toggleContact}/>
        	</div>
			<ContactBox className={isContactOpen ? "active" : ''} toggleContact={toggleContact} isOpen={isContactOpen}/>
		</>
	)
}

export default Menu