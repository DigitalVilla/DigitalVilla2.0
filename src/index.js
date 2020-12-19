import React from 'react'
import ReactDOM from 'react-dom'
import App from './app/pages/index'
import SW from './services/serviceWorker'
import './app/scss/main.scss'

console.clear()
const start = String.fromCodePoint(0x2660)
console.log(
  `%c${start + start} Digital Villa ${start + start} %c${'2.3'} `,
  `color:${'purple'}`,
  `color:${'Navy'}`
)

ReactDOM.render(<App />, document.getElementById('root'))
SW.unregister()
// SW.register();
