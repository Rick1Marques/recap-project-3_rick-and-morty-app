const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
const maxPage = 1;
const page = 1;
const searchQuery = "";

// function card js

function createCharactersCard(character) {}

// API

async function getCharacters() {
  const response = await fetch("https://rickandmortyapi.com/api/character");
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
  console.log(results);
}
