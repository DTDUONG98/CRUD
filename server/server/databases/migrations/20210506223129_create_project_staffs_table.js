
exports.up = function (knex) {
    return knex.schema.createTable('project_staffs', function (table) {
        table.increments();
        table.integer('projectId').nullable().index().references('id').inTable('projects')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.integer('staffId').nullable().index().references('id').inTable('staffs')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('project_staffs');
};
