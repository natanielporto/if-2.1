/* eslint-disable function-paren-newline */
import 'jest-dom/extend-expect'
import { cleanup, waitForElement, render, fireEvent } from 'react-testing-library'
import React from 'react'
import CheckboxGroup from '../../../components/CheckboxGroup'

describe( 'CheckboxGroup tests ', () => {
  const items = [ 'A', 'B', 'C' ]

  afterEach( () => {
    cleanup()
    jest.clearAllMocks()
  } )

  test( 'Renders one checkbox for each item', async() => {
    const { container, getByTestId } = render(
      <CheckboxGroup itemIds={ items } />
    )

    const checkboxGroup = await waitForElement( () => getByTestId( 'checkbox-group' ) )

    for ( const item of items ) {
      // eslint-disable-next-line no-await-in-loop
      const checkbox = await waitForElement( () => getByTestId( item ) )

      expect( checkbox ).toBeInTheDocument()
    }

    expect( container ).toMatchSnapshot()

    expect( checkboxGroup ).toBeInTheDocument()
    expect( checkboxGroup.childElementCount ).toEqual( items.length )
  } )

  test( 'It can check and uncheck a children checkbox', async() => {
    const { getByTestId } = render(
      <CheckboxGroup itemIds={ items } />
    )

    const checkboxA = await waitForElement( () => getByTestId( 'A' ) )

    fireEvent.click( checkboxA )
    expect( checkboxA.checked ).toBeTruthy()

    fireEvent.click( checkboxA )
    expect( checkboxA.checked ).toBeFalsy()
  } )

  test( 'It can check more than one children checkbox', async() => {
    const { getByTestId } = render(
      <CheckboxGroup itemIds={ items } />
    )

    const checkboxA = await waitForElement( () => getByTestId( 'A' ) )
    const checkboxC = await waitForElement( () => getByTestId( 'C' ) )

    fireEvent.click( checkboxA )
    fireEvent.click( checkboxC )

    expect( checkboxA.checked ).toBeTruthy()
    expect( checkboxC.checked ).toBeTruthy()
  } )

  test( 'When clicking a checkbox it calls the onClick function', async() => {
    const mockedFunction = jest.fn()

    const { getByTestId } = render(
      <CheckboxGroup
        itemIds={ items }
        onClick={ mockedFunction }
      />
    )

    const checkboxA = await waitForElement( () => getByTestId( 'A' ) )

    fireEvent.click( checkboxA )

    expect( mockedFunction ).toHaveBeenCalledWith( 'A' )
  } )
} )
