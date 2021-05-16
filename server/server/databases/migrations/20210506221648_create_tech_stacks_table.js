
exports.up = function (knex) {
    return knex.schema.createTable('tech_stacks', function (table) {
        table.increments();
        table.string('name').nullable().comment('Ten');
        table.text('description').nullable().comment('Mo ta');
        table.text('status').nullable().defaultTo('inactive').comment('Trang thai');

        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('tech_stacks');
};
