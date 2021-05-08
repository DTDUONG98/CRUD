
exports.up = function (knex) {
    return knex.schema.createTable('project_types', function (table) {
        table.increments();
        table.string('name').nullable().comment('Ten');
        table.text('description').nullable().comment('Mo ta');
        table.integer('priority').nullable().comment('Trong so');
        table.text('status').nullable().defaultTo('inactive').comment('Trang thai');

        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('project_types');
};
