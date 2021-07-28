import React, { Fragment } from 'react';
import axios from 'axios';
function App() {
  return (
    <Fragment>
      <h3>The weather in your location (location)</h3>
      <hr />
      <ul>
        <li>Actual temperature: x°</li>
        <li>Max temperature: x°</li>
        <li>Min Temperature: x°</li>
        <li>Pressure: x hpa</li>
        <li>Air humidity: x%</li>
      </ul>
    </Fragment>
  );
}
export default App;