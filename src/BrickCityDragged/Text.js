import React from 'react'; 
import PropTypes from 'prop-types';  // eslint-disable-line no-unused-vars
const classNames = (arr) => arr.join(" ");

const Text = (props) => {
  let staticClasses = ['bc-text'];
  if(props.cssClass) { staticClasses.push(props.cssClass); }
  if(props.textSize) { staticClasses.push('bc-size-' + props.textSize); }
  if(props.textColor) { staticClasses.push('bc-color-' + props.textColor); }
  if(props.textBold) { staticClasses.push('bc-text-bold'); }
  if(props.textCapitalize) { staticClasses.push('bc-text-capitalize'); }
  if(props.textEllipses) { staticClasses.push('bc-text-ellipses'); }
  if(props.textEmphasis) { staticClasses.push('bc-text-emphasis'); }
  if(props.textQuote) { staticClasses.push('bc-text-quote'); }
  if(props.textStrike) { staticClasses.push('bc-text-strike'); }
  if(props.textNormal) { staticClasses.push('bc-text-normal'); }
  if(props.textNowrap) { staticClasses.push('bc-text-nowrap'); }

  let inlineStyles = {
    verticalAlign: props.verticalAlign,
  }

  const { id, style, className, cssClass, textSize, textColor,
  textBold, textCapitalize, textEllipses, textEmphasis, textQuote, 
  textStrike, textNormal, textNowrap, verticalAlign,children, ...extra } = props; 
  console.log('aaa-',extra);
  return (
    <span {...extra} id={id}  className={classNames(staticClasses)} style={inlineStyles} >
      {props.children}
    </span>
  )
}

Text.propTypes = {
  id: PropTypes.string,
  cssClass: PropTypes.string,
  textSize: PropTypes.string,
  textColor: PropTypes.string,
  textBold: PropTypes.bool,
  textCapitalize: PropTypes.bool,
  textEllipses: PropTypes.bool,
  textEmphasis: PropTypes.bool,
  textQuote: PropTypes.bool,
  textStrike: PropTypes.bool,
  textNormal: PropTypes.bool,
  textNowrap: PropTypes.bool,
  verticalAlign: PropTypes.string
};

export default Text;