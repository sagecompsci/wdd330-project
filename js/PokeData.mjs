const url = "https://pokeapi.co/api/v2/pokemon"

export default class PokeData{
    async getData(){
        const response = await fetch(url);
        return await response.json();
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