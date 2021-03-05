const endpoint =
  'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(endpoint)
  .then((response) => response.json())
  // Without spread operator, data would be in a nested array; spread expands the items into elements within the array
  .then((data) => cities.push(...data));

function findMatches(wordToMatch, cities) {
  return cities.filter((place) => {
    // Figure out if city or state matches what was searched for
    const regex = new RegExp(wordToMatch, 'gi');
    // match() returns matches as array object
    return place.city.match(regex) || place.state.match(regex);
  });
}
