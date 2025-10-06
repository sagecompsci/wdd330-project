export async function loadTemplate(path){
    const response = await fetch(path);
    return await response.text();
}

export async function loadHeaderFooter() {
    const headerTemplate = await loadTemplate("/wdd330-project/partials/header.html");
    const footerTemplate = await loadTemplate("/wdd330-project/partials/footer.html");

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