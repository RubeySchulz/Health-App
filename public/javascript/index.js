var food = document.getElementById('food')
var foodForm = document.getElementById('foodForm')



function getFoodNutrition(event) {
    
    event.preventDefault();

    // api information
    var apiId = "app_id=128267bc"
    var apiKey = "app_key=331d3e04b2f9fcb5074581b87838db5b"
    var apiName = "https://api.edamam.com/api/food-database/v2/parser?" + apiId + "&" + apiKey + "&ingr=" + food.value + "&nutrition-type=logging";

    
    main.innerhtml = ""

    // call api
    fetch(apiName).then(function(response) {
        if (response.status !== 200) {
            document.location.status.replace('/404.html')
        } else {
            return response.json();
        }
    })
    .then(function(data) {
        console.log(data);
        // create elements for information wanted
        for (i=0; i < data.length; i++) {
           var foodEl = document.createElement('a')
           var foodInfo = document.createElement('div')
           var foodLabel = document.createElement('h3')
           var calories = document.createElement('h2')
           var protien = document.createElement('h2')
           var fat = document.createElement('h2')
           var carbs = document.createElement('h2')

          foodLabel.innerHTML = hints.data[i].food.label
          calories.innerHTML = hints.data[i].food.nutrients.ENERC_KCAL
          protien.innerHTML = hints.data[i].food.nutrients.PROCNT
          fat.innerHTML = hints.data[i].food.nutrients.FAT
          carbs.innerHTML = hints.data[i].food.nutrients.CHOCDF

          foodInfo.classList.add('info')
          foodEl.classList.add('food-details')

          foodInfo.append(foodLabel, calories, protien, fat, carbs)
          foodEl.append(foodInfo)
          main.appendChild(foodEl)
        }
    })
}

food.addEventListener('keyup', getFoodNutrition)
foodForm.addEventListener("submit", getFoodNutrition)


