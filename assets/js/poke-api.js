
const pokeApi = {}
function convertPokeApiDetailToPokemon (pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.order
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map(
        function(typeSlot){
            return typeSlot.type.name
        }
    )
    const [type] = types
    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = function (pokemon){
    return fetch(pokemon.url).then(function(response){
        return response.json()
    })
    .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = function () {

    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url) //Fazendo a requisição para a API
        .then(function (response) {
            return response.json()//Pegando a aresposta e retornando um Json para usar no JS
        })
        .then(function (jsonBody) {
            return jsonBody.results //Solicitando retorno somente do results do arquivo Json.
        })
       .then(function(pokemons) {
            return pokemons.map(pokeApi.getPokemonDetail) //Fazendo uma lista de todos os itens do result  
        })
          
        .then(function(detailRequests){
            return Promise.all(detailRequests)
        })

        .then(function(pokemonsDetails){
            return pokemonsDetails
        })
    }
    console.log(pokemonsDetails)
