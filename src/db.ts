const { Client } = require("pg");

const URI_BASE = "postgresql://service_notes"

const DB_URI = URI_BASE + process.env.NODE_ENV === "test" ? "_test" : "";

let db = new Client({ connectionString: DB_URI })

db.connect()

module.exports = db