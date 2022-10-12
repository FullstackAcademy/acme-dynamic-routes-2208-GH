//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Place = require('./models/Place')
const Vacation = require('./models/Vacation')

/*
User.belongsToMany(Place, { through: Vacation});
Place.belongsToMany(User, { through: Vacation});
*/

Vacation.belongsTo(User);
Vacation.belongsTo(Place);

//associations could go here!

module.exports = {
  db,
  models: {
    User,
    Place,
    Vacation
  },
}
