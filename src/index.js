import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/pages/index.js';
import './app/scss/main.scss'
import IEcheck from './app/utils/IEcheck' // eslint-disable-line no-unused-vars
// import * as serviceWogitrker from './services/serviceWorker';

setTimeout(() => {
    document.body.removeChild(document.getElementById('loader'));
    return ReactDOM.render( < App / > , document.getElementById('root'));
}, 2000);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();