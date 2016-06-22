exports.up = function(knex, Promise) {
  return knex.schema.createTable('comment', function(table) {
      table.increments();
      table.text('body');
      table.integer('client_id').references('id').inTable('client').onDelete('cascade');
      table.integer('post_id').references('id').inTable('post').onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('comment');
};
