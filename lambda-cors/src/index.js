const request = require( 'request' )

async function handler( ) {
  try {
    const URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRI31S8kntucTwTSzaRAIdtxjw5FDo0QIoBGF6TN9JPUbMtn-Ve1XsrUwA_i_c4MWtCAGcyESr3XUgg/pub?gid=1528817214&single=true&output=csv'

    const result = await new Promise( ( resolve, reject ) => {
      request( URL, ( error, response, body ) => {
        if ( error ) {
          reject( error )
        }

        resolve( body )
      } )
    } )

    return {
      'body': result.toString(),
      'headers': {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
      },
      'statusCode': 200,
    }
  } catch ( error ) {
    return {
      'body': JSON.stringify( { 'message': error.message, 'stack': error.stack, } ),
      'headers': {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
      },
      'statusCode': 500,
    }
  }
}

module.exports = {
  handler
}
