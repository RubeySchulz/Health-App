//Index for relationships between models
const User = require('./User');
const Day = require('./Day');
const Nutrients = require('./Nutrients');

// const User (has many Days) (has id, email, password)
// const Day (belongs to User)(has one Nutrients) (has day/id, calories consumed, calories burned)
// const Nutrients (belongs to Day) (has carbs, proteins, fats, sodium, cholestoral)

User.hasMany(Day, {
    foreignKey: 'user_id'
});
Day.belongsTo(User, {
    foreignKey: 'user_id'
});

Day.hasOne(Nutrients, {
    foreignKey: 'date_id'
});
Nutrients.belongsTo(Day, {
    foreignKey: 'date_id'
});

module.exports = {User, Day, Nutrients};