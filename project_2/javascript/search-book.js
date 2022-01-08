var data = []

let server = 'https://elearning-aueb.herokuapp.com'

async function setData(keyword) {
    let categories = await getCategories()
    
    let courses = await getCoursesFromServer(keyword)
    
    // console.log(courses)
    for (let i = 0; i < courses.length; i++) {
        data[i] = courses[i]
        for (let j = 0; j < categories.length; j++) {
            if (courses[i].category == categories[j].id){
                data[i].category = categories[j].title
            }
        }
    }
}

function getKeyword() {
    return document.getElementById("search-bar").value;
}

async function getCoursesFromServer(keyword) {

    try{
        let updated_url = server +'/courses/search?title=' + keyword
        let data = await fetch(updated_url)
        return await data.json()
    }catch (error) {
        console.log(error)
    }
}

async function getCategories() {

    try{

        let data = await fetch(server+"/categories")
        return await data.json()
    }catch (error) {
        console.log(error)
    }
}

function searchResults() {

    console.log(data)
    let length = data.length
    let result = "No courses found!"
    if(data.length !=0)
    {
        result = length + " courses found!"
    }

    let results_from_search = document.getElementById("results-from-search")
    results_from_search.innerHTML = result;

    let template = document.getElementById("courses-template-search").innerHTML
    let compiled_template = Handlebars.compile(template)
    let rendered = compiled_template({data})
    document.getElementById("courses-from-search").innerHTML = rendered;
}

async function loadData(input){
    await setData(input)
    searchResults()  
}

let btnSubmit = document.getElementById("submit-btn")
btnSubmit.onclick = function () {
    let input = getKeyword()
    loadData(input)
    // console.log(data)
}