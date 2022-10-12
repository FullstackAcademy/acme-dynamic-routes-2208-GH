const db = require('../db')
const { Sequelize } = db;
const { STRING } = Sequelize;

const Vacation = db.define('vacation', {
  name: {
    type: Sequelize.STRING,
  },
})

module.exports = Vacation;
