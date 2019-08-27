import React from 'react'
import ReactFullpage from '@fullpage/react-fullpage';

export default function FullPage(props) {
    const { pages, anchors, menu } = props;
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
            scrollingSpeed={500}
            autoScrolling={true}
            fitToSection={true}
            fitToSectionDelay={1000}
            scrollBar={false}
            easing={'easeInOutCubic'}
            easingcss3={'ease'}
            loopBottom={false}
            loopTop={false}
            loopHorizontal={true}
            continuousVertical={false}
            continuousHorizontal={false}
            scrollHorizontally={false}
            interlockedSlides={false}
            dragAndMove={false}
            offsetSections={false}
            resetSliders={false}
            fadingEffect={false}
            normalScrollElements={'#element1, .element2'}
            scrollOverflow={false}
            scrollOverflowReset={false}
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
            sectionsColor={['#ccc', '#fff', '#ccc', '#fff']}
            paddingTop={'50px'}
            paddingBottom={'10px'}
            // fixedElements = {'#header, .footer'}
            responsiveWidth={0}
            responsiveHeight={0}
            responsiveSlides={false}
            parallax={false}
            parallaxOptions={{ type: 'reveal', percentage: 62, property: 'translate' }}
            cards={false}
            cardsOptions={{ perspective: 100, fadeContent: true, fadeBackground: true }}


            //Custom selectors
            sectionSelector={'.section'}
            slideSelector={'.slide'}

            //events
            onLeave={function (origin, destination, direction) { }}
            afterLoad={function (origin, destination, direction) { }}
            afterRender={function () { }}
            afterResize={function (width, height) { }}
            afterReBuild={function () { }}
            afterResponsive={function (isResponsive) { }}
            afterSlideLoad={function (section, origin, destination, direction) { }}
            onSlideLeave={function (section, origin, destination, direction) { }}

            render={({ state, fullpageApi }) => {
                return (
                    <div>
                        { menu && <props.menu pages={anchors} api={fullpageApi} /> }
                        <ReactFullpage.Wrapper>
                            { pages.map((page,i)=>  <Section key={i} page={page} api={fullpageApi} />) }
                        </ReactFullpage.Wrapper>
                    </div>
                );
            }}
        />
    )
}


let index = 1;

function Section(props) {
    index = index >= 5 ? 1 : index;
    return (
        <div className="section" data-anchor={'page-' + index++}>
            <props.page api={props.api} />
        </div>
    )
}
