var upcfood = "021000658831"
var foodNames = "cheese"

var getFoodName = function() {
    // grab food name from url query string
    var queryString = document.location.search;
    var foodName = queryString.split("=")[1];

    if (foodName) {
        // display food name on the page
        foodNameEl.textContent = foodName;

        getFoodNutrition(foodName);
    } else {
        // if no food was given, redirext to homepage
        document.location.replace("./test-page.html");
    }
};

var getFoodNutrition = function() {
    var apiId = "app_id=128267bc"
    var apiKey = "app_key=331d3e04b2f9fcb5074581b87838db5b"
    // format api url
    var apiUrlUpc = "https://api.edamam.com/api/food-database/v2/parser?" + apiId + "&" + apiKey + "&upc=" + upcfood + "&nutrition-type=logging";
    var apiUrlName = "https://api.edamam.com/api/food-database/v2/parser?" + apiId + "&" + apiKey + "&ingr=" + foodNames + "&nutrition-type=logging";
    fetch(apiUrlUpc).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
            });
        };
    });
    fetch(apiUrlName).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
            });
        };
    });
};

// if ingr (keyword search)

// if upc (barcode search)

// display food data
var displayFood = function() {

};


getFoodNutrition();


