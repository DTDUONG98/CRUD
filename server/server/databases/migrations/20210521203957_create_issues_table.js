
exports.up = function (knex) {
    return knex.schema.createTable('issues', function (table) {

        table.increments();
        table.string('name').nullable().comment('Ten');
        table.text('description').nullable().comment('Mo ta');
        table.text('status').nullable().comment('Trang thai');
        table.integer('projectId').nullable().index().references('id').inTable('projects')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('issues');
};
