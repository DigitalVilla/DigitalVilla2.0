import React from 'react'
import { render } from '@testing-library/react'
import NotFound from './NotFound'
import { useAppContext } from '../../store/AppContext'
jest.mock('../../store/AppContext')

describe('NotFound', () => {
  it('should render successfully', () => {
    useAppContext.mockReturnValue({
      actions: {},
      appContext: {},
    })
    const { baseElement } = render(<NotFound />)
    expect(baseElement).toBeTruthy()
  })
})
