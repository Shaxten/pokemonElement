<template>
  <h1>Découvrer les éléments d'un pokemon!</h1>
  <h2 v-show="pokemonElement1 != ''">{{pokemonElement1}} || {{pokemonElement2}}</h2>
  <div class="imgPokemon" v-show="pokemonElement1 != ''">
    <div>
      <p>Normal</p>
      <img id="img" />
      <div id="test">
      </div>
    </div>
    <div>
      <p>Shiny</p>
      <img id="imgShiny" />      
    </div> 
  </div>

  <div class="pokemonData">
    <label id="namePoke">Nom du pokemon: </label>
    <input id="pokemonName" />
    <button id="buttonPokemon" v-on:click="showPokemon()">Voir éléments</button>    
  </div>

</template>

<script>
import axios from 'axios';

export default {
    data() {
      return {
       pokemonElement1: "",
       pokemonElement2: "",
       pokemonImg: "",
       pokemonShiny: ""
      };
    },
    methods: {
      async showPokemon(){
        let config ={
          headers:{
            'Accept': 'application/json'
          }
        }
        this.pokemonElement1 = '';
        this.pokemonElement2 = '';
        var pok = document.getElementById('pokemonName').value
        var pokemonName = pok.toLowerCase();
        const pokemon = await axios.get('https://pokeapi.co/api/v2/pokemon/' + pokemonName, config);
        this.pokemonElement1 = pokemon.data.types[0].type.name;
        if(pokemon.data.types[1] != null){
          this.pokemonElement2 = pokemon.data.types[1].type.name;
        }
        document.getElementById('img').src = pokemon.data.sprites.front_default;
        document.getElementById('imgShiny').src = pokemon.data.sprites.front_shiny;
      }
    }
  };

  fetch('/src/data.JSON')
    .then((response) => response.json())
    .then((json) => console.log(json));
</script>

