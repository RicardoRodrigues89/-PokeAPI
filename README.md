# -PokeAPI
Trabalho
Desenvolvimento de Interface Frontend com PokeAPI



              .join(', ')}</p>
                <a href="pokemon-details.html?name=${pokemonData.name}" class="btn btn-primary">Detalhes</a>
              </div>
            </div>
          `;
          pokemonList.appendChild(pokemonCard);
        })
        .catch(error => {
          // Se não encontrar um Pokémon com o termo de pesquisa
          console.error('Pokémon não encontrado:', error);
          pokemonList.innerHTML = '<p>Nenhum Pokémon encontrado com esse nome.</p>';
        });
    }

    loadMoreBtn.addEventListener('click', loadPokemons);
    searchInput.addEventListener('input', searchPokemons);
    
    // Carregar Pokémon inicialmente
    loadPokemons();
  </script>

</body>
</html>

