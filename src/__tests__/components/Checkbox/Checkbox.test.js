/* eslint-disable function-paren-newline */
import 'jest-dom/extend-expect'
import { cleanup, waitForElement, render, fireEvent } from 'react-testing-library'
import React from 'react'
import Checkbox from '../../../components/Checkbox'

describe( 'Checkbox tests ', () => {
  afterEach( () => {
    cleanup()
    jest.clearAllMocks()
  } )

  const mockedFunction = jest.fn()

  test( 'Label is written in input label', async() => {
    const { container, getByTestId } = render(
      <Checkbox
        label="Naruto"
        testId="checkbox"
      />
    )
    const input = await waitForElement( () => getByTestId( 'checkbox' ) )
    const generalDiv = await waitForElement( () => getByTestId( 'div-checkbox' ) )

    expect( input.value ).toBe( 'Naruto' )
    expect( generalDiv ).toBeInTheDocument()
    expect( container ).toMatchSnapshot()
  } )

  test( 'When there is no prop "isChecked" the component is not checked by default', async() => {
    const { container, getByTestId } = render(
      <Checkbox
        label="Naruto"
        testId="checkbox"
      />
    )
    const input = await waitForElement( () => getByTestId( 'checkbox' ) )
    const generalDiv = await waitForElement( () => getByTestId( 'div-checkbox' ) )

    expect( input.checked ).toBe( false )
    expect( generalDiv ).toBeInTheDocument()
    expect( container ).toMatchSnapshot()
  } )

  test( 'When there is a prop "isChecked" with value False the component is not checked', async() => {
    const { container, getByTestId } = render(
      <Checkbox
        isChecked={ false }
        label="Naruto"
        testId="checkbox"
      />
    )
    const input = await waitForElement( () => getByTestId( 'checkbox' ) )
    const generalDiv = await waitForElement( () => getByTestId( 'div-checkbox' ) )

    expect( input.checked ).toBe( false )
    expect( generalDiv ).toBeInTheDocument()
    expect( container ).toMatchSnapshot()
  } )

  test( 'When there is a prop "isChecked" with value True the component is checked', async() => {
    const { container, getByTestId } = render(
      <Checkbox
        isChecked={ true }
        label="Naruto"
        testId="checkbox"
      />
    )
    const input = await waitForElement( () => getByTestId( 'checkbox' ) )
    const generalDiv = await waitForElement( () => getByTestId( 'div-checkbox' ) )

    expect( input.checked ).toBe( true )
    expect( generalDiv ).toBeInTheDocument()
    expect( container ).toMatchSnapshot()
  } )

  test( 'When there is no prop "disabled" the component is abled by default', async() => {
    const { container, getByTestId } = render(
      <Checkbox
        label="Naruto"
        testId="checkbox"
      />
    )
    const input = await waitForElement( () => getByTestId( 'checkbox' ) )
    const generalDiv = await waitForElement( () => getByTestId( 'div-checkbox' ) )

    expect( input.disabled ).toBe( false )
    expect( generalDiv ).toBeInTheDocument()
    expect( container ).toMatchSnapshot()
  } )

  test( 'When there is a prop "disabled" with value True the component is disabled', async() => {
    const { container, getByTestId } = render(
      <Checkbox
        disabled={ true }
        label="Naruto"
        testId="checkbox"
      />
    )
    const input = await waitForElement( () => getByTestId( 'checkbox' ) )
    const generalDiv = await waitForElement( () => getByTestId( 'div-checkbox' ) )

    expect( input.disabled ).toBe( true )
    expect( generalDiv ).toBeInTheDocument()
    expect( container ).toMatchSnapshot()
  } )

  test( 'When there is a prop "disabled" with value False the component is abled', async() => {
    const { container, getByTestId } = render(
      <Checkbox
        disabled={ false }
        label="Naruto"
        testId="checkbox"
      />
    )
    const input = await waitForElement( () => getByTestId( 'checkbox' ) )
    const generalDiv = await waitForElement( () => getByTestId( 'div-checkbox' ) )

    expect( input.disabled ).toBe( false )
    expect( generalDiv ).toBeInTheDocument()
    expect( container ).toMatchSnapshot()
  } )

  test( 'When there is a "click" prop, the function is called when the input is clicked', async() => {
    const { container, getByTestId } = render(
      <Checkbox
        click={ mockedFunction }
        label="Naruto"
        testId="checkbox"
      />
    )
    const input = await waitForElement( () => getByTestId( 'checkbox' ) )
    const generalDiv = await waitForElement( () => getByTestId( 'div-checkbox' ) )

    fireEvent.click( input )

    expect( mockedFunction ).toHaveBeenCalled()
    expect( generalDiv ).toBeInTheDocument()
    expect( container ).toMatchSnapshot()
  } )

  test( 'When there is a "click" prop and a true "disabled" prop, the function is not called when the input is clicked', async() => {
    const { container, getByTestId } = render(
      <Checkbox
        click={ mockedFunction }
        disabled={ true }
        label="Naruto"
        testId="checkbox"
      />
    )
    const input = await waitForElement( () => getByTestId( 'checkbox' ) )
    const generalDiv = await waitForElement( () => getByTestId( 'div-checkbox' ) )

    fireEvent.click( input )

    expect( mockedFunction ).not.toHaveBeenCalled()
    expect( generalDiv ).toBeInTheDocument()
    expect( container ).toMatchSnapshot()
  } )
} )
