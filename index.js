const firstPage = "https://pokeapi.co/api/v2/pokemon/?limit=20";
let nextPage = "";
let prevPage = "";

function renderButtons(pokemon) {
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.previous');
    const prevPageManager = (response) => {
        if (response.data.previous === null) {
            prevButton.classList.add('hidden');
        } else {
            prevButton.classList.remove('hidden');
        }
    };
    const nextPageManager = (response) => {
        if (response.data.next === null) {
            nextButton.classList.add('hidden');
        } else {
            nextButton.classList.remove('hidden');
        }
    };
    nextPage = pokemon.data.next;
    prevPage = pokemon.data.previous;
    nextPageManager(pokemon);
    prevPageManager(pokemon);
}

function fetchData(url) {
    let container = document.querySelector('#container');
    container.innerHTML = "";
    axios.get(url)
        .then(function (allPokemon) {
            allPokemon.data.results.forEach(function (pokemon) {
                fetchEveryPokemonData(pokemon);
            });
            return allPokemon;
        }).then(function (allPokemon) {
            renderButtons(allPokemon);
        });
}

function renderPokemonCards(pokeData) {
    let container = document.querySelector('#container');
    let pokeCard = document.createElement('div');
    pokeCard.classList.add('card');
    container.appendChild(pokeCard);

    let pokeNameDiv = document.createElement('div');
    pokeNameDiv.classList.add('content');
    pokeCard.appendChild(pokeNameDiv);

    let pokeName = document.createElement('a');
    pokeName.classList.add('header');
    pokeName.innerHTML = `${pokeData.name}`;
    pokeNameDiv.appendChild(pokeName);
    return pokeCard;
}

function renderLearnMoreButton(pokeCard) {
    let seeMoreButton = document.createElement('div');
    seeMoreButton.classList.add('ui', 'bottom', 'attached', 'button');
    seeMoreButton.innerHTML = "Learn more";
    pokeCard.appendChild(seeMoreButton);
    return seeMoreButton;
}

function generateImgId(pokeData) {
    let i = "";
    if (pokeData.id < 10 && pokeData.id < 100) {
        i = "00";
    } else if (pokeData.id >= 10 && pokeData.id < 100) {
        i = "0";
    }
    return `${i}${pokeData.id}`;
}

function renderImg(pokeCard, pokeData) {
    let imgDiv = document.createElement('div');
    imgDiv.classList.add('image');
    pokeCard.appendChild(imgDiv);
    let img = document.createElement('img');
    img.srcset = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${generateImgId(pokeData)}.png`;
    imgDiv.appendChild(img);
    return img.srcset;
}

function fetchEveryPokemonData(pokemon) {
    let url = pokemon.url;
    fetch(url).then(response => response.json())
        .then(function (pokeData) {
            console.log(pokeData);
            let pokeCard = renderPokemonCards(pokemon);
            renderImg(pokeCard, pokeData);
            let seeMoreButton = renderLearnMoreButton(pokeCard);
            onSeeMoreButton(pokeData, seeMoreButton);
            return pokeData;
        });
}


fetchData(firstPage);
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.previous');
nextButton.addEventListener('click', () => fetchData(nextPage));
prevButton.addEventListener('click', () => fetchData(prevPage));
