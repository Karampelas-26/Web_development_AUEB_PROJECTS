//briskoume se poio arxeio eimaste apo to window.location.href
let text = window.location.href
let words = text.split('/');

//arxikopoihsh public array gia na paroume ta courses kai ta categories me to fetch
var data = []
var categories = []
let server = 'https://elearning-aueb.herokuapp.com'

//auta ta bazoume mesa sto if giati an den einai
//sto index.html den uparxoun ta tag kai xtypaei erorr
//opote etsi xrisimopoioume to search-book.js kai se alla *.html
if (words[words.length - 1] == "index.html") {

    let btnSubmit = document.getElementById("submit-btn")
    btnSubmit.onclick = function () {
        submit()
    }

    let formSearch = document.getElementById("search")
    formSearch.onsubmit = submitSearchWithEnter
    function submitSearchWithEnter(event) {
        event.preventDefault()
        submit()
    }
}

async function setData(keyword) {
    let courses = await getCoursesFromServer(keyword)
    for (let i = 0; i < courses.length; i++) {
        data[i] = courses[i]
        for (let j = 0; j < categories.length; j++) {
            if (courses[i].category == categories[j].id) {
                data[i].category = categories[j].title
            }
        }
    }
}

async function setCategories() {
    let tempCategories = await getCategories()
    for (let i = 0; i < tempCategories.length; i++) {
        categories[i] = tempCategories[i]
    }
}

function returnCategoryFromID(variableID) {
    for(let category of categories) {
        
        if (category.id == variableID){
            return category.title
        }
    }
}

function getKeyword() {
    return document.getElementById("search-bar").value;
}

/**
 * methodos gia na paroume apo to site ta mathimata me to keyword
 * pou grafei o xristis.
 */
async function getCoursesFromServer(keyword ) {
    try {
        let updated_url
        if(words[words.length - 1] == "index.html"){
            updated_url = server + '/courses/search?title=' + keyword
        }
        else{
            updated_url = server + '/courses/search?category=' + keyword
        }
        let data = await fetch(updated_url)
        return await data.json()
    } catch (error) {
        console.log(error)
    }
}

/**
 * methodos pou epistrefei tis katigories twn mathimatwn.
 */
async function getCategories() {
    try {
        let data = await fetch(server + "/categories")
        return await data.json()
    } catch (error) {
        console.log(error)
    }
}

function searchResults() {
    let length = data.length
    let result = "No courses found!"
    if (data.length != 0) {

        // text.search() > 0 giati to search an den brei epistrefei -1
        if (text.search("courses.html") > 0) {
            let id = getCategoryIdFromURL()
            let title = returnCategoryFromID(id)
            console.log(text.search("courses.html"))
            result = "In category " + returnCategoryFromID(getCategoryIdFromURL()) + " "
        }
        else{
            result = ""
        }
        console.log(result)
        result = result + length + " courses found!"
    }
    
    let results_from_search = document.getElementById("results-from-search")
    results_from_search.innerHTML = result

    let template = document.getElementById("courses-template-search").innerHTML
    let compiled_template = Handlebars.compile(template)
    let rendered = compiled_template({data})
    document.getElementById("courses-from-search").innerHTML = rendered;
}

async function loadData(input) {
    await setData(input)
    searchResults()
}

async function loadCategories() {
    await setCategories()
}

function submit() {
    data = []
    let input = getKeyword()
    loadData(input)
}

function hideMenu() {
    let menuArea = document.querySelector("#categories")
    menuArea.innerHTML = ""
    menuArea.classList = "categories-hidden"
}

function showMenu() {
    let template = document.getElementById("categories-template").innerHTML
    let compiled_template = Handlebars.compile(template)
    let rendered = compiled_template({
        categories
    })
    document.getElementById("categories").innerHTML = rendered;
    let menuArea = document.querySelector("#categories")
    menuArea.classList = "categories-vissble"
}

hideMenu()
loadCategories()
let visibleMenu = false;
let btnToggleMenu = document.getElementById("toggle-categories")
btnToggleMenu.onclick = function () {

    if (visibleMenu) {
        hideMenu()
        visibleMenu = false
    } else {
        showMenu()
        visibleMenu = true
    }
}

/**
 * gia to anoigma tou menu
 */
function openMenu() {
    let menu = document.querySelector("#menu-display")
    menu.classList = "display-on"
}

/**
 * gia to kleisimo tou menu
 */
function closeMenu() {
    let menu = document.querySelector("#menu-display")
    menu.classList = "display-off"
}

let menuDisplayBtn = document.getElementById("menu-btn")
menuOnOff = false;
/**
 * onclick methodos pou opote patietai to koumpi menuDisplayBtn
 * analoga se ti katastasi briksetai to menu to anoigei i to kleinei 
 */
menuDisplayBtn.onclick = function () {
    if (menuOnOff) {
        closeMenu()
        menuOnOff = false
    } else {
        openMenu()
        menuOnOff = true
    }
}

/**
 * methodos pou epistrefei tis katigories apo ena url.
 */
function getCategoryIdFromURL() {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const params = Object.fromEntries(urlSearchParams.entries())
    return params.category
}


//megalutero tou mhden giati an einai false to search gurnaei -1 kai mpainei sto if statement
if (text.search("courses.html") > 0) {
    console.log("shouldn't be herre")
    let category = getCategoryIdFromURL()
    loadData(category)

}