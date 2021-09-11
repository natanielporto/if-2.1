import { minMax } from '../../../utils/math'

describe( 'utils - math', () => {
  describe( 'minMax', () => {
    it( 'works for an array with multiple values', () => {
      const list = [ 1, 2, 3, 4, 5 ]

      const data = minMax( list )
      const expected = [ 1, 5 ]

      expect( data ).toEqual( expected )
    } )

    it( 'works for an array with one value', () => {
      const list = [ 1 ]

      const data = minMax( list )
      const expected = [ 1, 1 ]

      expect( data ).toEqual( expected )
    } )

    it( 'throws for an empty array', () => {
      const list = []

      expect( () => minMax( list ) ).toThrow( 'List cannot be empty' )
    } )
  } )
} )
