exports.up = function(knex, Promise) {
  return knex.schema.createTable('favourites', function (table) {
    table.increments();
    table.integer("users_id");
    table.foreign("users_id").references("id").inTable("users");
    table.integer("categories_id");
    table.foreign("categories_id").references("id").inTable("categories");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("favourites", function (table){
    table.dropForeign("users_id", "favourites_users_id_foreign");
    table.dropForeign("categories_id", "favourites_categories_id_foreign");
  });
};
