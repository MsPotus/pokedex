
    const POKEAPI = "https://pokeapi.co/api/v2/pokemon/";

    const POKEMON_NAMES = ["roserade", "milotic", "lucario"];

class Pokemon {
    constructor(name, hp, attack, defense, imgUrl, abilitiesList){
        this.name = name;
        this.hp = hp;
        this.attack = attack;
        this.defense = defense;
        this.imgUrl = imgUrl;
        this.abilitiesList = abilitiesList;
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
        for(let i = 0; i < this.pokemonstorage.length; i++) {
            console.log(this.pokemonstorage[i]);
            }
        }
}   

let msPotus = new Trainer()
let counter = 0

for(let i = 0; i < POKEMON_NAMES.length; i++){

    // set url for ajax call
    let pokemonName = POKEMON_NAMES[i]
    let url = `${POKEAPI}${pokemonName}`

    console.log(url)

    $.ajax({
        url: url,
        success: function(data) {
            let name = data.name
            let hp = data.stats[5].base_stat
            let attack = data.stats[4].base_stat
            let defense = data.stats[3].base_stat
            let imgUrl = data.sprites.front_shiny 
            let abilities = data.abilities 
            let abilitiesList = [abilities[0].ability.name, abilities[1].ability.name, abilities[2].ability.name]    
            let poke = new Pokemon(name, hp, attack, defense, imgUrl, abilitiesList)
            msPotus.addPokemon(poke)
            // console.log(counter)
            counter++

            if(counter === 3){
                msPotus.displayAll()
                // console.log(msPotus.pokemonstorage)
                loopThroughPokemon(msPotus.pokemonstorage)
            }
        },
        error: function(error){
            console.log(error)
        }
    })
}   


function loopThroughPokemon(pokeArray){
    for(let i = 0; i < pokeArray.length; i++){
        // console.log(pokeArray.length)
        let name = pokeArray[i].name
        let imgUrl = pokeArray[i].imgUrl
        let attack = pokeArray[i].attack
        let defense = pokeArray[i].defense
        let hp = pokeArray[i].hp
        let abilitiesList = pokeArray[i].abilitiesList
        let abilities = abilitiesList.join(", ")
       
        renderPokemon(name, imgUrl, attack, defense, hp, abilities, i)

    }
}


function renderPokemon(name, imgUrl, attack, defense, hp, abilities, i){
    $('#img-holder-'+i).prepend(`<img src="${imgUrl}">`)
    $('#name-'+i).prepend(`<h3>${name}</h3>`)
    $('#defense-'+i).prepend(`<p>${defense}</p>`)
    $('#attack-'+i).prepend(`<p>${attack}</p>`)
    $('#hp-'+i).prepend(`<p>${hp}</p>`)
    $('#abilities-'+i).prepend(`<p>Abilities: ${abilities}</p>`)
}

$(document).ready(function(){
    $('ul.tabs').tabs();
});









