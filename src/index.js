import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import BC from 'ripcity';
import TextBC from './BrickCityDragged/Text.js';
import 'ripcity/dist/styles.css';
import './style.css';

const droppingarea =  {"border":"1px solid red",height:"100px"};
const draggedelement = {};

class App extends Component {
  constructor() {
    super();
    this.state = {
      content: [],
      current: 'Text'
    };

    this.dropped = this.dropped.bind(this);
  
  }

  dragged = (ev) => {
    console.log(ev.currentTarget,ev)
    ev.dataTransfer.clearData();
    let element = ev.target.getAttribute('cname') || 'unknown';
    let value = ev.target.getAttribute('cval');
    ev.dataTransfer.setData('component',element)
    ev.dataTransfer.setData('value',value);
  }

  dropped = (ev) => {
    console.log('dropped',ev.target);
    let droppedElement = ev.dataTransfer.getData("component");
    let droppedValue = ev.dataTransfer.getData("value");
    let myc = BC[droppedElement] || BC['Button'];
    let newElement =React.createElement(myc, 
      {style: {"padding-left":'10px'}, 
      drprops:{},
      inline:'true'},
      droppedValue );

    let current = this.state.content;
    current.push(newElement);
    this.setState({content:current})
  }

  prevent = (ev) => {
   // console.log(ev);
    ev.preventDefault();
  }

  dragover = (ev) => {
   // console.log(ev);
    ev.preventDefault();
  }
  renderMe = (element) => {
    return (BC[element]);
    }
  selectComponent = (ev) =>{
    this.setState({current:ev.target.value});
  }
  render() {
    let components = Object.keys(BC);
    let prTypes = BC[this.state.current].propTypes || {};
    let pror = Object.keys( prTypes );
    console.log(prTypes);
    pror.forEach((x)=>console.log(x));
    return (
      <BC.Section>
        <select onChange={this.selectComponent.bind(this)} style={{"margin-right":"10px"}}>
          {components.map((x,l)=>(<option>{x}</option>))}
        </select>
        <BC.Button draggable="true" inline 
          cval={this.state.current}
          cname={this.state.current} 
          id="GridRow"
          style={draggedelement} 
          onDragStart={this.dragged} children={this.state.current} />
          <BC.Box>
          {pror.map((x)=>(<div>{x} <input /></div>))
          }</BC.Box>
        <BC.Box hasBorder onDragOver={this.prevent} 
                onDrop={this.dropped} 
                children={this.state.content}></BC.Box>
      </BC.Section>
    );
  }
}
//.map((x)=>(<div>{x} <input /></div>))
render(<App />, document.getElementById('root'));