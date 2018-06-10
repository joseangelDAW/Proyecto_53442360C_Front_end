import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

/* El componente App es el componente principal y se carga en el id root de index.html */
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
