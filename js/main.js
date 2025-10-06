import {loadHeaderFooter, filterName, filterType, displayCheckbox} from "./util.mjs";
import PokeData from "./PokeData.mjs";
import PokeList from "./PokeList.mjs";

loadHeaderFooter();

async function init(){
    await displayCheckbox();
    const types = document.querySelectorAll(".types");
    types.forEach((type) => {
        type.addEventListener("change", () => {
            list.filterList(filterName, filterType);
        })
    })
}

init();

const dataSource = new PokeData();
const listElement = document.querySelector(".poke-list")

const list = new PokeList(dataSource, listElement);
list.init();


const searchBar = document.getElementById("search-bar")
searchBar.addEventListener("keyup", () => {
    list.filterList(filterName, filterType);
})




