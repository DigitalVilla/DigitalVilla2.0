import React, { Component } from "react";
import FullPage from './components/FullPage.jsx';
import Menu from './components/Menu.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Works from './pages/Works.jsx';
import Contact from './pages/Contact.jsx';



class App extends Component {
  constructor() {
    super();
    this.anchors = ['Home', 'About', 'Works', 'Contact'];
    this.pages = [Home, About, Works, Contact];
  }

  render() {
    return (
      <FullPage pages={this.pages} anchors={this.anchors} menu={Menu} />
    );
  }
}


export default App;
