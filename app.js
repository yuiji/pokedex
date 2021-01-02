const pokedex = document.getElementById('pokedex')
const pokemonsNumber = 899
const colors = {
  fire: '#FBB2B2',
  grass: '#DCFCDC',
  electric: '#f7de60',
  water: '#bae9f0',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#cdbed6',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#FCBBED',
  flying: '#DEF3FD',
  fighting: '#E6E0D4',
  normal: '#FFFFFF',
  ghost: '#9F99AD',
  steel: '#7C8E93',
  ice: '#94C6E3',
  dark: '#909090'

}

const typesDisplay = {
  fire: 1,
  grass: 1,
  electric: 1,
  water: 1,
  ground: 1,
  rock: 1,
  fairy: 1,
  poison: 1,
  bug: 1,
  dragon: 1,
  psychic: 1,
  flying: 1,
  fighting: 1,
  normal: 1,
  ghost: 1,
  steel: 1,
  ice: 1,
  dark: 1

}

const mainTypes = Object.keys(colors)

const fetchPokemons = async () => {
  for (let i = 1; i < pokemonsNumber; i++) {
    await getPokemon(i)
  }
}

const getPokemon = async id => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`
  const result = await fetch(url)
  const pokemon = await result.json()
  PokemonCard(pokemon)

}

function PokemonCard(pokemon) {
  const pokemonEl = document.createElement('div')
  pokemonEl.classList.add('pokemon')


  const pokeTypes = pokemon.types.map(type => type.type.name)
  const typeOne = mainTypes.find(typeOne => pokeTypes.indexOf(typeOne) > -1)
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
  const splitName = name.split('-')[0]

  if (typesDisplay[typeOne] === 0) {
    pokemonEl.style.display = 'none'
  }

  const pokemonInnerHTML = `        
    <div id="poke_container" class="poke-container">
        <div class="img-container">
            <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="${name}" onerror=this.src="images/pokemonImages/${pokemon.id}.png" title="${name}" />
        </div>
        <div class="info">
            <span class="number">#${pokemon.id.toString().padStart(3, '0')}</span>
            <h3 id="${splitName}" class="name">${splitName}</h3> 
            <small id="${typeOne}" class="type type-1">${typeOne}</small>
        </div>
    </div> 
    `
  pokemonEl.innerHTML = pokemonInnerHTML
  pokedex.appendChild(pokemonEl)
  typeColor(pokemon)



}


function typeColor(pokemon) {
  const pokeTypes = pokemon.types.map(type => type.type.name)
  const typeOne = mainTypes.find(typeOne => pokeTypes.indexOf(typeOne) > -1)
  const colorOne = colors[typeOne]

  const bg = document.getElementsByClassName('img-container')
  const number = document.getElementsByClassName('number')
  const typeElOne = document.getElementsByClassName('type-1')


  bg[pokemon.id - 1].style.backgroundColor = colorOne
  number[pokemon.id - 1].style.backgroundColor = colorOne
  typeElOne[pokemon.id - 1].style.backgroundColor = colorOne

}

let pageUp = document.getElementById('page-up')

window.addEventListener("scroll", () => {
  let scroll = this.scrollY

  if (scroll <= 1500) {
    pageUp.style.display = 'none'
  } else if (scroll > 1500) {
    pageUp.style.display = 'block'
  }
})

pageUp.addEventListener('click', () => {
  window.scrollTo(0, 0)
})


function filterType(type) {
  const els = document.getElementsByClassName('type')
  for (let el of els) {
    el.parentElement.parentElement.style.display = ''
    if (el.getAttribute('id') !== type) {
      el.parentElement.parentElement.style.display = 'none'
    }
  }

  for (let typeDisplay in typesDisplay) {
    typesDisplay[typeDisplay] = 1
    if (typeDisplay !== type) {
      typesDisplay[typeDisplay] = 0
    }
  }

}

function removeFilter() {
  const els = document.getElementsByClassName('type')
  for (el of els) {
    el.parentElement.parentElement.style.display = ''
  }

  for (let typeDisplay in typesDisplay) {
    typesDisplay[typeDisplay] = 1
  }
}


const searchForm = document.getElementById('form')

searchForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const searchInput = document.getElementById('search-input')
  const els = document.getElementsByClassName('name')


  for (let typeDisplay in typesDisplay) {
    typesDisplay[typeDisplay] = 0
  }

  for (el of els) {
    el.parentElement.parentElement.style.display = ''
    if (el.getAttribute('id').toLowerCase() !== searchInput.value) {
      el.parentElement.parentElement.style.display = 'none'
    }

    if (searchInput.value === ''){
      el.parentElement.parentElement.style.display = ''
    }
  }
  searchInput.value = ''
  
})



fetchPokemons()