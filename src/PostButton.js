import React from 'react';
import BC from 'ripcity';

class PostButton extends React.Component {
  constructor(props){
    super(props);
  }

  postData() {
  	console.log(document.querySelector('.drpr').innerHTML);
  	/*
  	{"file-name":"blah", "htmlString":"anyValue"}
  	PUT
  	/upload
  	                var url = "/ajax-refmarker" + ref;
                 var request = new XMLHttpRequest();
                 request.open('GET', url, true);
                 request.send(url);
  	*/
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
  		<span style={{float: 'right', 'margin-top': '-5px'}}>
	  		<BC.Button onClick={this.postData.bind(this)} inline="true" buttonType="primary">
	  			Submit
			</BC.Button>
		</span>
	);
  }
}

export default PostButton;