import React from 'react';
import BC from 'ripcity';
import Content from './Content';
import PostButton from './PostButton';

const initialComponent = 'Button'

let components = ["Alert", "AudioButton", "Box", "Button", "Container", "Divider", "Dropdown", "DropdownOption", "GridColumn", "GridRow", "Heading", "Icon", "Image", "Link", "List", "ListItem", "Pipe","Section", "Text", "TextInput"];

const boolTypes = ['', 'true', 'false'];
const sizeTypes = ['', 'none', 'micro', 'mini', 'small', 'base', 'medium', 'large', 'extra-large'];
const colorTypes = ['', 'active', 'base', 'error', 'secondary', 'tertiary'];
const textAlignTypes = ['', 'left', 'right', 'center'];
const paletteTypes = ['', 'default', 'inverse'];
const buttonTypes = ['', 'primary', 'secondary'];
const realNonHackyPropTypes = {
  drag: boolTypes,
  anchor: boolTypes,
  active: boolTypes,
  backgroundColor: colorTypes,
  hasBorder: boolTypes,
  hasShadow: boolTypes,
  textAlign: textAlignTypes,
  color: colorTypes,
  colorPalette: paletteTypes,
  inline: boolTypes,
  app: boolTypes,
  disabled: boolTypes,
  buttonType: buttonTypes,
  textSize: sizeTypes,
  spacing: sizeTypes,
  spacingTop: sizeTypes,
  paddingSize: sizeTypes,
  textBold: boolTypes,
  textCapitalize: boolTypes,
  textEllipses: boolTypes,
  textSpace: boolTypes,
  textFont: buttonTypes,
  textEmphasis: boolTypes,
  textQuote: boolTypes,
  textStrike: boolTypes,
  textNormal: boolTypes,
  textNowrap: boolTypes
};
const commonPropTypes = [
  'backgroundColor',
  'hasBorder',
  'textAlign',
  'color',
  'colorPalette',
  'iconType',
  'inline',
  'source',
  'disabled',
  'buttonType',
  'gridUnits',
  'textSize',
  'spacing',
  'spacingTop',
  'paddingSize',
  'textBold',
  'textCapitalize',
  'textEllipses',
  'textEmphasis',
  'textQuote',
  'textStrike',
  'textFont',
  'textSpace',
  'textNormal',
  'textNowrap',
  'children'
];

let resizeDebounce = false;
function resize() {
  if (resizeDebounce) return;
  resizeDebounce = setTimeout(() => {
    resizeDebounce = false;
    let componentList = document.getElementById('visualizer-section-component-list');
    let wrapper = document.getElementById('visualizer-section-configuration-wrapper');
    if (componentList) {
      componentList.style.height = 0;
      componentList.style.height = wrapper.offsetHeight + 'px';
    }
  });
}
window.addEventListener('resize', resize);
window.addEventListener('click', resize);


export default class Visualisation extends React.Component {
  constructor(props) {
    if(window) { window.document.body.classList.add('hotspot'); }
    super(props);
    this.state = {
      selectedComponent: initialComponent,
      currentProps: {}
    }
    this.dragStart = this.dragStart.bind(this);
    this.editDrop = this.editDrop.bind(this);
  }

  componentDidMount() {
    resize();
  }

  componentDidUpdate() {
    resize();
  }

  updateCurrentComponentProps(props) {

    return (ev) => {
      let newParameter = {};
      newParameter[props] = isNaN(ev.target.value) ? ev.target.value : Number(ev.target.value);
      let newProp = Object.assign(this.state.currentProps, newParameter);
      this.setState({
        'currentProps': newProp
      })
    }
  }

  componentChange(ev) {
    this.setState({ currentProps: {}, selectedComponent: ev.target.innerHTML });
  }
  
  renderProps(props) {
    return (
      <div className="prop-wrapper">
        { props.map((x) => (
          <div className="propselect" >
            <div className="propselect-label">
              {this.getPropLabel(x === 'children' ? 'content' : x)}
            </div>
            <div className="propselect-input">
              {this.getInputForProp(x)}
            </div>
          </div>
        )) }
      </div>
    );
  }

  getPropLabel(name) {
    return name.replace(/([a-z])([A-Z])/, '$1 $2').toUpperCase();
  }

  getInputForProp(prop) {
    const typesForProp = realNonHackyPropTypes[prop];
    if (typesForProp) {
      return (
        <BC.Dropdown onChange={this.updateCurrentComponentProps(prop).bind(this)} >
          {typesForProp.map(x => (
            <BC.DropdownOption>{x}</BC.DropdownOption>
          ))}
        </BC.Dropdown>);
    } else {
      return (
        <BC.TextInput onChange={this.updateCurrentComponentProps(prop).bind(this)} />
      );
    }
  }

  dragStart(ev) {
    console.log('aaa');
    ev.dataTransfer.clearData();
    ev.dataTransfer.setData('component', this.state.selectedComponent)
    ev.dataTransfer.setData('props', JSON.stringify(this.state.currentProps));
    ev.dataTransfer.setData('creator',true);
    
  }
  
  prevent = (ev) => {
    ev.preventDefault();
  }

  trashDrop = (ev) =>{

    if(ev.dataTransfer.getData('creator')) return;
    let mapElement = ev.dataTransfer.getData('origin');
    let child = ev.dataTransfer.getData('location');
    console.log(
        mapElement,child,
        window.elementMap[mapElement],
        window.elementMap);
        window.elementMap[mapElement].deleteMe(child)
  }

  editDrop = (ev) =>{
        console.log('editme');
        if(ev.dataTransfer.getData('creator')) return;
        if(!ev.dataTransfer.getData('editor')) return;

        let mapElement = ev.dataTransfer.getData('origin');
        let {type, props} = window.elementMap[mapElement];
        // let child = ev.dataTransfer.getData('location');
        this.setState({selectedComponent: type,
                        currentProps: props

        });
      }

  render() {
    let currentComponent = React.createElement(BC[this.state.selectedComponent], this.state.currentProps);
    let currentPropTypes = Object.keys(BC[this.state.selectedComponent].propTypes || BC[this.state.selectedComponent].PropTypes || {});
    currentPropTypes.unshift('children');
    currentPropTypes.push('drag');
    // split props into common and advanced
    let currentCommonPropTypes = [], currentAdvancedPropTypes = [];
    currentPropTypes.forEach(prop => commonPropTypes.indexOf(prop) > -1 ? currentCommonPropTypes.push(prop) : currentAdvancedPropTypes.push(prop));

    return (
      <div>
        <div id="visualizer-section-wrapper">
          <BC.Box paddingSize="small" backgroundColor="black" id="visualizer-section-header">
            <BC.Image imageHeight="24px"
              source="http://g-ec2.images-amazon.com/images/G/01/audibleweb/brickcity/1.0/logos/audible_mark_solar._V314169480_.svg" />
            <BC.LetterSpace />
            <BC.Text textBold textColor="inverse">Build a widget</BC.Text>
            <PostButton />
            <BC.Button inline={true} cssClass="header-button" id="save-button">Save</BC.Button>
          </BC.Box>

          <div id="visualizer-section-configuration-wrapper">
            <div id="visualizer-section-component-list">
              <BC.Box id="visualizer-component-list-header">
                <BC.Heading headingLevel="2" textSize="medium">
                  1. Choose
                </BC.Heading>
              </BC.Box>
              <BC.Box id="visualizer-component-list-content">
                <BC.List listType="nostyle">
                  {components.map((x, l) => (
                    <BC.Link onClick={this.componentChange.bind(this)}>
                      <BC.ListItem>{x}</BC.ListItem>
                    </BC.Link>
                  ))}
                </BC.List>
              </BC.Box>
            </div>

            <div id="visualizer-section-configuration">
              <BC.Box>
                <BC.Heading headingLevel="2" spacing="mini" textSize="medium">
                  2. Configure (<strong>{this.state.selectedComponent}</strong>)
                </BC.Heading>
                <BC.Box hasBorder spacing="mini">
                  <div className="editor" draggable="true" onDragStart={this.dragStart}>{currentComponent}</div>
                </BC.Box>

                <div>
                  <BC.Heading headingLevel="2">Common Options</BC.Heading>
                  { this.renderProps(currentCommonPropTypes) }
                </div>

                <BC.Expander height="10px" showText="Advanced options">
                    <BC.Heading headingLevel="2" spacingTop="mini">Advanced Options</BC.Heading>
                    { this.renderProps(currentAdvancedPropTypes) }
                </BC.Expander>
              </BC.Box>
            </div>
          </div>

          <div id="visualizer-section-workspace-header">
            <BC.Box>
              <BC.ToggleSwitch cssClass="bc-pub-float-right" onChange={()=>{document.body.classList.toggle('hotspot')}} labelOff="Preview Mode" labelOn="Preview Mode" />

              <BC.Heading headingLevel="2" textSize="medium">3. Drag into Workspace</BC.Heading>
            </BC.Box>
          </div>

          <div id="visualizer-section-workspace-wrapper">
            <BC.Box id="visualizer-section-workspace">
              <Content />
            </BC.Box>
          </div>
        </div>

        <div id="trash-can" onDragOver={this.prevent} onDrop={this.trashDrop}>
          <BC.Icon iconType="trash" iconSize="large" />
        </div>
        <div id="edit-can" onDragOver={this.prevent} onDrop={this.editDrop} >
        <BC.Icon iconType="edit" iconSize="large" />
      </div>
      </div>
      
      )
  }

}