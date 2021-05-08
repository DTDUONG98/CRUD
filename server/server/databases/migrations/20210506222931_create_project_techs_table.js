
exports.up = function (knex) {
    return knex.schema.createTable('project_techs', function (table) {
        table.increments();
        table.integer('projectId').nullable().index().references('id').inTable('projects')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.integer('techId').nullable().index().references('id').inTable('tech_stacks')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('project_techs');
};
