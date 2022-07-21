var foodImg = document.querySelector('#label');
var foodCalories = document.querySelector('#ENERC_KCAL');
var foodProtien = document.querySelector('#PROCNT');
var foodFat = document.querySelector('#FAT');
var foodCarbs = document.querySelector('CHOCDF');
var foodName = document.querySelector('#label')

var getFoodId = function() {
    var queryString = document.location.search
    var foodId = queryString.split('=');

    var apiId = "app_id=128267bc"
    var apiKey = "app_key=331d3e04b2f9fcb5074581b87838db5b"
    var foodUrl = "https://api.edamam.com/api/food-database/v2/parser?" + apiId + "&" + apiKey + "&ingr=" + food.value + "&nutrition-type=logging";

    if(foodId) {
        fetch(foodUrl).then(function(response) {
            if(response.ok){
                response.json().then(function(data){
                    displayFoodInfo(data);
                    console.log(data);
                })
            }
        });
    }
};

var displayFoodInfo = function(food) {
    foodImg.setAttribute('src', food.image.medium)
    foodName.textContent = food.label;
    foodCalories.textContent = food.ENERC_KCAL;
    foodProtien.textContent = food;
    foodFat.textContent = food;
    foodCarbs.textContent = food;
}

getFoodId();