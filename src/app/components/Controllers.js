import React, { Component } from 'react'
import { setViewSize } from '../utils/isMedia'
import ContactBox from './ContactBox';
import OfflineIcon from './OfflineIcon'
import Menu from './Menu'

export default class Controllers extends Component {
	constructor(props) {
		super(props)
		this.page = ''
		this.count = 1
		this.state = {
			isContactOpen: false,
			isMenuOpen: false,
		}
	}

	componentDidMount() {
		const setView = setViewSize()
		const setState = this.setState
		// this.props.api.reloadView = setView;

		setView();
		window.addEventListener('resize', () => {
			// console.log("REZISE");
			setView();
			//Toodo update state
		});
	}
	componentDidUpdate() {

	}

	shouldComponentUpdate(prevProps, prevState) {
		const { isMenuOpen, isContactOpen } = this.state
		const { api, fpState } = this.props

		if (isMenuOpen && fpState.lastEvent === "onLeave") {
			const currentPage = api.getActiveSection().anchor
			// console.log(fpState.lastEvent === "afterLoad" && this.count++);

			// Close the menu when scroll happens 
			if (this.page != currentPage) {
				this.page = currentPage;
				this.toggleMenu();
				this.autoCalled = true
			}
		}

			return prevState.isMenuOpen !== isMenuOpen ||
			prevState.isContactOpen !== isContactOpen
	}

	toggleMenu = () => {
		// console.log('toggleMenu');

		this.setState((prevState) => ({
			isMenuOpen: !prevState.isMenuOpen,
			isContactOpen: false
		}))
	}

	toggleContact = () => {
		this.setState((prevState) => ({
			isContactOpen: !prevState.isContactOpen,
			isMenuOpen: false
		}))
	}

	handleLink = (a) => {
		window.location.href = a;
	}

	render() {
		const { isContactOpen, isMenuOpen } = this.state
		const { lastEvent } = this.props.fpState;

		// console.log('Controller: ', lastEvent);
		return (
			<>
				<OfflineIcon />
				<Menu toggleMenu={this.toggleMenu} isOpen={isMenuOpen} />
				{/* <ContactBox toggleContact={this.toggleContact} isOpen={isContactOpen} /> */}
			</>
		)
	}
}