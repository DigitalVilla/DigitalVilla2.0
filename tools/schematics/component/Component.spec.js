import React from 'react'
import { render } from '@testing-library/react'
import Component from './Component'
import { useAppContext } from '../../store/AppContext'
jest.mock('../../store/AppContext')

describe('Component', () => {
  it('should render successfully', () => {
    useAppContext.mockReturnValue({
      actions: {},
      appContext: {},
    })
    const { baseElement } = render(<Component />)
    expect(baseElement).toBeTruthy()
  })
})
