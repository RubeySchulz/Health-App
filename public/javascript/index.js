var food = document.getElementById('food')
var foodForm = document.getElementById('foodForm')



function getFoodNutrition(event) {
    
    event.preventDefault();

    // api information
    var apiId = "app_id=128267bc"
    var apiKey = "app_key=331d3e04b2f9fcb5074581b87838db5b"
    var apiName = "https://api.edamam.com/api/food-database/v2/parser?" + apiId + "&" + apiKey + "&ingr=" + food.value + "&nutrition-type=logging";

    var foodUrl = apiName 
    main.innerhtml = ""

    // call api
    fetch(foodUrl).then(function(response) {
        if (response.status !== 200) {
            document.location.status.replace('/404.html')
        } else {
            return response.json();
        }
        console.log(response);
    })
    .then(function(data) {
        console.log(data);
        // create elements for information wanted
        for (i=0; i < data.length; i++) {
            var foodEl = document.createElement('a')
            var foodImg = document.createElement('img')
            var foodCalories = document.createElement('div')
            var foodName = document.createElement('h3')
            var foodProtien = document.createElement('h2')
            var foodFat = document.createElement('h2')
            var foodCarbs = document.createAttribute('h2')

            var foodId = data[i].food.externals.food
            showEl.setAttribute("href", "./foodDetails") + foodId;

            foodImg.src = data[i].food.image.medium
            foodName.innerhtml = data[i].food.label
            foodCalories.innerHTML = data[i].food.ENERC_KCAL
            foodProtien.innerHTML = data[i].food.PROCNT
            foodFat.innerHTML = data[i].food.FAT
            foodCarbs.innerHTML = data[i].food.CHOCDF

            foodImg.classList.add('img')
            foodCalories.classList.add('calories')
            foodEl.classList.add('food')

            foodCalories.append(foodName, foodCalories)
            foodEl.append(foodImg, foodCalories)
            main.appendChild(foodEl)
        }
    })
}

food.addEventListener('keyup', getFoodNutrition)
foodForm.addEventListener("submit", getFoodNutrition)


