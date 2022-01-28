import React from 'react';
import ReactDOM from 'react-dom';
// import { createElement } from './lib/createElement';
// import { render } from './lib/concurrent';
import { createElement } from './stack/createElement';
import { render } from './stack/reconciler';

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
const app = (
  <div>
    <h1>title</h1>
    <p id='1'>
      <h3>
        body1
      </h3>
      <h3>
        body2
      </h3>
      <h3>
        body3
      </h3>
    </p>
  </div>
)

/** @jsx PReact.createElement */
const app2 = (
  <div>
    <h1>title</h1>
    <p id='2'>
      <h4>
        body4
      </h4>
      <h3>
        body5
      </h3>
    </p>
  </div>
)

PReact.render(
  app,
  document.getElementById('root')
);
/*
*/

setTimeout(() => {
  PReact.render(
    app2,
    document.getElementById('root')
  );
}, 5000);
/*
*/
