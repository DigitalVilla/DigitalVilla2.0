import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/pages/index.js';
import './app/scss/main.scss';
import SW from './services/serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// console.clear();
// SW.unregister();
SW.register();