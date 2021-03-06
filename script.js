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

// Called whenever value in input changes
function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  const html = matchArray
    .map((place) => {
      return `
      <li>
        <span className="name">${place.city}, ${place.state}</span>
        <span className="population">${place.population}</span>
      </li>
    `;
    })
    // Returns a string created by concatenating all elements of array and joining without any characters between
    .join('');
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

// Change fires when you click out of the input
searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
