function fetchSpeciesPokemonData(pokeData) {
    let url = pokeData.species.url;
    fetch(url).then(response => response.json()).then(function (pokeData) {
        showImgAndHeader(pokeData);
    });
}

function onSeeMoreButton(pokeData, seeMoreButton) {
    seeMoreButton.addEventListener('click', () => {

        let body = document.querySelector('body');
        let nextPrevButtons = document.querySelector('.next-prev');
        body.removeChild(nextPrevButtons);

        let container = document.querySelector('#container');
        container.classList.remove('ui', 'five', 'stackable', 'special', 'cards');
        container.innerHTML = "";

        let secondContainer = document.createElement('div');
        secondContainer.setAttribute("id", "second-container");
        body.appendChild(secondContainer);

        renderTable(pokeData, secondContainer);
        renderBackButton(body);
        fetchSpeciesPokemonData(pokeData);
    });
}

function renderBackButton(parent) {
    h3 = document.createElement('h3');
    h3.classList.add('ui', 'center', 'aligned', 'header', 'back-button');
    h3.innerHTML = `<button type="button" class="btn btn-outline-secondary next">BACK</button>`;
    parent.appendChild(h3);
    back = document.querySelector('.back-button');
    back.addEventListener('click', () => returnHomePageButton());
}

function showImgAndHeader(pokeData) {
    console.log(pokeData);
    let container = document.querySelector('#container');
    let description = pokeData.flavor_text_entries[0].flavor_text;
    container.innerHTML = `<img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${generateImgId(pokeData)}.png" class="details-img">
    <h1 class="name-header">${pokeData.name}</h1>
    <br
    ><p>${description}</p>
    `;
}

function renderTable(pokeData, container) {
    let table = document.createElement('table');
    table.classList.add('ui', 'inverted', 'grey', 'table');
    table.innerHTML = `
    <thead>
    <tr>
    <th>ABILITIES</th>
    <th>TYPES</th>
    <th>WEIGHT<th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td>${(pokeData.abilities[0] == undefined) ? "-" : pokeData.abilities[0].ability.name}</td>
    <td>${(pokeData.types[0] == undefined) ? "-" : pokeData.types[0].type.name}</td>
    <td>${(pokeData.weight == undefined) ? "-" : pokeData.weight}</td>
    </tr>
    <tr>
    <td>${(pokeData.abilities[1] == undefined) ? "-" : pokeData.abilities[1].ability.name}</td>
    <td>${(pokeData.types[1] == undefined) ? "-" : pokeData.types[1].type.name}</td>
    <td><td>
    </tr>
    <tr>
    <td>${(pokeData.abilities[2] == undefined) ? "-" : pokeData.abilities[2].ability.name}</td>
    <td>${(pokeData.types[2] == undefined) ? "-" : pokeData.types[2].type.name}</td>
    <td><td>
    </tr>
    </tbody>`;
    container.appendChild(table);
}



function returnHomePageButton() {
    back.removeEventListener('click', returnHomePageButton);
    console.log('wywolane');

    back = document.querySelector('.back-button');

    let body = document.querySelector('body');
    let container = document.querySelector('#container');
    container.innerHTML = "";
    container.classList.add('ui', 'five', 'stackable', 'special', 'cards');
    container.innerHTML = "";
    let secondContainer = document.querySelector('#second-container');
    body.removeChild(secondContainer);

    h3 = document.querySelector('h3');
    h3.classList.add('next-prev');
    h3.innerHTML = ` <button type="button" class="btn btn-outline-secondary previous hidden">prev</button>
    <button type="button" class="btn btn-outline-secondary next">next</button>`;
    body.appendChild(h3);
    back = document.querySelector('.back-button');

    fetchData(firstPage);

    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.previous');

    nextButton.addEventListener('click', () => fetchData(nextPage));
    prevButton.addEventListener('click', () => fetchData(prevPage));
}

