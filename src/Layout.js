import React from 'react';
import BC from 'ripcity';

const layout = { width: "100%", height: "100%", display: "block", };

export default (props) => {

  return (<div style={layout}>
    {props.children}
         </div>);

};