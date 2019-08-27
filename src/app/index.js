import React, { Component } from "react";
import ReactFullpage from '@fullpage/react-fullpage';
import Menu from './components/Menu';
import Home from './pages/Home';
import About from './pages/About';
import Works from './pages/Works';
import Contact from './pages/Contact';

let index = 1;
function FullPage(props) {
  index = index >= 5 ? 1 : index;
  return (
    <div class="section" data-anchor={'page-' + index++}>
      <props.page api={props.api} />
    </div>
  )
}


class App extends Component {
  render() {
    return (
      <ReactFullpage
        //fullpage options
        navigation
        navigationPosition={'left'}
        menu={'#menu'}
        licenseKey={'YOUR_KEY_HERE'}
        scrollingSpeed={500} /* Options here */
        paddingTop={'50px'}
        recordHistory={false}
        slidesNavigation={true}
        render={({ state, fullpageApi }) => {
          return (
            <div>
              <Menu api={fullpageApi} />
              <ReactFullpage.Wrapper>
                <FullPage page={Home} api={fullpageApi} />
                <FullPage page={About} api={fullpageApi} />
                <FullPage page={Works} api={fullpageApi} />
                <FullPage page={Contact} api={fullpageApi} />
              </ReactFullpage.Wrapper>
            </div>
          );
        }}
      />
    );
  }
}

export default App;
