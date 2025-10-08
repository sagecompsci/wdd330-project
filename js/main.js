import {
    loadHeaderFooter,
    filterName,
    filterType,
    displayCheckbox,
    updatePage,
    displayPageNumbers,
    changeFav,
    changeTheme
} from "./util.mjs";
import PokeData from "./PokeData.mjs";
import PokeList from "./PokeList.mjs";

loadHeaderFooter();

async function initTypes(){
    await displayCheckbox();
    const types = document.querySelectorAll(".types");
    types.forEach((type) => {
        type.addEventListener("change", () => {
            list.filterList(filterName, filterType);
        })
    })
}

async function initPokemon(){
    const url = updatePage();

    const dataSource = new PokeData(url);
    const listElement = document.querySelector(".poke-list")

    const list = new PokeList(dataSource, listElement);
    await list.init();

    const favs = document.querySelectorAll(".fav");
    favs.forEach((fav) => {
        fav.addEventListener("click", () => {
            if (fav.dataset.id === "outline"){
                fav.dataset.id = "filled";
                changeFav(fav.dataset.object, "add");

            }
            else if (fav.dataset.id === "filled"){
                fav.dataset.id = "outline";
                changeFav(fav.dataset.object, "remove");
            }
            fav.src = `images/star_${fav.dataset.id}.png`;
        })
    })

    return list;

}

changeTheme();

initTypes();

displayPageNumbers();

const list = await initPokemon();

const searchBar = document.getElementById("search-bar")
searchBar.addEventListener("keyup", () => {
    list.filterList(filterName, filterType);
})

const showFav = document.getElementById("show-fav")
showFav.addEventListener("change", () => {
    const listElement = document.querySelector(".poke-list");
    listElement.innerHTML = "";

    if (showFav.checked){
        const storage = JSON.parse(localStorage.getItem("fav")) || [];
        console.log(storage);
        const dataSource = storage.map(item => JSON.parse(decodeURIComponent(item)));

        const list = new PokeList(dataSource, listElement, false);
        list.init();




    } else(
        initPokemon()
    )
})

const darkMode = document.getElementById("dark-mode");
darkMode.addEventListener("change", ()=>{
    if (darkMode.checked){
        localStorage.setItem("theme", "dark");
    }else {
        localStorage.setItem("theme", "light")
    }
    changeTheme()
})

const pages = document.querySelectorAll(".page-number");
pages.forEach((number) => {
    number.addEventListener("click", () => {
        localStorage.setItem("page", `${number.dataset.id}`);
        initPokemon();
    })
})

