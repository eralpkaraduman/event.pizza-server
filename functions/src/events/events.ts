import _ from "lodash";
const foods = [
  "pizza",
  "pizzas",
  "snack",
  "snacks",
  "taco",
  "tacos",
  "hotdog",
  "hotdogs",
  "hot dog",
  "hot dogs",
  "meal",
  "food",
  "taste",
  "tasting"
];
const foodsOccurances = ["🍔", "🍕", "🌭", "🌮"];
const drinks = ["beer", "beers", "drink", "drinks", "wine", "wines"];
const drinksOccurances = ["🍺", "🍻", "🍷", "🍾", "🍸", "☕️"];

export enum CATEGORY {
  FOOD = "food",
  DRINK = "drink"
}

const categories: Array<{
  id: CATEGORY;
  words: Array<string>;
  occurances: Array<string>;
}> = [
  { id: CATEGORY.FOOD, words: foods, occurances: foodsOccurances },
  { id: CATEGORY.DRINK, words: drinks, occurances: drinksOccurances }
];

const createMatcher = (words: Array<string>, occurances: Array<string>) => {
  const regExpWordList =
    words.reduce(
      (list, word, index) => `${list}${index ? "|" : ""}${word}`,
      "("
    ) + ")";
  const dictionaryCheckRegExpString = `\\b${regExpWordList}\\b`;
  const dictionaryCheckRegExp = new RegExp(dictionaryCheckRegExpString);
  return (textString: string) =>
    dictionaryCheckRegExp.test((textString || "").toLocaleLowerCase()) ||
    occurances.some(occ => textString.includes(occ));
};

const matchers = categories.map(({ id, words, occurances }) => ({
  id,
  matcher: createMatcher(words, occurances)
}));

export const containsWordInDictionary = (
  textString: string
): null | { [id: string]: boolean } => {
  const matches = matchers.reduce(
    (matches, { id, matcher }) =>
      matcher(textString) ? { ...matches, [id]: true } : matches,
    {}
  );
  return _.isEmpty(matches) ? false : matches;
};

export interface POEvent {
  name: string;
  time: string;
  lat: string;
  lon: string;
  venueName: string;
  link: string;
  description: string;
}
