
exports.up = function (knex) {
    return knex.schema.createTable('staffs', function (table) {
        table.increments();
        table.string('name').nullable().comment('Ten');
        table.text('birth').nullable().comment('Ngay sinh');
        table.text('tel').nullable().comment('SDT');
        table.integer('deparmentId').nullable().index().references('id').inTable('deparments')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('staffs');
};
