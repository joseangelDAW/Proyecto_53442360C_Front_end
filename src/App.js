import React, { Component } from 'react';
import { Image } from 'react-bootstrap';

import ParametersIndexLinks from './components/parametersIndexLinks';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <ParametersIndexLinks />
      </div>
    );
  }
}

export default App;