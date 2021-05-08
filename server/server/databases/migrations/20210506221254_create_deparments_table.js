
exports.up = function (knex) {
    return knex.schema.createTable('deparments', function (table) {
        table.increments();
        table.string('name').nullable().comment('Ten');
        table.text('functions').nullable().comment('Chuc nang');
        table.text('mission').nullable().comment('Nhiem vu');
        table.text('description').nullable().comment('Mo ta');

        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('deparments');
};
