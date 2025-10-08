export async function loadTemplate(path){
    const response = await fetch(path);
    return await response.text();
}

export async function loadHeaderFooter() {
    //local host and github require different urls, I'm commenting them out so I can easily switch between them
    const headerTemplate = await loadTemplate("/wdd330-project/partials/header.html");
    const footerTemplate = await loadTemplate("/wdd330-project/partials/footer.html");
    // const headerTemplate = await loadTemplate("/partials/header.html");
    // const footerTemplate = await loadTemplate("/partials/footer.html");

    document.getElementById("header").innerHTML = headerTemplate;
    document.getElementById("footer").innerHTML = footerTemplate;

}

export function renderListWithTemplate(template, parentElement, list, position="afterbegin", clear=false){
    const htmlStrings = list.map(template);
    if (clear){
        parentElement.innerHtml= "";
    }
    parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function filterName(list){
    const input = document.getElementById("search-bar").value.toLocaleLowerCase();
    if (!input){
        return list;
    }
    const newList = list.filter((pokemon) => pokemon.name.includes(input))
    console.log(newList)
    return newList;
}

export function filterType(list){
    const buttons = document.querySelectorAll("input[type=checkbox]");
    let inputs = [];
    buttons.forEach((button) => {
        if (button.checked){
            inputs.push(button.value);
        }
    })
    if ( 0 <= inputs.length >= 3){
        return list;
    }
    let newList = list;

    inputs.forEach((input) => {
        newList = newList.filter((pokemon) => {
            if (pokemon.types[0].type.name !== input){
                if (pokemon.types[1]){
                    return pokemon.types[1].type.name === input;
                }
            }
            return pokemon.types[0].type.name === input;
        });
    })

    console.log(newList);
    return newList
}

function checkboxTemplate(type){
    return `<li>
    <label><input type="checkbox" name="types" value="${type.name}" class="types" id="${type.name}">${type.name.toLocaleUpperCase()}</label>
    </li>`

}

export async function displayCheckbox(){
    const results = await fetch("https://pokeapi.co/api/v2/type/")
    const data = await results.json();
    const types = data.results;

    const element = document.getElementById("types-list")

    renderListWithTemplate(checkboxTemplate, element, types);

}

export function displayPageNumbers(){
    const pages = document.getElementById("pages");
    for (let i = 0; i < 5; i++){
        const li = document.createElement("li");
        li.classList.add("page-number");
        li.dataset.id = `${i}`;
        li.textContent = `${i + 1}`;
        pages.appendChild(li);
    }
    if (!localStorage.getItem("page")){
        localStorage.setItem("page", "0");
    }
}

function removeClass(className){
    const element = document.querySelector(`.${className}`);
    if (element){
        element.classList.remove(`${className}`);
    }
}

export function updatePage(){
    document.querySelector(".poke-list").innerHTML = ``;
    const pages = document.querySelectorAll(".page-number");
    removeClass("active-page");
    const id = localStorage.getItem("page");
    pages.forEach((number) => {
        if (number.dataset.id === id){
            number.classList.add("active-page");
        }
    })
    return `https://pokeapi.co/api/v2/pokemon?offset=${20 * id}&limit=20`


}

export function changeFav(item, operation){
    let fav = JSON.parse(localStorage.getItem("fav")) || [];
    if (operation === "add"){
        // console.log(fav);
        // console.log(item);
        fav.push(item);
    }
    if (operation === "remove"){
        fav = fav.filter((pokemon) => pokemon !== item)
    }

    localStorage.setItem("fav", JSON.stringify(fav));
}

export function changeTheme(){
    const theme = localStorage.getItem("theme");
    const darkMode = document.getElementById("dark-mode");
    if (theme === "dark"){
        document.body.classList.add("dark-mode");
        darkMode.checked = true;

    }else{
        document.body.classList.remove("dark-mode");
    }
}