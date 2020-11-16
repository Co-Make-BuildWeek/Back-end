const knex = require("knex");
const config = require("../knexfile.js");

module.exports = knex(knexfile[process.env.NODE_ENV || "development"]);