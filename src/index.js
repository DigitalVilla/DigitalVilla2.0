import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/pages/index';
import './app/scss/main.scss';
import SW from './services/serviceWorker';

const start = String.fromCodePoint(0x2660);
console.log(`%c${start+start} Digital Villa ${start+start} %c${'2.3'} `, `color:${'purple'}`, `color:${'Navy'}`);

ReactDOM.render(<App />, document.getElementById('root'));

// console.clear();
// SW.unregister();
SW.register();