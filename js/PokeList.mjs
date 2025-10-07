import {renderListWithTemplate} from "./util.mjs";

function getTypes(pokemon){
    const types = [];
     pokemon.types.forEach((type) => {
        types.push(`<span class="${type.type.name}, type">${type.type.name}</span>`)
    })
    return types;
}

function getStats(pokemon){
    const stats = [];
    pokemon.stats.forEach((stat) => {
        stats.push(`<li>${stat.stat.name}: ${stat.base_stat}</li>`)
    })
    return stats;
}

function cardTemplate(pokemon){
    const types = getTypes(pokemon);
    const stats = getStats(pokemon);

    return `<li class="card">
    <div class="img-wrapper"><div class="img-card">
        <div class="front"><img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" loading="lazy"></div>
        <div class="back"><img src="${pokemon.sprites.back_default}" alt="${pokemon.name}" loading="lazy"></div>
    </div></div>
    <h3>${pokemon.name.toLocaleUpperCase()}</h3>
    <p>${types.join("  ")}</p>
    <ul>${stats.join("")}</ul>
    </li>
    `
}

export default class PokeList{
    constructor(dataSource, listElement) {
        this.dataSource = dataSource
        this.listElement = listElement;
        this.list = [];
        this.filtered = [];
    }

    async init(){
        const data = await this.dataSource.getData();
        // console.log(data);
        this.list = await this.dataSource.getDetails(data.results);
        console.log(this.list);
        this.displayList(this.list);
    }

    displayList(list){
        renderListWithTemplate(cardTemplate, this.listElement, list);
    }

    filterList(callback1, callback2){
        this.listElement.innerHTML = "";
        this.filtered = callback1(callback2(this.list));
        this.displayList(this.filtered)
    }

}