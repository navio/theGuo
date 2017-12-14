import React from 'react';
import BC from 'ripcity';

const logo = 'https://m.media-amazon.com/images/G/01/audibleweb/arya/navigation/audible_logo._V517446980_.svg';
const initialComponent = 'Box'

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
    super(props);
    this.state = {
      selectedComponent: initialComponent,
      currentProps:{}
    }
  }

  updateCurrentComponentProps(props){

    return (ev) => {
      console.log(props)
      let newParameter = {};
      newParameter[props] = ev.target.value;
      let newProp = Object.assign(this.state.currentProps,newParameter);
      this.setState({
      'currentProps': newProp
    })
    }
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

  render() {
    let currentComponent = React.createElement(BC[this.state.selectedComponent], this.state.currentProps);
    let currentPropTypes = Object.keys(BC[this.state.selectedComponent].propTypes || BC[this.state.selectedComponent].PropTypes  || {});
    currentPropTypes.push('children') 
    console.log(this.state.currentProps)
    return <BC.Box paddingSize="mini" hasBorder>
      <BC.GridRow>
        <BC.GridColumn gridUnits="2"><BC.Image source={logo} /></BC.GridColumn>
        <BC.GridColumn gridUnits="10">
          <BC.GridRow>
            <BC.GridColumn gridUnits="3">
              <BC.Dropdown onChange={(ev) => { this.setState({ selectedComponent: ev.target.value }); }} inline >
                {components.map((x, l) => (x === initialComponent ? <option selected>{x}</option> : <option>{x}</option>))}
              </BC.Dropdown >
            </BC.GridColumn>
            <BC.GridColumn gridUnits="9">
              <BC.Box hasBorder id="editor">
                {currentComponent}
              </BC.Box>
              <BC.Expander height ="10px" showText="Configuration">
              <BC.Box>
                {
                  currentPropTypes.map((x) => (
                    <div className="propselect" >{x}: {this.getInputForProp(x)}</div>
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