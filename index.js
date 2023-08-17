console.clear();

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
let pagination = document.querySelector('[data-js="pagination"]');

// States
const maxPage = 42;
const page = 1;
const searchQuery = "";

// function card js

function createCharactersCard(characters) {
  characters.forEach((character) => {
    const listItem = `
    <li class="card">
            <div class="card__image-container">
              <img
                class="card__image"
                src="${character.image}"
                alt="${character.name}"
              />
              <div class="card__image-gradient"></div>
            </div>
            <div class="card__content">
              <h2 class="card__title">${character.name}</h2>
              <dl class="card__info">
                <dt class="card__info-title">Status</dt>
                <dd class="card__info-description">${character.status}</dd>
                <dt class="card__info-title">Type</dt>
                <dd class="card__info-description">${character.type}</dd>
                <dt class="card__info-title">Occurrences</dt>
                <dd class="card__info-description">${character.episode.length}</dd>
              </dl>
            </div>
          </li>
    `;
    cardContainer.innerHTML += listItem;
  });
  // console.log(listItem);
}

// API

async function getCharacters(pageNumber) {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character?page=${pageNumber}`
  );
  if (!response.ok) {
    console.log("Network error!", response.status);
    return null;
  }
  try {
    const json = await response.json();
    return json.results;
  } catch (error) {
    console.log("Error parsing json!", error);
    return null;
  }
}

async function runAPI() {
  const results = await getCharacters();
  return results;
}

const allCards = await runAPI();
const firstCard = allCards[0];
createCharactersCard(allCards);

//add event listener

nextButton.addEventListener("click", () => {
  let pageNumber = parseInt(pagination.innerHTML.slice(0, 2));
  console.log(pageNumber);
  if (pageNumber < 42) {
    pageNumber += 1;
    pagination.innerHTML = `${pageNumber} / ${maxPage}`;
    console.log(pagination.innerHTML.slice(0, 2));
  } else {
    pagination.innerHTML[0] = pageNumber;
  }
});
