import React from 'react';
import BC from 'ripcity';

class PostButton extends React.Component {
  constructor(props){
    super(props);
  }

  postData() {
  	console.log(document.querySelector('.drpr').innerHTML);
  }

  render() {
  	return (
  		<span style={{float: 'right', 'margin-top': '-5px'}}>
	  		<BC.Button onClick={this.postData.bind(this)} inline="true" buttonType="primary">
	  			Submit
			</BC.Button>
		</span>
	);
  }
}

export default PostButton;