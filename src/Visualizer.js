import React from 'react';
import BC from 'ripcity';
import Dropr from 'Dropr.js';

const logo = 'https://m.media-amazon.com/images/G/01/audibleweb/arya/navigation/audible_logo._V517446980_.svg';
const initialComponent = 'Button'

const components = Object.keys(BC);

const boolTypes = ['', 'true', 'false'];
const sizeTypes = ['', 'micro', 'mini', 'small', 'base', 'medium', 'large', 'extra-large'];
const colorTypes = ['', 'active', 'base', 'error', 'secondary', 'tertiary'];
const textAlignTypes = ['', 'left', 'right', 'center'];
const paletteTypes = ['', 'default', 'inverse'];
const buttonTypes = ['', 'primary', 'secondary'];
const realNonHackyPropTypes = {
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
    this.setState({ currentProps: {}, selectedComponent: ev.target.value });
  }

  getInputForProp(prop) {
    const typesForProp = realNonHackyPropTypes[prop];
    if (typesForProp) {
      return (
        <select onChange={this.updateCurrentComponentProps(prop).bind(this)} >
          {typesForProp.map(x => (
            <option>{x}</option>
          ))}
        </select>);
    } else {
      return (<input onChange={this.updateCurrentComponentProps(prop).bind(this)} />);
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

    currentPropTypes.push('children')
    return <BC.Box paddingSize="mini" hasBorder>
      <BC.GridRow>
        <BC.GridColumn girdUnitsSm="8" gridUnitsLg="2">
          <BC.Image source={logo} />
        </BC.GridColumn>

        <BC.GridColumn gridUnitsLg="10">
          <BC.GridRow>
            <BC.GridColumn spacing="mini" gridUnitsSm="12" gridUnitsLg="3">
              <BC.Dropdown onChange={this.componentChange.bind(this)} inline >
                {components.map((x, l) => (x === initialComponent ? <option selected="true">{x}</option> : <option>{x}</option>))}
              </BC.Dropdown >
              <BC.Box paddingSize="mini">
              Preview: <BC.ToggleSwitch onChange={()=>{document.body.classList.toggle('hotspot')}} />
              </BC.Box>
            </BC.GridColumn>
            <BC.GridColumn gridUnitsSm="12" gridUnitsLg="9">
              <BC.Box hasBorder >
                <div className="editor" draggable="true" onDragStart={this.dragStart}>{currentComponent}</div>
              </BC.Box>
              <BC.Expander height="10px" showText="Configuration">
                <BC.Box>
                  {
                    currentPropTypes.map((x) => (
                      <div className="propselect" >{x === 'children' ? 'Content' : x}: {this.getInputForProp(x)}</div>
                    ))
                  }
                </BC.Box>
              </BC.Expander>

            </BC.GridColumn>
          </BC.GridRow>

        </BC.GridColumn>

      </BC.GridRow>
    </BC.Box>;
  }

}