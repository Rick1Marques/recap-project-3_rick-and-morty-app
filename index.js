import { createCharacterCard } from "./components/card/card.js";

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
let maxPage = "";
let page = 1;
const searchQuery = "";

// API

async function getCharacters() {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}`
  );
  if (!response.ok) {
    console.log("Network error!", response.status);
    return null;
  }
  try {
    const character = await response.json();
    const characters = character.results;
    maxPage = await character.info.pages;
    console.log(maxPage);
    pagination.innerHTML = `${page} / ${maxPage}`;
    cardContainer.innerHTML = "";
    characters.forEach((character) => {
      const card = createCharacterCard(character);
      cardContainer.append(card);
    });
  } catch (error) {
    console.log("Error parsing json!", error);
    return null;
  }
}

getCharacters();

//add event listener

nextButton.addEventListener("click", () => {
  if (page < maxPage) {
    page += 1;
    getCharacters();
  }
});

prevButton.addEventListener("click", () => {
  if (page > 1) {
    page -= 1;
    getCharacters();
  }
});
