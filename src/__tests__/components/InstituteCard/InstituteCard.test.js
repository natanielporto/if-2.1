/* eslint-disable function-paren-newline */
import 'jest-dom/extend-expect'
import { cleanup, waitForElement, render } from 'react-testing-library'
import React from 'react'
import InstituteCard from '../../../components/InstituteCard'

describe( 'InstituteCard tests ', () => {
  const name = 'Naruto'
  const categories = [
    { 'background-color': '#123456', 'counter': 2, 'description': 'desc1', 'name': 'desc1' },
    { 'background-color': '#123455', 'counter': 4, 'description': 'desc2', 'name': 'desc2' },
    { 'background-color': '#123433', 'counter': 5, 'description': 'desc3', 'name': 'desc3' },
  ]


  afterEach( () => {
    cleanup()
    jest.clearAllMocks()
  } )

  test( 'Name is rendered on InstituteCard', async() => {
    const { container, getByTestId } = render(
      <InstituteCard
        categories={ categories }
        name={ name }
      />
    )
    const header = await waitForElement( () => getByTestId( 'header-name' ) )

    expect( header.innerHTML ).toEqual( name )
    expect( container ).toMatchSnapshot()
  } )

  test( 'Every category is rendered', async() => {
    const { container, getByTestId } = render(
      <InstituteCard
        categories={ categories }
        name={ name }
      />
    )
    const categoriesContainer = await waitForElement( () => getByTestId( 'categories' ) )

    expect( categoriesContainer.childElementCount ).toEqual( categories.length )
    expect( container ).toMatchSnapshot()
  } )

  test( 'Every category is rendered with the right description letter', async() => {
    const { getByTestId } = render(
      <InstituteCard
        categories={ categories }
        name={ name }
      />
    )

    for ( const category of categories ) {
      const categoryContainer = await waitForElement( () => getByTestId( `category-${category.description}-letter` ) ) // eslint-disable-line no-await-in-loop

      expect( categoryContainer.innerHTML ).toEqual( category.description.toUpperCase()[ 0 ] )
      expect( categoryContainer ).toHaveStyle( `background-color: ${category.color}` )
    }
  } )

  test( 'Every category is rendered with the right description', async() => {
    const { getByTestId } = render(
      <InstituteCard
        categories={ categories }
        name={ name }
      />
    )

    for ( const category of categories ) {
      const categoryContainer = await waitForElement( () => getByTestId( `category-${category.description}-description` ) ) // eslint-disable-line no-await-in-loop

      expect( categoryContainer.innerHTML ).toEqual( category.description )
    }
  } )

  test( 'Every category is rendered with the right counter', async() => {
    const { getByTestId } = render(
      <InstituteCard
        categories={ categories }
        name={ name }
      />
    )

    for ( const category of categories ) {
      const categoryContainer = await waitForElement( () => getByTestId( `category-${category.description}-counter` ) ) // eslint-disable-line no-await-in-loop

      expect( categoryContainer.innerHTML ).toEqual( category.counter.toString() )
    }
  } )

  test( 'Every category is rendered with the right percentage', async() => {
    const { getByTestId } = render(
      <InstituteCard
        categories={ categories }
        name={ name }
      />
    )

    const total = categories.reduce( ( acc, category ) => acc + category.counter, 0 )
    for ( const category of categories ) {
      const categoryContainer = await waitForElement( () => getByTestId( `category-${category.description}-counter-percentage` ) ) // eslint-disable-line no-await-in-loop

      expect( categoryContainer.innerHTML ).toEqual( `${( ( category.counter / total ) * 100 ).toFixed( 2 )}%` )
    }
  } )

  test( 'The categories counter total is correctly displayed', async() => {
    const { getByTestId } = render(
      <InstituteCard
        categories={ categories }
        name={ name }
      />
    )
    const totalSpan = await waitForElement( () => getByTestId( 'total' ) )

    const sumCounters = categories.reduce( ( acc, { counter } ) => acc + counter, 0 )
    expect( totalSpan.innerHTML ).toEqual( `Total: ${sumCounters}` )
  } )
} )
