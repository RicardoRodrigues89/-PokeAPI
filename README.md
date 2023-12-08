# -PokeAPI
Trabalho
Desenvolvimento de Interface Frontend com PokeAPI



<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
  <style>
    /* Adicione estilos personalizados aqui */
  </style>
  <title>Pokédex</title>
</head>
<body>

  <div class="container mt-5">
    <h1 class="mb-4">Pokédex</h1>
    <input type="text" id="searchInput" class="form-control mb-3" placeholder="Pesquisar por nome">
    <div id="pokemonList" class="row"></div>
    <button id="loadMoreBtn" class="btn btn-primary mt-3">Carregar Mais</button>
  </div>

  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

  <script>
    let offset = 0;
    const limit = 20; // Pode ajustar o número conforme necessário
    const pokemonList = document.getElementById('pokemonList');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const searchInput = document.getElementById('searchInput');

    function loadPokemons() {
      fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
        .then(response => response.json())
        .then(data => {
          data.results.forEach(pokemon => {
            fetch(pokemon.url)
              .then(response => response.json())
              .then(pokemonData => {
                const pokemonCard = document.createElement('div');
                pokemonCard.classList.add('col-md-4', 'mb-4');
                pokemonCard.innerHTML = `
                  <div class="card">
                    <img src="${pokemonData.sprites.front_default}" class="card-img-top" alt="${pokemon.name}">
                    <div class="card-body">
                      <h5 class="card-title">${pokemonData.name}</h5>
                      <p class="card-text">Tipo: ${pokemonData.types.map(type => type.type.name).join(', ')}</p>
                      <a href="pokemon-details.html?name=${pokemonData.name}" class="btn btn-primary">Detalhes</a>
                    </div>
                  </div>
                `;
                pokemonList.appendChild(pokemonCard);
              })
              .catch(error => console.error('Erro ao obter dados do Pokémon:', error));
          });
          offset += limit;
        })
        .catch(error => console.error('Erro ao obter lista de Pokémon:', error));
    }

    function searchPokemons() {
      const searchTerm = searchInput.value.toLowerCase();
      // Limpar a lista antes de exibir os resultados da pesquisa
      pokemonList.innerHTML = '';
      fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`)
        .then(response => response.json())
        .then(pokemonData => {
          const pokemonCard = document.createElement('div');
          pokemonCard.classList.add('col-md-4', 'mb-4');
          pokemonCard.innerHTML = `
            <div class="card">
              <img src="${pokemonData.sprites.front_default}" class="card-img-top" alt="${pokemonData.name}">
              <div class="card-body">
                <h5 class="card-title">${pokemonData.name}</h5>
                <p class="card-text">Tipo: ${pokemonData.types.map(type => type.type.name).join(', ')


