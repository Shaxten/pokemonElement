<script setup>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
</script>

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
    <label>Nom du pokemon: </label>
    <input id="pokemonName" />
    <button v-on:click="showPokemon()">Voir éléments</button>    
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
</script>
