import React from 'react'
import { render } from '@testing-library/react'
import ErrorBoundary from './ErrorBoundary'

const Child = () => {
  throw 'error'
}

describe('ErrorBoundary', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ErrorBoundary>
        <Child />
      </ErrorBoundary>
    )

    expect(baseElement).toBeTruthy()
  })
})
