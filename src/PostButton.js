import React from 'react';
import BC from 'ripcity';

class PostButton extends React.Component {

  postData() {
  	console.log(document.querySelector('.drpr').innerHTML);
  	let key = prompt('Please enter a key') + '-' + Date.now();
  	let url = '/upload';
  	let data = {
  		'file-name': key + '.html',
  		'htmlString': document.querySelector('.drpr').innerHTML
  	};
  	let request = new XMLHttpRequest();
  	request.open('PUT', url, true);
  	request.setRequestHeader('Content-type','application/json; charset=utf-8');
  	request.send(JSON.stringify(data));

  	alert('Done! Schedule your symphony component with the key of ' + key);
  }

  render() {
  	return (
			<BC.Button onClick={this.postData.bind(this)} inline="true" buttonType="primary" cssClass="header-button">
				Submit
			</BC.Button>
		);
  }
}

export default PostButton;