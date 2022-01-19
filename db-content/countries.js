// TODO: Must exclude this file from build is more for me
const fs = require('fs')
const path = require('path')
const sortBy = require('lodash/sortBy')

// import data.json
const data = require('./data.json')

const tableFields = [
  'name',
  'code',
  /*  'model',
  'automatic punctuation',
  'diarization',
  'boost',
  'word-level confidence',
  'profanity filter',
  'spoken punctuation',
  'spoken emojis', */
]

// Generate langs
const langCodes = []
const concattedArr = [...data.data, ...data.extra]
const langs = concattedArr
  .map((lang) => {
    let langObj = {}
    tableFields.forEach((key, index) => {
      langObj[key] = lang[index]
      if (key === 'code') {
        const countryCode = lang[index].substr(-2)
        langObj.countryCode = countryCode
      }
    })
    if (langCodes.includes(langObj.code)) {
      langObj = null
    } else {
      langCodes.push(langObj.code)
    }
    return langObj
  })
  .filter((x) => x)

fs.writeFile(
  path.resolve(__dirname, 'langs.json'),
  JSON.stringify(langs, null, 2),
  () => {
    // eslint-disable-next-line no-console
    console.log('write file langs.json')
  }
)

// Generate Countries
const countries = []
langs.forEach((l) => {
  const countryNameREGEX = /(?<=\().+?(?=\))/
  const matches = l.name.match(countryNameREGEX)
  const name = matches ? matches[0] : l.name
  const code = l.code.split('-')[1]

  const foundCountry = countries.findIndex(({ code: cod }) => code === cod)
  if (foundCountry !== -1) {
    countries[foundCountry].langs.push(l.code)
  } else {
    countries.push({
      name,
      code,
      flag: `https://flagcdn.com/24x18/${code.toLowerCase()}.png`,
      langs: [l.code],
    })
  }
})

const sortedCountries = sortBy(countries, ['name'])
fs.writeFile(
  path.resolve(__dirname, 'countries.json'),
  JSON.stringify(sortedCountries, null, 2),
  () => {
    // eslint-disable-next-line no-console
    console.log('write file countries.json')
    process.exit()
  }
)
