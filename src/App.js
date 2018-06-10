import React, { Component } from 'react';
import { Image } from 'react-bootstrap';

import ParametersIndexLinks from './components/parametersIndexLinks';
import './App.css';

class App extends Component {

  /* App renderiza el componente ParametersIndexLinks,
    que es el que lleva los parámetros con los que se van
    a construir los formularios, menús, etc... */
  render() {
    return (
      <div>
        <ParametersIndexLinks />
      </div>
    );
  }
}

export default App;