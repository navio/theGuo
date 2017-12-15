import React from 'react';
import BC from 'ripcity';
import Dropr from './Dropr.js';
import Content from './Content';
import PostButton from './PostButton';

const logo = 'https://m.media-amazon.com/images/G/01/audibleweb/arya/navigation/audible_logo._V517446980_.svg';
const initialComponent = 'Button'

const components = Object.keys(BC);

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
  'disabled',
  'buttonType',
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
  'textNormal',
  'textNowrap',
  'children'
];

function resizeLayout() {
  let main = document.getElementById('visualizer-section-main');
  let configuration = document.getElementById('visualizer-section-configuration');
  let workspace = document.getElementById('visualizer-section-workspace');
  if (main && configuration && workspace) {
    workspace.style.height = main.offsetHeight - configuration.offsetHeight + 'px';
  }
}
document.addEventListener('resize', resizeLayout);


export default class Visualisation extends React.Component {
  constructor(props) {
    if(window) { window.document.body.classList.add('hotspot'); }
    super(props);
    this.state = {
      selectedComponent: initialComponent,
      currentProps: {}
    }
    this.dragStart = this.dragStart.bind(this);
  }

  componentDidMount() {
    resizeLayout();
  }

  updateCurrentComponentProps(props) {

    return (ev) => {
      let newParameter = {};
      newParameter[props] = ev.target.value;
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
    return props.map((x) => (
      <div className="propselect" >
        <div className="propselect-label">
          {this.getPropLabel(x === 'children' ? 'content' : x)}
        </div>
        <div className="propselect-input">
          {this.getInputForProp(x)}
        </div>
      </div>
    ));
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

  }

  render() {
    let currentComponent = React.createElement(BC[this.state.selectedComponent], this.state.currentProps);
    let currentPropTypes = Object.keys(BC[this.state.selectedComponent].propTypes || BC[this.state.selectedComponent].PropTypes || {});
    currentPropTypes.unshift('children');
    currentPropTypes.push('drag');
    // split props into common and advanced
    let currentCommonPropTypes = [], currentAdvancedPropTypes = [];
    currentPropTypes.forEach(prop => commonPropTypes.indexOf(prop) > -1 ? currentCommonPropTypes.push(prop) : currentAdvancedPropTypes.push(prop));

    return <div id="visualizer-section-wrapper">
      <BC.Box paddingSize="small" backgroundColor="black" id="visualizer-section-header">
        <BC.Image imageHeight="24px"
          source="http://g-ec2.images-amazon.com/images/G/01/audibleweb/brickcity/1.0/logos/audible_mark_solar._V314169480_.svg" />
        <BC.LetterSpace />
        <BC.Text textBold textColor="inverse">Build a widget</BC.Text>
        <PostButton />
      </BC.Box>

      <div id="visualizer-section-main">
        <BC.Box id="visualizer-section-component-list">
          <BC.Heading headingLevel="2" spacing="mini" textSize="medium">
            1. Choose
          </BC.Heading>
          <BC.List listType="nostyle">
            {components.map((x, l) => (
              <BC.Link onClick={this.componentChange.bind(this)}>
                <BC.ListItem>{x}</BC.ListItem>
              </BC.Link>
            ))}
          </BC.List>
        </BC.Box>

        <div id="visualizer-section-workspace-wrapper">
          <BC.Box id="visualizer-section-configuration">
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

          <BC.Box id="visualizer-section-workspace">
            <BC.ToggleSwitch cssClass="bc-pub-float-right" onChange={()=>{document.body.classList.toggle('hotspot')}} labelOff="Preview Mode" labelOn="Preview Mode" />

            <BC.Heading headingLevel="2" spacing="mini" textSize="medium">3. Drag into Workspace</BC.Heading>

            <Content />
          </BC.Box>
        </div>
      </div>

      <div id="trash-can">
        <BC.Icon iconType="trash" iconSize="large" />
      </div>
    </div>;
  }

}