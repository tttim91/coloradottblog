
exports.up = function(knex, Promise) {
  return knex.schema.createTable('client', function(table) {
      table.increments();
      table.string('last_name');
      table.string('first_name');
      table.string('username');
      table.string('password');
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('client');
};
