import React from 'react'
import { Navbar } from '../../components'
import './Main.scss'

export function Main({ className, children }) {
  return (
    <section className={`main-layout ${className}`}>
      <Navbar />
      <main className='container'>{children}</main>
    </section>
  )
}
export default Main
