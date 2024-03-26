const { Client } = require("pg");

const URI_BASE = "postgres://service_notes_db"

const DB_URI = URI_BASE + process.env.NODE_ENV === "test" ? "_test" : "";

let db = new Client({ connectionString: DB_URI })

const database = "service_notes_db"
const user = "postgres"

db.connectionParameters = { ...db.connectionParameters, user, database }
db.user = user
db.database = database

db.connect()

module.exports = db