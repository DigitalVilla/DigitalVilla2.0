import React from 'react'
import { SVGIcon } from '@digitalvilla/components'
import logo from '../../assets/dv_logo.png'
import './ErrorBoundary.scss'
import '../../App.scss'

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Error reporting service
  }

  render() {
    const { hasError, error, errorInfo } = this.state
    const { render, children } = this.props
    if (!hasError) return children
    if (render) return render(error, errorInfo)
    return (
      <section className='error-boundary blank-layout'>
        <img src={logo} alt='Quantifi' className='blank-logo noSelect' />
        <div className='blank-card card'>
          <div className='title'>
            <SVGIcon icon='warning' />
            <h2>Sorry, something went wrong!</h2>
          </div>
          <p>Our team has been notified of this issue.</p>
          <a href='/' className='btn primary radius'>
            Go Home
          </a>
        </div>
      </section>
    )
  }
}

export default ErrorBoundary
