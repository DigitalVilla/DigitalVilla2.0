import React, { useState } from 'react'
import ReactFullpage from '@fullpage/react-fullpage';
import key from '../utils/keys';
import logger from '../utils/logger'
import BasePage from '../pages/BasePage'
const log = logger('<FullPage/> :');

export default function FullPage(props) {
	const [isOpen, setIsOpen] = useState(false);
	const { pages, anchors, menu } = props;

	const toggleMenu = () => {
		setIsOpen(!isOpen)
	}

	return (
		<ReactFullpage
			licenseKey={key('fullpage')}
			//Navigation
			menu={'#menu'}
			navigation={true}
			navigationPosition={'left'}
			// navigationTooltips={anchors}
			// showActiveTooltip={true}
			slidesNavigation={true}
			scrollingSpeed={1000}
			fitToSectionDelay={100}
			touchSensitivity={5}
			recordHistory={false}
			controlArrows={true}
			verticalCentered={false}
			animateAnchor={false}
			//events
			afterLoad={function (origin, destination, direction) {
				isOpen && setIsOpen();
			}}
			onLeave={function (origin, destination, direction) {
				origin.item.firstChild.classList.add('animateOnLeave');
				// return false;
			}}


			render={({ state, fullpageApi }) => {
				return (
					<div>
						{menu && <props.menu anchors={anchors} api={fullpageApi} isOpen={isOpen} toggleMenu={toggleMenu} />}
						<ReactFullpage.Wrapper>
							{pages.map((Page, i) =>
								<BasePage key={i} api={fullpageApi} pageName={anchors[i]} >
									{(isVisible,api) => <Page api={api} isVisible={isVisible} />}
								</BasePage>
							)}
						</ReactFullpage.Wrapper>
					</div>
				);
			}}
		/>
	)
}