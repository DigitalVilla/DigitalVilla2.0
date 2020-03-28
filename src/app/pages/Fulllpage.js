import React, { useState, useEffect } from "react"
import ReactFullpage from "@fullpage/react-fullpage"
import Layout from "../layout/Layout"
import Menu from "../components/Menu"
import pages from "../constants/pages"
import "../scss/main.scss"

let t = 0;
export default function FullPage(props) {
	const [isMenuOpen, setMenuOpen] = useState(false);
	const anchors = pages.map((page) => page.name);
	
	const toggleMenu = () => {
		setMenuOpen(!isMenuOpen)
	}

	useEffect(() => {
		if (!props.display) {
			clearTimeout(t);
			t = setTimeout(() => {
				document.getElementsByClassName('fp-completely')[0].classList.remove('active');
			}, 100);
		}
	})

	return (
		<ReactFullpage
			licenseKey={process.env.REACT_APP_FP}
			//Navigation
			menu={".menu"}
			navigation={true}
			navigationPosition={"left"}
			// navigationTooltips={anchors}
			// showActiveTooltip={true}
			slidesNavigation={true}
			scrollingSpeed={1000}
			fitToSectionDelay={100}
			touchSensitivity={5}
			recordHistory={false}
			controlArrows={false}
			verticalCentered={false}
			animateAnchor={false}
			//events
			afterLoad={function (origin, destination, direction) {
				isMenuOpen && setMenuOpen(false)
			}}
			onLeave={function (origin, destination, direction) {
				// return false;
			}}
			render={({ state, fullpageApi }) => {
				return (
					<>
						<Menu
							anchors={anchors}
							api={fullpageApi}
							isLoaded={props.display}
							isMenuOpen={isMenuOpen}
							toggleMenu={toggleMenu}
						/>
						<ReactFullpage.Wrapper>
							{ pages.map((P, i) =>
								<Layout key={'FP-' + i} api={fullpageApi} pageName={P.name} >
									<P.page api={fullpageApi} isVisible={false} />
								</Layout>
							)}
						</ReactFullpage.Wrapper>
					</>
				)
			}}
		/>
	)
}
