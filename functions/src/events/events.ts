const dictionary = [
  'pizza', 'pizzas',
  'snack', 'snacks',
  'beer', 'beers',
  'meal', 'food'
]
const regExpWordList = dictionary.reduce((list, word, index) =>
  `${list}${index ? '|' : ''}${word}`, '(') + ')'
const dictionaryCheckRegExpString = `\\b${regExpWordList}\\b`
const dictionaryCheckRegExp = new RegExp(dictionaryCheckRegExpString)
export const containsWordInDictionary = (textString: string) => dictionaryCheckRegExp.test((textString || '').toLocaleLowerCase())

export interface POEvent {
  name: string
  time: string,
  lat: string,
  lon: string,
  venueName: string,
  link: string
  description: string
}
