import React from 'react';
import BC from 'ripcity';
import Drpr from './Dropr';

class Dropr extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: props.children
    }
    this.deleteMyChild = this.deleteMyChild.bind(this);
  }

  prevent = (ev) => {
    ev.preventDefault();
  }

  deleteMyChild(element){
    return (child) =>{
      console.log("state",this.state.content)
      let children = [].concat(this.state.content);
      console.log('tryiing?',children, child)
      children.splice(child, 1); // EraseChildren.
      console.log(children)
      delete window.elementMap[element];
      this.setState({
        content: children
      })
    }
  }

  dragStart(ev){
    let currentMap = ev.target.getAttribute('currentMap');
    let {type,props} = window.elementMap[currentMap];
    let location = [].indexOf.call(ev.target.parentNode.children, ev.target);

    ev.dataTransfer.clearData();
    ev.dataTransfer.setData('component',type)
    ev.dataTransfer.setData('props', JSON.stringify(props));
    ev.dataTransfer.setData('origin',currentMap);
    ev.dataTransfer.setData('location',location);
  }

  dropped = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    let origin = ev.dataTransfer.getData('origin');
    let newComponent = ev.dataTransfer.getData('component');
    let newProps = ev.dataTransfer.getData('props') ? 
    JSON.parse(ev.dataTransfer.getData('props')) : {};

    if(!newComponent) return; // Don't creat if it doesn't have component

    let { children, ...others } = newProps; // get props

    let currentMap = Object.keys(window.elementMap).length + 1; // Global Object Marker

    let newElement =
      React.createElement('div', {
            draggable: true,
            'onDragStart':this.dragStart,
            className: 'dragger',
            currentMap
        }, React.createElement(BC[newComponent], others, 
           (newComponent !== 'Image' ? React.createElement(Dropr, {}, children) : null)));

    let currentContent = this.state.content;
    currentContent = Array.isArray(currentContent) ? currentContent : [];
    let location = currentContent.push(newElement);
    
    window.elementMap[currentMap] = { type: newComponent, 
                                  props: newProps, 
                                  deleteMe: this.deleteMyChild(currentMap)  
                                };
    this.setState({ content: currentContent })
    console.log(currentContent)
  }


  render() {
    return <div className="drpr" {...this.props} onDragOver={this.prevent} onDrop={this.dropped} children={this.state.content} />
  }

}

export default Dropr;