
    const pokeApi = "https://pokeapi.co/api/v2/pokemon/";

    const pokemonNames = ["roserade", "milotic", "lucario"];

class Pokemon {
    constructor(name, imgUrl){
    //constructor(name, stats, height, types, weight, imgUrl, weaknesses, abilities){
        this.name = name;
        // this.stats = stats;
        // this.height = height;
        // this.types = types;
        // this.weight = weight;
        this.imgUrl = imgUrl;
        // this.weaknesses = weaknesses;
        // this.abilities = abilities;
      } 
    }

class Trainer {
    constructor(pokemonstorage) {
        this.pokemonstorage = [];
    }

    //method
    addPokemon(Pokemon) {
        this.pokemonstorage.push(Pokemon);
    }

    displayAll() {
        for(let i = 0; i < this.pokemonstorage.length; ++i) {
            console.log(this.pokemonstorage[i]);
            }
        }
}   

let MsPotus = new Trainer()
let counter = 0

for(i = 0; i< pokemonNames.length; i++){

    let pokemonName = pokemonNames[i]
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`

    console.log(url)

    $.ajax({
        url: url,
        success: function(data) {
            let poke = new Pokemon(data.name, data.sprites.front_shiny)
            MsPotus.addPokemon(poke)
            console.log(counter)
            counter++

            if(counter === 3){
                MsPotus.displayAll()
                console.log("*****")
                console.log(MsPotus.pokemonstorage)
                loopThroughPokemon(MsPotus.pokemonstorage) 
            }
        },
        error: function(error){
            console.log(error)
        }
    })
}   




function loopThroughPokemon(pokeArray){
    for(i = 0; i < pokeArray.length; i++){
        console.log(pokeArray.length)
        let url = pokeArray[i].imgUrl
        renderPokemon(url)
    }
}

function renderPokemon(url){
    $('#pokemonContainer').prepend(`<img src = "${url}">`) 
}

//Pokemon(data.name,data.stats,data.height,data.types,data.weight,data.imgUrl, data.weaknesses,data.abilities)

