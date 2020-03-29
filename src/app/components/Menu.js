import React, {useState, useEffect} from 'react'
import logo from './../assets/logo_DV.png'
import resume from '../assets/Resume2.0.pdf'
import Icon from './Icons'
import ContactBox from './ContactBox';
import {setViewSize} from '../utils/isMedia'

let setView = null;
const Menu = (props) => {
	const [isContactOpen, setContactOpen] = useState(false);
	const [isMenuOpen, setMenuOpen] = useState(false);
	const [page, setPage] = useState('');

	
	useEffect(() => {
		if ( props.api ) {
			setView = setViewSize();
			props.api.reloadView = setView;
			
			window.addEventListener('resize', ()=> {
				// console.log("REZISE");
				// props.api.reBuild()
				setView();
				setContactOpen(false)
				setMenuOpen(false)
			});
			setView();
		}
	}, [props.api])


	useEffect(()=> {
		if (props.api) {
			const currentPage = props.api.getActiveSection().anchor
			
			if (page != currentPage) {
				setPage(currentPage);
				setMenuOpen(false);
				setContactOpen(false)
			}
		}
	})

	const toggleMenu = () => {
		setMenuOpen(!isMenuOpen)
	}

	const toggleContact = () => {
		setContactOpen(!isContactOpen);
		isMenuOpen && toggleMenu();
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
				<button className="menu-button noSelect" onClick={toggleMenu}>
					<img src={logo} alt="logo" />
				</button>

				<nav className={`menu-nav${isMenuOpen ? " active" : ''}`}>
					<ul>
						{
							buttons.map((el, i, arr) => {
								let defaultClass = `hide-${arr.length - i} show-${i + 1}`;
								return (
									<li key={'menu-item' + i} className={`${defaultClass}${isMenuOpen ? " active" :''}`}>
										<Icon icon={el.icon} action={()=>handleLink(el.link)} />
									</li>
								)
							})
						}
					</ul>
				</nav>
			</div>
			
			<div id="online-status" className="menu online-status">
            	<Icon icon={'offline'}/>
        	</div>
			<div className={`menu contactBox-toggle noSelect${isContactOpen ? " active" : ''}`}>
            	<Icon icon={'planeSolid'} action={toggleContact}/>
        	</div>
			<ContactBox className={isContactOpen ? "active" : ''} api={props.api} toggleContact={toggleContact} isOpen={isContactOpen}/>
		</>
	)
}

export default Menu