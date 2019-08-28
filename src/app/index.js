import React, { Component } from "react";
import FullPage from './components/FullPage';
import Menu from './components/Menu';
import Home from './pages/Home';
import About from './pages/About';
import Works from './pages/Works';
import Contact from './pages/Contact';



class App extends Component {
  constructor() {
    super();
    this.pages = [Home, About, Works, Contact];
    this.anchors = ['Home', 'About', 'Works', 'Contact'];
  }

  render() {
    return (
      <FullPage pages={this.pages} anchors={this.anchors} menu={Menu} />
    );
  }
}


export default App;
