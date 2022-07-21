// Tracks if we need a new day in the database or not
let newDay = true;
let yourDate = new Date()
yourDate = yourDate.toISOString().split('T')[0]

// Grabs currently logged in user_id from a data attribute loaded on the page.
const user_id = document.querySelector('#name').getAttribute('userid');
let currentDayStats;
let autoFoodStats;

// Runs on page load, runs a get request to figure out if the servers have a day matching today.
async function findCurrentDay(){
    const current = await fetch(`/api/users/${user_id}`, {
        method: 'GET'
    })
    .then(db => db.json())
    .then(response => {
        const time = response.days[response.days.length - 1].created_at.split('T')[0];
        // If the current date matches last recorded date, assign currentDayStats, and set newDay to false.
        if(time === yourDate){
            newDay = false;
            const day = response.days[response.days.length - 1]
            currentDayStats = day;
        }
    })
}

// Function to get food info from automatic form
async function getFoodNutrition(event) {
    const food = document.querySelector('#foodName').value;
    console.log(food);
    event.preventDefault();

    // api information
    const apiId = "app_id=128267bc"
    const apiKey = "app_key=331d3e04b2f9fcb5074581b87838db5b"
    const apiName = "https://api.edamam.com/api/food-database/v2/parser?" + apiId + "&" + apiKey + "&ingr=" + food + "&nutrition-type=logging";

    // call api
    await fetch(apiName, {
        method: 'GET'
    })
    .then(db => db.json())
    .then( response => {
        autoFoodStats = response.hints[0].food;
    })
    console.log(autoFoodStats);

    // if the current date does not match the last recorded day, create a new one.
    let calories_consumed = autoFoodStats.nutrients.ENERC_KCAL;
    let calories_burned = 0;
    let carbs = autoFoodStats.nutrients.CHOCDF;
    let fats = autoFoodStats.nutrients.FAT;
    let proteins = autoFoodStats.nutrients.PROCNT;
    let sodium = 0;
    let cholesterol = 0;

    if(newDay === true){
        const POSTday = await fetch('api/days', {
            method: 'POST',
            body: JSON.stringify({
                calories_consumed,
                calories_burned,
                user_id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(db => db.json())
        .then(response => {
            const date_id = response.id

            const POSTnutrient = fetch('/api/nutrients', {
                method: 'POST',
                body: JSON.stringify({
                    carbs,
                    proteins,
                    fats,
                    sodium,
                    cholesterol,
                    date_id
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        });

        // If the date matches the last recorded day, update the last recorded day.
    } else if(newDay === false) {
        // Assigns the nutrient form from current day to a new variable to make later assignments easier.
        const currentNutrient = currentDayStats.nutrient

        // Add current day values with the manual form values
        calories_consumed = parseInt(currentDayStats.calories_consumed) + parseInt(calories_consumed)
        carbs = parseInt(currentNutrient.carbs) + parseInt(carbs);
        proteins = parseInt(currentNutrient.proteins) + parseInt(proteins);
        fats = parseInt(currentNutrient.fats) + parseInt(fats);

        const PUTday = await fetch(`/api/days/${currentDayStats.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                calories_consumed: calories_consumed,
                calories_burned: currentDayStats.calories_burned
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }); 
        
        const PUTnutrients = await fetch(`/api/nutrients/${currentNutrient.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                carbs: carbs,
                proteins: proteins,
                fats: fats
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }); 

    }
    location.reload();
}

// Form handler for the manual info form
async function manualFormHandler(event){
    // grabbing all the forms information
    event.preventDefault();
    let calories_consumed = document.querySelector('#caloriesManual').value;
    let calories_burned = 0;
    let carbs = document.querySelector('#carbsManual').value;
    let proteins = document.querySelector('#proteinsManual').value;
    let fats = document.querySelector('#fatsManual').value;
    let sodium = 0;
    let cholesterol = 0;
    
    // if the current date does not match the last recorded day, create a new one.
    if(newDay === true){
        const POSTday = await fetch('api/days', {
            method: 'POST',
            body: JSON.stringify({
                calories_consumed,
                calories_burned,
                user_id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(db => db.json())
        .then(response => {
            const date_id = response.id

            const POSTnutrient = fetch('/api/nutrients', {
                method: 'POST',
                body: JSON.stringify({
                    carbs,
                    proteins,
                    fats,
                    sodium,
                    cholesterol,
                    date_id
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        });

        // If the date matches the last recorded day, update the last recorded day.
    } else if(newDay === false) {
        // Assigns the nutrient form from current day to a new variable to make later assignments easier.
        const currentNutrient = currentDayStats.nutrient

        // Add current day values with the manual form values
        calories_consumed = parseInt(currentDayStats.calories_consumed) + parseInt(calories_consumed)
        carbs = parseInt(currentNutrient.carbs) + parseInt(carbs);
        proteins = parseInt(currentNutrient.proteins) + parseInt(proteins);
        fats = parseInt(currentNutrient.fats) + parseInt(fats);

        const PUTday = await fetch(`/api/days/${currentDayStats.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                calories_consumed: calories_consumed,
                calories_burned: currentDayStats.calories_burned
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }); 
        
        const PUTnutrients = await fetch(`/api/nutrients/${currentNutrient.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                carbs: carbs,
                proteins: proteins,
                fats: fats
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }); 

    }
    location.reload();
}

findCurrentDay();

document.querySelector('#submitManual').addEventListener('click', manualFormHandler);
document.querySelector('#foodSubmit').addEventListener('click', getFoodNutrition);