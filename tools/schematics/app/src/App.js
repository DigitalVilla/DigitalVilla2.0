import React from 'react'
import { Router } from '@reach/router'
import { Quantifi } from '@digitalvilla/themes'
import { AppProvider } from './store/AppContext'
import { Home, NotFound } from './pages'
import './App.scss'

export function App(props) {
  return (
    <Quantifi className='app'>
      <AppProvider>
        <Router>
          <Home path='/' />
          <NotFound default />
        </Router>
      </AppProvider>
    </Quantifi>
  )
}

export default App
