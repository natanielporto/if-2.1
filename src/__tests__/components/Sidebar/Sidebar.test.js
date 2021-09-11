/* eslint-disable function-paren-newline */
import 'jest-dom/extend-expect'
import { cleanup, waitForElement, render, fireEvent } from 'react-testing-library'
import React from 'react'
import Sidebar from '../../../components/Sidebar'

describe( 'Sidebar tests ', () => {
  const divId = 'divSidebar'

  afterEach( () => {
    cleanup()
    jest.clearAllMocks()
  } )

  test( 'Sidebar renders it children', async() => {
    const { container, getByTestId } = render(
      <Sidebar isOpen={ false } >
        <div data-testid={ divId }>
          Conteúdo Sidebar
        </div>
      </Sidebar>
    )
    const div = await waitForElement( () => getByTestId( divId ) )

    expect( container ).toMatchSnapshot()
    expect( div ).toBeInTheDocument()
  } )

  test( 'Sidebar renders the burgerIcon as a custom component', async() => {
    const dataTestIdBurgerIcon = 'burgerIcon'
    const { getByTestId } = render(
      <Sidebar
        burgerIcon={ <div data-testid={ dataTestIdBurgerIcon } /> }
        isOpen={ false }
      >
        <div data-testid={ divId }>
          Conteúdo Sidebar
        </div>
      </Sidebar>
    )

    const burgerIcon = await waitForElement( () => getByTestId( dataTestIdBurgerIcon ) )

    expect( burgerIcon ).toBeInTheDocument()
  } )

  test( 'Sidebar calls the open/close handler when interacting with it', () => {
    const openHandler = jest.fn()
    const closeHandler = jest.fn()

    const { getByText } = render(
      <Sidebar
        isOpen={ false }
        onClose={ closeHandler }
        onOpen={ openHandler }
      >
        <div data-testid={ divId }>
          Conteúdo Sidebar
        </div>
      </Sidebar>
    )

    const openMenuButton = getByText( 'Open Menu' )
    const closeMenuButton = getByText( 'Close Menu' )

    fireEvent.click( openMenuButton )
    expect( openHandler ).toHaveBeenCalled()

    fireEvent.click( closeMenuButton )
    expect( closeHandler ).toHaveBeenCalled()

    fireEvent.click( openMenuButton )
    expect( openHandler ).toHaveBeenCalledTimes( 2 )
  } )

  test( 'Sidebar is rendered with the right width', () => {
    const width = '600px'

    const { container } = render(
      <Sidebar
        isOpen={ false }
        width={ width }
      >
        <div data-testid={ divId }>
          Conteúdo Sidebar
        </div>
      </Sidebar>
    )

    // eslint-disable-next-line no-underscore-dangle
    expect( container.firstChild.childNodes[ 1 ].style._values.width ).toEqual( width )
  } )
} )
