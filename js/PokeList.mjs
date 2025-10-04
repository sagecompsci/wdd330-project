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

    return `<li>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" loading="lazy">
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
    }

    async init(){
        const data = await this.dataSource.getData();
        // console.log(data);
        const list = await this.dataSource.getDetails(data.results);
        console.log(list);
        renderListWithTemplate(cardTemplate, this.listElement, list);
    }


}