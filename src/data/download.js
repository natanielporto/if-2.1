/* eslint-disable no-sync */
const fs = require( 'fs' )
const fetch = require( 'node-fetch' )

const states = {
  '11': { 'code': 11, 'color': '#042310', 'name': 'Rondônia' },
  '12': { 'code': 12, 'color': '#081C05', 'name': 'Acre' },
  '13': { 'code': 13, 'color': '#13380D', 'name': 'Amazonas' },
  '14': { 'code': 14, 'color': '#116D03', 'name': 'Roraima' },
  '15': { 'code': 15, 'color': '#009C3B', 'name': 'Pará' },
  '16': { 'code': 16, 'color': '#249313', 'name': 'Amapá' },
  '17': { 'code': 17, 'color': '#0F7034', 'name': 'Tocantins' },
  '21': { 'code': 21, 'color': '#7C8DB5', 'name': 'Maranhão' },
  '22': { 'code': 22, 'color': '#12275B', 'name': 'Piauí' },
  '23': { 'code': 23, 'color': '#1B4ED1', 'name': 'Ceará' },
  '24': { 'code': 24, 'color': '#3B5189', 'name': 'Rio Grande do Norte' },
  '25': { 'code': 25, 'color': '#121B30', 'name': 'Paraíba' },
  '26': { 'code': 26, 'color': '#01123D', 'name': 'Pernambuco' },
  '27': { 'code': 27, 'color': '#2860ED', 'name': 'Alagoas' },
  '28': { 'code': 28, 'color': '#010A21', 'name': 'Sergipe' },
  '29': { 'code': 29, 'color': '#002277', 'name': 'Bahia' },
  '31': { 'code': 31, 'color': '#FFDF0A', 'name': 'Minas Gerais' },
  '32': { 'code': 32, 'color': '#F9DE2A', 'name': 'Espírito Santo' },
  '33': { 'code': 33, 'color': '#FFFF00', 'name': 'Rio de Janeiro' },
  '35': { 'code': 35, 'color': '#FDA630', 'name': 'São Paulo' },
  '41': { 'code': 41, 'color': '#631E72', 'name': 'Paraná' },
  '42': { 'code': 42, 'color': '#A634BF', 'name': 'Santa Catarina' },
  '43': { 'code': 43, 'color': '#370542', 'name': 'Rio Grande do Sul' },
  '50': { 'code': 50, 'color': '#BC1632', 'name': 'Mato Grosso do Sul' },
  '51': { 'code': 51, 'color': '#540815', 'name': 'Mato Grosso' },
  '52': { 'code': 52, 'color': '#9B0720', 'name': 'Goiás' },
  '53': { 'code': 53, 'color': '#EF1539', 'name': 'Distrito Federal' },
}

const download = async( { code, name, resolucao=1 } ) => {
  const BASE_URL = 'https://servicodados.ibge.gov.br/api/v2/malhas'
  const FORMATO = 'application/vnd.geo+json'
  const url = `${BASE_URL}/${code}?formato=${FORMATO}&resolucao=${resolucao}`

  const geojson = await fetch( url ).then( data => data.json() )

  for ( const feature of geojson.features ) {
    const codArea = feature.properties.codarea
    const state = states[ codArea ]

    feature.properties.name = state.name
    feature.properties.color = state.color
  }

  fs.writeFileSync(
    `src/data/geometries/${name}.json`,
    JSON.stringify( geojson )
  )
}

const downloadBrasil = () => download( { 'code': '', 'name': 'Brasil', 'resolucao': 2 } )


module.exports = {
  downloadBrasil
}

