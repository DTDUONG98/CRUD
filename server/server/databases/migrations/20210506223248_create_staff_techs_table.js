
exports.up = function (knex) {
    return knex.schema.createTable('staff_techs', function (table) {
        table.increments();
        table.text('description').nullable().comment('Mo ta kinh nghiem');
        table.integer('staffId').nullable().index().references('id').inTable('staffs')
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
    return knex.schema.dropTable('staff_techs');
};
