import React, { Component } from 'react';
import { render } from 'react-dom';
import Visualizer from './Visualizer';
import './style.css';
import 'ripcity/dist/styles.css'

class App extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return <Visualizer />;
  }
}


window.elementMap = {};

render(<App />, document.getElementById('root'));
