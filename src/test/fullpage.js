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
            lockAnchors={false}
            // anchors = {['firstPage', 'secondPage']}
            navigation={true}
            navigationPosition={'left'}
            navigationTooltips={anchors}
            showActiveTooltip={true}
            slidesNavigation={true}
            slidesNavPosition={'bottom'}

            //Scrolling
            css3={true}
            scrollingSpeed={800}
            autoScrolling={true}
            fitToSection={true}
            fitToSectionDelay={100}
            scrollBar={false}
            easing={'easeInOutCubic'}
            easingcss3={'ease'}
            loopBottom={false}
            loopTop={false}
            loopHorizontal={true}
            continuousVertical={false}
            normalScrollElements={null}
            scrollOverflow={false}
            scrollOverflowOptions={null}
            touchSensitivity={15}
            bigSectionsDestination={null}

            //Accessibility
            keyboardScrolling={true}
            animateAnchor={true}
            recordHistory={false}
            lazyLoading={true}

            //Design
            controlArrows={true}
            verticalCentered={false}
            // sectionsColor={['#ccc', '#fff', '#ccc', '#fff']}
            paddingTop={'50px'}
            // paddingBottom={'10px'}
            fixedElements = {null}
            responsiveWidth={0}
            responsiveHeight={0}
            responsiveSlides={false}
            cards={false}
            cardsOptions={{ perspective: 100, fadeContent: true, fadeBackground: true }}

            //Custom selectors
            sectionSelector={'.section'}
            slideSelector={'.slide'}

            //events
            onLeave={function (origin, destination, direction) {
                // console.log('onLeave',origin, destination, direction);
                // console.clear();
             }}
            afterLoad={function (origin, destination, direction) {
                //  console.log('afterLoad',origin, destination, direction);
                // console.clear();
                console.log('checked')
                setIsOpen(false);
            }}
            afterRender={function () {
             }}
            afterResize={function (width, height) {
                //  console.log('afterResize', width, height);
             }}
            afterReBuild={function () {
                    // console.log('afterReBuild');
             }}
            afterResponsive={function (isResponsive) {
                // console.log('afterResponsive',isResponsive);
            }}
            afterSlideLoad={function (section, origin, destination, direction) { }}
            onSlideLeave={function (section, origin, destination, direction) { }}

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
