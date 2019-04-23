const words = [
  'pizza', 'pizzas',
  'snack', 'snacks',
  'beer', 'beers',
  'meal', 'food'
]
const occurances = [
  '🍔', '🍕', '🌭', '🌮'
]
const regExpWordList = words.reduce((list, word, index) =>
  `${list}${index ? '|' : ''}${word}`, '(') + ')'
const dictionaryCheckRegExpString = `\\b${regExpWordList}\\b`
const dictionaryCheckRegExp = new RegExp(dictionaryCheckRegExpString)
export const containsWordInDictionary = (textString: string) => {
  return dictionaryCheckRegExp.test((textString || '').toLocaleLowerCase()) ||
  occurances.some(occ => textString.includes(occ));
}

export interface POEvent {
  name: string
  time: string,
  lat: string,
  lon: string,
  venueName: string,
  link: string
  description: string
}
