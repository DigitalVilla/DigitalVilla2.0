import React from "react"
import Icon from "../components/Icons"
import video from "../assets/nebula.mp4"
import poster from "../constants/poster"
import Video from "../components/Video"
import isMedia from "../utils/isMedia"
import logo_DV from "../assets/logo_DV.png"

export default React.memo(function Home(props) {
	let icon = isMedia("mobile") ? "chevronCircleDn" : "mouse"

	const handlePageDown = () => {
		props.api.moveTo(2)
	}

	return (
		<>
			<div className="header noSelect">
				<img className="main-logo" src={logo_DV} alt="DV" />
				<h1>
					{/* {`${meta.title} is a ${meta.description} by ${siteMetadata.author}. location ${siteMetadata.location}`} */}
					Advanced and Inovative Web development and  Mobile development in ReactJS and React Native
				</h1>
				<div className="title">
					<span>Digital </span>
					<span className="break"></span>
					<span>Villa</span>
				</div>
				<h2>
					* This is only a staging Site *
				</h2>
				{props.children}
			</div>

			<Video poster={poster} media={video} />

			<div className="scroll">
				<Icon
					className="scroll-icon svg-md"
					icon={icon}
					action={handlePageDown}
				/>
			</div>
		</>
	)
})