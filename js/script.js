document.addEventListener("DOMContentLoaded", function () {
  const pokemonList = document.getElementById("pokemon-list");
  let offset = 0;
  const limit = 20;

  async function loadPokemon() {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    );
    const data = await response.json();
    const pokemonData = data.results;
    pokemonData.sort((a, b) => {
      const numberA = parseInt(a.url.split("/")[6]);
      const numberB = parseInt(b.url.split("/")[6]);
      return numberA - numberB;
    });

    for (const pokemon of pokemonData) {
      const card = document.createElement("div");
      card.className = "col-md-3 mb-4 card-background";

      const pokemonNumber = pokemon.url.split("/")[6];
      const formattedNumber = String(pokemonNumber).padStart(3, "0");
      const pokemonType = await fetch(pokemon.url)
        .then((response) => response.json())
        .then((pokemon) => pokemon.types[0].type.name);

      card.innerHTML = `
          <div class="card ${pokemonType}">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonNumber}.png" class="card-img-top" alt="${pokemon.name}">
            <div class="card-body">
              <h5 class="card-title">#${formattedNumber} - ${pokemon.name}</h5>
              <a href="pokemon-details.html?url=${pokemon.url}" class="btn btn-primary openPokedexButton" data-url="${pokemon.url}">Abrir Pokedex</a>
            </div>
          </div>
        `;

      pokemonList.appendChild(card);
    }

    offset += limit;
  }

  loadPokemon();

  document
    .getElementById("loadMoreButton")
    .addEventListener("click", loadPokemon);

  window.addEventListener("scroll", function () {
    toggleScrollTopButton();
  });
});

function toggleScrollTopButton() {
  const scrollTopButton = document.getElementById("scrollTopButton");
  const scrollPosition = window.scrollY;

  if (scrollPosition > 300) {
    scrollTopButton.style.display = "block";
  } else {
    scrollTopButton.style.display = "none";
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function searchPokemon() {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const notFoundMessage = document.getElementById("notFoundMessage");
  const pokemonList = document.getElementById("pokemon-list");

  notFoundMessage.style.display = "none";

  pokemonList.innerHTML = "";
  fetch(`https://pokeapi.co/api/v2/pokemon/${searchInput}`)
    .then((response) => {
      if (!response.ok) {
        notFoundMessage.style.display = "block";
        throw new Error("Pokémon não encontrado");
      }
      return response.json();
    })
    .then((pokemon) => {
      const card = createPokemonCard(pokemon, true);
      pokemonList.insertBefore(card, pokemonList.firstChild);
    })
    .catch((error) => {
      console.error("Erro ao pesquisar Pokémon:", error);
    });
}

function createPokemonCard(pokemon, includeButton) {
  const card = document.createElement("div");
  card.className = "col-md-3 mb-4 card-background";

  const formattedNumber = String(pokemon.id).padStart(3, "0");
  const pokemonType = pokemon.types[0].type.name;

  card.innerHTML = `
      <div class="card ${pokemonType}">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          pokemon.id
        }.png" class="card-img-top" alt="${pokemon.name}">
        <div class="card-body">
          <h5 class="card-title">#${formattedNumber} - ${pokemon.name}</h5>
          ${
            includeButton
              ? `<button class="btn btn-primary openPokedexButton" data-url="https://pokeapi.co/api/v2/pokemon/${pokemon.id}/">Abrir Pokédex</button>`
              : ""
          }
        </div>
      </div>
    `;
  if (includeButton) {
    const openPokedexButton = card.querySelector(".openPokedexButton");
    openPokedexButton.addEventListener("click", function () {
      window.location.href = `pokemon-details.html?url=${encodeURIComponent(
        openPokedexButton.dataset.url
      )}`;
    });
  }

  return card;
}
