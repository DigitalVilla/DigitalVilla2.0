import React, { useState } from 'react'
import ReactFullpage from '@fullpage/react-fullpage';
import key from '../utils/keys';

export default function FullPage(props) {
    const { pages, anchors, menu } = props;
    const [isOpen, setIsOpen] = useState(false);

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
            navigationTooltips={anchors}
            showActiveTooltip={true}
            slidesNavigation={true}
            scrollingSpeed={800}
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
                // console.log('onLeave',origin, destination, direction);
                // console.clear();
            }}


            render={({ state, fullpageApi }) => {
                return (
                    <div>
                        {menu && <props.menu anchors={anchors} api={fullpageApi} isOpen={isOpen} toggleMenu={toggleMenu} />}
                        <ReactFullpage.Wrapper>
                            {pages.map((Page, i) =>
                                <section key={i} className="section" data-anchor={anchors[i]}>
                                    <Page api={fullpageApi} page={anchors[i]}/>
                                </section>
                            )}
                        </ReactFullpage.Wrapper>
                    </div>
                );
            }}
        />
    )
}
