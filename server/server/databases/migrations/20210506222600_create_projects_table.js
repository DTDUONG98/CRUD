
exports.up = function (knex) {
    return knex.schema.createTable('projects', function (table) {
        table.increments();
        table.string('name').nullable().comment('Ten');
        table.integer('statusId').nullable().index().references('id').inTable('project_status')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.integer('typeId').nullable().index().references('id').inTable('project_types')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.integer('deparmentId').nullable().index().references('id').inTable('deparments')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('projects');
};
