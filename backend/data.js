const sqlite = require("sqlite3").verbose()
const cnx = new sqlite.Database("./appData.sqlite")


module.exports = cnx