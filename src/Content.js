import React from 'react';
import BC from 'ripcity';
import Dropr from './Dropr';

export default class Content extends React.Component {
  constructor(props) {
    super(props)
    
  }
  render() {
    return <BC.Box paddingSize="none" cssClass="editor" hasBorder><Dropr  /></BC.Box>
  }
}