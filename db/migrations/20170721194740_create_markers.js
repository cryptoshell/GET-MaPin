exports.up = function(knex, Promise) {
  return knex.schema.createTable('markers', function (table) {
    table.increments();
    table.integer("users_id");
    table.foreign("users_id").references("id").inTable("users");
    table.integer("categories_id");
    table.foreign("categories_id").references("id").inTable("categories");
    table.float("lat",3,14).notNullable();
    table.float("long",3,14).notNullable();
    table.string('title');
    table.string('description');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("markers", function (table){
    table.dropForeign("users_id", "markers_users_id_foreign");
    table.dropForeign("categories_id", "markers_categories_id_foreign");
  });
};
