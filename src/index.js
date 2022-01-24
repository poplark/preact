import React from 'react';
import ReactDOM from 'react-dom';
import { createElement } from './lib/createElement';
import { render } from './lib/render';

const PReact = {
  createElement,
  render,
}


/*
const App = function() {
  return (
    <div>
      <h1>title</h1>
      <p>body</p>
    </div>
  )
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
*/

/** @jsx PReact.createElement */
const App = (
  <div>
    <h1>title</h1>
    <p>body</p>
  </div>
)

PReact.render(
  App,
  document.getElementById('root')
);
/*
*/
