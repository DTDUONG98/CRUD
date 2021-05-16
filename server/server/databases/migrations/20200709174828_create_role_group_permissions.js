
exports.up = function (knex) {
  return knex.schema.createTable('role_group_permissions', function (table) {
    table.increments();
    table.integer('roleGroupId').notNullable().index().references('id').inTable('role_groups')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.integer('permissionId').nullable().index().references('id').inTable('admin_permissions')
      .onUpdate('CASCADE')
      .onDelete('SET NULL');
    table.integer('value').defaultTo(0);
    table.string('key').nullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.integer('createdBy').nullable().index().references('id').inTable('admins')
      .onUpdate('CASCADE')
      .onDelete('SET NULL');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('role_group_permissions');
};
