
exports.up = function (knex) {
  return knex.schema.createTable('groups', function (table) {
    table.increments();
    table.string('name').nullable();
    table.text('description').nullable();
    table.integer('parentId').nullable().index().references('id').inTable('groups')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.jsonb('parentIds').nullable().defaultTo('[]');
    table.integer('roleGroupId').nullable().index().references('id').inTable('role_groups')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('groups');
};
