import ReactDOMServer from 'react-dom/server';
import Visualizer from './src/Visualizer';
import path from 'path';
import fs from 'fs';
import React from 'react';




fs.readFile(path.join(__dirname, 'build','index.html'),'utf8',function(err,data){
  let newcontent = data.replace('<div id="root"></div>','<div id="root">'+ReactDOMServer.renderToString(<Visualizer/>)+'</div>');

    fs.writeFile(path.join(__dirname, 'build','index.html'),newcontent,function(){
      if (err) return console.log(err);
    });
  
});
