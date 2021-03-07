const endpoint =
  'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(endpoint)
  .then((response) => response.json())
  // Without spread operator, data would be in a nested array; spread expands the items into elements within the array
  .then((data) => cities.push(...data));

// console.log(cities);

function findMatches(wordToMatch, cities) {
  wordToMatch = wordToMatch.trim();
  return cities.filter((place) => {
    // Figure out if city or state matches what was searched for
    const regex = new RegExp(wordToMatch, 'gi');
    // match() returns matches as array object
    return place.city.match(regex) || place.state.match(regex);
  });
}

function numberWithCommas(num) {
  // \B matches an empty string not at the beginning or end of a word (whereas \b would match an empty string at the beginning or end of a word)
  // ?= is a positive lookahead, ?! is a negative lookahead
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Called whenever value in input changes
function displayMatches() {
  if (this.value == ' ') return;
  const matchArray = findMatches(this.value, cities);
  const resultHtml = matchArray
    .map((place) => {
      const regex = new RegExp(this.value, 'gi');
      const cityName = place.city.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      const stateName = place.state.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      return `
      <li>
        <span className="name">${cityName}, ${stateName}</span>
        <span className="population">${numberWithCommas(
          place.population
        )}</span>
      </li>
    `;
    })
    // Returns a string created by concatenating all elements of array and joining without any characters between
    .join('');
  results.innerHTML = resultHtml;
}

const searchInput = document.querySelector('.search');
const results = document.querySelector('.results');

// Change fires when you click out of the input
searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
