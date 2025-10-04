import {loadHeaderFooter} from "./util.mjs";
import PokeData from "./PokeData.mjs";
import PokeList from "./PokeList.mjs";

//loadHeaderFooter();

const dataSource = new PokeData();
const listElement = document.querySelector(".poke-list")

const list = new PokeList(dataSource, listElement);
list.init();


// console.log(dataSource.getData());