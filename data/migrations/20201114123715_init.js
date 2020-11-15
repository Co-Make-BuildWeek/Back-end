const { table } = require("../db-config");

exports.up = function(knex) {
  return knex.schema
    .createTable("users", (tbl) => {
        tbl.increments();
        tbl.text("name", 128).notNull();
        tbl.text("email", 128).notNull();
        tbl.text("username", 128).notNull();
        tbl.text("password", 128).notNull();
    })
    .createTable("posts", (tbl) => {
        tbl.increments();
        tbl.text("title", 256).notNull();
        tbl.text("description", 256);
        tbl.date("date")
        tbl.text("imgSrc")
        tbl.integer("user_id")
          .unsigned()
          .notNull()
          .references('id')
          .inTable("users")
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("posts")
    .dropTableIfExists("users")
};
