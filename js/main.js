import {loadHeaderFooter, search, filterType} from "./util.mjs";
import PokeData from "./PokeData.mjs";
import PokeList from "./PokeList.mjs";

loadHeaderFooter();

const dataSource = new PokeData();
const listElement = document.querySelector(".poke-list")

const list = new PokeList(dataSource, listElement);
list.init();


const searchBar = document.getElementById("search-bar")
searchBar.addEventListener("keyup", () => {
    list.filterList(search, filterType);
})

const type = document.getElementById("grass");
type.addEventListener("change", () => {
    list.filterList(search, filterType);
})
