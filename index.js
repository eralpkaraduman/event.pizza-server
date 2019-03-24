// EVENT.PIZZA
const keys = require('./keys.json')
var meetup = require('meetup-api')({key: keys.meetup.apiKey});

const muGetUpcomingEvents = () => new Promise((resolve, reject) => {
  meetup.getUpcomingEvents({lang: 'en_US', lat: '60.169857', lon: '24.938379'}, function(err, resp) {
    if (!err) resolve(resp.events)
    else return reject(err)
  });
})

// Dictionary lookup stuff
const dictionary = [
  'pizza', 'pizzas',
  'snack', 'snacks',
  'beer', 'beers'
]
const regExpWordList = dictionary.reduce((list, word, index) =>
  `${list}${index ? '|' : ''}${word}`, '(') + ')'
const dictionaryCheckRegExpString = `\\b${regExpWordList}\\b`
const dictionaryCheckRegExp = new RegExp(dictionaryCheckRegExpString)
const containsWordInDictionary = textString => dictionaryCheckRegExp.test((textString || '').toLocaleLowerCase())

const begin = async () => {
  try {
    const events = await muGetUpcomingEvents()
    const eventsMatchingDictionary = events.filter(({description}) => containsWordInDictionary(description))
    const result = eventsMatchingDictionary
      .map(({name, venue, link, time}) => ({name, time, lat: venue.lat, lon: venue.lon, link}))
    console.log(JSON.stringify(result, null, 4))
  } catch(err) {
    console.log(err)
  }
}
begin()
