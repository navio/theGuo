import React from 'react'; 
import BC from 'ripcity';
import Drpr from './Dropr';

const elementMap = {};

class Dropr extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      content: props.children
    }
  }

  prevent = (ev) => {
    ev.preventDefault();
  }

  dropped = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    let newComponent = ev.dataTransfer.getData('component');
    let newProps = JSON.parse(ev.dataTransfer.getData('props')) || {};


    let {children, ...others} = newProps; 

    if (others.drag === 'true') {
      if (!others.cssClass) {
        others.cssClass = 'draggable';
      } else {
        others.cssClass += ' draggable';
      }
    }
  
    let newElement =  React.createElement(BC[newComponent],others,( newComponent !== 'Image' ? React.createElement(Dropr,{},children) : null ) );
    
    let currentContent = this.state.content;
    currentContent = Array.isArray(currentContent) ? currentContent : [currentContent];
    currentContent.push(newElement);

    this.setState({ content: currentContent })
  }


  render(){
    return <div className="drpr" {...this.props}  onDragOver={this.prevent} onDrop={this.dropped} children={this.state.content}  />
  }

}

export default Dropr;