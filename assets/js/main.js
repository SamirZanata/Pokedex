const pokemonList = document.getElementById('pokemonsOl');
const loadMoreButton = document.getElementById('loadMoreButton');

let limit = 4;
let offset = 0;

function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then(function (pokemons) {
        const newHtml = pokemons.map(function (pokemon) {
            return `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map(function (type) {
                            return `<li class="type ${type}">${type}</li>`;
                        }).join(" ")}
                    </ol>

                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>`;
        }).join("");

        pokemonList.innerHTML += newHtml;
    });
}

loadPokemonItems(offset, limit);

loadMoreButton.addEventListener('click', function () {
    offset += limit; // Atualiza o offset com base no limite
    loadPokemonItems(offset, limit);
});

const pokeDetail2 = document.getElementById('pokeDetail2');

pokeDetail2.addEventListener('click', function () {
    // Suponha que você tenha o nome do Pokémon que deseja exibir detalhes
    const selectedPokemonName = "pokemon.name"; // Substitua pelo nome do Pokémon desejado

    // Use o nome do Pokémon para buscar seus detalhes
    pokeApi.getPokemons({ name: selectedPokemonName }).then(function (pokemon) {
        const newHtmlDetail = `
            <div class="teste">
                <div class="topArea">
                    <div class="header">
                        <button class="back">
                            <img src="./assets/assets/image/arrow-narrow-left-svgrepo-com.svg" alt="">
                        </button>
                        <img src="./assets/assets/image/heart-svgrepo-com.svg" alt="">
                    </div>
                    <span>${pokemon.name}</span>
                    <ol class="types">
                        ${pokemon.types.map(function (type) {
                            return `<li>${type}</li>`;
                        }).join(" ")}
                    </ol>
                    <div class="pokeImage">
                        <img class="pokemonPhoto" src="${pokemon.photo}" alt="${pokemon.name}">
                    </div>
                </div>
                <div class="bottom">
                    <div class="bottomSpan">
                        <span>MOVES</span>
                    </div>
                    <div class="bottomLeft">
                        <ol class="moveList">
                            <li>HP</li>
                            <li>Attack</li>
                            <li>Defense</li>
                            <li>Sp. Attack</li>
                            <li>Sp. Defense</li>
                            <li>Speed</li>
                            <li>Total Power</li>
                        </ol>
                    </div>
                </div>
            </div>
        `;
        // Corrija a URL de redirecionamento para incluir 'name' como parâmetro
        window.location.href = `poke-details.html?name=${selectedPokemonName}`;
        // Agora você pode usar o HTML gerado (newHtmlDetail) como desejar, por exemplo, adicioná-lo ao DOM.
    });
});
