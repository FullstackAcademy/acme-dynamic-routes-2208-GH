const db = require('../db')
const { Sequelize } = db;
const { STRING } = Sequelize;

const Place = db.define('place', {
  name: {
    type: Sequelize.STRING,
  },
});

Place.defaultSort = [['name', 'desc']];

module.exports = Place;
