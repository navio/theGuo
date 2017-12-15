import React, { Component } from 'react';
import { render } from 'react-dom';
import Layout from './Layout';
import Visualizer from './Visualizer';
import Content from './Content';
import './style.css';
import 'ripcity/dist/styles.css'

class App extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <Layout>
        <Visualizer />
      </Layout>
    );
  }
}


window.elementMap = {};

render(<App />, document.getElementById('root'));
