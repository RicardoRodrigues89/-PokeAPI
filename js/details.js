document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  let pokemonIndex = parseInt(urlParams.get("url").split("/").slice(-2, -1)[0]);

  function showPokemonDetails() {
    const pokemonDetailsContainer = document.getElementById("pokemon-details");

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`)
      .then((response) => response.json())
      .then((pokemon) => {
        const formattedNumber = String(pokemon.id).padStart(3, "0");
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`)
          .then((response) => response.json())
          .then((species) => {
            const regionText = species.generation.name
              ? `<p><strong>Geração:</strong> ${species.generation.name}</p>`
              : "";
            const flavorTextEntries = species.flavor_text_entries;
            const description = flavorTextEntries.find(
              (entry) => entry.language.name === "en"
            );

            const descriptionText = description
              ? `<p><strong>Descrição:</strong> ${description.flavor_text}</p>`
              : "";
            const weaknessesPromises = pokemon.types.map((type) => {
              const typeUrl = type.type.url;
              return fetch(typeUrl)
                .then((response) => response.json())
                .then((typeDetails) =>
                  typeDetails.damage_relations.double_damage_from.map(
                    (weakness) => weakness.name
                  )
                )
                .catch((error) => {
                  console.error("Erro ao obter fraquezas:", error);
                  return [];
                });
            });
            Promise.all(weaknessesPromises)
              .then((allWeaknesses) => {
                const uniqueWeaknesses = [...new Set(allWeaknesses.flat())];

                const weaknessesText =
                  uniqueWeaknesses.length > 0
                    ? `<p><strong>Fraquezas:</strong> ${uniqueWeaknesses.join(
                        ", "
                      )}</p>`
                    : "";
                const defaultImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
                let imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`;
                if (pokemon.id > 650) {
                  imageUrl = defaultImageUrl;
                }

                const pokemonDetails = `
                                        <div id="pokemon-image-section" class="animated">
                                            <img src="${imageUrl}" class="img-fluid" alt="${
                  pokemon.name
                }">
                                        </div>
                                        <div class="pokemon-info">
                                            <h5 class="card-title">Detalhes do Pokémon - ${
                                              pokemon.name
                                            }</h5>
                                            <p><strong>Número:</strong> ${formattedNumber}</p>
                                            ${regionText}
                                            ${descriptionText}
                                            <p><strong>Tipo:</strong> ${pokemon.types
                                              .map((type) => type.type.name)
                                              .join(", ")}</p>
                                            <p><strong>Habilidades:</strong> ${pokemon.abilities
                                              .map(
                                                (ability) =>
                                                  ability.ability.name
                                              )
                                              .join(", ")}</p>
                                            <p><strong>Estatísticas:</strong></p>
                                            <ul>
                                                ${pokemon.stats
                                                  .map(
                                                    (stat) =>
                                                      `<li><strong>${stat.stat.name}:</strong> ${stat.base_stat}</li>`
                                                  )
                                                  .join("")}
                                            </ul>
                                            ${weaknessesText}
                                        </div>
                                    `;

                pokemonDetailsContainer.innerHTML = pokemonDetails;
              })
              .catch((error) => {
                console.error("Erro ao obter fraquezas:", error);
              });
          })
          .catch((error) => {
            console.error("Erro ao obter espécie do Pokémon:", error);
          });
      })
      .catch((error) => {
        console.error("Erro ao obter detalhes do Pokémon:", error);
      });
  }

  showPokemonDetails();
  document.getElementById("prevButton").addEventListener("click", function () {
    pokemonIndex = Math.max(pokemonIndex - 1, 1);
    showPokemonDetails();
  });
  document.getElementById("nextButton").addEventListener("click", function () {
    pokemonIndex = Math.min(pokemonIndex + 1, 10063);
    showPokemonDetails();
  });
});
