exports.up = function(knex, Promise) {
  return knex.schema.createTable('post', function(table) {
      table.increments();
      table.string('title');
      table.text('body');
      table.integer('client_id').references('id').inTable('client').onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('post');
};
