import React from "react"
import ReactFullpage from "@fullpage/react-fullpage"
import Layout from "../layout/Layout"
import Controllers from "../components/Controllers"
import pages from "../constants/pages"
import "../scss/main.scss"

export default function FullPage(props) {
	const anchors = pages.map((page) => page.name);

	return (
		<ReactFullpage
			licenseKey={process.env.REACT_APP_FP}
			//Navigation
			menu={".controller"}
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
			}}
			onLeave={function (origin, destination, direction) {
			}}
			render={({ state, fullpageApi }) => {
				return (
					<>
						<Controllers
							fpState={state}
							anchors={anchors}
							api={fullpageApi}
						/>
						<ReactFullpage.Wrapper>
							{pages.map((P, i) =>
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
