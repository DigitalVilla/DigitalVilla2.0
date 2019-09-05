import React, { useState } from 'react'
import ReactFullpage from '@fullpage/react-fullpage';

export default function FullPage(props) {
    const { pages, anchors, menu } = props;
    const [isOpen, setIsOpen] = useState(false);

    const setState = () => {
        setIsOpen(!isOpen)
    }

    return (
        <ReactFullpage
            licenseKey={'YOUR_KEY_HERE'}
            //Navigation
            menu={'#menu'}
            navigation={true}
            navigationPosition={'left'}
            navigationTooltips={anchors}
            showActiveTooltip={true}
            slidesNavigation={true}
            scrollingSpeed={800}
            fitToSectionDelay={100}
            touchSensitivity={15}
            recordHistory={false}
            controlArrows={true}
            verticalCentered={false}
            //events
            afterLoad={function (origin, destination, direction) {
               isOpen && setIsOpen();
            }}

            render={({ state, fullpageApi }) => {
                return (
                    <div>
                        { menu && <props.menu anchors={anchors} api={fullpageApi}  isOpen={isOpen} setIsOpen={setState} /> }
                        <ReactFullpage.Wrapper>
                            { pages.map((page,i)=> <Section key={i} page={page} api={fullpageApi} anchor={anchors[i]}/>) }
                        </ReactFullpage.Wrapper>
                    </div>
                );
            }}
        />
    )
}

function Section(props) {
    return (
        <section className="section" data-anchor={props.anchor}>
            <props.page api={props.api} />
        </section>
    )
}
