
export default class PokeData{
    constructor(url) {
        this.url = url;
    }

    async getData(){
        const response = await fetch(this.url);
        const data = await response.json();
        console.log(data);
        return data;
    }

    async getDetails(data){
        let list = []
        for (const pokemon of data){
            const response = await this.getPokemon(pokemon);
            list.push(response);
        }
        return list;
    }

    async getPokemon(pokemon){
        const data = await fetch(pokemon.url)
        return await data.json();


    }
}