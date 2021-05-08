
exports.up = function (knex) {
  return knex.schema.createTable('admins', function (table) {
    table.increments();
    table.string('username').notNullable();
    table.string('password').notNullable();
    table.string('firstName').nullable();
    table.string('lastName').nullable();
    table.string('email').nullable();
    table.string('twofaSecret').nullable();
    table.integer('groupId').index().references('id').inTable('groups').onUpdate('CASCADE').onDelete('CASCADE')
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
    table.integer('createdBy').nullable().index().references('id').inTable('admins')
      .onUpdate('CASCADE')
      .onDelete('SET NULL');
    table.integer('updatedBy').nullable().index().references('id').inTable('admins')
      .onUpdate('CASCADE')
      .onDelete('SET NULL');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('admins');
};
