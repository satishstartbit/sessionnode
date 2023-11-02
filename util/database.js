const Sequelize = require("sequelize")
const sequelize = new Sequelize("manglamgroup", "root", "root@123", { dialect: "mysql", host: "localhost" })
module.exports = sequelize;