import React from 'react';
import ReactDOM from 'react-dom';

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

