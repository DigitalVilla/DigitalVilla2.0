import React from 'react'

export default function Slide({ slide, index, imageFirst }) {
    // console.log("Render Slide: " + slide.title);
    const renderImage = ({ image, title }) => (
        <figure className="noSelect">
            <img data-src={image} alt={title} />
        </figure>
    )

    const renderDeck = (dekList) => {
        return dekList.map((line, i) => {
            return typeof line === Object ? line : <p key={i}>{line}</p>
        })
    }

    return (
        <div className="slide custom" data-anchor={'slide' + index}>
            <div className={"content slide" + index}>
                {imageFirst &&
                    renderImage(slide)
                }
                <div className="leyend">
                    <h2>{slide.title}</h2>
                    <div className="dek">
                        {slide.dek.top &&
                            renderDeck(slide.dek.top)
                        }
                        <span className="break"></span>
                        {slide.dek.bottom &&
                            renderDeck(slide.dek.bottom)
                        }
                        <span className="break button"></span>
                        {slide.link &&
                            <a className="btn" href={slide.link}>Check it out</a>
                        }
                    </div>
                </div>
                {!imageFirst &&
                    renderImage(slide)
                }
            </div>
        </div>
    )
}