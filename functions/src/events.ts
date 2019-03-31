import keys from './keys.json'
import MeetupApi from 'meetup-api'
const meetup = MeetupApi({key: keys.meetup.apiKey})

interface Event {
  description: String,
  name: String,
  venue: any,
  link: String,
  time: Number
}

const muGetUpcomingEvents: (lat: String, lon: String) => Promise<Event[]> = (lat, lon) => new Promise((resolve, reject) => {
  meetup.getUpcomingEvents({lang: 'en_US', lat, lon}, function(err: any, resp: any) {
    if (!err) resolve(resp.events)
    else {
      try {
        reject(JSON.parse(err.response.text).errors)
      } catch (e) {
        reject('internal server error')
      }
    }
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
const containsWordInDictionary = (textString: String) => dictionaryCheckRegExp.test((textString || '').toLocaleLowerCase())

export const getFoodEvents = async (lat: String, lon: String) => {
  try {
    const events = await muGetUpcomingEvents(lat, lon)
    const eventsMatchingDictionary = events.filter(({description}) => containsWordInDictionary(description))
    return eventsMatchingDictionary
      .map(({name, venue, link, time}) => ({name, time, lat: venue.lat, lon: venue.lon, link}))
  } catch(err) {
    throw err
  }
}
