// const loadMeal = (searchText) => {
//     const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
//     fetch(URL)
//         .then(res => res.json())
//         .then(data => displayMeals(data.meals))
//     .catch(err => console.log(err))
// }

const loadMealasync = async (searchText) => {
    try {
        const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
        const res = await fetch(URL);
        const data = await res.json()
        displayMeals(data.meals)
    } catch (error) {
        console.log(error)
    }
}

const displayMeals = meals => {
    //step 1 : container element
    const mealsContainer = document.getElementById('mealsContainer')
    mealsContainer.innerHTML = ''
    meals.forEach(meal => {
        console.log(meal)
        // data distruction
        let { strMeal, strArea, strMealThumb, strCategory, strYoutube, idMeal } = meal

        // step 2: create child for each element
        const mealDiv = document.createElement('div')
        mealDiv.classList.add('col')

        // step 3 set content of the child
        mealDiv.innerHTML = `
            <div class="card overflow-y-hidden">
                <img src="${strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${strMeal}</h5>
                    <h6>Category: ${strCategory}</h6>
                    <h6 class="card-text">Country: ${strArea}</h6>
                    <p>Lear more on link: <span>${strYoutube}</span></p>

                    <button onclick='loadMealDetailsAsync(${idMeal})' type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mealDetailModal">Details</button>   
                </div>
            </div>
        `
        // step 4 append child
        mealsContainer.appendChild(mealDiv)

    });
}

// const loadMealDetails = mealDetails => {
//     const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealDetails}`
//     fetch(URL).then(res => res.json()).then(data => displayMealsDetails(data.meals[0]))
// }

const loadMealDetailsAsync = async (meals) => {
    try {
        const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meals}`
        const res = await fetch(URL);
        const data = await res.json();
        displayMealsDetails(data.meals[0])
    } catch (error) {
        console.log(error + 'Uhho')
    }
}

const displayMealsDetails = (meals) => {
    console.log(meals)
    const { strMeal, strArea, strCategory, strInstructions, strMealThumb } = meals
    document.getElementById('mealDetailModalLabel').innerText = strMeal
    document.getElementById('modalBody').innerHTML = `
        <div class="row">
            <div class="col-12 col-md-4">
                <img class="img-fluid img-thumbnail " src='${strMealThumb}' style="">
            </div>
            <div class="col-12 col-md-8">
                <h3>Food Origin: ${strArea}</h3>
                <h4>Food Type : ${strCategory}</h4>
                <p>${strInstructions}</p>
            </div>
        </div>
    `
}
const inputField = document.getElementById('inputField').addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        searchMeals()
    }

})

const searchMeals = () => {
    const inputField = document.getElementById('inputField')
    const inputValue = inputField.value
    loadMealasync(inputValue)
    inputField.value = ''
}

loadMealasync('Arrabiata')