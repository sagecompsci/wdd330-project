export async function loadTemplate(path){
    const response = await fetch(path);
    return await response.text();
}

export async function loadHeaderFooter() {
    const headerTemplate = await loadTemplate("../partials/header.html");
    const footerTemplate = await loadTemplate("../partials/footer.html");

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